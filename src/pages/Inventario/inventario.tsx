import { useState, useMemo } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch, FiCheck, FiX } from 'react-icons/fi';

// Types
type InventoryItem = {
  id: number;
  nombre: string;
  stock: number;
  unidad: string;
};

type InventoryCategory = 'maltas' | 'lupulos' | 'levaduras';

type InventoryData = {
  [key in InventoryCategory]: InventoryItem[];
};

// Mock data
const initialInventory: InventoryData = {
  maltas: [
    { id: 1, nombre: 'Pilsen', stock: 10.5, unidad: 'kg' },
    { id: 2, nombre: 'Munich', stock: 5.2, unidad: 'kg' },
    { id: 3, nombre: 'Caramelo', stock: 3.7, unidad: 'kg' },
  ],
  lupulos: [
    { id: 1, nombre: 'Saaz', stock: 200, unidad: 'kg' },
    { id: 2, nombre: 'Cascade', stock: 150, unidad: 'kg' },
  ],
  levaduras: [
    { id: 1, nombre: 'Safale S-33', stock: 5, unidad: 'kg' },
    { id: 2, nombre: 'US-05', stock: 3, unidad: 'kg' },
  ],
};

// Componente para la barra de búsqueda
const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="relative mb-6">
    <FiSearch className="absolute left-3 top-3 text-gray-400" />
    <input
      type="text"
      placeholder="Buscar materia prima..."
      className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

// Componente para la tabla de inventario
const InventoryTable = ({
  category,
  title,
  items,
  onEdit,
  onDelete,
  onAdd,
  onSave,
  editingId,
  setEditingId,
  tempStock,
  setTempStock,
}: {
  category: InventoryCategory;
  title: string;
  items: InventoryItem[];
  onEdit: (id: number | null) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
  onSave: (id: number) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
  tempStock: string;
  setTempStock: (value: string) => void;
}) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
    <div className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h2 className="text-xl font-bold">{title}</h2>
      <button
        onClick={onAdd}
        className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 px-3 py-1 rounded text-sm transition"
        aria-label={`Agregar ${title}`}
      >
        <FiPlus /> Agregar
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {items.map((item) => (
            <tr key={item.id}>
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
                    step={item.unidad === 'kg' ? "0.1" : "1"}
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
                      aria-label="Guardar"
                    >
                      <FiCheck />
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setTempStock('');
                      }}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Cancelar"
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

// Componente principal
const Inventario = () => {
  const [inventory, setInventory] = useState<InventoryData>(initialInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempStock, setTempStock] = useState('');

  // Filtrar items basado en búsqueda
  const filteredItems = useMemo(() => {
    const filter = (category: InventoryCategory) => {
      return inventory[category].filter((item) =>
        item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    return {
      maltas: filter('maltas'),
      lupulos: filter('lupulos'),
      levaduras: filter('levaduras'),
    };
  }, [inventory, searchTerm]);

  // Guardar cambios
 const handleSave = (category: InventoryCategory, id: number) => {
  const stockValue = parseFloat(tempStock);
  if (isNaN(stockValue) || stockValue < 0) {
    alert("Por favor ingrese un valor válido (número positivo)");
    return;
  }

  setInventory((prev) => ({
    ...prev,
    [category]: prev[category].map((item) =>
      item.id === id ? { ...item, stock: stockValue } : item
    ),
  }));

  setEditingId(null);
  setTempStock('');
};

  // Eliminar item
  const handleDelete = (category: InventoryCategory, id: number) => {
    if (window.confirm('¿Está seguro que desea eliminar este item?')) {
      setInventory((prev) => ({
        ...prev,
        [category]: prev[category].filter((item) => item.id !== id),
      }));
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Gestión de Inventario</h1>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="space-y-6">
        <InventoryTable
          category="maltas"
          title="Maltas"
          items={filteredItems.maltas}
          onEdit={setEditingId}
          onDelete={(id) => handleDelete('maltas', id)}
          onAdd={() => console.log('Agregar malta')}
          onSave={(id) => handleSave('maltas', id)}
          editingId={editingId}
          setEditingId={setEditingId}
          tempStock={tempStock}
          setTempStock={setTempStock}
        />

        <InventoryTable
          category="lupulos"
          title="Lúpulos"
          items={filteredItems.lupulos}
          onEdit={setEditingId}
          onDelete={(id) => handleDelete('lupulos', id)}
          onAdd={() => console.log('Agregar lúpulo')}
          onSave={(id) => handleSave('lupulos', id)}
          editingId={editingId}
          setEditingId={setEditingId}
          tempStock={tempStock}
          setTempStock={setTempStock}
        />

        <InventoryTable
          category="levaduras"
          title="Levaduras"
          items={filteredItems.levaduras}
          onEdit={setEditingId}
          onDelete={(id) => handleDelete('levaduras', id)}
          onAdd={() => console.log('Agregar levadura')}
          onSave={(id) => handleSave('levaduras', id)}
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