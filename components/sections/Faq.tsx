import { Section } from "@/components/ui/Section";
import { faq } from "@/content/faq";

export function Faq() {
  return (
    <Section background="papel" id="faq">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        Preguntas frecuentes
      </p>

      <dl className="mt-8 divide-y divide-tinta/10 border-t border-tinta/10">
        {faq.map((item) => (
          <div key={item.pregunta} className="py-6">
            <dt className="text-lg font-medium">{item.pregunta}</dt>
            <dd className="mt-2 max-w-[68ch] text-gris">{item.respuesta}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
