"use client";

import { useId, useState } from "react";
import { casos } from "@/content/casos";
import { Section } from "@/components/ui/Section";
import { tipografia } from "@/lib/typography";

// Gráfico decorativo por caso — trazo vectorial único por industria, tomado
// tal cual de la maqueta aprobada. Es dibujo, no copy: vive en el
// componente, no en content/casos.ts.
const ARTE_POR_CASO: Record<string, React.ReactNode> = {
  manufactura: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true" className="w-full">
      <path d="M0 108 L44 94 L88 99 L132 72 L176 78 L220 46 L264 52 L320 22" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0 116 L44 113 L88 118 L132 110 L176 114 L220 106 L264 110 L320 102" stroke="#A0A7B4" strokeWidth={1.2} opacity={0.5} strokeLinecap="round" />
    </svg>
  ),
  logistica: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true" className="w-full">
      <circle cx={34} cy={96} r={5} fill="#2563EB" />
      <circle cx={286} cy={30} r={5} fill="#E6E9EF" />
      <path d="M34 96 C 110 96, 120 30, 196 30 L286 30" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" />
      <path d="M34 96 C 90 96, 130 62, 180 62 C 232 62, 240 30, 286 30" stroke="#A0A7B4" strokeWidth={1.2} strokeDasharray="4 5" opacity={0.55} />
    </svg>
  ),
  retail: (
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true" className="w-full">
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
    <svg viewBox="0 0 320 130" fill="none" aria-hidden="true" className="w-full">
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
  const activo = casos.find((caso) => caso.id === activoId) ?? casos[0];

  return (
    <Section background="fondo">
      <p className={`max-w-[20ch] ${tipografia.h2}`}>Un problema distinto en cada piso</p>
      <p className={`mt-4 max-w-[48ch] ${tipografia.cuerpo} text-gris`}>
        Elige tu industria para ver dónde entra el primer agente y qué cambia después.
      </p>

      <div role="tablist" aria-label="Casos por industria" className="mt-10 flex gap-6 overflow-x-auto border-b border-linea/10">
        {casos.map((caso) => {
          const activoAhora = caso.id === activoId;
          return (
            <button
              key={caso.id}
              role="tab"
              id={`${idBase}-tab-${caso.id}`}
              aria-controls={`${idBase}-panel-${caso.id}`}
              aria-selected={activoAhora}
              tabIndex={activoAhora ? 0 : -1}
              onClick={() => setActivoId(caso.id)}
              className={`relative whitespace-nowrap pb-3.5 text-sm transition-colors ${
                activoAhora ? "text-papel" : "text-gris hover:text-niebla"
              }`}
            >
              {caso.tab}
              {activoAhora && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-azul" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${idBase}-panel-${activo.id}`}
        aria-labelledby={`${idBase}-tab-${activo.id}`}
        className="mt-11 grid gap-10 md:grid-cols-2 md:items-center md:gap-16"
      >
        <div>
          <h3 className={`max-w-[21ch] font-sans text-[clamp(1.4rem,2.4vw,1.85rem)] font-light leading-[1.2] tracking-[-0.025em]`}>
            {activo.titulo}
          </h3>
          <p className={`mt-4 max-w-[46ch] ${tipografia.cuerpoChico} text-gris`}>{activo.descripcion}</p>
          <ul className="mt-8 grid gap-3.5">
            {activo.resultados.map((resultado) => (
              <li key={resultado} className="flex items-baseline gap-3.5 text-sm">
                <span className="relative top-[-0.3em] h-0.5 w-[18px] flex-none rounded-full bg-azul" />
                <span>{resultado}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex min-h-[280px] flex-col justify-between gap-8 rounded-card border border-linea/10 bg-superficie p-7">
          {ARTE_POR_CASO[activo.id]}
          <div className="flex items-baseline gap-3">
            <span className="font-sans text-[clamp(2.4rem,4.6vw,3.4rem)] font-light leading-none tracking-[-0.045em]">
              {activo.cifra.numero}
            </span>
            <span className="max-w-[22ch] text-xs leading-[1.4] text-gris">{activo.cifra.etiqueta}</span>
          </div>
        </div>
      </div>
    </Section>
  );
}
