import Image from "next/image";
import Link from "next/link";
import { hero } from "@/content/hero";
import { cuenta } from "@/content/cuenta";

type Props = {
  eyebrow: string;
  titulo: string;
  apoyo: string;
  children: React.ReactNode;
};

// Pantalla partida de las páginas de cuenta: foto a sangre con el titular a
// la izquierda (misma composición que el hero de la home) y el formulario a
// la derecha. El titular vive aquí, no en el formulario, para no duplicar el
// encabezado que Clerk pone en cada paso.
//
// La foto (public/acceso/fiordo.webp) es la misma fotografía de fiordos con
// licencia Pexels del resto del sitio, con el mismo tratamiento frío de las
// demás (ver public/acceso/README.md) — regla de CLAUDE.md §3: nada de
// ilustración genérica de IA.
//
// Vive en public/acceso/ y no en public/cuenta/ a propósito: el matcher de
// middleware.ts protege "/cuenta/:path*", así que un archivo servido desde
// /cuenta/… se redirige a iniciar sesión y nunca carga.
export function CuentaSplit({ eyebrow, titulo, apoyo, children }: Props) {
  return (
    <>
      <aside className="cuenta__foto">
        <Image
          src="/acceso/fiordo.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 959px) 100vw, 55vw"
          className="cuenta__foto-img"
        />
        <p className="cuenta__eyebrow">{eyebrow}</p>
        <h1>{titulo}</h1>
        <p className="lede">{apoyo}</p>
        {/* Cifras confirmadas como reales (CLAUDE.md §1); las mismas del pie
            del hero, no un dato nuevo. */}
        <p className="cuenta__foto-pie">
          <b>{hero.pieAgentes}</b> {hero.pieAgentesEtiqueta} &nbsp;·&nbsp;{" "}
          <b>{hero.pieDisponibilidad}</b> {hero.pieDisponibilidadEtiqueta}
        </p>
      </aside>

      <main className="cuenta__panel">
        <div className="cuenta__panel-inner">{children}</div>
        <Link href="/" className="cuenta__volver">
          {cuenta.volverAlSitio}
        </Link>
      </main>
    </>
  );
}
