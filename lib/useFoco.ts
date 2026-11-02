"use client";

import { useState } from "react";

// Foco de tarjetas de la home (La tripulación, En astillero, Nosotros y Precios), igual en todas: la
// tarjeta donde pasa el cursor (o llega el teclado, o se da clic) queda en foco y ahí se queda al
// salir del grupo; no regresa a otra. Estilo compartido en app/home.css (.foco).
export function useFoco(inicial: string) {
  const [enFoco, setEnFoco] = useState(inicial);

  return {
    enFoco,
    tarjeta: (id: string) => ({
      onMouseEnter: () => setEnFoco(id),
      onClick: () => setEnFoco(id),
      onFocus: () => setEnFoco(id),
    }),
  };
}
