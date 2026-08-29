import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { WaitlistForm } from "@/components/forms/WaitlistForm";
import { proximosProcesos } from "@/content/proximosProcesos";
import { medidaMaxima, tipografia } from "@/lib/typography";

export function ProximosProcesos() {
  return (
    <Section background="neutro" id="proximos-procesos">
      <p className={tipografia.eyebrow}>{proximosProcesos.eyebrow}</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>
        {proximosProcesos.titulo}
      </h2>
      <p className={`mt-4 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
        {proximosProcesos.apoyo}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {proximosProcesos.procesos.map((proceso) => (
          <Card key={proceso.slug}>
            <p className={tipografia.h3}>{proceso.nombre}</p>
            <p className={`mt-2 ${tipografia.cuerpoChico} text-gris`}>
              {proceso.descripcion}
            </p>
            <p className={`mt-4 ${tipografia.cuerpoChico} font-medium`}>
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
