import Image from "next/image";
import { nosotros } from "@/content/nosotros";

export function Nosotros() {
  return (
    <section className="band--photo about" id="nosotros">
      <div className="photo-bed" aria-hidden="true">
        <Image src="/home/nosotros.webp" alt="" fill sizes="100vw" />
      </div>
      <div className="wrap">
        <h2>{nosotros.titulo}</h2>
        <p>
          {nosotros.parrafos.map((parrafo) => (
            <span key={parrafo}>
              {parrafo}
              <br />
            </span>
          ))}
          <strong>{nosotros.enfasis}</strong>
        </p>
        <p>{nosotros.descripcion}</p>
        <p>{nosotros.cierre}</p>

        <div className="steps">
          {nosotros.pasos.map((paso) => (
            <article className="step" key={paso.numero}>
              <div className="step__n">{paso.numero}</div>
              <h3>{paso.titulo}</h3>
              <p>{paso.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
