import { CtaButton } from "@/components/analytics/CtaButton";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { precio } from "@/content/precio";
import { medidaMaxima, tipografia } from "@/lib/typography";

export function Precio() {
  return (
    <Section background="papel" id="precio">
      <p className={tipografia.eyebrow}>Precio</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>
        Sin llamada de ventas para saber cuánto cuesta.
      </h2>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card>
          <p className={tipografia.h3}>{precio.implementacion.label}</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className={tipografia.precio}>
              {precio.implementacion.monto}
            </span>
            <span className={`${tipografia.cuerpoChico} text-gris`}>
              {precio.implementacion.frecuencia}
            </span>
          </p>
        </Card>
        <Card>
          <p className={tipografia.h3}>{precio.renta.label}</p>
          <p className="mt-2 flex items-baseline gap-2">
            <span className={tipografia.precio}>{precio.renta.monto}</span>
            <span className={`${tipografia.cuerpoChico} text-gris`}>
              {precio.renta.frecuencia}
            </span>
          </p>
          <p className={`mt-2 ${tipografia.cuerpoChico} text-gris`}>
            {precio.renta.incluye}
          </p>
        </Card>
      </div>

      <p className={`mt-6 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>
        {precio.notaMeta}
      </p>

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
