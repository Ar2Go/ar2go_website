import type { Metadata } from "next";
import Image from "next/image";
import { hayEntradaLocal, signIn } from "@/auth";

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

// Acceso a /admin con la tarjeta del acceso al panel de Horiq (horiq/src/panel/AdminLogin.tsx).
export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const mensajeError = error ? (MENSAJES_ERROR[error] ?? "No se pudo iniciar sesión.") : null;

  return (
    <div className="login-panel">
      <div className="card stack" style={{ ["--gap" as string]: "20px" }}>
        <Image
          src="/brand/ar2go-logotipo-2026-claro.png"
          alt="AR2GO"
          width={118}
          height={28}
          priority
          style={{ height: 28, width: "auto", alignSelf: "flex-start" }}
        />
        <div className="stack" style={{ ["--gap" as string]: "4px" }}>
          <h1 style={{ fontSize: 20 }}>Panel de administración</h1>
          <p className="muted">Solo cuentas de Google autorizadas pueden entrar.</p>
        </div>

        {mensajeError && (
          <div role="alert" className="aviso rojo">
            {mensajeError}
          </div>
        )}

        <div className="stack" style={{ ["--gap" as string]: "10px" }}>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <button type="submit" className="btn btn-primary btn-ancho">
              Iniciar sesión con Google
            </button>
          </form>

          {hayEntradaLocal && (
            <form
              action={async () => {
                "use server";
                await signIn("local", { redirectTo: "/admin" });
              }}
            >
              <button type="submit" className="btn btn-ancho">
                Entrar en local
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
