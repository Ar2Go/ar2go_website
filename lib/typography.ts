// Escala tipográfica de docs/brand.md §4, como clases de Tailwind
// reutilizables. Un solo lugar para no repetir los mismos valores arbitrarios
// en cada sección — y para que un cambio de escala sea un archivo, no una
// búsqueda y reemplazo por todo components/sections/.
export const tipografia = {
  display:
    "font-sans font-bold text-[clamp(2.25rem,6vw,4rem)] leading-[1.02] tracking-[-0.03em]",
  h2: "font-sans font-bold text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.08] tracking-[-0.02em]",
  h3: "font-sans font-medium text-[1.25rem] leading-[1.2] tracking-[-0.01em]",
  cuerpo: "font-sans text-[1.0625rem] leading-[1.55]",
  cuerpoChico: "font-sans text-[0.9375rem] leading-[1.5]",
  eyebrow:
    "font-mono font-semibold uppercase text-[0.6875rem] leading-none tracking-[0.18em] text-gris",
  precio: "font-mono font-semibold text-[2rem] leading-none tracking-[-0.02em]",
  dato: "font-mono text-[0.6875rem] leading-[1.4] tracking-[0.05em]",
} as const;

// Medida máxima de línea, sin excepción (docs/brand.md §4).
export const medidaMaxima = "max-w-[68ch]";
