import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

// Página interna de revisión del sistema de diseño (paso 2 del PLAN.md).
// No se enlaza desde ninguna navegación pública y se saca del índice de
// buscadores mientras el sitio no tiene rutas reales que la reemplacen.
export const metadata: Metadata = {
  title: "Muestra de componentes — AR2GO",
  robots: { index: false, follow: false },
};

export default function MuestraPage() {
  return (
    <>
      <Section background="papel">
        <p className="font-mono text-sm uppercase tracking-wide text-gris">
          Eyebrow / mono
        </p>
        <h1 className="mt-2 text-5xl font-bold leading-[1.05] tracking-tight">
          Título nivel 1
        </h1>
        <h2 className="mt-8 text-3xl font-bold leading-[1.05] tracking-tight">
          Título nivel 2
        </h2>
        <p className="mt-4 max-w-[68ch] text-lg text-gris">
          Cuerpo de texto a 16–18px con medida máxima de 68 caracteres, para
          que los párrafos largos sigan siendo cómodos de leer en pantallas
          anchas. Esta es la familia geométrica única del sitio.
        </p>
        <p className="mt-4 font-mono text-2xl text-tinta">$2,900 MXN/mes</p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#" variant="primary">
            Agenda una demo
          </Button>
          <Button href="#" variant="secondary">
            Pruébalo por WhatsApp
          </Button>
          <Button variant="primary" disabled>
            Botón deshabilitado
          </Button>
        </div>
      </Section>

      <Section background="neutro">
        <h2 className="text-2xl font-bold tracking-tight">
          Section — fondo neutro
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className="font-mono text-xs uppercase tracking-wide text-gris">
              Tarjeta
            </p>
            <p className="mt-2 text-lg font-medium">Implementación</p>
            <p className="mt-1 font-mono text-2xl">$9,000 MXN</p>
          </Card>
          <Card>
            <p className="font-mono text-xs uppercase tracking-wide text-gris">
              Tarjeta
            </p>
            <p className="mt-2 text-lg font-medium">Renta mensual</p>
            <p className="mt-1 font-mono text-2xl">$2,900 MXN</p>
          </Card>
          <Card>
            <p className="font-mono text-xs uppercase tracking-wide text-gris">
              Tarjeta
            </p>
            <p className="mt-2 text-lg font-medium">Conversaciones</p>
            <p className="mt-1 font-mono text-2xl">300 incluidas</p>
          </Card>
        </div>
      </Section>

      <Section background="tinta">
        <h2 className="text-2xl font-bold tracking-tight">
          Section — fondo tinta
        </h2>
        <p className="mt-4 max-w-[68ch] text-lg text-papel/80">
          Para cierres de sección o bloques de alto contraste. El naranja no
          se usa aquí para no competir con el CTA primario de la pantalla.
        </p>
      </Section>
    </>
  );
}
