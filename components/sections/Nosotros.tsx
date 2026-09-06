import Image from "next/image";
import { nosotros } from "@/content/nosotros";
import { tipografia } from "@/lib/typography";

// Franja a sangre: la foto ocupa todo el ancho y se funde arriba y abajo con
// el fondo, sin borde ni esquina que la encierre (maqueta 2026-09-06).
export function Nosotros() {
  return (
    <section id="nosotros" className="relative isolate my-6 py-24 md:py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image src="/home/nosotros.webp" alt="" fill sizes="100vw" className="object-cover" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0B0F19 0%, rgba(11,15,25,.30) 20%, rgba(11,15,25,.34) 74%, #0B0F19 100%), linear-gradient(92deg, rgba(11,15,25,.93) 0%, rgba(11,15,25,.62) 46%, rgba(11,15,25,.18) 100%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-8">
        <h2 className={`max-w-[18ch] ${tipografia.h2}`}>{nosotros.titulo}</h2>
        <p className={`mt-5 max-w-[46ch] ${tipografia.cuerpoChico} text-gris`}>
          {nosotros.parrafos.map((parrafo) => (
            <span key={parrafo} className="block">
              {parrafo}
            </span>
          ))}
          <strong className="font-medium text-niebla">{nosotros.enfasis}</strong>
        </p>
        <p className={`mt-5 max-w-[46ch] ${tipografia.cuerpoChico} text-gris`}>{nosotros.descripcion}</p>
        <p className={`mt-5 max-w-[46ch] ${tipografia.cuerpoChico} text-gris`}>{nosotros.cierre}</p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {nosotros.pasos.map((paso) => (
            <article key={paso.numero} className="relative border-t border-linea/20 pt-5">
              <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-[34px] bg-azul" />
              <p className={`${tipografia.dato} text-gris`}>{paso.numero}</p>
              <h3 className="mt-2.5 mb-2 text-[1.05rem] font-medium tracking-[-0.015em]">{paso.titulo}</h3>
              <p className="text-xs leading-[1.55] text-gris">{paso.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
