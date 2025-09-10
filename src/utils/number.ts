const DECIMALS = 3;

export const roundTo = (value: number, decimals = DECIMALS) => {
  const f = Math.pow(10, decimals);
  return Math.round((value + Number.EPSILON) * f) / f;
};

export const formatFixed = (value: number, decimals = DECIMALS) => {
  // Muestra SIEMPRE con decimales fijos (p.ej. 10.000)
  return value.toLocaleString("es-EC", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};
