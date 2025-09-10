import { useEffect, useMemo, useRef, useState } from "react";
import { FiX, FiMinusCircle, FiPlusCircle, FiSave, FiAlertTriangle, FiPackage, FiTrendingUp, FiTrendingDown } from "react-icons/fi";

type InventoryAction = "add" | "remove";

type AdjustInventoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    action: InventoryAction;
    amount: number;   // cantidad positiva ingresada
    newStock: number; // stock resultante
    note?: string;    // opcional
  }) => void;
  itemName: string;
  currentStock: number;
  unidad?: string;
  defaultAction?: InventoryAction; // opcional, por defecto "add"
};

export default function AdjustInventoryModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  currentStock,
  unidad = "u",
  defaultAction = "add",
}: AdjustInventoryModalProps) {
  const [action, setAction] = useState<InventoryAction>(defaultAction);
  const [amount, setAmount] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setAction(defaultAction);
      setAmount("");
      setNote("");
      setTimeout(() => dialogRef.current?.querySelector("input")?.focus(), 100);
    }
  }, [isOpen, defaultAction]);

  // Parseo robusto (coma o punto)
  const parsedAmount = useMemo(() => {
    const val = Number((amount || "").toString().replace(",", "."));
    return Number.isFinite(val) ? val : NaN;
  }, [amount]);

  const isAmountValid = !Number.isNaN(parsedAmount) && parsedAmount > 0;

  const resulting = useMemo(() => {
    if (!isAmountValid) return currentStock;
    return action === "add"
      ? currentStock + parsedAmount
      : currentStock - parsedAmount;
  }, [action, currentStock, isAmountValid, parsedAmount]);

  const wouldGoNegative = action === "remove" && isAmountValid && parsedAmount > currentStock;

  const quickAdd = (n: number) =>
    setAmount((prev) => {
      const base = Number((prev || "0").replace(",", ".")) || 0;
      return String(base + n);
    });

  const removeAll = () => {
    setAction("remove");
    setAmount(String(currentStock));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAmountValid) return alert("Ingresa una cantidad válida (> 0).");
    if (wouldGoNegative) return alert("No puedes retirar más de lo disponible.");
    onConfirm({
      action,
      amount: parsedAmount,
      newStock: Math.max(
        action === "add" ? currentStock + parsedAmount : currentStock - parsedAmount,
        0
      ),
      note: note?.trim() || undefined,
    });
    onClose();
  };

  if (!isOpen) return null;

  const isAddMode = action === "add";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="adjust-inv-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Container */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                  {isAddMode ? (
                    <FiPlusCircle className="h-5 w-5" />
                  ) : (
                    <FiMinusCircle className="h-5 w-5" />
                  )}
                </div>
                
                <div>
                  <h2 id="adjust-inv-title" className="text-lg font-semibold">
                    {isAddMode ? "Agregar Inventario" : "Quitar Inventario"}
                  </h2>
                  <p className="text-sm text-white/90">
                    <span className="font-medium">{itemName}</span>
                    <span className="mx-2">•</span>
                    Stock: <span className="font-semibold">{currentStock} {unidad}</span>
                  </p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                type="button"
                aria-label="Cerrar"
                className="rounded-lg p-2 hover:bg-white/20 transition-colors"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={submit} className="p-6 space-y-6">
            
            {/* Action Toggle */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tipo de Operación
              </label>
              <div className="flex rounded-lg bg-gray-100 p-1">
                <button
                  type="button"
                  onClick={() => setAction("add")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    isAddMode
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiTrendingUp className="h-4 w-4" />
                  Agregar
                </button>
                <button
                  type="button"
                  onClick={() => setAction("remove")}
                  className={`flex-1 flex items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                    !isAddMode
                      ? 'bg-red-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <FiTrendingDown className="h-4 w-4" />
                  Quitar
                </button>
              </div>
            </div>

            {/* Cantidad */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Cantidad a {isAddMode ? 'Agregar' : 'Quitar'}
              </label>
              
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9]*[.,]?[0-9]+"
                    className={`w-full rounded-lg border-2 px-3 py-3 text-center font-medium focus:ring-2 transition-all ${
                      wouldGoNegative
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200 bg-red-50'
                        : 'border-gray-300 focus:border-amber-500 focus:ring-amber-200'
                    }`}
                    placeholder={`0 ${unidad}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    {unidad}
                  </div>
                </div>
                
                {/* Quick buttons */}
                <div className="flex gap-1">
                  {[1, 5, 10].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => quickAdd(n)}
                      className="h-10 w-10 rounded-lg border-2 border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-amber-300 transition-all"
                      title={`+${n} ${unidad}`}
                    >
                      +{n}
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <FiPackage className="h-3 w-3" />
                Usa punto o coma para decimales
              </p>
            </div>

            {/* Remove All Button */}
            {action === "remove" && currentStock > 0 && (
              <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      ¿Quitar todo el stock?
                    </p>
                    <p className="text-xs text-amber-700">
                      Esto establecerá el inventario en 0 {unidad}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeAll}
                    className="px-3 py-1 text-sm font-medium text-amber-700 bg-white rounded-md border border-amber-200 hover:bg-amber-50 transition-colors"
                  >
                    Quitar todo
                  </button>
                </div>
              </div>
            )}

            {/* Resumen */}
            <div className={`rounded-lg p-4 border ${
              wouldGoNegative 
                ? 'bg-red-50 border-red-200' 
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Stock actual</span>
                  <span className="font-medium text-gray-900">{currentStock} {unidad}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {isAddMode ? 'Se agregará' : 'Se quitará'}
                  </span>
                  <span className={`font-medium ${
                    isAddMode ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isAmountValid ? `${parsedAmount} ${unidad}` : `0 ${unidad}`}
                  </span>
                </div>
                
                <div className="pt-2 border-t border-gray-300">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">Stock resultante</span>
                    <span className={`font-bold ${
                      wouldGoNegative ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {isAmountValid ? Math.max(resulting, 0) : currentStock} {unidad}
                    </span>
                  </div>
                </div>
              </div>

              {wouldGoNegative && (
                <div className="mt-3 p-2 rounded-md bg-red-100 border border-red-200">
                  <div className="flex items-center gap-2 text-red-700">
                    <FiAlertTriangle className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">
                      No puedes retirar más de lo disponible
                    </span>
                  </div>
                </div>
              )}
            </div>



            {/* Footer */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                disabled={!isAmountValid || wouldGoNegative}
                className="flex items-center gap-2 px-6 py-2 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiSave className="h-4 w-4" />
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}