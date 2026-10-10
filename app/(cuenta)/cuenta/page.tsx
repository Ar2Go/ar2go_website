import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Horiq Agentes",
  robots: { index: false, follow: false },
};

export default function CuentaPage() {
  return (
    <div className="ar-cuenta ar-cuenta--landing">
      <nav className="landing__nav" aria-label="Navegación principal">
        <div className="landing__nav-inner">
          <Link href="/" className="landing__logo" aria-label="AR2GO, inicio">
            <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} />
          </Link>

          <div className="landing__menu">
            <a href="#bienvenido">Horiq</a>
            <SignOutButton redirectUrl="/">
              <button type="button" className="landing__signout">
                Cerrar sesión
              </button>
            </SignOutButton>
          </div>
        </div>
      </nav>

      <main className="landing__hero" id="bienvenido">
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
          <h1>Bienvenido</h1>
        </div>
      </main>
    </div>
  );
}
