"use client";

import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { precio } from "@/content/precio";
import { useFoco } from "@/lib/useFoco";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

const DESTACADO = precio.planes.find((plan) => plan.destacado)?.nombre ?? precio.planes[0].nombre;

// Foco de tarjetas compartido (lib/useFoco.ts); de entrada, la destacada
// (Navegante). La tarjeta en foco lleva su botón en azul sólido.
export function Precios() {
  const { enFoco, grupo, tarjeta } = useFoco(DESTACADO);

  return (
    <section className="band band--tight" id="precios">
      <div className="wrap">
        <div className="head">
          <p className="eyebrow">{precio.eyebrow}</p>
          <h2>{precio.titulo}</h2>
          <p className="lede">{precio.apoyo}</p>
        </div>

        <div className="plans" {...grupo}>
          {precio.planes.map((plan) => {
            const activo = plan.nombre === enFoco;
            return (
              <article
                className={`plan${activo ? " foco" : ""}`}
                key={plan.nombre}
                {...tarjeta(plan.nombre)}
              >
                <div className="plan__top">
                  <h3>{plan.nombre}</h3>
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
