import { Section } from "@/components/ui/Section";
import { conversacionEjemplo, productoPasos } from "@/content/producto";

export function Producto() {
  return (
    <Section background="neutro" id="producto">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        Cómo funciona
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        El mismo proceso, mensaje por mensaje.
      </h2>

      <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start">
        <ol className="space-y-8">
          {productoPasos.map((paso) => (
            <li key={paso.numero} className="flex gap-4">
              <span className="font-mono text-sm text-gris">
                {paso.numero}
              </span>
              <div>
                <p className="text-lg font-medium">{paso.titulo}</p>
                <p className="mt-1 max-w-[60ch] text-gris">
                  {paso.descripcion}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-ar2go border border-tinta/10 bg-papel p-4 sm:p-6">
          <div className="space-y-3">
            {conversacionEjemplo.map((mensaje, indice) => (
              <div
                key={indice}
                className={
                  mensaje.de === "agente"
                    ? "ml-auto max-w-[85%] rounded-ar2go bg-neutro px-4 py-3"
                    : "mr-auto max-w-[85%] rounded-ar2go border border-tinta/10 px-4 py-3"
                }
              >
                <p className="text-sm">{mensaje.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
