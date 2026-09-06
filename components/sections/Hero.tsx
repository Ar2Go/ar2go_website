import Image from "next/image";
import { CtaButton } from "@/components/analytics/CtaButton";
import { hero } from "@/content/hero";
import { tipografia } from "@/lib/typography";

// Hero cinematográfico de la maqueta aprobada (2026-09-06): foto a sangre +
// degradado para legibilidad + titular. object-cover + fill porque la foto
// es de composición fija (fiordo), no decorativa recortable.
export function Hero() {
  return (
    <header id="inicio" className="relative isolate flex min-h-[92vh] items-end overflow-hidden bg-fondo">
      <Image
        src="/home/hero.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="-z-20 scale-105 object-cover"
      />
      {/* Oscurece arriba y funde con el fondo abajo, para que el texto y el
          nav queden legibles sobre cualquier parte de la foto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,15,25,.60) 0%, rgba(11,15,25,.10) 30%, rgba(11,15,25,.34) 58%, rgba(11,15,25,.92) 90%, #0B0F19 100%)",
        }}
      />

      <div className="relative w-full px-5 pb-14 pt-40 md:px-8 md:pb-20 md:pt-48">
        <div className="mx-auto w-full max-w-[1240px]">
          <h1 className={`max-w-[16ch] ${tipografia.display}`}>{hero.titulo}</h1>
          <p className={`mt-6 max-w-[46ch] ${tipografia.cuerpo} text-gris`}>
            {hero.apoyo}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <CtaButton
              href={hero.ctaPrimario.href}
              section="hero"
              label={hero.ctaPrimario.label}
              variant="primary"
              className="!px-6 !py-3.5"
            />
            <CtaButton
              href={hero.ctaSecundario.href}
              section="hero"
              label={hero.ctaSecundario.label}
              variant="ghost"
              className="!px-6 !py-3.5"
            />
          </div>
          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-t border-linea/10 pt-5 text-xs text-gris md:mt-16">
            <span className="max-w-[52ch]">{hero.pieDescripcion}</span>
            <span>
              <b className="font-normal text-niebla">{hero.pieAgentes}</b> {hero.pieAgentesEtiqueta}
              <span className="mx-3">·</span>
              <b className="font-normal text-niebla">{hero.pieDisponibilidad}</b> {hero.pieDisponibilidadEtiqueta}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
