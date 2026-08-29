import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { problema } from "@/content/problema";
import { medidaMaxima, tipografia } from "@/lib/typography";

export function Problema() {
  return (
    <Section background="papel" id="problema">
      <p className={tipografia.eyebrow}>{problema.eyebrow}</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>{problema.titulo}</h2>
      <p className={`mt-4 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
        {problema.apoyo}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {problema.estadisticas.map((estadistica, indice) => (
          <Card key={indice}>
            <p className={tipografia.precio}>{estadistica.cifra}</p>
            <p className={`mt-2 ${tipografia.cuerpoChico} text-gris`}>
              {estadistica.descripcion}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
