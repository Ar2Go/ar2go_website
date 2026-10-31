"use client";

import { useState } from "react";
import { nosotros } from "@/content/nosotros";

// Mismo comportamiento que las tarjetas de Precios: el foco sigue al cursor
// y, al salir, vuelve a la etapa elegida con clic (de entrada, la primera).
export function Etapas() {
  const [elegida, setElegida] = useState<string>(nosotros.pasos[0].numero);
  const [encima, setEncima] = useState<string | null>(null);
  const enFoco = encima ?? elegida;

  return (
    <div className="steps" onMouseLeave={() => setEncima(null)}>
      {nosotros.pasos.map((paso) => (
        <article
          className={`step${paso.numero === enFoco ? " step--on" : ""}`}
          key={paso.numero}
          onMouseEnter={() => setEncima(paso.numero)}
          onClick={() => setElegida(paso.numero)}
        >
          <div className="step__n">{paso.numero}</div>
          <h3>{paso.titulo}</h3>
          <p>{paso.descripcion}</p>
        </article>
      ))}
    </div>
  );
}
