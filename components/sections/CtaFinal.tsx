import Image from "next/image";
import { CtaButton } from "@/components/analytics/CtaButton";
import { ctaFinal } from "@/content/ctaFinal";
import { tipografia } from "@/lib/typography";

export function CtaFinal() {
  return (
    <section id="contacto" className="relative isolate my-6 py-24 md:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image src={ctaFinal.imagen} alt="" fill sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0B0F19 0%, rgba(11,15,25,.34) 22%, rgba(11,15,25,.40) 72%, #0B0F19 100%), linear-gradient(102deg, rgba(11,15,25,.92) 0%, rgba(11,15,25,.58) 50%, rgba(37,99,235,.20) 100%)",
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1080px] flex-wrap items-end justify-between gap-8 px-5 md:px-8">
        <div className="max-w-[26rem] flex-1">
          <h2 className={`max-w-[18ch] ${tipografia.h2}`}>{ctaFinal.titulo}</h2>
          {ctaFinal.parrafos.map((parrafo) => (
            <p key={parrafo} className={`mt-4 max-w-[44ch] ${tipografia.cuerpoChico} text-gris`}>
              {parrafo}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <CtaButton
            href={ctaFinal.cta.href}
            section="cta_final"
            label={ctaFinal.cta.label}
            variant="primary"
            className="!px-6 !py-3.5"
          />
        </div>
      </div>
    </section>
  );
}
