import { useEffect, useState, useMemo } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import {
  FiEdit2,
  FiTrash2,
  FiPlus,
  FiSearch,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { FaBeer } from "react-icons/fa";

// Types
type InventoryItem = {
  id: number;
  nombre: string;
  stock: number;
  unidad: string;
};

type InventoryCategory = "maltas" | "lúpulos" | "levaduras";

type InventoryData = {
  [key in InventoryCategory]: InventoryItem[];
};

// Componente para la barra de búsqueda
const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="relative mb-6">
    <FiSearch className="absolute left-3 top-3 text-gray-400" />
    <input
      type="text"
      placeholder="Buscar materia prima..."
      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Buscar en inventario"
    />
  </div>
);

// Props para InventoryTable
interface InventoryTableProps {
  title: string;
  items: InventoryItem[];
  onDelete: (id: number) => void;
  onAdd: () => void;
  onSave: (id: number) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  tempStock: string;
  setTempStock: (value: string) => void;
}

// Componente para la tabla de inventario optimizado
const InventoryTable = ({
  title,
  items,
  onDelete,
  onAdd,
  onSave,
  editingId,
  setEditingId,
  tempStock,
  setTempStock,
}: InventoryTableProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold">{title}</h2>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded text-sm transition"
          aria-label={`Agregar nuevo item a ${title}`}
        >
          <FiPlus /> Agregar
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Unidad
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={`${title}-${item.id}-${item.nombre}`}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId === item.id ? (
                    <input
                      type="number"
                      className="border rounded px-2 py-1 w-20"
                      value={tempStock}
                      onChange={(e) => setTempStock(e.target.value)}
                      min="0"
                      step={item.unidad === "kg" ? "0.1" : "1"}
                      aria-label={`Editar stock de ${item.nombre}`}
                    />
                  ) : (
                    item.stock
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.unidad}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex gap-2">
                  {editingId === item.id ? (
                    <>
                      <button
                        onClick={() => onSave(item.id)}
                        className="text-green-600 hover:text-green-800"
                        aria-label="Confirmar edición"
                      >
                        <FiCheck />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setTempStock("");
                        }}
                        className="text-red-600 hover:text-red-800"
                        aria-label="Cancelar edición"
                      >
                        <FiX />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setTempStock(item.stock.toString());
                        }}
                        className="text-amber-600 hover:text-amber-800"
                        aria-label={`Editar ${item.nombre}`}
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        className="text-red-600 hover:text-red-800"
                        aria-label={`Eliminar ${item.nombre}`}
                      >
                        <FiTrash2 />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Componente principal optimizado
const Inventario = () => {
  const [inventory, setInventory] = useState<InventoryData>({
    maltas: [],
    "lúpulos": [],
    levaduras: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState("");

  // Filtrar items basado en búsqueda (memoizado)
  const filteredItems = useMemo(() => {
    const filterItems = (category: InventoryCategory) =>
      inventory[category].filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return {
      maltas: filterItems("maltas"),
      lupulos: filterItems("lúpulos"),
      levaduras: filterItems("levaduras"),
    };
  }, [inventory, searchTerm]);

  // Guardar cambios en el inventario
const handleSave = async (category: InventoryCategory, id: number) => {
  const stockValue = parseFloat(tempStock);
  if (isNaN(stockValue) || stockValue < 0) {
    alert("Por favor ingrese un valor válido (número positivo)");
    return;
  }

  try {
    await axios.patch(`${API_URL}/ingredientes/${id}/`, {
      stock: stockValue,
    });

    // Actualiza también el estado local
    setInventory((prev) => ({
      ...prev,
      [category]: prev[category].map((item) =>
        item.id === id ? { ...item, stock: stockValue } : item
      ),
    }));

    setEditingId(null);
    setTempStock("");
  } catch (error) {
    console.error("Error al guardar los cambios:", error);
    alert("Hubo un error al guardar los cambios. Intente nuevamente.");
  }
};

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get(`${API_URL}/tipos-con-ingredientes/`);
        const data = response.data;
        console.log("Datos de inventario:", data);
        const mapped: InventoryData = {
          maltas: [],
          "lúpulos": [],
          levaduras: [],
        };

        data.forEach((tipo: any) => {
          const categoria = tipo.nombre_tipo.toLowerCase(); // "Maltas" → "maltas"
          if (mapped[categoria as InventoryCategory]) {
            mapped[categoria as InventoryCategory] = tipo.ingredientes.map(
              (ing: any) => ({
                id: ing.id,
                nombre: ing.nombre_ingrediente,
                stock: ing.stock,
                unidad: ing.unidad.nombre,
              })
            );
          }
        });

        setInventory(mapped);
      } catch (error) {
        console.error("Error al cargar inventario:", error);
      }
    };

    fetchInventory();
  }, []);

  // Eliminar item con confirmación
  const handleDelete = (category: InventoryCategory, id: number) => {
    if (
      window.confirm(
        "¿Está seguro que desea eliminar este item del inventario?"
      )
    ) {
      setInventory((prev) => ({
        ...prev,
        [category]: prev[category].filter((item) => item.id !== id),
      }));
    }
  };

  // Función para agregar nuevo item (placeholder)
  const handleAddItem = (category: InventoryCategory) => {
    console.log(`Agregar nuevo item a ${category}`);
    // Implementar lógica para agregar nuevos items
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
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
                  <span className="block">INVENTARIO</span>
                  <span className="block text-amber-300">
                    Registro de Materia Prima
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Cierre del div flex-col md:flex-row */}
      </div>{" "}
      {/* Cierre del div con el gradiente */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <div className="space-y-6">
        <InventoryTable
          title="Maltas"
          items={filteredItems.maltas}
          onDelete={(id) => handleDelete("maltas", id)}
          onAdd={() => handleAddItem("maltas")}
          onSave={(id) => handleSave("maltas", id)}
          editingId={editingId}
          setEditingId={setEditingId}
          tempStock={tempStock}
          setTempStock={setTempStock}
        />

        <InventoryTable
          title="Lúpulos"
          items={filteredItems.lupulos}
          onDelete={(id) => handleDelete("lúpulos", id)}
          onAdd={() => handleAddItem("lúpulos")}
          onSave={(id) => handleSave("lúpulos", id)}
          editingId={editingId}
          setEditingId={setEditingId}
          tempStock={tempStock}
          setTempStock={setTempStock}
        />

        <InventoryTable
          title="Levaduras"
          items={filteredItems.levaduras}
          onDelete={(id) => handleDelete("levaduras", id)}
          onAdd={() => handleAddItem("levaduras")}
          onSave={(id) => handleSave("levaduras", id)}
          editingId={editingId}
          setEditingId={setEditingId}
          tempStock={tempStock}
          setTempStock={setTempStock}
        />
      </div>
    </div>
  );
};

export default Inventario;
