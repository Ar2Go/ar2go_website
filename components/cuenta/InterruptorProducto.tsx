"use client";

import { useTransition } from "react";
import { activarAccion, desactivarAccion } from "@/app/(cuenta)/cuenta/acciones";

type Props = {
  producto: string;
  nombre: string;
  activo: boolean;
  disabled: boolean;
  // Pregunta antes de desactivar: el equipo pierde el acceso al producto.
  confirmar: string;
  // Pregunta antes de activar el que llena el plan: la selección queda fija
  // hasta el mes siguiente (D38).
  confirmarActivar?: string | null;
};

// Interruptor de Configuración → Suscripción: activa o desactiva un
// argonauta o argotipo dentro del plan (D37). Las acciones regresan a esta
// sección; activar puede pasar antes por la aceptación de documentos (D25).
export function InterruptorProducto({ producto, nombre, activo, disabled, confirmar, confirmarActivar = null }: Props) {
  const [pendiente, iniciar] = useTransition();

  function cambiar() {
    const pregunta = activo ? confirmar : confirmarActivar;
    if (pregunta && !window.confirm(pregunta)) return;
    const datos = new FormData();
    datos.set("producto", producto);
    datos.set("volver", "suscripcion");
    iniciar(() => (activo ? desactivarAccion(datos) : activarAccion(datos)));
  }

  return (
    <button
      type="button"
      role="switch"
      className="interruptor"
      aria-label={nombre}
      aria-checked={activo}
      disabled={disabled || pendiente}
      onClick={cambiar}
    />
  );
}
