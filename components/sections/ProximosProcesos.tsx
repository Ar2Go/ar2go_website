import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { proximosProcesos } from "@/content/proximosProcesos";
import { site } from "@/content/site";

// Lista de espera por correo (mailto). Es una interfaz deliberadamente
// simple: mide demanda antes de construir nada. El formulario/CRM real del
// paso 5 puede reemplazar este enlace por un Server Action sin tocar el
// resto de la sección.
function enlaceListaEspera(nombreProceso: string) {
  const asunto = encodeURIComponent(`Lista de espera: ${nombreProceso}`);
  const cuerpo = encodeURIComponent(
    `Quiero que me avisen cuando "${nombreProceso}" esté disponible.`,
  );
  return `mailto:${site.contacto.correo}?subject=${asunto}&body=${cuerpo}`;
}

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
            <a
              href={enlaceListaEspera(proceso.nombre)}
              className="mt-4 inline-block text-sm font-medium underline underline-offset-4"
            >
              {proximosProcesos.listaEspera.titulo}
            </a>
          </Card>
        ))}
      </div>
    </Section>
  );
}
