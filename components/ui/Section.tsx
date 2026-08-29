import type { ReactNode } from "react";

type SectionBackground = "papel" | "neutro" | "tinta";

type SectionProps = {
  background?: SectionBackground;
  className?: string;
  children: ReactNode;
  id?: string;
};

// Separación entre secciones por cambio de fondo, nunca por sombra (CLAUDE.md §7).
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
      <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-24">
        {children}
      </div>
    </section>
  );
}
