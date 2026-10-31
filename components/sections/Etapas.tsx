"use client";

import { nosotros } from "@/content/nosotros";
import { useFoco } from "@/lib/useFoco";

// Foco de tarjetas compartido (lib/useFoco.ts); de entrada, la primera etapa.
export function Etapas() {
  const { enFoco, grupo, tarjeta } = useFoco(nosotros.pasos[0].numero);

  return (
    <div className="steps" {...grupo}>
      {nosotros.pasos.map((paso) => (
        <article
          className={`step${paso.numero === enFoco ? " foco" : ""}`}
          key={paso.numero}
          {...tarjeta(paso.numero)}
        >
          <div className="step__n">{paso.numero}</div>
          <h3>{paso.titulo}</h3>
          <p>{paso.descripcion}</p>
        </article>
      ))}
    </div>
  );
}
