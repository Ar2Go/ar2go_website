import Image from "next/image";
import Link from "next/link";
import { cuenta } from "@/content/cuenta";
import { CuentaEncabezado } from "@/components/cuenta/CuentaEncabezado";
import { Anuncio } from "@/components/cuenta/Anuncio";

type Props = {
  // Titular de la columna. Sin titulo (cascarón sin plano de control) no se
  // ve nada; queda un h1 solo para lectores de pantalla.
  eyebrow?: string;
  titulo?: string;
  apoyo?: string;
  // Tarjeta bajo el titular (correo, avisos, alta de empresa).
  children?: React.ReactNode;
  // Debajo de la tarjeta, la cinta de argonautas.
  cinta?: React.ReactNode;
  // Plan y nombre de la empresa, para la tarjeta del usuario del encabezado.
  plan?: string | null;
  empresa?: string | null;
  // Aviso que sale al entrar, con botón de cerrar (no queda fijo).
  anuncio?: string;
  // Columna ancha, para el perfil de Clerk de /cuenta/configuracion.
  ancho?: boolean;
};

// Marco de /cuenta para quien ya inició sesión: pantalla partida con la foto
// a la izquierda (logotipo, lema de la cuenta y pie) y, a la derecha, sobre
// fondo blanco: el aviso de entrada si lo hay (se puede cerrar), el
// encabezado de la cuenta (persona, plan y opciones, siempre a la vista) y
// una sola columna con el titular, avisos o pasos pendientes y la cinta de
// argonautas. Nada flota encima del contenido.
//
// La foto es propia de esta pantalla (public/acceso/landing.webp), misma
// familia de fiordos y mismo tratamiento frío del resto del sitio
// (public/acceso/README.md, CLAUDE.md §3).
export function CuentaLanding({ eyebrow, titulo, apoyo, children, cinta, plan = null, empresa = null, anuncio, ancho = false }: Props) {
  const t = cuenta.landing;
  return (
    <div className={ancho ? "ar-cuenta ar-cuenta--landing ar-cuenta--ancha" : "ar-cuenta ar-cuenta--landing"}>
      <aside className="landing__foto">
        <Image
          src="/acceso/landing.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="(max-width: 767px) 100vw, 32vw"
          className="landing__image"
        />
        <div className="landing__overlay" aria-hidden="true" />
        <Link href="/" className="landing__logo" aria-label={t.inicio}>
          <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} />
        </Link>
        <div className="landing__lema">
          <p className="landing__lema-titulo">{t.lema}</p>
          <p className="landing__lema-apoyo">{t.lemaApoyo}</p>
        </div>
        <div className="landing__pie">
          <p>© {new Date().getFullYear()} AR2GO</p>
          <p className="landing__coords">
            {t.coordenadas.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </p>
        </div>
      </aside>

      <main className="landing__panel">
        {anuncio && <Anuncio id="consola" texto={anuncio} />}
        <CuentaEncabezado plan={plan} empresa={empresa} />

        <div className={ancho ? "landing__columna landing__columna--ancha" : "landing__columna"}>
          {titulo ? (
            <header className="landing__welcome">
              {eyebrow && <p className="landing__eyebrow">{eyebrow}</p>}
              <h1>{titulo}</h1>
              {apoyo && <p className="landing__apoyo">{apoyo}</p>}
            </header>
          ) : (
            <h1 className="sr-only">{cuenta.landing.menu.titulo}</h1>
          )}
          {children && <div className="landing__contenido">{children}</div>}
          {cinta}
        </div>
      </main>
    </div>
  );
}
