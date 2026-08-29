import { CtaButton } from "@/components/analytics/CtaButton";
import { Section } from "@/components/ui/Section";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export function Hero() {
  return (
    <Section background="papel" className="pt-20 sm:pt-28">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        {hero.eyebrow}
      </p>
      <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
        {hero.titulo}
      </h1>
      <p className="mt-6 max-w-[68ch] text-lg text-gris sm:text-xl">
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
