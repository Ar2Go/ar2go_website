import { abrirAccion, activarAccion } from "@/app/(cuenta)/cuenta/acciones";
import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";

type Props = {
  // null: ar2go-customers no está configurado y no se sabe el estado de cada
  // producto; se muestran todos como "Próximamente".
  productos: Producto[] | null;
  puedeActivar: boolean;
};

// Cinta de argonautas de /cuenta: primero los productos del catálogo de
// ar2go-customers (hoy HorIQ), con lo que la persona puede hacer en cada uno
// (abrirlo con login único o activarlo dentro de su plan); después los que
// todavía no existen (content/cuenta.ts → porVenir), solo como "Próximamente".
export function CintaProductos({ productos, puedeActivar }: Props) {
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

  return (
    <section className="cinta" aria-labelledby="cinta-titulo">
      <header className="cinta__encabezado">
        <h2 id="cinta-titulo">{cuenta.cinta.titulo}</h2>
        <p>{cuenta.cinta.apoyo}</p>
      </header>

      <ul className="cinta__lista">
        {catalogo.map((p) => {
          const info = cuenta.productos[p.slug];
          return (
            <li key={p.slug} className="cinta__tarjeta">
              <p className="cinta__nombre">
                {info?.nombre ?? p.nombre}
                {p.estado === "ACTIVA" && <span className="cuenta__estado">{t.activo}</span>}
                {p.estado === "SUSPENDIDA" && (
                  <span className="cuenta__estado cuenta__estado--alerta">{t.suspendido}</span>
                )}
              </p>
              {info && <p className="cinta__desc">{info.descripcion}</p>}
              <form action={p.puede_abrir ? abrirAccion : activarAccion} className="cinta__accion">
                <input type="hidden" name="producto" value={p.slug} />
                {p.puede_abrir ? (
                  <button type="submit" className="btn btn--primary">
                    {t.abrir}
                  </button>
                ) : !p.disponible ? (
                  <span className="cinta__nota">{t.proximamente}</span>
                ) : p.estado && p.estado !== "CANCELADA" ? (
                  <span className="cinta__nota">{t.preparando}</span>
                ) : (
                  puedeActivar && (
                    <button type="submit" className="btn btn--ghost">
                      {t.activar}
                    </button>
                  )
                )}
              </form>
            </li>
          );
        })}

        {cuenta.porVenir.map((p) => (
          <li key={p.slug} className="cinta__tarjeta cinta__tarjeta--por-venir">
            <p className="cinta__nombre">{p.nombre}</p>
            <p className="cinta__desc">{p.descripcion}</p>
            <div className="cinta__accion">
              <span className="cinta__nota">{t.proximamente}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
