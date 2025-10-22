import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

type Ingrediente = {
  id: number;
  nombre: string;
  cantidad: number;
};

type Receta = {
  id: number;
  nombre: string;
  maltas: Ingrediente[];
  lupulos: Ingrediente[];
  levaduras: Ingrediente[];
};
//@ts-ignore
const [recetas, setRecetas] = useState<Receta[]>([]);

useEffect(() => {
  const fetchRecetas = async () => {
    try {
      const response = await axios.get(`${API_URL}/recetas-con-ingredientes/`);
      const data = response.data;
    console.log("RECETAS API:", data);
      const mapped: Receta[] = data.map((receta: any) => {
        const tipos = receta.tipos || [];

        const ingredientesPorTipo: {
          maltas: Ingrediente[];
          lupulos: Ingrediente[];
          levaduras: Ingrediente[];
        } = {
          maltas: [],
          lupulos: [],
          levaduras: [],
        };

        tipos.forEach((tipo: any) => {
          const key = tipo.nombre_tipo.toLowerCase();
          if (key === "maltas" || key === "lúpulos" || key === "levaduras") {
            const tipoKey: "maltas" | "lupulos" | "levaduras" = key === "lúpulos" ? "lupulos" : key;
            ingredientesPorTipo[tipoKey] = tipo.ingredientes.map((ing: any) => ({
              nombre: ing.nombre_ingrediente,
              cantidad: ing.stock,
            }));
          }
        });

        return {
          id: receta.id,
          nombre: receta.nombre,
          ...ingredientesPorTipo,
        };
      });

      setRecetas(mapped);
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    }
  };

  fetchRecetas();
}, []);
