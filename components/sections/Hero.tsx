import Image from "next/image";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { Bitacora } from "@/components/sections/Bitacora";
import { hero } from "@/content/hero";

// Hero: foto a sangre con los degradados de la maqueta (.hero::before/::after
// en app/home.css), texto y bitácora en dos columnas y, abajo, la franja de
// tripulación.
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
          <div className="hero__grid">
            <div className="hero__text">
              <p className="eyebrow">
                <span className="dot" aria-hidden="true" />
                {hero.eyebrow}
              </p>
              <h1>{hero.titulo}</h1>
              <p className="lede">
                {hero.apoyo.map((parte) =>
                  "enfasis" in parte ? <strong key={parte.texto}>{parte.texto}</strong> : parte.texto,
                )}
              </p>
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
            </div>
            <Bitacora />
          </div>

          <dl className="strip">
            {hero.franja.map((columna) => (
              <div key={columna.etiqueta}>
                <dt className="eyebrow eyebrow--plain">{columna.etiqueta}</dt>
                <dd>
                  <b>{columna.valor}</b> · {columna.descripcion}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </header>
  );
}
