import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { problema } from "@/content/problema";

export function Problema() {
  return (
    <Section background="papel" id="problema">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        {problema.eyebrow}
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        {problema.titulo}
      </h2>
      <p className="mt-4 max-w-[68ch] text-lg text-gris">{problema.apoyo}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {problema.estadisticas.map((estadistica, indice) => (
          <Card key={indice}>
            <p className="font-mono text-3xl">{estadistica.cifra}</p>
            <p className="mt-2 text-sm text-gris">{estadistica.descripcion}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
