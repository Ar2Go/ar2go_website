// Mismos tokens que app/globals.css, exportados para JS/TS: og:image,
// metadatos de tema, y cualquier SVG generado en runtime. Fuente única de
// verdad: docs/brand.md §3. Si diverge de globals.css, es bug.
export const brand = {
  marino: "#10327A",
  marinoAlt: "#0B2559",
  tinta: "#101418",
  papel: "#FFFFFF",
  gris: "#6B7076",
  linea: "#E4E6E9",
  neutro: "#F4F5F7",
} as const;
