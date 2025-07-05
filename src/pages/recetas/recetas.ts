import { Receta } from "../../interfaces/Sidebar/Tcerveza.interface"

export const recetas: Receta[] = [
  {
    id: 1,
    nombre: "Abadía Ámbar",
    maltas: [
      { nombre: "Pilsen", cantidad: 67.5 },
      { nombre: "Munich", cantidad: 33.5 },
      { nombre: "Abbey", cantidad: 6.5 },
      { nombre: "Cara Ruby", cantidad: 4.5 },
    ],
    lupulos: [
      { nombre: "Saaz", cantidad: 0.9 },
      { nombre: "Hallertauer Mittelfruh", cantidad: 0.7 },
    ],
    levaduras: [
      { nombre: "Safale S-33", cantidad: 0.4 },
    ]
  },
  {
    id: 2,
    nombre: "Triple Blond",
    maltas: [
      { nombre: "Pilsen", cantidad: 120 },
      { nombre: "Cara Blond", cantidad: 15 },
      { nombre: "Cara Clair", cantidad: 7.5 },
      { nombre: "Wheat Blanc", cantidad: 7.5 },
    ],
    lupulos: [
      { nombre: "Perle", cantidad: 0.4 },
      { nombre: "Polaris", cantidad: 0.18 },
      { nombre: "Cascade", cantidad: 0.5 },
      { nombre: "Mosaico", cantidad: 0.4 },
    ],
    levaduras: [
      { nombre: "Safale", cantidad: 0.35 },
      { nombre: "BE-256", cantidad: 0.35 },
    ]
  },
  {
    id: 3,
    nombre: "Cerveza Scotch",
    maltas: [
      { nombre: "Pilsen", cantidad: 59.5 },
      { nombre: "Cebada tostada", cantidad: 1.5 },
      { nombre: "Wheat Blanc", cantidad: 5 },
      { nombre: "Peated", cantidad: 4 },
    ],
    lupulos: [
      { nombre: "Golding", cantidad: 0.5 },
      { nombre: "Fuggle", cantidad: 0.5 },
    ],
    levaduras: [
      { nombre: "Safale S-33", cantidad: 0.35 },
    ]
  }
]
