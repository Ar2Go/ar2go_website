import Image from "next/image";
import { Etapas } from "@/components/sections/Etapas";
import { nosotros } from "@/content/nosotros";

export function Nosotros() {
  return (
    <section className="band--photo about" id="nosotros">
      <div className="photo-bed" aria-hidden="true">
        <Image src="/home/nosotros.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="wrap">
        <div className="about__top">
          <div>
            <p className="eyebrow">{nosotros.eyebrow}</p>
            <h2>
              {nosotros.titulo}
              <br />
              <span className="accent">{nosotros.tituloAcento}</span>
            </h2>
          </div>
          <div className="about__copy">
            <p>{nosotros.descripcion}</p>
            <p className="about__close">{nosotros.cierre}</p>
          </div>
        </div>

        <Etapas />
      </div>
    </section>
  );
}
