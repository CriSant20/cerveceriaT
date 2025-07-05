import React from 'react'

interface Props {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
  receta?: any
}

export const ConfirmModal: React.FC<Props> = ({ isOpen, onConfirm, onCancel, receta }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-amber-50 p-6 rounded-lg shadow-xl w-96 border border-amber-200">
        <div className="flex items-start mb-4">
          <div className="bg-amber-100 p-2 rounded-full mr-3">
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Confirmar producción</h2>
            <p className="text-sm text-gray-600">
              {receta && `Estás a punto de producir: ${receta.nombre}`}
            </p>
          </div>
        </div>
        
        <div className="bg-amber-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-amber-800 font-medium">
            Se descontará del inventario la materia prima necesaria.
          </p>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-md"
          >
            Confirmar Producción
          </button>
        </div>
      </div>
    </div>
  )
}