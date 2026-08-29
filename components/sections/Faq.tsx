import { Section } from "@/components/ui/Section";
import { faq } from "@/content/faq";
import { medidaMaxima, tipografia } from "@/lib/typography";

export function Faq() {
  return (
    <Section background="papel" id="faq">
      <p className={tipografia.eyebrow}>Preguntas frecuentes</p>

      <dl className="mt-8 divide-y divide-linea border-t border-linea">
        {faq.map((item) => (
          <div key={item.pregunta} className="py-6">
            <dt className={tipografia.h3}>{item.pregunta}</dt>
            <dd className={`mt-2 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
              {item.respuesta}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
