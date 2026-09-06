"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { nav } from "@/content/nav";

// Nav flotante de la home — misma lógica que el <script> de la maqueta:
// (1) el toggle móvil abre/cierra nav__links vía nav__inner[data-open];
// (2) un IntersectionObserver sobre el hero pone nav[data-stuck] cuando el
// hero deja de estar casi completo en pantalla, para que la píldora se
// funda en una barra sólida (ver .nav[data-stuck] en app/home.css).
export function HomeNav() {
  const [abierto, setAbierto] = useState(false);
  const [pegado, setPegado] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    if (!hero || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entradas) => setPegado(entradas[0].intersectionRatio < 0.12),
      { threshold: [0, 0.12, 1] },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav" ref={navRef} {...(pegado ? { "data-stuck": "" } : {})}>
      <div className="nav__inner" {...(abierto ? { "data-open": "" } : {})}>
        <a className="nav__logo" href="#inicio" aria-label="AR2GO, inicio">
          <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} />
        </a>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={abierto}
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setAbierto((valor) => !valor)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div className="nav__links">
          {nav.links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setAbierto(false)}>
              {link.label}
            </a>
          ))}
          <a className="nav__signin" href={nav.iniciarSesion.href} onClick={() => setAbierto(false)}>
            {nav.iniciarSesion.label}
          </a>
        </div>

        <div className="nav__actions">
          <HomeCtaLink
            href={nav.crearCuenta.href}
            section="nav"
            label={nav.crearCuenta.label}
            className="btn btn--primary"
          />
        </div>
      </div>
    </nav>
  );
}
