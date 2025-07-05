import { useState } from "react";
import { recetas } from "./recetas";
import { Receta } from "../../interfaces/Sidebar/Tcerveza.interface";
import { SeccionIngredientes } from "../../components/Recetas/SeccionIngredientes";
import { ConfirmModal } from "../../components/Recetas/ConfirmModal";
import { toast } from "react-toastify";
import { FiChevronDown } from "react-icons/fi";
import { FaBeer } from "react-icons/fa";

// Definición de tipos
type Stock = Record<string, number>;

export default function Recetas() {
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<Receta | null>(
    null
  );
  const [stock, setStock] = useState<Stock>({
    Pilsen: 100,
    Munich: 20,
    Abbey: 10,
    "Cara Ruby": 5,
    "Cara Blond": 15,
    "Cara Clair": 8,
    "Wheat Blanc": 10,
    Peated: 5,
    "Cebada tostada": 2,
    Saaz: 0.8,
    "Hallertauer Mittelfruh": 1,
    Perle: 1,
    Polaris: 0.5,
    Cascade: 1,
    Mosaico: 1,
    Golding: 1,
    Fuggle: 1,
    "Safale S-33": 1,
    Safale: 1,
    "BE-256": 1,
  });
  const [modalOpen, setModalOpen] = useState(false);

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
      (item) => (stock[item.nombre] ?? 0) >= item.cantidad
    );
  };

  const producirReceta = () => {
    if (!recetaSeleccionada) return;

    const nuevoStock = { ...stock };

    // Solución tipada para acceder a las propiedades
    const categorias: Array<
      keyof Pick<Receta, "maltas" | "lupulos" | "levaduras">
    > = ["maltas", "lupulos", "levaduras"];

    categorias.forEach((categoria) => {
      recetaSeleccionada[categoria].forEach((item) => {
        nuevoStock[item.nombre] =
          (nuevoStock[item.nombre] || 0) - item.cantidad;
      });
    });

    setStock(nuevoStock);
    setRecetaSeleccionada(null);
    setModalOpen(false);

    toast.success("Producción realizada con éxito! 🍻", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50">
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
              {/* Contenedor del icono con efecto glow */}
              <div className="relative mr-4">
                <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 to-amber-700/20 rounded-full blur-sm"></div>
                <FaBeer className="relative text-amber-400 text-4xl" />
              </div>

              {/* Textos */}
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

          {/* Recuadro de stock */}
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
              {Object.values(stock)
                .reduce((a, b) => a + b, 0)
                .toFixed(1)}{" "}
              kg
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Selector de recetas */}
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
              className="block w-full pl-4 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-mustard-500 focus:border-mustard-500 rounded-lg appearance-none bg-white"
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

        {/* Detalle de receta seleccionada */}
        {recetaSeleccionada && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-2 transition-all duration-300">
            {/* Header de la receta */}
            <div className="bg-navy-700 p-2 text-white">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <h2 className="text-2xl font-bold">
                    {recetaSeleccionada.nombre}
                  </h2>
                  <p className="text-mustard-300 italic">
                    {recetaSeleccionada.estilo}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    IBU: {recetaSeleccionada.ibu}
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

            {/* Contenido de la receta */}
            <div className="p-6">
              {/* Descripción */}
              {recetaSeleccionada.descripcion && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-navy-700 mb-2">
                    Descripción
                  </h3>
                  <p className="text-gray-600">
                    {recetaSeleccionada.descripcion}
                  </p>
                </div>
              )}

              {/* Ingredientes */}
              <h3 className="text-lg font-semibold text-navy-700 mb-4">
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

              {/* Instrucciones */}
              {recetaSeleccionada.instrucciones && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-navy-700 mb-2">
                    Instrucciones
                  </h3>
                  <div className="prose max-w-none">
                    {recetaSeleccionada.instrucciones}
                  </div>
                </div>
              )}

              {/* Botón de producción */}
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
                  {puedeProducir() ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Producir Receta
                    </span>
                  ) : (
                    "Stock insuficiente"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de confirmación */}
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
    </div>
  );
}
