import Image from "next/image";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { hero } from "@/content/hero";

// Hero cinematográfico — estructura y clases idénticas a la maqueta
// aprobada (home.html): capa de foto + dos degradados (legibilidad + viñeta
// azul de marca) vía .hero::before/::after en app/home.css.
export function Hero() {
  return (
    <header className="hero" id="inicio">
      <Image
        src="/home/hero.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="hero__img"
      />
      <div className="hero__body">
        <div className="wrap">
          <h1>{hero.titulo}</h1>
          <p className="lede">{hero.apoyo}</p>
          <div className="hero__cta">
            <HomeCtaLink
              href={hero.ctaPrimario.href}
              section="hero"
              label={hero.ctaPrimario.label}
              className="btn btn--primary btn--lg"
              icon
            />
            <HomeCtaLink
              href={hero.ctaSecundario.href}
              section="hero"
              label={hero.ctaSecundario.label}
              className="btn btn--ghost btn--lg"
              icon
            />
          </div>
          <div className="hero__foot">
            <span>{hero.pieDescripcion}</span>
            <span>
              <b>{hero.pieAgentes}</b> {hero.pieAgentesEtiqueta} &nbsp;·&nbsp; <b>{hero.pieDisponibilidad}</b>{" "}
              {hero.pieDisponibilidadEtiqueta}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
