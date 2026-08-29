import { CtaButton } from "@/components/analytics/CtaButton";
import { Section } from "@/components/ui/Section";
import { cierre } from "@/content/cierre";
import { site } from "@/content/site";

export function Cierre() {
  return (
    <Section background="tinta" id="formulario-demo">
      <h2 className="max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight text-papel sm:text-4xl">
        {cierre.titulo}
      </h2>
      <p className="mt-4 text-lg text-papel/70">{cierre.apoyo}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <CtaButton
          href="#formulario-demo"
          section="cierre"
          label={cierre.ctaPrimario}
          variant="primary"
        />
        <CtaButton
          href={site.whatsapp.href}
          section="cierre"
          label={cierre.ctaSecundario}
          variant="secondary"
          className="border-papel text-papel hover:bg-papel/10"
        />
      </div>
    </Section>
  );
}
