import type { ReactNode } from "react";

type CardProps = {
  className?: string;
  children: ReactNode;
};

// docs/brand.md: superficie secundaria, borde línea al 10% (hairline sobre
// fondo oscuro), radio de tarjeta (16px), sin sombra ni hover elevado.
export function Card({ className = "", children }: CardProps) {
  return (
    <div
      className={`rounded-card border border-linea/10 bg-superficie p-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
