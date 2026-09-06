"use client";

import { track } from "@vercel/analytics";
import Link from "next/link";
import type { ReactNode } from "react";

type HomeCtaLinkProps = {
  href: string;
  section: string;
  label: string;
  className: string;
  icon?: boolean;
  children?: ReactNode;
};

function isExternalHref(href: string): boolean {
  return (
    /^https?:\/\//.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href === "#"
  );
}

// CTA de la home con las clases exactas de la maqueta (.btn, .btn--primary,
// etc. — ver app/home.css), pero registrando el clic como cualquier otro CTA
// del sitio (CLAUDE.md §5: "un evento propio por clic en cada CTA"). No usa
// components/ui/Button.tsx: esa variante genera clases de Tailwind, y aquí
// necesitamos las clases literales de la maqueta para que el CSS de
// app/home.css aplique.
export function HomeCtaLink({ href, section, label, className, icon, children }: HomeCtaLinkProps) {
  const contenido = (
    <>
      {label}
      {icon && (
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 8h11M9 4l4 4-4 4" />
        </svg>
      )}
      {children}
    </>
  );

  const onClick = () => track("cta_click", { section, label });

  if (isExternalHref(href)) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {contenido}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {contenido}
    </Link>
  );
}
