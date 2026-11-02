"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cerrarSesionAccion } from "@/app/admin/acciones";
import { admin } from "@/content/admin";
import { Icono, type NombreIcono } from "./Icono";

type Props = { operador: string; pendientes: number | null };

const NAV: { href: string; etiqueta: string; icono: NombreIcono; exacta?: boolean; conteo?: boolean }[] = [
  { href: "/admin", etiqueta: admin.menu.clientes, icono: "maletin", exacta: true },
  { href: "/admin/pendientes", etiqueta: admin.menu.pendientes, icono: "reloj", conteo: true },
  { href: "/admin/sin-empresa", etiqueta: admin.menu.sinEmpresa, icono: "persona" },
  { href: "/admin/seguridad", etiqueta: admin.menu.seguridad, icono: "escudo" },
];

// "h.gonzja@gmail.com" → "HG": de la parte antes de la arroba, una letra por segmento.
const iniciales = (correo: string) =>
  correo
    .split("@")[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join("");

const activa = (ruta: string, href: string, exacta?: boolean) =>
  exacta ? ruta === href : ruta === href || ruta.startsWith(`${href}/`);

// Barra lateral de /admin, como la del panel de Horiq: marca, equipo, menú y quién opera.
// En el celular se vuelve una barra superior con el menú desplegable.
export function MenuAdmin({ operador, pendientes }: Props) {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  useEffect(() => setAbierto(false), [ruta]);
  // El detalle de una empresa sigue marcando "Clientes".
  const rutaMenu = ruta.startsWith("/admin/empresas/") ? "/admin" : ruta;

  return (
    <aside className="panel-aside" data-menu-abierto={abierto}>
      <div className="panel-marca">
        <Link href="/" aria-label="AR2GO, ir al sitio" style={{ display: "flex" }}>
          <Image
            src="/brand/ar2go-logotipo-2026-claro.png"
            alt="AR2GO"
            width={110}
            height={26}
            priority
            style={{ height: 26, width: "auto" }}
          />
        </Link>
        <button
          type="button"
          className="btn btn-sm panel-menu-boton"
          aria-expanded={abierto}
          aria-controls="admin-nav"
          onClick={() => setAbierto(!abierto)}
        >
          <Icono nombre={abierto ? "cerrar" : "menu"} tamano={18} />
          {admin.menu.boton}
        </button>
      </div>
      <div className="panel-equipo">
        <b style={{ fontSize: 14 }}>{admin.menu.equipo}</b>
        <span className="muted" style={{ fontSize: 12.5 }}>
          {admin.eyebrow}
        </span>
      </div>
      <nav className="panel-nav" id="admin-nav">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} className={activa(rutaMenu, n.href, n.exacta) ? "activo" : ""}>
            <Icono nombre={n.icono} />
            {n.etiqueta}
            {n.conteo && !!pendientes && (
              <span className="badge solido" aria-label={`${pendientes} ${admin.menu.porConfirmar}`}>
                {pendientes}
              </span>
            )}
          </Link>
        ))}
        {/* En el celular no se ve el pie con quién opera: cerrar sesión va en el menú. */}
        <form action={cerrarSesionAccion} className="solo-celular">
          <button type="submit">
            <Icono nombre="salir" />
            {admin.cerrarSesion}
          </button>
        </form>
      </nav>
      <div className="panel-usuario">
        <span className="avatar">{iniciales(operador)}</span>
        <span className="stack grow" style={{ ["--gap" as string]: "2px" }}>
          <span
            title={operador}
            style={{
              fontSize: 13.5,
              fontWeight: 500,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {operador}
          </span>
          <span className="muted" style={{ fontSize: 12.5 }}>
            {admin.menu.rol}
          </span>
        </span>
        <form action={cerrarSesionAccion}>
          <button type="submit" className="icon-btn" aria-label={admin.cerrarSesion} title={admin.cerrarSesion}>
            <Icono nombre="salir" />
          </button>
        </form>
      </div>
    </aside>
  );
}
