import Image from "next/image";
import { astillero } from "@/content/astillero";

export function Astillero() {
  return (
    <section className="band--photo">
      <div className="photo-bed photo-bed--fade" aria-hidden="true">
        <Image src={astillero.imagen} alt="" fill sizes="100vw" />
      </div>
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">{astillero.eyebrow}</p>
          <h2>{astillero.titulo}</h2>
          <p className="lede">{astillero.apoyo}</p>
        </div>

        <ul className="yard">
          {astillero.argonautas.map((argonauta) => (
            <li key={argonauta.numero}>
              <div className="yard__top">
                <span>{argonauta.numero}</span>
                <span>{astillero.estado}</span>
              </div>
              <h3>{argonauta.nombre}</h3>
              <p>{argonauta.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
