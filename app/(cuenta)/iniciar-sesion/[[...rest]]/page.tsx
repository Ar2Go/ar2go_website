import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { CuentaSplit } from "@/components/layout/CuentaSplit";
import { cuenta } from "@/content/cuenta";

// noindex: la página de alta (/crear-cuenta) es la que interesa en buscadores;
// esta existe para quien ya tiene cuenta y para el enlace "¿Ya tienes cuenta?"
// del formulario de registro.
export const metadata: Metadata = {
  title: "Iniciar sesión",
  robots: { index: false, follow: false },
};

export default function IniciarSesionPage() {
  return (
    <CuentaSplit
      eyebrow={cuenta.iniciar.eyebrow}
      titulo={cuenta.iniciar.titulo}
      apoyo={cuenta.iniciar.apoyo}
    >
      <SignIn path="/iniciar-sesion" signUpUrl="/crear-cuenta" fallbackRedirectUrl="/cuenta" />
    </CuentaSplit>
  );
}
