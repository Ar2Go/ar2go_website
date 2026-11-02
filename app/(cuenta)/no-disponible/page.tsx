import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cuenta } from "@/content/cuenta";

export const metadata: Metadata = {
  title: "No disponible",
  robots: { index: false, follow: false },
};

// A dónde llega quien intenta abrir una cuenta con un correo o dominio bloqueado en Seguridad
// (/admin). Su usuario ya se borró de Clerk, así que no lleva nada de la cuenta: la foto de
// /cuenta, el mensaje y el regreso al inicio. Pública: el middleware solo protege /cuenta.
export default function NoDisponiblePage() {
  const t = cuenta.noDisponible;
  return (
    <main className="no-disponible">
      <Image src="/acceso/landing.webp" alt="" aria-hidden="true" fill priority sizes="100vw" className="no-disponible__foto" />
      <div className="no-disponible__velo" aria-hidden="true" />
      <div className="no-disponible__contenido">
        <h1>{t.titulo}</h1>
        <Link href="/" className="btn btn--primary">
          {t.regresar}
        </Link>
      </div>
    </main>
  );
}
