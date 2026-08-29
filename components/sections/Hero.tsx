import { CtaButton } from "@/components/analytics/CtaButton";
import { Section } from "@/components/ui/Section";
import { hero } from "@/content/hero";
import { site } from "@/content/site";
import { medidaMaxima, tipografia } from "@/lib/typography";

export function Hero() {
  return (
    <Section background="papel">
      <p className={tipografia.eyebrow}>{hero.eyebrow}</p>
      <h1 className={`mt-4 max-w-3xl ${tipografia.display}`}>{hero.titulo}</h1>
      <p className={`mt-6 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
        {hero.apoyo}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <CtaButton
          href="#formulario-demo"
          section="hero"
          label={hero.ctaPrimario}
          variant="primary"
        />
        <CtaButton
          href={site.whatsapp.href}
          section="hero"
          label={hero.ctaSecundario}
          variant="secondary"
        />
      </div>
    </Section>
  );
}
