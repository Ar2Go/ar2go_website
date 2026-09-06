// Escala tipográfica de docs/brand.md §4, como clases de Tailwind
// reutilizables. Un solo lugar para no repetir los mismos valores arbitrarios
// en cada sección — y para que un cambio de escala sea un archivo, no una
// búsqueda y reemplazo por todo components/sections/.
export const tipografia = {
  // Light (300) en display/h2 — igual que la maqueta aprobada de home
  // (docs/brand.md v3): el peso ligero es lo que distingue esta escala de
  // la anterior (que usaba bold ahí).
  display:
    "font-sans font-light text-[clamp(2.6rem,6.2vw,5.2rem)] leading-[1.04] tracking-[-0.035em]",
  h2: "font-sans font-light text-[clamp(1.95rem,3.7vw,3rem)] leading-[1.04] tracking-[-0.035em]",
  h3: "font-sans font-medium text-[1.2rem] leading-[1.3] tracking-[-0.015em]",
  cuerpo: "font-sans text-[1.0625rem] leading-[1.6]",
  cuerpoChico: "font-sans text-[0.9375rem] leading-[1.5]",
  eyebrow:
    "font-mono font-semibold uppercase text-[0.6875rem] leading-none tracking-[0.18em] text-gris",
  precio: "font-mono font-semibold text-[2rem] leading-none tracking-[-0.02em]",
  dato: "font-mono text-[0.6875rem] leading-[1.4] tracking-[0.05em]",
} as const;

// Medida máxima de línea, sin excepción (docs/brand.md §4).
export const medidaMaxima = "max-w-[68ch]";
