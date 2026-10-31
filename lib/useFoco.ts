"use client";

import { useState } from "react";

// Foco de tarjetas de la home (La tripulación, En astillero, Nosotros y
// Precios), igual en todas: el cursor (o el teclado) pone una tarjeta en
// foco, el clic la deja elegida y, al salir el cursor del grupo, vuelve la
// elegida. Estilo compartido en app/home.css (.foco).
export function useFoco(inicial: string) {
  const [elegida, setElegida] = useState(inicial);
  const [encima, setEncima] = useState<string | null>(null);
  const enFoco = encima ?? elegida;

  return {
    enFoco,
    grupo: { onMouseLeave: () => setEncima(null) },
    tarjeta: (id: string) => ({
      onMouseEnter: () => setEncima(id),
      onClick: () => setElegida(id),
      onFocus: () => setEncima(id),
      onBlur: () => setEncima(null),
    }),
  };
}
