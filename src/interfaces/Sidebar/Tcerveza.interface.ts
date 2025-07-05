// En tu archivo de interfaces (Tcerveza.interface.ts)
export interface Receta {
  id: number;
  nombre: string;
  estilo: string;
  descripcion?: string;
  instrucciones?: string;
  ibu: number;
  abv: number;
  volumen: number;
  maltas: Ingrediente[];
  lupulos: Ingrediente[];
  levaduras: Ingrediente[];
}

export interface Ingrediente {
  nombre: string;
  cantidad: number;
}