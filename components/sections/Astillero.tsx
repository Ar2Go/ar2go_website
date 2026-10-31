"use client";

import Image from "next/image";
import { astillero } from "@/content/astillero";
import { useFoco } from "@/lib/useFoco";

// Foco de tarjetas compartido (lib/useFoco.ts); de entrada, la primera.
export function Astillero() {
  const { enFoco, grupo, tarjeta } = useFoco(astillero.argonautas[0].numero);

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

        <ul className="yard" {...grupo}>
          {astillero.argonautas.map((argonauta) => (
            <li
              key={argonauta.numero}
              className={argonauta.numero === enFoco ? "foco" : undefined}
              {...tarjeta(argonauta.numero)}
            >
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
