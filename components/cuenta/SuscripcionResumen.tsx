import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";
import { tienePago } from "@/lib/pagos";
import { cambiarPlanAccion, solicitarAccion } from "@/app/(cuenta)/cuenta/acciones";
import { InterruptorProducto } from "@/components/cuenta/InterruptorProducto";

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
  // Empresa activa (ni suspendida ni cerrada): puede activar y desactivar.
  empresaActiva?: boolean;
  // Hasta cuándo la selección de productos está fija (D38); null = no lo está.
  fijaHasta?: string | null;
  // Plan Explorador: lo que no está activo se solicita (el equipo lo aprueba), no se enciende.
  requiereSolicitud?: boolean;
};

// Sección "Suscripción" de /cuenta/configuracion: administra la suscripción.
// Arriba el plan de la empresa con cuántos productos incluye; abajo cada
// argonauta o argotipo disponible con su interruptor, para elegir cuáles
// tener activos dentro del límite del plan (Explorador 1, Navegante 5,
// Timonel todos; D37). Al llenar los lugares, la selección queda fija hasta
// el día 1 del mes siguiente (D38): los encendidos no se pueden apagar. "Cambiar plan" ofrece los planes superiores: los que
// tienen link de pago (lib/pagos.ts) mandan a Stripe y el equipo de AR2GO
// sube el plan desde /admin al ver el pago (D36; no hay webhooks hasta la
// fase 3). Abrir productos sigue en /cuenta.
export function SuscripcionResumen({ empresa, plan, planNombre, maxProductos, productos, puedeEditar = false, empresaActiva = true, fijaHasta = null, requiereSolicitud = false }: Props) {
  const t = cuenta.landing.configuracion.suscripcion;
  const e = cuenta.tablero;
  const contratados = productos.filter((p) => p.estado && p.estado !== "CANCELADA");
  const enLimite = maxProductos !== null && contratados.length >= maxProductos;
  // Fechas en la Ciudad de México, donde se cuenta el mes (D38).
  const fecha = (d: Date) =>
    d.toLocaleDateString("es-MX", { day: "numeric", month: "long", timeZone: "America/Mexico_City" });
  const fija = fijaHasta ? fecha(new Date(fijaHasta)) : null;
  // Día 1 del mes siguiente, para avisar al activar el que llena el plan.
  const hoy = new Date(Date.now() - 6 * 3600_000);
  const proximoMes = fecha(new Date(Date.UTC(hoy.getUTCFullYear(), hoy.getUTCMonth() + 1, 1, 12)));
  const llenaria = maxProductos !== null && contratados.length + 1 === maxProductos;
  // Explorador pide una sola herramienta: con una solicitud esperando, las demás no se pueden pedir.
  const solicitudEnCurso = requiereSolicitud && productos.some((p) => p.solicitud_pendiente);
  const elegibles = productos.filter((p) => p.disponible || (p.estado && p.estado !== "CANCELADA"));
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
              {fija && <small>{t.fijaHasta(fija)}</small>}
            </div>
          </div>

          {puedeEditar && superiores.length > 0 && (
            <details className="suscripcion__cambiar">
              <summary>{t.cambiarPlan}</summary>
              <form action={cambiarPlanAccion} className="suscripcion__planes">
                {/* Mismo tamaño y orden en todas: nombre, detalle y una línea de estado. El actual resalta;
                    los demás reaccionan al pasar el mouse. Sin link de pago, la misma línea lo dice. */}
                {[...(plan && e.planes[plan] ? [plan] : []), ...superiores].map((s) => {
                  const contenido = (estado: string) => (
                    <>
                      <strong>{e.planes[s].nombre}</strong>
                      <span>{e.planes[s].detalle}</span>
                      <small>{estado}</small>
                    </>
                  );
                  if (s === plan)
                    return (
                      <div key={s} className="suscripcion__opcion suscripcion__opcion--actual" aria-current="true">
                        {contenido(t.actual)}
                      </div>
                    );
                  if (tienePago(s))
                    return (
                      <button
                        key={s}
                        type="submit"
                        name="plan"
                        value={s}
                        className="suscripcion__opcion suscripcion__opcion--elegible"
                      >
                        {contenido(t.contratar)}
                      </button>
                    );
                  return (
                    <div key={s} className="suscripcion__opcion suscripcion__opcion--pronto" aria-disabled="true">
                      {contenido(t.sinPago)}
                    </div>
                  );
                })}
                <small className="suscripcion__nota">{t.notaPago}</small>
              </form>
            </details>
          )}

          <h2 className="suscripcion__subtitulo">{t.productos}</h2>
          {elegibles.length === 0 ? (
            <p className="suscripcion__nota">{t.sinProductos}</p>
          ) : (
            <ul className="suscripcion__productos">
              {elegibles.map((p) => {
                const info = cuenta.productos[p.slug];
                const nombre = info?.nombre ?? p.nombre;
                const activo = !!p.estado && p.estado !== "CANCELADA";
                return (
                  <li key={p.slug}>
                    <div className="suscripcion__fila">
                      <div className="suscripcion__producto">
                        <span>{nombre}</span>
                        {info && <small>{t.tipos[info.tipo]}</small>}
                      </div>
                      {activo && p.estado !== "ACTIVA" && (
                        <span className="cuenta__estado cuenta__estado--alerta">
                          {p.estado === "SUSPENDIDA" ? e.suspendido : e.preparando}
                        </span>
                      )}
                      {requiereSolicitud && !activo ? (
                        p.solicitud_pendiente ? (
                          <span className="suscripcion__nota">{e.solicitudEnviada}</span>
                        ) : (
                          <form action={solicitarAccion}>
                            <input type="hidden" name="producto" value={p.slug} />
                            <input type="hidden" name="volver" value="suscripcion" />
                            <button
                              type="submit"
                              className="btn btn--ghost"
                              disabled={!puedeEditar || !empresaActiva || enLimite || solicitudEnCurso || !p.disponible}
                            >
                              {e.solicitar}
                            </button>
                          </form>
                        )
                      ) : (
                      <InterruptorProducto
                        producto={p.slug}
                        nombre={nombre}
                        activo={activo}
                        disabled={
                          !puedeEditar || !empresaActiva || (activo ? !!fija : enLimite || !p.disponible)
                        }
                        confirmar={t.confirmarDesactivar(nombre)}
                        confirmarActivar={llenaria ? t.confirmarLlenar(nombre, proximoMes) : null}
                      />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
