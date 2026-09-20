import type { Metadata } from "next";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { CuentaSplit } from "@/components/layout/CuentaSplit";
import { cuenta } from "@/content/cuenta";

export const metadata: Metadata = {
  title: "Crear cuenta",
  description: cuenta.crear.apoyo,
  alternates: { canonical: "/crear-cuenta" },
};

// Ruta catch-all ([[...rest]]) porque Clerk monta sus pasos intermedios
// (verificación de correo, callback de Google) como subrutas de esta misma
// página con path routing — ver path="/crear-cuenta" abajo.
export default function CrearCuentaPage() {
  return (
    <CuentaSplit
      eyebrow={cuenta.crear.eyebrow}
      titulo={cuenta.crear.titulo}
      apoyo={cuenta.crear.apoyo}
    >
      <SignUp path="/crear-cuenta" signInUrl="/iniciar-sesion" fallbackRedirectUrl="/cuenta" />

      <p className="cuenta__legal">
        {cuenta.legal.prefijo} <Link href={cuenta.legal.terminos.href}>{cuenta.legal.terminos.label}</Link>{" "}
        {cuenta.legal.union} <Link href={cuenta.legal.aviso.href}>{cuenta.legal.aviso.label}</Link>.
      </p>
    </CuentaSplit>
  );
}
