import { useEffect, useRef, useState } from "react";
import { FiX, FiSave } from "react-icons/fi";

type AddItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { nombre: string; stock: number; unidad: string }) => void;
  category: "maltas" | "lúpulos" | "levaduras";
};

export default function AddItemModal({
  isOpen,
  onClose,
  onSubmit,
  category,
}: AddItemModalProps) {
  const [nombre, setNombre] = useState("");
  const [stock, setStock] = useState<string>("");
  const [unidad, setUnidad] = useState("kg");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setNombre("");
      setStock("");
      setUnidad("kg");
      setTimeout(() => dialogRef.current?.querySelector("input")?.focus(), 0);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Number((stock || "").toString().replace(",", "."));
    if (!nombre.trim()) return alert("Ingresa un nombre válido.");
    if (Number.isNaN(parsed) || parsed < 0)
      return alert("Ingresa un stock válido (número positivo).");

    onSubmit({ nombre: nombre.trim(), stock: parsed, unidad });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-item-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-5 py-3">
          <div>
            <h2 id="add-item-title" className="text-lg font-semibold">
              Agregar a {category}
            </h2>
            <p className="text-sm text-gray-500">
              Completa los datos del nuevo item.
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            aria-label="Cerrar"
            className="rounded p-2 hover:bg-gray-100"
          >
            <FiX />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="space-y-4 px-5 py-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
              placeholder="Ej. Malta Pilsen"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9]*[.,]?[0-9]+"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                placeholder="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                aria-describedby="stock-help"
              />
              <small id="stock-help" className="text-xs text-gray-500">
                Usa punto o coma para decimales.
              </small>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Unidad
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                value={unidad}
                onChange={(e) => setUnidad(e.target.value)}
              >
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="L">L</option>
                <option value="ml">ml</option>
                <option value="u">u</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-2 flex items-center justify-end gap-2 border-t pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 font-medium text-white hover:bg-amber-700"
            >
              <FiSave /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
