import type { Metadata } from "next";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { CuentaSplit } from "@/components/layout/CuentaSplit";
import { cuenta } from "@/content/cuenta";

export const metadata: Metadata = {
  title: "Tu cuenta",
  robots: { index: false, follow: false },
};

// Cascarón honesto, mismo criterio que /admin (CLAUDE.md §11): la consola
// donde el cliente configura sus agentes vive en ar2go-platform y todavía no
// existe, así que esta página lo dice en vez de simular un tablero. Aquí
// aterriza el usuario después de crear su cuenta o iniciar sesión.
export default async function CuentaPage() {
  const usuario = await currentUser();
  const correo = usuario?.primaryEmailAddress?.emailAddress ?? null;

  return (
    <CuentaSplit
      eyebrow={cuenta.panel.eyebrow}
      titulo={cuenta.panel.titulo}
      apoyo={cuenta.panel.apoyo}
    >
      {correo && <p className="cuenta__correo">{correo}</p>}

      <div className="cuenta__acciones">
        <Link href={cuenta.panel.volver.href} className="btn btn--primary">
          {cuenta.panel.volver.label}
        </Link>
        <SignOutButton redirectUrl="/">
          <button type="button" className="btn btn--ghost">
            {cuenta.panel.cerrarSesion}
          </button>
        </SignOutButton>
      </div>
    </CuentaSplit>
  );
}
