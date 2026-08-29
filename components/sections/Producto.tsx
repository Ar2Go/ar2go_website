import { Section } from "@/components/ui/Section";
import { conversacionEjemplo, productoPasos } from "@/content/producto";
import { tipografia } from "@/lib/typography";

export function Producto() {
  return (
    <Section background="neutro" id="producto">
      <p className={tipografia.eyebrow}>Cómo funciona</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>
        El mismo proceso, mensaje por mensaje.
      </h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
        <ol className="space-y-8">
          {productoPasos.map((paso) => (
            <li key={paso.numero} className="flex gap-4">
              <span className={`${tipografia.dato} text-gris`}>
                {paso.numero}
              </span>
              <div>
                <p className={tipografia.h3}>{paso.titulo}</p>
                <p className={`mt-1 max-w-[60ch] ${tipografia.cuerpo} text-gris`}>
                  {paso.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-base border border-linea bg-papel p-4 sm:p-6">
          <div className="space-y-3">
            {conversacionEjemplo.map((mensaje, indice) => (
              <div
                key={indice}
                className={
                  mensaje.de === "agente"
                    ? "ml-auto max-w-[85%] rounded-base bg-neutro px-4 py-3"
                    : "mr-auto max-w-[85%] rounded-base border border-linea px-4 py-3"
                }
              >
                <p className={tipografia.cuerpoChico}>{mensaje.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
