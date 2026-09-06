import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

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

// docs/brand.md: radio de botón (8px), padding 12px/20px, peso 500, sin
// sombra.
const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded-btn px-5 py-3 text-base font-medium transition-colors duration-[120ms] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul disabled:pointer-events-none disabled:opacity-50";

// El azul identifica el CTA primario — aparece una sola vez por pantalla
// visible. Blanco sobre azul da 5.17:1 (AA, docs/brand.md). El secundario
// usa azul-suave (una variante más clara del azul de marca) en vez del azul
// base: el azul base como texto sobre --color-fondo da 3.71:1, no pasa AA de
// texto normal (4.5:1) — azul-suave da 5.21:1.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-azul text-papel hover:bg-azul-claro",
  secondary:
    "border border-azul-suave/50 text-azul-suave hover:border-azul hover:bg-azul/[0.14] hover:text-papel",
  ghost:
    "border border-linea/20 bg-fondo/35 text-niebla hover:border-linea/40 hover:bg-linea/10",
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
