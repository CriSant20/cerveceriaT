import { useState, useEffect } from "react";
import { FiX, FiAlertTriangle, FiPlus, FiMinus } from "react-icons/fi";

// Tipos de datos
type IngredienteReceta = {
  tipo: string;
  cantidad: number;
};

type RecetaCerveza = {
  id: number;
  nombre: string;
  descripcion: string;
  maltas: IngredienteReceta[];
  lupulos: IngredienteReceta[];
  levadura: IngredienteReceta;
};

type InventarioItem = {
  nombre: string;
  stock: number;
  unidad: string;
};

type Inventario = {
  maltas: InventarioItem[];
  lupulos: InventarioItem[];
  levaduras: InventarioItem[];
};

// Datos de ejemplo
const recetas: RecetaCerveza[] = [
  {
    id: 1,
    nombre: "Abadía Ámbar",
    descripcion: "Cerveza de estilo belga con notas maltosas y frutales",
    maltas: [
      { tipo: "Pilsen", cantidad: 67.5 },
      { tipo: "Munich", cantidad: 33.5 },
      { tipo: "Abbey", cantidad: 6.5 },
      { tipo: "Cara Ruby", cantidad: 4.5 },
    ],
    lupulos: [
      { tipo: "Saaz", cantidad: 0.9 },
      { tipo: "Hallertau Mittelfruh", cantidad: 0.7 },
    ],
    levadura: { tipo: "Safale S-33", cantidad: 0.4 },
  },
  {
    id: 2,
    nombre: "Triple Blond",
    descripcion: "Cerveza rubia fuerte con carácter especiado",
    maltas: [
      { tipo: "Pilsen", cantidad: 120 },
      { tipo: "Cara Blond", cantidad: 15 },
      { tipo: "Cara Clair", cantidad: 7.5 },
      { tipo: "Wheat Blanc", cantidad: 7.5 },
    ],
    lupulos: [
      { tipo: "Perle", cantidad: 0.4 },
      { tipo: "Polaris", cantidad: 0.18 },
      { tipo: "Cascada", cantidad: 0.5 },
      { tipo: "Mosaico", cantidad: 0.4 },
    ],
    levadura: { tipo: "Safale BE-256", cantidad: 0.35 },
  },
  // Agregar más recetas según sea necesario
];

const inventarioInicial: Inventario = {
  maltas: [
    { nombre: "Pilsen", stock: 100, unidad: "kg" },
    { nombre: "Munich", stock: 350, unidad: "kg" },
    // ... otros ingredientes
  ],
  lupulos: [
    { nombre: "Saaz", stock: 533, unidad: "kg" },
    // ... otros ingredientes
  ],
  levaduras: [
    { nombre: "Safale S-33", stock: 233, unidad: "kg" },
    // ... otros ingredientes
  ],
};

// Componente para mostrar ingredientes
const IngredienteItem = ({
  ingrediente,
}: {
  ingrediente: IngredienteReceta;
}) => (
  <div className="flex justify-between py-1 px-2 bg-gray-50 rounded">
    <span className="font-medium">{ingrediente.tipo}</span>
    <span>{ingrediente.cantidad} kg</span>
  </div>
);

