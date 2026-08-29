// Mismos tokens que app/globals.css, exportados para JS/TS: og:image,
// metadatos de tema, y cualquier SVG generado en runtime. Fuente única de
// verdad: docs/brand.md §3. Si diverge de globals.css, es bug.
export const brand = {
  tinta: "#101418",
  acento: "#0B8F4F",
  acentoAlt: "#0A7D48",
  gris: "#6B7076",
  linea: "#E3E1DD",
  neutro: "#F4F3F1",
  papel: "#FFFFFF",
} as const;
