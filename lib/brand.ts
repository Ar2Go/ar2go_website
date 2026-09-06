// Mismos tokens que app/globals.css, exportados para JS/TS: og:image,
// metadatos de tema, y cualquier SVG generado en runtime. Fuente única de
// verdad: docs/brand.md. Si diverge de globals.css, es bug.
export const brand = {
  fondo: "#0B0F19",
  superficie: "#121826",
  superficieAlta: "#161D2E",
  azul: "#2563EB",
  azulClaro: "#3B76F6",
  azulSuave: "#7CA4FA",
  niebla: "#E6E9EF",
  gris: "#A0A7B4",
  papel: "#FFFFFF",
  linea: "#E6E9EF",
  error: "#F87171",
  exito: "#34D399",
} as const;
