import type { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

// docs/brand.md §6: borde línea, radio card, sin sombra ni hover elevado.
// Si necesita destacar, el llamador cambia el fondo a neutro, no agrega sombra.
export function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-card border border-linea bg-papel p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
