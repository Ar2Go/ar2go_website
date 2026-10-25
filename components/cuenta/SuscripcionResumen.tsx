import Link from "next/link";
import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";
import { tienePago } from "@/lib/pagos";
import { cambiarPlanAccion } from "@/app/(cuenta)/cuenta/acciones";

// Orden de los planes de AR2GO (D37): solo se sube a uno posterior.
const PLANES = ["explorador", "navegante", "timonel"];

type Props = {
  // null: no hay plano de control o la persona todavía no da de alta su
  // empresa.
  empresa: string | null;
  // Plan de la empresa (slug y nombre). En ar2go-customers el plan es de la
  // empresa (D3): todos sus productos están en el mismo.
  plan: string | null;
  planNombre: string | null;
  // Cuántos productos puede tener activos según su plan; null = sin límite.
  maxProductos: number | null;
  productos: Producto[];
  // PROPIETARIO o ADMIN con la empresa sin cerrar: puede cambiar el plan.
  puedeEditar?: boolean;
};

// Sección "Suscripción" de /cuenta/configuracion: el plan de la empresa con
// cuántos productos incluye, y cada argonauta o argotipo contratado con su
// plan y su estado. "Cambiar plan" ofrece los planes superiores: los que
// tienen link de pago (lib/pagos.ts) mandan a Stripe y el equipo de AR2GO
// sube el plan desde /admin al ver el pago (D36; no hay webhooks hasta la
// fase 3). Activar o abrir productos sigue en /cuenta.
export function SuscripcionResumen({ empresa, plan, planNombre, maxProductos, productos, puedeEditar = false }: Props) {
  const t = cuenta.landing.configuracion.suscripcion;
  const e = cuenta.tablero;
  const contratados = productos.filter((p) => p.estado && p.estado !== "CANCELADA");
  const superiores = plan ? PLANES.slice(PLANES.indexOf(plan) + 1) : [];

  return (
    <div className="config-seccion">
      <h1 className="config-seccion__titulo">{t.titulo}</h1>

      {!empresa ? (
        <p className="suscripcion__nota">{t.sinEmpresa}</p>
      ) : (
        <>
          <div className="suscripcion__resumen">
            <div className="suscripcion__producto">
              <span>{planNombre}</span>
              <small>{t.productosIncluidos(contratados.length, maxProductos)}</small>
            </div>
          </div>

          {puedeEditar && superiores.length > 0 && (
            <details className="suscripcion__cambiar">
              <summary>{t.cambiarPlan}</summary>
              <form action={cambiarPlanAccion} className="suscripcion__planes">
                {plan && e.planes[plan] && (
                  <div className="suscripcion__opcion suscripcion__opcion--actual">
                    {e.planes[plan].nombre}
                    <span>{e.planes[plan].detalle}</span>
                    <small>{t.actual}</small>
                  </div>
                )}
                {superiores.map((s) =>
                  tienePago(s) ? (
                    <button key={s} type="submit" name="plan" value={s} className="btn btn--primary suscripcion__opcion">
                      {e.planes[s].nombre}
                      <span>{e.planes[s].detalle}</span>
                    </button>
                  ) : (
                    <div key={s} className="suscripcion__opcion suscripcion__opcion--actual">
                      {e.planes[s].nombre}
                      <span>{e.planes[s].detalle}</span>
                      <small className="suscripcion__pronto">{t.sinPago}</small>
                    </div>
                  ),
                )}
                <small className="suscripcion__nota">{t.notaPago}</small>
              </form>
            </details>
          )}

          <h2 className="suscripcion__subtitulo">{t.productos}</h2>
          {contratados.length === 0 ? (
            <p className="suscripcion__nota">{t.sinProductos}</p>
          ) : (
            <ul className="suscripcion__productos">
              {contratados.map((p) => {
                const info = cuenta.productos[p.slug];
                return (
                  <li key={p.slug}>
                    <div className="suscripcion__fila">
                      <div className="suscripcion__producto">
                        <span>{info?.nombre ?? p.nombre}</span>
                        {info && <small>{t.tipos[info.tipo]}</small>}
                      </div>
                      <span className="suscripcion__plan">{planNombre}</span>
                      <span
                        className={
                          p.estado === "ACTIVA" ? "cuenta__estado" : "cuenta__estado cuenta__estado--alerta"
                        }
                      >
                        {p.estado === "ACTIVA" ? e.activo : p.estado === "SUSPENDIDA" ? e.suspendido : e.preparando}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      <Link href="/cuenta" className="suscripcion__enlace">
        {t.verArgonautas}
      </Link>
    </div>
  );
}
