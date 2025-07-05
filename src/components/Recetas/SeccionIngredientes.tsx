import React from 'react'
import { Ingrediente } from '../../interfaces/Sidebar/Tcerveza.interface'
import { IngredienteCard } from './IngredienteCard'

interface Props {
  titulo: string
  ingredientes: Ingrediente[]
  stock: { [nombre: string]: number }
  className?: string
  tipo?: 'malta' | 'lupulo' | 'levadura'
}

export const SeccionIngredientes: React.FC<Props> = ({ 
  titulo, 
  ingredientes, 
  stock,
  tipo = 'malta'
}) => {
  const iconos = {
    malta: '🍺',
    lupulo: '🌿',
    levadura: '🧫'
  }
  
  const colores = {
    malta: 'bg-amber-90 border-amber-300',
    lupulo: 'bg-green-90 border-green-300',
    levadura: 'bg-purple-90 border-purple-300'
  }

  return (
    <div className={`border rounded-lg p-4 ${colores[tipo]}`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">{iconos[tipo]}</span>
        {titulo}
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {ingredientes.map((item, i) => (
          <IngredienteCard
            key={i}
            nombre={item.nombre}
            necesario={item.cantidad}
            disponible={stock[item.nombre] ?? 0}
            tipo={tipo}
          />
        ))}
      </div>
    </div>
  )
}