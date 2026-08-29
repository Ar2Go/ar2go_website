import { Section } from "@/components/ui/Section";
import { comoEmpezamos } from "@/content/comoEmpezamos";
import { tipografia } from "@/lib/typography";

export function ComoEmpezamos() {
  return (
    <Section background="papel" id="como-empezamos">
      <p className={tipografia.eyebrow}>{comoEmpezamos.eyebrow}</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>
        {comoEmpezamos.titulo}
      </h2>

      <ol className="mt-10 grid gap-8 sm:grid-cols-3">
        {comoEmpezamos.pasos.map((paso) => (
          <li key={paso.numero}>
            <p className={`${tipografia.dato} text-gris`}>{paso.numero}</p>
            <p className={`mt-2 ${tipografia.h3}`}>{paso.titulo}</p>
            <p className={`mt-2 ${tipografia.dato} text-gris`}>{paso.tiempo}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
