"use client";

import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/Button";

type CtaButtonProps = {
  href: string;
  section: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

// Envuelve Button para registrar de qué sección salió cada clic de CTA
// (CLAUDE.md §5: "un evento propio por clic en cada CTA"). El resto de la UI
// se queda del lado del servidor; este es el único punto con "use client".
export function CtaButton({
  href,
  section,
  label,
  variant = "primary",
  className,
}: CtaButtonProps) {
  return (
    <Button
      href={href}
      variant={variant}
      className={className}
      onClick={() => track("cta_click", { section, label })}
    >
      {label}
    </Button>
  );
}
