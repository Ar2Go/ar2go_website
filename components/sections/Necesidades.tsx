"use client";

import { useId, useRef, useState } from "react";
import { necesidades } from "@/content/necesidades";

const { tabs } = necesidades;

export function Necesidades() {
  // El cursor sobre un tab lo elige igual que un clic, y se queda elegido
  // aunque el cursor se vaya.
  const [activoId, setActivoId] = useState<(typeof tabs)[number]["id"]>(tabs[0].id);
  const idBase = useId();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Flechas mueven y seleccionan; Home/End van al primero/último.
  function moverA(indice: number) {
    setActivoId(tabs[indice].id);
    tabRefs.current[indice]?.focus();
  }

  function alPresionarTecla(evento: React.KeyboardEvent, indice: number) {
    const destino = {
      ArrowRight: (indice + 1) % tabs.length,
      ArrowLeft: (indice - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[evento.key];
    if (destino === undefined) return;
    evento.preventDefault();
    moverA(destino);
  }

  return (
    <section className="band band--tight">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">{necesidades.eyebrow}</p>
          <h2>{necesidades.titulo}</h2>
          <p className="lede">{necesidades.apoyo}</p>
        </div>

        <div className="pills" role="tablist" aria-label={necesidades.eyebrow}>
          {tabs.map((tab, indice) => {
            const activo = tab.id === activoId;
            return (
              <button
                key={tab.id}
                ref={(elemento) => {
                  tabRefs.current[indice] = elemento;
                }}
                className="pill"
                role="tab"
                id={`${idBase}-t-${tab.id}`}
                aria-controls={`${idBase}-p-${tab.id}`}
                aria-selected={activo}
                tabIndex={activo ? 0 : -1}
                onClick={() => setActivoId(tab.id)}
                onMouseEnter={() => setActivoId(tab.id)}
                onKeyDown={(evento) => alPresionarTecla(evento, indice)}
              >
                {tab.tab}
              </button>
            );
          })}
        </div>

        {tabs.map((tab) => {
          const activo = tab.id === activoId;
          return (
            <div
              key={tab.id}
              className="need"
              id={`${idBase}-p-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`${idBase}-t-${tab.id}`}
              hidden={!activo}
            >
              <div>
                <h3>{tab.titulo}</h3>
                <p>{tab.descripcion}</p>
              </div>
              <div>
                <p className="eyebrow">{necesidades.etiquetaItems}</p>
                <ul className="need__items">
                  {tab.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
