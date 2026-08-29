import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { control } from "@/content/control";

export function Control() {
  return (
    <Section background="neutro" id="control">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        {control.eyebrow}
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        {control.titulo}
      </h2>
      <p className="mt-4 max-w-[68ch] text-lg text-gris">{control.apoyo}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <p className="text-lg font-medium">Escala a un humano cuando:</p>
          <ul className="mt-4 space-y-3">
            {control.escalamientos.map((motivo) => (
              <li key={motivo} className="flex gap-3 text-sm text-gris">
                <span aria-hidden="true" className="text-tinta">
                  —
                </span>
                {motivo}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className="text-lg font-medium">{control.auditoria.titulo}</p>
          <p className="mt-4 text-sm text-gris">
            {control.auditoria.descripcion}
          </p>
        </Card>
      </div>
    </Section>
  );
}
