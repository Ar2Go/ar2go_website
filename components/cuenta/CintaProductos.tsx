import Link from "next/link";
import { abrirAccion, activarAccion, solicitarAccion } from "@/app/(cuenta)/cuenta/acciones";
import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";

type Props = {
  // null: ar2go-customers no está configurado y no se sabe el estado de cada
  // producto; se muestran todos como "Próximamente".
  productos: Producto[] | null;
  puedeActivar: boolean;
  // Cuántos productos puede tener activos la empresa según su plan (D37);
  // null = sin límite. Al llegar, Activar cede su lugar a Cambiar plan.
  maxProductos?: number | null;
  // Texto en lugar de los botones cuando la empresa está suspendida o cerrada.
  bloqueo?: string | null;
  // Plan Explorador: "Solicitar acceso" en lugar de "Activar"; el equipo lo aprueba por 2 meses.
  requiereSolicitud?: boolean;
};

const fechaCorta = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "America/Mexico_City",
});

// Productos de /cuenta (catálogo de ar2go-customers), en dos grupos según su
// tipo en content/cuenta.ts: "Argonautas" (agentes autónomos, p. ej.
// Postio) y "Argotipos" (herramientas, p. ej. Horiq). Un grupo sin
// productos no se pinta. Cada tarjeta dice lo que la persona puede hacer:
// abrirlo con login único o activarlo dentro de su plan.
export function CintaProductos({
  productos,
  puedeActivar,
  maxProductos = null,
  bloqueo = null,
  requiereSolicitud = false,
}: Props) {
  const t = cuenta.tablero;
  const catalogo: Producto[] =
    productos ??
    Object.keys(cuenta.productos).map((slug) => ({
      slug,
      nombre: slug,
      estado: null,
      listo: false,
      disponible: false,
      puede_abrir: false,
    }));

  const activos = catalogo.filter((p) => p.estado && p.estado !== "CANCELADA").length;
  const enLimite = maxProductos !== null && activos >= maxProductos;
  // Explorador pide una sola herramienta: con una solicitud esperando, las demás no se pueden pedir.
  const solicitudEnCurso = requiereSolicitud && catalogo.some((p) => p.solicitud_pendiente);

  // Sin tipo en content/cuenta.ts, un producto nuevo cuenta como argonauta.
  const tipoDe = (p: Producto) => cuenta.productos[p.slug]?.tipo ?? "argonauta";
  const grupos = [
    {
      clave: "argonautas",
      textos: cuenta.cinta.argonautas,
      lista: catalogo.filter((p) => tipoDe(p) === "argonauta"),
    },
    {
      clave: "argotipos",
      textos: cuenta.cinta.argotipos,
      lista: catalogo.filter((p) => tipoDe(p) === "argotipo"),
    },
  ].filter((g) => g.lista.length > 0);

  return (
    <div id="argonautas" className="cinta">
      {grupos.map((g) => (
        <section
          key={g.clave}
          className="cinta__grupo"
          aria-labelledby={`cinta-${g.clave}`}
        >
          <header className="cinta__encabezado">
            <h2 id={`cinta-${g.clave}`}>{g.textos.titulo}</h2>
            <p>{g.textos.apoyo}</p>
          </header>
          <ul className="cinta__lista">{g.lista.map(tarjeta)}</ul>
        </section>
      ))}
    </div>
  );

  function tarjeta(p: Producto) {
    const info = cuenta.productos[p.slug];
    const vivo = !!p.estado && p.estado !== "CANCELADA";
    // Botón de la tarjeta (arriba de la línea), o null.
    let accion: React.ReactNode = null;
    // Estado del plan para el pie (abajo de la línea), o null.
    let nota: React.ReactNode = null;
    if (bloqueo && !p.puede_abrir) nota = <span className="cinta__nota">{bloqueo}</span>;
    else if (p.puede_abrir)
      accion = (
        <button type="submit" className="btn btn--primary">
          {t.abrir}
        </button>
      );
    else if (!p.disponible) nota = <span className="cinta__nota">{t.proximamente}</span>;
    else if (vivo) nota = <span className="cinta__nota">{t.preparando}</span>;
    else if (puedeActivar && enLimite)
      nota = (
        <span className="cinta__limite">
          {t.limite} <Link href="/cuenta/configuracion/suscripcion">{t.cambiarPlan}</Link>
        </span>
      );
    else if (puedeActivar && requiereSolicitud && p.solicitud_pendiente)
      nota = <span className="cinta__nota">{t.solicitudEnviada}</span>;
    else if (puedeActivar)
      accion = (
        <button type="submit" className="btn btn--ghost" disabled={solicitudEnCurso}>
          {requiereSolicitud ? t.solicitar : t.activar}
        </button>
      );
    const prueba = p.acceso_hasta && vivo ? t.pruebaHasta(fechaCorta.format(new Date(p.acceso_hasta))) : null;
    // Versión nueva de sus documentos en un producto que ya se usa: no corta Abrir (D29), solo se avisa.
    const legal = p.puede_abrir && puedeActivar && !!p.legal?.exigida && p.legal.pendientes.length > 0;
    return (
      <li key={p.slug} className="cinta__tarjeta">
        <p className="cinta__nombre">
          {info?.nombre ?? p.nombre}
          {p.estado === "ACTIVA" && (
            <span className="cuenta__estado">{t.activo}</span>
          )}
          {p.estado === "SUSPENDIDA" && (
            <span className="cuenta__estado cuenta__estado--alerta">
              {t.suspendido}
            </span>
          )}
          {p.estado === "CANCELADA" && bloqueo && (
            <span className="cuenta__estado cuenta__estado--alerta">
              {t.sinAcceso}
            </span>
          )}
        </p>
        {info && <p className="cinta__desc">{info.descripcion}</p>}
        {/* Arriba de la línea, la acción (Abrir, Solicitar acceso o Activar); abajo, lo del plan
            (prueba, límite, solicitud enviada, próximamente). Sin nada del plan, no hay línea. */}
        {accion && (
          <form
            action={p.puede_abrir ? abrirAccion : requiereSolicitud ? solicitarAccion : activarAccion}
            className="cinta__accion"
          >
            <input type="hidden" name="producto" value={p.slug} />
            {accion}
          </form>
        )}
        {(nota || prueba || legal) && (
          <div className="cinta__pie">
            {prueba && <p className="cinta__prueba">{prueba}</p>}
            {nota}
            {legal && (
              <Link href={`/cuenta/legal/${p.slug}`} className="cinta__legal">
                {cuenta.legalEmpresa.nuevaVersion}
              </Link>
            )}
          </div>
        )}
      </li>
    );
  }
}
