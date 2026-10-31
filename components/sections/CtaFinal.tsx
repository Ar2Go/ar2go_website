import Image from "next/image";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { ctaFinal } from "@/content/ctaFinal";

export function CtaFinal() {
  return (
    <section className="band--photo cta" id="contacto">
      <div className="photo-bed photo-bed--fade" aria-hidden="true">
        <Image src={ctaFinal.imagen} alt="" fill sizes="100vw" />
      </div>
      <div className="wrap cta__body">
        <p className="eyebrow">{ctaFinal.eyebrow}</p>
        <h2>{ctaFinal.titulo}</h2>
        <p className="cta__lede">{ctaFinal.apoyo}</p>
        <div className="cta__actions">
          <HomeCtaLink
            href={ctaFinal.ctaPrimario.href}
            section="cta_final"
            label={ctaFinal.ctaPrimario.label}
            className="btn btn--primary btn--lg"
            icon
          />
        </div>
      </div>
    </section>
  );
}
