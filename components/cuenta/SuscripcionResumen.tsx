import Link from "next/link";
import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";
import { tienePago } from "@/lib/pagos";
import { cambiarPlanAccion } from "@/app/(cuenta)/cuenta/acciones";

type Props = {
  // null: no hay plano de control o la persona todavía no da de alta su
  // empresa.
  empresa: string | null;
  // Plan de la empresa (slug y nombre). En ar2go-customers el plan es de la
  // empresa (D3): todos sus productos están en el mismo.
  plan: string | null;
  planNombre: string | null;
  productos: Producto[];
  // PROPIETARIO o ADMIN con la empresa sin cerrar: puede cambiar el plan.
  puedeEditar?: boolean;
};

// Sección "Suscripción" de /cuenta/configuracion: cada argonauta o argotipo
// contratado con su plan y su estado. Donde hay plan superior con pago en
// línea (lib/pagos.ts) se puede cambiar: Equipo manda al link de pago, igual
// que al activar, y el equipo de AR2GO sube el plan desde /admin al ver el
// pago (no hay webhooks hasta la fase 3). Activar o abrir sigue en /cuenta.
export function SuscripcionResumen({ empresa, plan, planNombre, productos, puedeEditar = false }: Props) {
  const t = cuenta.landing.configuracion.suscripcion;
  const e = cuenta.tablero;
  const contratados = productos.filter((p) => p.estado && p.estado !== "CANCELADA");

  return (
    <div className="config-seccion">
      <h1 className="config-seccion__titulo">{t.titulo}</h1>

      {!empresa ? (
        <p className="suscripcion__nota">{t.sinEmpresa}</p>
      ) : contratados.length === 0 ? (
        <p className="suscripcion__nota">{t.sinProductos}</p>
      ) : (
        <ul className="suscripcion__productos">
          {contratados.map((p) => {
            const info = cuenta.productos[p.slug];
            const puedeCambiar = puedeEditar && plan === "explorar" && tienePago(p.slug);
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
                {puedeCambiar && (
                  <details className="suscripcion__cambiar">
                    <summary>{t.cambiarPlan}</summary>
                    <form action={cambiarPlanAccion} className="suscripcion__planes">
                      <input type="hidden" name="producto" value={p.slug} />
                      <div className="suscripcion__opcion suscripcion__opcion--actual">
                        {e.planes.explorar.nombre}
                        <span>{e.planes.explorar.detalle}</span>
                        <small>{t.actual}</small>
                      </div>
                      <button type="submit" name="plan" value="equipo" className="btn btn--primary suscripcion__opcion">
                        {e.planes.equipo.nombre}
                        <span>{e.planes.equipo.detalle}</span>
                      </button>
                      <small className="suscripcion__nota">{t.notaEquipo}</small>
                    </form>
                  </details>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <Link href="/cuenta" className="suscripcion__enlace">
        {t.verArgonautas}
      </Link>
    </div>
  );
}
