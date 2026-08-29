import { Section } from "@/components/ui/Section";
import { comoEmpezamos } from "@/content/comoEmpezamos";

export function ComoEmpezamos() {
  return (
    <Section background="papel" id="como-empezamos">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        {comoEmpezamos.eyebrow}
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        {comoEmpezamos.titulo}
      </h2>

      <ol className="mt-10 grid gap-8 sm:grid-cols-3">
        {comoEmpezamos.pasos.map((paso) => (
          <li key={paso.numero}>
            <p className="font-mono text-sm text-gris">{paso.numero}</p>
            <p className="mt-2 text-lg font-medium">{paso.titulo}</p>
            <p className="mt-2 font-mono text-sm text-gris">{paso.tiempo}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
