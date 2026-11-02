"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { admin } from "@/content/admin";
import { Icono } from "./Icono";

type Props = { exito: boolean; children: React.ReactNode };

// Aviso con el resultado de una acción de /admin (?aviso=<código>), con botón de cerrar. Al cerrarlo
// también sale ?aviso= (y su detalle) de la dirección, para que no regrese al recargar.
export function AvisoAdmin({ exito, children }: Props) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const ruta = usePathname();
  const params = useSearchParams();
  if (!visible) return null;

  function cerrar() {
    setVisible(false);
    const resto = new URLSearchParams(params);
    resto.delete("aviso");
    resto.delete("clerk");
    const q = resto.toString();
    router.replace(q ? `${ruta}?${q}` : ruta, { scroll: false });
  }

  return (
    <div role={exito ? "status" : "alert"} className={`aviso aviso-cerrable ${exito ? "verde" : "rojo"}`}>
      <div className="grow">{children}</div>
      <button type="button" className="aviso-cerrar" aria-label={admin.cerrarAviso} title={admin.cerrarAviso} onClick={cerrar}>
        <Icono nombre="cerrar" tamano={16} />
      </button>
    </div>
  );
}
