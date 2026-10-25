"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { cuenta } from "@/content/cuenta";

type Props = {
  // Nombre del plan y de la empresa; null si todavía no hay empresa o no hay
  // plano de control.
  plan?: string | null;
  empresa?: string | null;
};

// Encabezado de /cuenta: a la derecha la tarjeta del usuario (nombre de la
// empresa como línea principal, la persona debajo y el plan; nunca el correo).
// Al hacer clic se despliega el menú con configuración (/cuenta/configuracion:
// perfil, suscripción y seguridad) y cerrar sesión. Fuera de /cuenta, a la
// izquierda va el enlace para volver.
export function CuentaEncabezado({ plan = null, empresa = null }: Props) {
  const t = cuenta.landing.menu;
  const { user } = useUser();
  const { signOut } = useClerk();
  const enInicio = usePathname() === "/cuenta";
  const [abierto, setAbierto] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => {
      if (!raiz.current?.contains(e.target as Node)) setAbierto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbierto(false);
    };
    document.addEventListener("mousedown", fuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [abierto]);

  const persona = user?.fullName || user?.firstName || "";
  const principal = empresa || persona || t.titulo;
  const secundaria = empresa && persona ? persona : null;
  const inicial = (principal.trim()[0] ?? "A").toUpperCase();

  return (
    <header className="encabezado">
      {/* Solo sin la foto lateral (menos de 768 px, o de 1200 px en Configuración; ver cuenta.css). */}
      <Link href="/" className="encabezado__logo" aria-label={cuenta.landing.inicio}>
        <Image src="/brand/ar2go-logotipo-2026-claro.png" alt="AR2GO" width={1189} height={282} />
      </Link>
      <nav className="encabezado__opciones" aria-label={t.titulo}>
        {!enInicio && (
          <Link href="/cuenta" className="encabezado__opcion">
            <span aria-hidden="true">←</span> {t.volver}
          </Link>
        )}
      </nav>

      <div className="encabezado__cuenta" ref={raiz}>
        <button
          type="button"
          className="encabezado__usuario"
          aria-haspopup="menu"
          aria-expanded={abierto}
          onClick={() => setAbierto((v) => !v)}
        >
          {/* La imagen o logotipo que se sube en Configuración → Perfil (Clerk);
              sin imagen, la inicial. */}
          {user?.hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- URL de Clerk, ya optimizada por su CDN
            <img className="encabezado__avatar encabezado__avatar--imagen" src={user.imageUrl} alt="" />
          ) : (
            <span className="encabezado__avatar" aria-hidden="true">
              {inicial}
            </span>
          )}
          <span className="encabezado__datos">
            <span className="encabezado__nombre">{principal}</span>
            {secundaria && <span className="encabezado__persona">{secundaria}</span>}
          </span>
          {plan && (
            <span className="encabezado__plan">
              {t.plan} {plan}
            </span>
          )}
          <svg className="encabezado__flecha" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>

        {abierto && (
          <div className="encabezado__menu" role="menu">
            <Link
              href="/cuenta/configuracion"
              role="menuitem"
              className="encabezado__menu-opcion"
              onClick={() => setAbierto(false)}
            >
              {t.configuracion}
            </Link>
            <button
              type="button"
              role="menuitem"
              className="encabezado__menu-opcion encabezado__menu-opcion--salir"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              {cuenta.panel.cerrarSesion}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
