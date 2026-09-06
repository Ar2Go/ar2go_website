import type { Metadata } from "next";
import { auth, signOut } from "@/auth";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { medidaMaxima, tipografia } from "@/lib/typography";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

// Los cinco agentes de la fábrica (ver ar2go-platform/docs/factory.md §2).
// Listados aquí como referencia de lo que este panel va a administrar
// cuando exista una API real — no hay datos ni estado que mostrar todavía
// (ar2go-platform sigue en etapa 0, sin agentes construidos).
const AGENTES_FABRICA = [
  { nombre: "Especificador", produce: "proceso.yaml" },
  { nombre: "Configurador", produce: "config.yaml del cliente" },
  { nombre: "Constructor", produce: "plantilla nueva" },
  { nombre: "Adversario", produce: "banco de evals + veredicto" },
  { nombre: "Operador", produce: "despliegue + telemetría" },
] as const;

export default async function AdminPage() {
  const session = await auth();

  return (
    <>
      <Header />
      <Section background="fondo">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className={tipografia.eyebrow}>Panel de administración</p>
            <h1 className={`mt-2 ${tipografia.h2}`}>
              {session?.user?.name ?? session?.user?.email ?? "Hola"}
            </h1>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button type="submit" variant="secondary">
              Cerrar sesión
            </Button>
          </form>
        </div>

        <p className={`mt-6 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
          Este panel administra los agentes de la fábrica de AR2GO (repo{" "}
          <code className="font-mono text-niebla">ar2go-platform</code>).
          Todavía no hay nada que administrar de verdad: ese repo sigue en
          etapa 0 (ver <code className="font-mono text-niebla">docs/factory.md</code>{" "}
          ahí), sin agentes construidos ni API que conectar aquí. Este acceso
          es el andamiaje — se conecta a datos reales cuando exista esa API.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AGENTES_FABRICA.map((agente) => (
            <Card key={agente.nombre}>
              <p className={tipografia.h3}>{agente.nombre}</p>
              <p className={`mt-1 ${tipografia.cuerpoChico} text-gris`}>
                Produce: {agente.produce}
              </p>
              <p className={`mt-3 ${tipografia.dato} text-gris`}>
                Sin conectar
              </p>
            </Card>
          ))}
        </div>
      </Section>
      <Footer />
    </>
  );
}
