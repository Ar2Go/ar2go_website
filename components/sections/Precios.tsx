"use client";

import { useState } from "react";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { precio } from "@/content/precio";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

const DESTACADO = precio.planes.find((plan) => plan.destacado)?.nombre ?? precio.planes[0].nombre;

// El foco sigue al cursor (o al teclado) y, al salir, vuelve a la tarjeta
// elegida con clic; de entrada, la destacada (Navegante).
export function Precios() {
  const [elegido, setElegido] = useState<string>(DESTACADO);
  const [encima, setEncima] = useState<string | null>(null);
  const enFoco = encima ?? elegido;

  return (
    <section className="band band--tight" id="precios">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">{precio.eyebrow}</p>
          <h2>{precio.titulo}</h2>
          <p className="lede">{precio.apoyo}</p>
        </div>

        <div className="plans" onMouseLeave={() => setEncima(null)}>
          {precio.planes.map((plan) => {
            const activo = plan.nombre === enFoco;
            return (
              <article
                className={`plan${activo ? " plan--pick" : ""}`}
                key={plan.nombre}
                onMouseEnter={() => setEncima(plan.nombre)}
                onClick={() => setElegido(plan.nombre)}
                onFocus={() => setEncima(plan.nombre)}
                onBlur={() => setEncima(null)}
              >
                <div className="plan__top">
                  <h3>{plan.nombre}</h3>
                  {"badge" in plan && plan.badge && <span className="plan__badge">{plan.badge}</span>}
                </div>
                <p className="plan__for">{plan.para}</p>
                <div className="plan__price">
                  <span className="plan__amt">{plan.monto}</span>
                  <span className="plan__per">{plan.periodo}</span>
                </div>
                <ul>
                  {plan.incluye.map((item) => (
                    <li key={item}>
                      <Check />
                      {item}
                    </li>
                  ))}
                </ul>
                <HomeCtaLink
                  href={plan.cta.href}
                  section="precios"
                  label={plan.cta.label}
                  className={`btn btn--block ${activo ? "btn--primary" : "btn--secondary"}`}
                />
              </article>
            );
          })}
        </div>
        <p className="plans__note">{precio.notaMeta}</p>
      </div>
    </section>
  );
}
