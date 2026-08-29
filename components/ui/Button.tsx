import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// docs/brand.md §6: radio base, padding 12px/20px, peso 500, sin sombra.
const BASE_CLASSES =
  "inline-flex items-center justify-center rounded-base px-5 py-3 text-base font-medium transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta disabled:pointer-events-none disabled:opacity-50";

// El marino identifica el CTA primario. Regla de marca (docs/brand.md §2):
// aparece una sola vez por pantalla visible — nunca dos botones "primary" a
// la vez. Papel sobre marino da 11.9:1 (AAA, docs/brand.md §10) y el hover
// (marino-alt) sube a 14.8:1 — ninguno de los dos estados es un compromiso.
//
// Ojo: marino y tinta nunca se tocan (1.55:1, prohibido explícitamente en
// docs/brand.md §3 y §10). Este botón nunca debe usarse con texto tinta
// sobre fondo marino ni viceversa. Sobre una Section de fondo tinta, el CTA
// primario no usa esta variante — ver components/sections/Cierre.tsx.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-marino text-papel hover:bg-marino-alt",
  secondary: "border border-tinta text-tinta hover:bg-tinta hover:text-papel",
};

function isExternalHref(href: string): boolean {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if (props.href) {
    const { href, ...anchorProps } = props;
    if (isExternalHref(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  const { type, ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
