"use client";

import Image from "next/image";
import { tripulacion } from "@/content/tripulacion";
import { useFoco } from "@/lib/useFoco";

const DESTACADA =
  tripulacion.familias.find((familia) => familia.destacada)?.nombre ?? tripulacion.familias[0].nombre;

// Foco de tarjetas compartido (lib/useFoco.ts); de entrada, Argonautas.
export function Tripulacion() {
  const { enFoco, grupo, tarjeta } = useFoco(DESTACADA);

  return (
    <section className="band--photo" id="agentes">
      <div className="photo-bed photo-bed--fade" aria-hidden="true">
        <Image src={tripulacion.imagen} alt="" fill sizes="100vw" />
      </div>
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">{tripulacion.eyebrow}</p>
          <h2>{tripulacion.titulo}</h2>
          <p className="lede">{tripulacion.apoyo}</p>
        </div>

        <div className="families" {...grupo}>
          {tripulacion.familias.map((familia) => (
            <article
              className={`family${familia.nombre === enFoco ? " foco" : ""}`}
              key={familia.nombre}
              {...tarjeta(familia.nombre)}
            >
              <div className="family__top">
                {familia.etiquetas.map((etiqueta) => (
                  <span key={etiqueta}>{etiqueta}</span>
                ))}
              </div>
              <h3>{familia.nombre}</h3>
              <p>{familia.descripcion}</p>
              <ul className="chips">
                {familia.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
