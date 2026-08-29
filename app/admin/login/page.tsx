import type { Metadata } from "next";
import { signIn } from "@/auth";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { tipografia } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Acceso admin",
  robots: { index: false, follow: false },
};

const MENSAJES_ERROR: Record<string, string> = {
  AccessDenied: "Esa cuenta de Google no tiene acceso a este panel.",
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const mensajeError = error ? (MENSAJES_ERROR[error] ?? "No se pudo iniciar sesión.") : null;

  return (
    <Section background="neutro" className="flex min-h-[60vh] items-center">
      <div className="mx-auto w-full max-w-sm rounded-base border border-linea bg-papel p-8 text-center">
        <p className={tipografia.eyebrow}>Acceso restringido</p>
        <h1 className={`mt-2 ${tipografia.h3}`}>Panel de administración</h1>
        <p className={`mt-3 ${tipografia.cuerpoChico} text-gris`}>
          Solo cuentas de Google autorizadas pueden entrar.
        </p>

        {mensajeError && (
          <p
            role="alert"
            className={`mt-4 rounded-base border border-error/40 bg-error/5 p-3 ${tipografia.cuerpoChico} text-error`}
          >
            {mensajeError}
          </p>
        )}

        <form
          className="mt-6"
          action={async () => {
            "use server";
            await signIn("google", { redirectTo: "/admin" });
          }}
        >
          <Button type="submit" variant="primary" className="w-full">
            Iniciar sesión con Google
          </Button>
        </form>
      </div>
    </Section>
  );
}
