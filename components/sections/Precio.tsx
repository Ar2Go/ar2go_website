import { CtaButton } from "@/components/analytics/CtaButton";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { precio } from "@/content/precio";

export function Precio() {
  return (
    <Section background="papel" id="precio">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        Precio
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        Sin llamada de ventas para saber cuánto cuesta.
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card>
          <p className="font-mono text-xs uppercase tracking-wide text-gris">
            {precio.implementacion.frecuencia}
          </p>
          <p className="mt-2 text-lg font-medium">
            {precio.implementacion.label}
          </p>
          <p className="mt-1 font-mono text-3xl">{precio.implementacion.monto}</p>
        </Card>
        <Card>
          <p className="font-mono text-xs uppercase tracking-wide text-gris">
            {precio.renta.frecuencia}
          </p>
          <p className="mt-2 text-lg font-medium">{precio.renta.label}</p>
          <p className="mt-1 font-mono text-3xl">{precio.renta.monto}</p>
          <p className="mt-2 text-sm text-gris">{precio.renta.incluye}</p>
        </Card>
      </div>

      <p className="mt-6 max-w-[68ch] text-sm text-gris">{precio.notaMeta}</p>

      <div className="mt-10">
        <CtaButton
          href="#formulario-demo"
          section="precio"
          label="Agenda una demo"
          variant="primary"
        />
      </div>
    </Section>
  );
}
