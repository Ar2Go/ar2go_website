import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { control } from "@/content/control";
import { medidaMaxima, tipografia } from "@/lib/typography";

export function Control() {
  return (
    <Section background="neutro" id="control">
      <p className={tipografia.eyebrow}>{control.eyebrow}</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>{control.titulo}</h2>
      <p className={`mt-4 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
        {control.apoyo}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <Card>
          <p className={tipografia.h3}>Escala a un humano cuando:</p>
          <ul className="mt-4 space-y-3">
            {control.escalamientos.map((motivo) => (
              <li
                key={motivo}
                className={`flex gap-3 ${tipografia.cuerpoChico} text-gris`}
              >
                <span aria-hidden="true" className="text-tinta">
                  —
                </span>
                {motivo}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <p className={tipografia.h3}>{control.auditoria.titulo}</p>
          <p className={`mt-4 ${tipografia.cuerpoChico} text-gris`}>
            {control.auditoria.descripcion}
          </p>
        </Card>
      </div>
    </Section>
  );
}
