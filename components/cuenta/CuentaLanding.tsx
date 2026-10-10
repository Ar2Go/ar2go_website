import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { cuenta } from "@/content/cuenta";

type Props = {
  eyebrow: string;
  titulo: string;
  apoyo: string;
  children: React.ReactNode;
};

// Marco de /cuenta para quien ya inició sesión: foto a sangre con el nav
// (logotipo + cerrar sesión) arriba y el contenido centrado encima de la
// foto. Es la portada que trajo #19; adentro va lo que toque según el
// estado de la cuenta (cascarón, alta de empresa o productos).
//
// La foto es la del hero de la home (public/home/), misma familia de
// fiordos con licencia Pexels (CLAUDE.md §3).
export function CuentaLanding({ eyebrow, titulo, apoyo, children }: Props) {
  const t = cuenta.landing;
  return (
    <div className="ar-cuenta ar-cuenta--landing">
      <nav className="landing__nav" aria-label={t.nav}>
        <div className="landing__nav-inner">
          <Link href="/" className="landing__logo" aria-label={t.inicio}>
            <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} />
          </Link>

          <div className="landing__menu">
            <SignOutButton redirectUrl="/">
              <button type="button" className="landing__signout">
                {cuenta.panel.cerrarSesion}
              </button>
            </SignOutButton>
          </div>
        </div>
      </nav>

      <main className="landing__hero">
        <Image
          src="/home/hero.webp"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="landing__image"
        />
        <div className="landing__overlay" aria-hidden="true" />
        <div className="landing__welcome">
          <p className="landing__eyebrow">{eyebrow}</p>
          <h1>{titulo}</h1>
          <p className="landing__apoyo">{apoyo}</p>
          <div className="landing__contenido">{children}</div>
        </div>
      </main>
    </div>
  );
}