// Componente para la tarjeta de receta
const TarjetaReceta = ({
  receta,
  inventario,
  onProducir,
}: {
  receta: RecetaCerveza;
  inventario: Inventario;
  onProducir: (receta: RecetaCerveza) => void;
}) => {
  const [puedeProducir, setPuedeProducir] = useState(true);
  const [ingredientesFaltantes, setIngredientesFaltantes] = useState<string[]>(
    []
  );

  useEffect(() => {
    verificarIngredientes();
  }, [inventario]);

  const verificarIngredientes = () => {
    const faltantes: string[] = [];

    // Verificar maltas
    receta.maltas.forEach((malta) => {
      const enInventario = inventario.maltas.find(
        (m) => m.nombre === malta.tipo
      );
      if (!enInventario || enInventario.stock < malta.cantidad) {
        faltantes.push(`${malta.tipo} (necesarios: ${malta.cantidad} kg)`);
      }
    });

    // Verificar lúpulos
    receta.lupulos.forEach((lupulo) => {
      const enInventario = inventario.lupulos.find(
        (l) => l.nombre === lupulo.tipo
      );
      if (!enInventario || enInventario.stock < lupulo.cantidad) {
        faltantes.push(`${lupulo.tipo} (necesarios: ${lupulo.cantidad} kg)`);
      }
    });

    // Verificar levadura
    const enInventario = inventario.levaduras.find(
      (l) => l.nombre === receta.levadura.tipo
    );
    if (!enInventario || enInventario.stock < receta.levadura.cantidad) {
      faltantes.push(
        `${receta.levadura.tipo} (necesaria: ${receta.levadura.cantidad} kg)`
      );
    }

    setIngredientesFaltantes(faltantes);
    setPuedeProducir(faltantes.length === 0);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 mb-4 border-l-4 ${
        puedeProducir ? "border-green-500" : "border-red-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{receta.nombre}</h3>
          <p className="text-gray-600 text-sm">{receta.descripcion}</p>
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            puedeProducir
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {puedeProducir ? "Disponible" : "Faltan ingredientes"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Maltas</h4>
          {receta.maltas.map((malta) => (
            <IngredienteItem
              key={`malta-${malta.tipo}-${malta.cantidad}`}
              ingrediente={malta}
            />
          ))}
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Lúpulos</h4>
          {receta.lupulos.map((lupulo) => (
            <IngredienteItem
              key={`lupulo-${lupulo.tipo}-${lupulo.cantidad}`}
              ingrediente={lupulo}
            />
          ))}
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2">Levadura</h4>
          <IngredienteItem
            key={`levadura-${receta.levadura.tipo}-${receta.levadura.cantidad}`}
            ingrediente={receta.levadura}
          />
        </div>
      </div>

      {!puedeProducir && (
        <div className="mt-3 p-2 bg-red-50 text-red-700 rounded flex items-start">
          <FiAlertTriangle className="mt-1 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Ingredientes insuficientes:</p>
            <ul className="list-disc list-inside">
              {ingredientesFaltantes.map((item) => (
                <li key={`faltante-${item.replace(/\s+/g, "-").toLowerCase()}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <button
        onClick={() => onProducir(receta)}
        disabled={!puedeProducir}
        className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center ${
          puedeProducir
            ? "bg-amber-600 hover:bg-amber-700 text-white"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
      >
        {puedeProducir ? (
          <>
            <FiPlus className="mr-2" />
            Producir esta receta
          </>
        ) : (
          <>
            <FiX className="mr-2" />
            No se puede producir
          </>
        )}
      </button>
    </div>
  );
};

const Recetas = () => {
  const [inventario, setInventario] = useState<Inventario>(inventarioInicial);
  const [recetaSeleccionada, setRecetaSeleccionada] =
    useState<RecetaCerveza | null>(null);
  const [cantidadProduccion, setCantidadProduccion] = useState(1);
  const [mostrarModal, setMostrarModal] = useState(false);

  const manejarProduccion = (receta: RecetaCerveza) => {
    setRecetaSeleccionada(receta);
    setCantidadProduccion(1);
    setMostrarModal(true);
  };

  const confirmarProduccion = () => {
    if (!recetaSeleccionada) return;

    // Actualizar inventario
    const nuevoInventario = { ...inventario };

    // Reducir maltas
    recetaSeleccionada.maltas.forEach((malta) => {
      const item = nuevoInventario.maltas.find((m) => m.nombre === malta.tipo);
      if (item) {
        item.stock -= malta.cantidad * cantidadProduccion;
      }
    });

    // Reducir lúpulos
    recetaSeleccionada.lupulos.forEach((lupulo) => {
      const item = nuevoInventario.lupulos.find(
        (l) => l.nombre === lupulo.tipo
      );
      if (item) {
        item.stock -= lupulo.cantidad * cantidadProduccion;
      }
    });

    // Reducir levadura
    const levadura = nuevoInventario.levaduras.find(
      (l) => l.nombre === recetaSeleccionada.levadura.tipo
    );
    if (levadura) {
      levadura.stock -=
        recetaSeleccionada.levadura.cantidad * cantidadProduccion;
    }

    setInventario(nuevoInventario);
    setMostrarModal(false);
    alert(
      `¡Producción de ${cantidadProduccion} lote(s) de ${recetaSeleccionada.nombre} completada!`
    );
  };

  return (
    <div className="space-y-6 p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">
        Bienvenido al Recetario
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700 mb-6">
          Selecciona una receta para producir. El sistema verificará
          automáticamente si tienes los ingredientes necesarios en tu
          inventario.
        </p>

        <div className="grid grid-cols-1 gap-6">
          {recetas.map((receta) => (
            <TarjetaReceta
              key={receta.id}
              receta={receta}
              inventario={inventario}
              onProducir={manejarProduccion}
            />
          ))}
        </div>
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && recetaSeleccionada && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirmar producción</h3>
            <p className="mb-2">
              Receta: <strong>{recetaSeleccionada.nombre}</strong>
            </p>

            <div className="mb-4">
              <label
                htmlFor="cantidad-lotes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cantidad de lotes a producir:
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() =>
                    setCantidadProduccion(Math.max(1, cantidadProduccion - 1))
                  }
                  className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300 transition-colors"
                  aria-label="Reducir cantidad"
                >
                  <FiMinus />
                </button>
                <input
                  id="cantidad-lotes"
                  type="number"
                  min="1"
                  value={cantidadProduccion}
                  onChange={(e) =>
                    setCantidadProduccion(Math.max(1, Number(e.target.value)))
                  }
                  className="border-t border-b border-gray-300 px-3 py-1 w-16 text-center"
                  aria-labelledby="cantidad-lotes-label"
                />
                <button
                  type="button"
                  onClick={() => setCantidadProduccion(cantidadProduccion + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-colors"
                  aria-label="Aumentar cantidad"
                >
                  <FiPlus />
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
              <p className="text-yellow-700 text-sm">
                Al confirmar, se descontarán los ingredientes necesarios de tu
                inventario.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarProduccion}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Confirmar Producción
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recetas;
