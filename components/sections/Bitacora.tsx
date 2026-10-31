"use client";

import { useEffect, useState } from "react";
import { bitacora } from "@/content/hero";

const { entradas, filasVisibles, intervaloMs, horaInicial } = bitacora;

function hora(indice: number) {
  const total = horaInicial.horas * 60 + horaInicial.minutos + indice;
  const horas = Math.floor(total / 60) % 24;
  const minutos = total % 60;
  return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
}

// Bitácora de a bordo del hero: cada intervaloMs entra una entrada arriba y
// la más vieja sale. `ultima` es el índice absoluto de la entrada más
// reciente; con él salen la hora y la entrada del loop. Con
// prefers-reduced-motion no rota.
export function Bitacora() {
  const [ultima, setUltima] = useState(filasVisibles - 1);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const temporizador = window.setInterval(() => setUltima((valor) => valor + 1), intervaloMs);
    return () => window.clearInterval(temporizador);
  }, []);

  const filas = Array.from({ length: filasVisibles }, (_, posicion) => ultima - posicion);

  return (
    <div className="log">
      <div className="log__head">
        <span className="eyebrow eyebrow--plain">{bitacora.titulo}</span>
        <span className="log__live">
          <span className="dot" aria-hidden="true" />
          {bitacora.estado}
        </span>
      </div>
      <ol className="log__list">
        {filas.map((indice, posicion) => {
          const entrada = entradas[indice % entradas.length];
          return (
            <li className={`log__row${posicion === 0 ? " log__row--new" : ""}`} key={indice}>
              <span className={`initials initials--${entrada.tipo}`} aria-hidden="true">
                {entrada.iniciales}
              </span>
              <div className="log__body">
                <div className="log__meta">
                  <span>
                    {entrada.area} · {entrada.tipo}
                  </span>
                  <time>{hora(indice)}</time>
                </div>
                <p>{entrada.texto}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
