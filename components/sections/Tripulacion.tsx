"use client";

import Image from "next/image";
import { useState } from "react";
import { tripulacion } from "@/content/tripulacion";

const DESTACADA =
  tripulacion.familias.find((familia) => familia.destacada)?.nombre ?? tripulacion.familias[0].nombre;

// Mismo comportamiento que Precios y las etapas de Nosotros: el foco sigue al
// cursor y, al salir, vuelve a la tarjeta elegida con clic (de entrada,
// Argonautas).
export function Tripulacion() {
  const [elegida, setElegida] = useState<string>(DESTACADA);
  const [encima, setEncima] = useState<string | null>(null);
  const enFoco = encima ?? elegida;

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

        <div className="families" onMouseLeave={() => setEncima(null)}>
          {tripulacion.familias.map((familia) => (
            <article
              className={`family${familia.nombre === enFoco ? " family--featured" : ""}`}
              key={familia.nombre}
              onMouseEnter={() => setEncima(familia.nombre)}
              onClick={() => setElegida(familia.nombre)}
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
