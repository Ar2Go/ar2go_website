import Image from "next/image";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { ctaFinal } from "@/content/ctaFinal";

export function CtaFinal() {
  return (
    <section className="band--photo cta" id="contacto">
      <div className="photo-bed" aria-hidden="true">
        <Image src={ctaFinal.imagen} alt="" fill sizes="100vw" />
      </div>
      <div className="wrap">
        <div className="cta__body">
          <div>
            <h2>{ctaFinal.titulo}</h2>
            {ctaFinal.parrafos.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
          <div className="cta__actions">
            <HomeCtaLink
              href={ctaFinal.cta.href}
              section="cta_final"
              label={ctaFinal.cta.label}
              className="btn btn--primary btn--lg"
              icon
            />
          </div>
        </div>
      </div>
    </section>
  );
}
