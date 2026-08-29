import { CtaButton } from "@/components/analytics/CtaButton";
import { Section } from "@/components/ui/Section";
import { cierre } from "@/content/cierre";
import { site } from "@/content/site";
import { tipografia } from "@/lib/typography";

export function Cierre() {
  return (
    <Section background="tinta">
      <h2 className={`max-w-2xl ${tipografia.h2} text-papel`}>
        {cierre.titulo}
      </h2>
      <p className={`mt-4 ${tipografia.cuerpo} text-papel/70`}>
        {cierre.apoyo}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <CtaButton
          href="#formulario-demo"
          section="cierre"
          label={cierre.ctaPrimario}
          variant="primary"
          // Regla dura de docs/brand.md §3/§6: marino y tinta nunca se
          // tocan. Sobre una sección oscura el CTA primario va en blanco
          // con texto tinta, no en marino — "sobre negro el marino
          // desaparece". Important para no depender del orden de
          // generación de Tailwind frente a las clases del variant.
          className="!bg-papel !text-tinta hover:!bg-neutro"
        />
        <CtaButton
          href={site.whatsapp.href}
          section="cierre"
          label={cierre.ctaSecundario}
          variant="secondary"
          // Sobre fondo tinta, el hover invertido del secundario (fondo
          // tinta) sería invisible — aquí se invierte al revés: fondo papel.
          className="!border-papel !text-papel hover:!bg-papel hover:!text-tinta"
        />
      </div>
    </Section>
  );
}
