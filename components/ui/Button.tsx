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

// El acento identifica el CTA primario. Regla de marca (docs/brand.md §2):
// aparece una sola vez por pantalla visible — nunca dos botones "primary" a
// la vez. Texto blanco tal como pide la guía: papel sobre acento da 4.15:1
// (AA texto grande/elementos gráficos, ya verificado en docs/brand.md §10) y
// el hover (acento-alt) sube a 5.2:1 — a diferencia de la paleta anterior,
// aquí el hover no empeora el contraste.
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-acento text-papel hover:bg-acento-alt",
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
