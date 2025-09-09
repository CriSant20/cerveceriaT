import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { Receta } from "../../interfaces/Sidebar/Tcerveza.interface";
import { SeccionIngredientes } from "../../components/Recetas/SeccionIngredientes";
import { ConfirmModal } from "../../components/Recetas/ConfirmModal";
import { toast } from "react-toastify";
import { FiChevronDown } from "react-icons/fi";
import { FaBeer } from "react-icons/fa";
import RecipesManagerModal from "../../components/Recetas/RecipesManagerModal";

// Tipos locales
type Stock = Record<string, number>;
type Ingrediente = { nombre: string; cantidad: number };

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(
    null
  );
  const [stock, setStock] = useState<Stock>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);

  // Normalizador de strings
  const norm = (s: string) => s.trim().toLowerCase();

  // === FETCH RECETAS ===
  const fetchRecetas = async () => {
    try {
      const response = await axios.get(`${API_URL}/recetas-con-ingredientes/`);
      const data = response.data;

      const mapped: Receta[] = data.map((receta: any) => {
        const tipos = receta.tipos || [];
        const ingredientesPorTipo = {
          maltas: [] as Ingrediente[],
          lupulos: [] as Ingrediente[],
          levaduras: [] as Ingrediente[],
        };

        tipos.forEach((tipo: any) => {
          const key = (tipo.nombre_tipo || "").toLowerCase();
          const tipoKey = key === "lúpulos" ? "lupulos" : key;
          if (["maltas", "lupulos", "levaduras"].includes(tipoKey)) {
            ingredientesPorTipo[tipoKey as keyof typeof ingredientesPorTipo] = (
              tipo.ingredientes || []
            ).map((ing: any) => ({
              nombre: ing.nombre_ingrediente,
              cantidad: Number(ing.cantidad ?? 0), // 👈 fuerza número
            }));
          }
        });

        return {
          id: receta.id,
          nombre: receta.nombre_receta,
          descripcion: receta.descripcion ?? "",
          ibu: receta.ibu ?? receta.ibu_estimada ?? 0,
          abv: receta.porcentaje_alcohol ?? 0,
          volumen: receta.contenido_neto ?? 0,
          estilo: receta.estilo ?? receta.nombre_receta,
          instrucciones: receta.instrucciones ?? "",
          ...ingredientesPorTipo,
        };
      });

      setRecetas(mapped);
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    }
  };

  // === FETCH STOCK ===
  const fetchStock = async () => {
    try {
      const response = await axios.get(`${API_URL}/ingredientes/`);
      const ingredientes = response.data;
      const stockMap: Stock = {};
      ingredientes.forEach((ing: any) => {
        stockMap[norm(ing.nombre_ingrediente)] = Number(ing.stock) || 0; // 👈 fuerza número
      });
      setStock(stockMap);
    } catch (error) {
      console.error("Error al cargar el stock:", error);
    }
  };

  useEffect(() => {
    fetchRecetas();
    fetchStock();
  }, []);

  // === SELECCIÓN ===
  const handleSeleccion = (id: number) => {
    const receta = recetas.find((r) => r.id === id) || null;
    setRecetaSeleccionada(receta);
  };

  const puedeProducir = (): boolean => {
    if (!recetaSeleccionada) return false;
    const ingredientes = [
      ...recetaSeleccionada.maltas,
      ...recetaSeleccionada.lupulos,
      ...recetaSeleccionada.levaduras,
    ];
    return ingredientes.every(
      (item) =>
        (Number(stock[norm(item.nombre)]) || 0) >= Number(item.cantidad || 0)
    );
  };

  // === PRODUCIR RECETA ===
  const producirReceta = async () => {
    if (!recetaSeleccionada) return;
    try {
      await axios.post(`${API_URL}/preparar-bebida/`, {
        receta_id: recetaSeleccionada.id,
        cantidad: 1,
      });
      toast.success("Producción realizada con éxito! 🍻");

      await fetchStock();
      setRecetaSeleccionada(null);
      setModalOpen(false);
    } catch (error: any) {
      toast.error(
        error.response?.data?.error || "Error al preparar la receta."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div
        className="max-w-6xl mx-auto px-6 py-8"
        style={{
          background: `
            linear-gradient(to right, rgba(17, 24, 39, 0.9), rgba(31, 41, 55, 0.7)),
            url('path-a-tu-textura-opcional.jpg') center/cover
          `,
          borderBottom: "1px solid rgba(217, 119, 6, 0.3)",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative mr-4">
                <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 to-amber-700/20 rounded-full blur-sm"></div>
                <FaBeer className="relative text-amber-400 text-4xl" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-amber-100 tracking-tight">
                  <span className="block">RECETAS</span>
                  <span className="block text-amber-300">DE CERVEZA</span>
                </h1>
                <p className="mt-2 text-lg text-amber-300/90 tracking-wider">
                  Formula y produce tus mejores creaciones artesanales
                </p>
              </div>
            </div>
          </div>

          {/* STOCK + BOTÓN GESTIONAR */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div
              className="p-4 rounded-xl border border-amber-600/30 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(17, 24, 39, 0.7), rgba(31, 41, 55, 0.5))",
              }}
            >
              <p className="text-xs uppercase text-amber-300/80 tracking-widest mb-1">
                Stock Total
              </p>
              <p className="text-2xl font-bold text-amber-200">
                {Number(
                  Object.values(stock).reduce((a, b) => a + Number(b ?? 0), 0)
                ).toFixed(1)}{" "}
                kg
              </p>
            </div>
            <button
              onClick={() => setIsManageOpen(true)}
              className="rounded-lg bg-amber-600 text-white px-4 py-2 font-medium hover:bg-amber-700 shadow"
            >
              Gestionar Recetas
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* SELECTOR */}
        <div className="mb-8">
          <label
            htmlFor="receta-select"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Selecciona una receta para ver los detalles
          </label>
          <div className="relative">
            <select
              id="receta-select"
              onChange={(e) => handleSeleccion(Number(e.target.value))}
              className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 rounded-lg appearance-none bg-white"
              value={recetaSeleccionada?.id ?? ""}
            >
              <option value="">-- Selecciona una receta --</option>
              {recetas.map((receta) => (
                <option key={receta.id} value={receta.id}>
                  {receta.nombre} - {receta.estilo}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <FiChevronDown />
            </div>
          </div>
        </div>

        {/* DETALLE */}
        {recetaSeleccionada && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-2 transition-all duration-300">
            <div className="bg-gray-800 p-2 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <h2 className="text-2xl font-bold">
                    {recetaSeleccionada.nombre}
                  </h2>
                  <p className="text-amber-300 italic">
                    {recetaSeleccionada.estilo}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    IBU: {recetaSeleccionada.ibu ?? 0}
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    ABV: {recetaSeleccionada.abv}%
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    Vol: {recetaSeleccionada.volumen}L
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {recetaSeleccionada.descripcion && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Descripción
                  </h3>
                  <p className="text-gray-600">
                    {recetaSeleccionada.descripcion}
                  </p>
                </div>
              )}

              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Ingredientes
              </h3>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <SeccionIngredientes
                  titulo="Maltas"
                  ingredientes={recetaSeleccionada.maltas}
                  stock={stock}
                  tipo="malta"
                />
                <SeccionIngredientes
                  titulo="Lúpulos"
                  ingredientes={recetaSeleccionada.lupulos}
                  stock={stock}
                  tipo="lupulo"
                />
                <SeccionIngredientes
                  titulo="Levaduras"
                  ingredientes={recetaSeleccionada.levaduras}
                  stock={stock}
                  tipo="levadura"
                />
              </div>

              {recetaSeleccionada.instrucciones && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Instrucciones
                  </h3>
                  <div className="prose max-w-none">
                    {recetaSeleccionada.instrucciones}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  disabled={!puedeProducir()}
                  onClick={() => setModalOpen(true)}
                  className={`px-6 py-3 rounded-lg font-semibold text-white transition-all transform hover:scale-105 ${
                    puedeProducir()
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {puedeProducir() ? "Producir Receta" : "Stock insuficiente"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL PRODUCCIÓN */}
      <ConfirmModal
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        onConfirm={producirReceta}
        receta={
          recetaSeleccionada
            ? {
                nombre: recetaSeleccionada.nombre,
                estilo: recetaSeleccionada.estilo,
              }
            : null
        }
      />

      {/* MODAL GESTIÓN */}
      <RecipesManagerModal
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        onAnyChange={async () => {
          await fetchRecetas();
        }}
      />
    </div>
  );
}
