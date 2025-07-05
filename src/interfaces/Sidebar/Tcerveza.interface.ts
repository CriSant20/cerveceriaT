export interface Receta {
  id: number;
  nombre: string;
  maltas: Ingrediente[];
  lupulos: Ingrediente[];
  levaduras: Ingrediente[];
  estilo?: string;    // Made optional
  ibu?: number;       // Made optional
  abv?: number;       // Made optional
  volumen?: number;   // Made optional
}

interface Ingrediente {
  nombre: string;
  cantidad: number;
}