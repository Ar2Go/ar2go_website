import type { ReactNode } from "react";

type SectionBackground = "fondo" | "superficie";

type SectionProps = {
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  id?: string;
};

// Separación entre secciones por cambio de fondo, nunca por sombra
// (docs/brand.md). No combinar con línea divisoria a la vez. Sistema oscuro
// de un solo tema: "fondo" es el fondo base de página, "superficie" es la
// franja/tarjeta secundaria — ya no hay una variante clara ("papel").
const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  fondo: "bg-fondo text-niebla",
  superficie: "bg-superficie text-niebla",
};

export function Section({
  background = "fondo",
  className = "",
  children,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${BACKGROUND_CLASSES[background]} ${className}`.trim()}
    >
      {/* Contenedor y ritmo vertical: docs/brand.md. */}
      <div className="mx-auto w-full max-w-[1080px] px-5 py-16 md:px-8 md:py-24">
        {children}
      </div>
    </section>
  );
}
