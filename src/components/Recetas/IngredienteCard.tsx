import React from 'react'

interface Props {
  nombre: string
  necesario: number
  disponible: number
  tipo?: 'malta' | 'lupulo' | 'levadura'
}

export const IngredienteCard: React.FC<Props> = ({ nombre, necesario, disponible, tipo }) => {
  const suficiente = disponible >= necesario
  const bgColor = suficiente ? 'bg-opacity-20' : 'bg-opacity-10'
  const tipoColor = {
    malta: 'bg-amber-500',
    lupulo: 'bg-green-500',
    levadura: 'bg-purple-500'
  }[tipo ?? 'malta']

  return (
    <div className={`border border-gray-200 p-4 rounded-lg shadow-sm transition-all hover:shadow-md ${suficiente ? 'hover:border-green-300' : 'hover:border-red-300'}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-gray-800">{nombre}</h3>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${suficiente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {suficiente ? 'Suficiente' : 'Insuficiente'}
        </span>
      </div>
      
      <div className="flex items-center mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
          <div 
            className={`h-2.5 rounded-full ${suficiente ? 'bg-green-500' : 'bg-red-500'}`} 
            style={{ width: `${Math.min(100, (disponible / necesario) * 100)}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-700">
          {Math.round((disponible / necesario) * 100)}%
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="bg-gray-100 p-2 rounded">
          <span className="block text-xs text-gray-500">Necesario</span>
          <span className="font-medium">{necesario} kg</span>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <span className="block text-xs text-gray-500">Disponible</span>
          <span className="font-medium">{disponible.toFixed(2)} kg</span>
        </div>
      </div>
    </div>
  )
}