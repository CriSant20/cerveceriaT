export interface Receta {
  id: number;
  nombre: string;
  maltas: Ingrediente[];
  lupulos: Ingrediente[];
  levaduras: Ingrediente[];
  // Existing properties
  estilo?: string;
  ibu?: number;
  abv?: number;
  volumen?: number;
  // New properties
  instrucciones?: string;    // Make optional if not all recipes have it
  descripcion?: string;      // Make optional if not all recipes have it
}

export interface Ingrediente {
  nombre: string;
  cantidad: number;
}