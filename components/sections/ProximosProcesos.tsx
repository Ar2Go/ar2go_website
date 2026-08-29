import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { proximosProcesos } from "@/content/proximosProcesos";

export function ProximosProcesos() {
  return (
    <Section background="neutro" id="proximos-procesos">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        {proximosProcesos.eyebrow}
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        {proximosProcesos.titulo}
      </h2>
      <p className="mt-4 max-w-[68ch] text-lg text-gris">
        {proximosProcesos.apoyo}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {proximosProcesos.procesos.map((proceso) => (
          <Card key={proceso.slug}>
            <p className="text-lg font-medium">{proceso.nombre}</p>
            <p className="mt-2 text-sm text-gris">{proceso.descripcion}</p>
            <p className="mt-4 text-sm font-medium">
              {proximosProcesos.listaEspera.titulo}
            </p>
            <WaitlistForm
              proceso={proceso.nombre}
              cta={proximosProcesos.listaEspera.cta}
            />
          </Card>
        ))}
      </div>
    </Section>
  );
}
