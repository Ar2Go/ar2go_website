"use client";

import { useOptimistic, useTransition } from "react";
import { cambiarProductoAccion } from "@/app/admin/acciones";
import { admin } from "@/content/admin";

type Herramienta = {
  slug: string;
  nombre: string;
  // Configurada en este ambiente; sin configurar no se puede habilitar.
  disponible: boolean;
  habilitada: boolean;
  // El producto todavía no confirma el último cambio.
  pendiente: boolean;
};

type Props = { empresaId: string; herramientas: Herramienta[] };

// Herramientas de la empresa: una casilla por producto del catálogo. Marcarla la habilita (aprovisiona
// el producto); desmarcarla la deshabilita, en cualquier estado de la cuenta.
export function Herramientas({ empresaId, herramientas }: Props) {
  const [enCurso, iniciar] = useTransition();
  // La casilla cambia al momento; si el servidor no lo aplica, regresa sola al recargar la página.
  const [vista, marcar] = useOptimistic(herramientas, (actual, [slug, habilitada]: [string, boolean]) =>
    actual.map((h) => (h.slug === slug ? { ...h, habilitada } : h)),
  );
  const t = admin.herramientas;

  function cambiar(slug: string, habilitar: boolean) {
    const datos = new FormData();
    datos.set("empresa_id", empresaId);
    datos.set("producto", slug);
    datos.set("habilitar", habilitar ? "si" : "no");
    iniciar(async () => {
      marcar([slug, habilitar]);
      await cambiarProductoAccion(datos);
    });
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">{t.titulo}</span>
      </div>
      <div className="card-lista">
        {vista.map((h) => (
          <label key={h.slug} className="kv" style={{ alignItems: "center", cursor: "pointer" }}>
            <span className="row" style={{ ["--gap" as string]: "10px" }}>
              <input
                type="checkbox"
                checked={h.habilitada}
                disabled={enCurso || (!h.disponible && !h.habilitada)}
                onChange={(e) => cambiar(h.slug, e.currentTarget.checked)}
                style={{ width: 18, height: 18, accentColor: "var(--acento)" }}
              />
              {h.nombre}
            </span>
            {!h.disponible ? (
              <span className="badge">{t.noDisponible}</span>
            ) : h.pendiente ? (
              <span className="badge ambar">{t.pendiente}</span>
            ) : null}
          </label>
        ))}
      </div>
    </div>
  );
}
