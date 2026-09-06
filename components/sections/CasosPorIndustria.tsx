"use client";

import { useId, useRef, useState } from "react";
import { casos } from "@/content/casos";

// Gráfico decorativo por caso — trazo vectorial único por industria, tomado
// tal cual de la maqueta. Es dibujo, no copy: vive en el componente, no en
// content/casos.ts.
const ARTE_POR_CASO: Record<string, React.ReactNode> = {
  manufactura: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true">
      <path d="M0 108 L44 94 L88 99 L132 72 L176 78 L220 46 L264 52 L320 22" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 116 L44 113 L88 118 L132 110 L176 114 L220 106 L264 110 L320 102" stroke="#A0A7B4" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
    </svg>
  ),
  logistica: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true">
      <circle cx={34} cy={96} r={5} fill="#2563EB" />
      <circle cx={286} cy={30} r={5} fill="#E6E9EF" />
      <path d="M34 96 C 110 96, 120 30, 196 30 L286 30" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" />
      <path d="M34 96 C 90 96, 130 62, 180 62 C 232 62, 240 30, 286 30" stroke="#A0A7B4" strokeWidth={1.2} strokeDasharray="4 5" opacity={0.55} />
    </svg>
  ),
  retail: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true">
      <g stroke="#A0A7B4" strokeWidth={1.2} opacity={0.45}>
        <rect x={16} y={86} width={34} height={30} />
        <rect x={60} y={70} width={34} height={46} />
        <rect x={104} y={92} width={34} height={24} />
        <rect x={148} y={60} width={34} height={56} />
      </g>
      <g stroke="#2563EB" strokeWidth={2}>
        <rect x={192} y={48} width={34} height={68} />
        <rect x={236} y={34} width={34} height={82} />
      </g>
    </svg>
  ),
  financiero: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true">
      <g stroke="#A0A7B4" strokeWidth={1.2} opacity={0.5}>
        <path d="M40 24h80M40 44h120M40 64h96M40 84h134M40 104h72" />
      </g>
      <path d="M20 24v90" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" />
      <circle cx={20} cy={44} r={4} fill="#2563EB" />
      <circle cx={20} cy={84} r={4} fill="#2563EB" />
    </svg>
  ),
};

export function CasosPorIndustria() {
  const [activoId, setActivoId] = useState<(typeof casos)[number]["id"]>(casos[0].id);
  const idBase = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Navegación por teclado idéntica a la maqueta: flechas mueven y
  // seleccionan, Home/End van al primero/último.
  function moverA(indice: number) {
    const caso = casos[indice];
    setActivoId(caso.id);
    tabRefs.current[indice]?.focus();
  }

  function alPresionarTecla(event: React.KeyboardEvent, indice: number) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moverA((indice + 1) % casos.length);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      moverA((indice - 1 + casos.length) % casos.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      moverA(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moverA(casos.length - 1);
    }
  }

  return (
    <section className="band band--tight">
      <div className="wrap">
        <div className="head">
          <h2>Un problema distinto en cada piso</h2>
          <p className="lede">Elige tu industria para ver dónde entra el primer agente y qué cambia después.</p>
        </div>

        <div className="tabs" role="tablist" aria-label="Casos por industria">
          {casos.map((caso, indice) => {
            const activo = caso.id === activoId;
            return (
              <button
                key={caso.id}
                ref={(elemento) => {
                  tabRefs.current[indice] = elemento;
                }}
                className="tab"
                role="tab"
                id={`${idBase}-t-${caso.id}`}
                aria-controls={`${idBase}-p-${caso.id}`}
                aria-selected={activo}
                tabIndex={activo ? 0 : -1}
                onClick={() => setActivoId(caso.id)}
                onKeyDown={(evento) => alPresionarTecla(evento, indice)}
              >
                {caso.tab}
              </button>
            );
          })}
        </div>

        {casos.map((caso) => {
          const activo = caso.id === activoId;
          return (
            <div
              key={caso.id}
              className="panel"
              id={`${idBase}-p-${caso.id}`}
              role="tabpanel"
              aria-labelledby={`${idBase}-t-${caso.id}`}
              hidden={!activo}
              {...(activo ? { "data-open": "" } : {})}
            >
              <div>
                <h3>{caso.titulo}</h3>
                <p>{caso.descripcion}</p>
                <ul className="outcomes">
                  {caso.resultados.map((resultado) => (
                    <li key={resultado}>
                      <span className="bar" aria-hidden="true" />
                      <span>{resultado}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="panel__art">
                {ARTE_POR_CASO[caso.id]}
                <div className="figure">
                  <span className="figure__num">{caso.cifra.numero}</span>
                  <span className="figure__lbl">{caso.cifra.etiqueta}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
