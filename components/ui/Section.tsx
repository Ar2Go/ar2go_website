import type { ReactNode } from "react";

type SectionBackground = "papel" | "neutro" | "tinta";

type SectionProps = {
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  id?: string;
};

// Separación entre secciones por cambio de fondo, nunca por sombra
// (docs/brand.md §2 y §5). No combinar con línea divisoria a la vez.
const BACKGROUND_CLASSES: Record<SectionBackground, string> = {
  papel: "bg-papel text-tinta",
  neutro: "bg-neutro text-tinta",
  tinta: "bg-tinta text-papel",
};

export function Section({
  background = "papel",
  className = "",
  children,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${BACKGROUND_CLASSES[background]} ${className}`.trim()}
    >
      {/* Contenedor y ritmo vertical: docs/brand.md §5. */}
      <div className="mx-auto w-full max-w-[1080px] px-5 py-16 md:px-8 md:py-24">
        {children}
      </div>
    </section>
  );
}
