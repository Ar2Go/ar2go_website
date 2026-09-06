"use client";

import Image from "next/image";
import { useState } from "react";
import { CtaButton } from "@/components/analytics/CtaButton";
import { nav } from "@/content/nav";

// Nav flotante de la home (maqueta 2026-09-06). Solo el toggle móvil necesita
// JS — el resto son anclas a la misma página, servidas como enlaces
// normales.
export function HomeNav() {
  const [abierto, setAbierto] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto flex w-full max-w-[1240px] items-center gap-2 rounded-btn border border-linea/10 bg-fondo/60 px-3 py-2 backdrop-blur-md">
        <a href="#inicio" aria-label="AR2GO, inicio" className="mr-auto inline-flex items-center">
          <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} className="h-6 w-auto" />
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[7px] px-3 py-1.5 text-xs text-gris transition-colors hover:bg-niebla/[0.08] hover:text-niebla"
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.iniciarSesion.href}
            className="ml-1 border-l border-linea/20 py-1.5 pl-4 text-xs text-gris transition-colors hover:text-niebla"
          >
            {nav.iniciarSesion.label}
          </a>
        </div>

        <CtaButton
          href={nav.crearCuenta.href}
          section="nav"
          label={nav.crearCuenta.label}
          variant="primary"
          className="!rounded-[9px] !px-4 !py-2 !text-xs"
        />

        <button
          type="button"
          aria-expanded={abierto}
          aria-controls="nav-links-movil"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((valor) => !valor)}
          className="ml-1 rounded-[9px] border border-linea/10 bg-fondo/50 p-2.5 text-niebla md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" className="h-[18px] w-[18px]">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {abierto && (
        <div
          id="nav-links-movil"
          className="mx-auto mt-2 flex w-full max-w-[1240px] flex-col gap-1 rounded-btn border border-linea/10 bg-fondo/95 p-2 md:hidden"
        >
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setAbierto(false)}
              className="rounded-[8px] px-3 py-2.5 text-sm text-gris hover:text-niebla"
            >
              {link.label}
            </a>
          ))}
          <a
            href={nav.iniciarSesion.href}
            onClick={() => setAbierto(false)}
            className="mt-1 border-t border-linea/10 px-3 pt-3 text-sm text-niebla"
          >
            {nav.iniciarSesion.label}
          </a>
        </div>
      )}
    </nav>
  );
}
