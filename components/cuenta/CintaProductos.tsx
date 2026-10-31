import Link from "next/link";
import { abrirAccion, activarAccion } from "@/app/(cuenta)/cuenta/acciones";
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
};

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
        <form
          action={p.puede_abrir ? abrirAccion : activarAccion}
          className="cinta__accion"
        >
          <input type="hidden" name="producto" value={p.slug} />
          {bloqueo && !p.puede_abrir ? (
            <span className="cinta__nota">{bloqueo}</span>
          ) : p.puede_abrir ? (
            <button type="submit" className="btn btn--primary">
              {t.abrir}
            </button>
          ) : !p.disponible ? (
            <span className="cinta__nota">{t.proximamente}</span>
          ) : p.estado && p.estado !== "CANCELADA" ? (
            <span className="cinta__nota">{t.preparando}</span>
          ) : (
            puedeActivar &&
            (enLimite ? (
              <span className="cinta__limite">
                {t.limite}{" "}
                <Link href="/cuenta/configuracion/suscripcion">{t.cambiarPlan}</Link>
              </span>
            ) : (
              <button type="submit" className="btn btn--ghost">
                {t.activar}
              </button>
            ))
          )}
        </form>
        {/* Versión nueva de sus documentos en un producto que ya se usa: no
                  corta Abrir (D29), solo se avisa. */}
        {p.puede_abrir &&
          puedeActivar &&
          p.legal?.exigida &&
          p.legal.pendientes.length > 0 && (
            <Link href={`/cuenta/legal/${p.slug}`} className="cinta__legal">
              {cuenta.legalEmpresa.nuevaVersion}
            </Link>
          )}
      </li>
    );
  }
}
