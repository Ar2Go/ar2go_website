import { abrirAccion, activarAccion } from "@/app/(cuenta)/cuenta/acciones";
import { cuenta } from "@/content/cuenta";
import type { Producto } from "@/lib/ar2go-customers";

// Lista de productos del catálogo con lo que la persona puede hacer en cada
// uno: activarlo dentro de su plan o abrirlo con login único.
export function ProductosCuenta({ productos, puedeActivar }: { productos: Producto[]; puedeActivar: boolean }) {
  const t = cuenta.tablero;
  return (
    <ul className="cuenta__productos" aria-label={t.productos}>
      {productos.map((p) => (
        <li key={p.slug} className="cuenta__producto">
          <div>
            <p className="cuenta__producto-nombre">
              {p.nombre}
              {p.estado === "ACTIVA" && <span className="cuenta__estado">{t.activo}</span>}
              {p.estado === "SUSPENDIDA" && <span className="cuenta__estado cuenta__estado--alerta">{t.suspendido}</span>}
            </p>
            {cuenta.productos[p.slug] && <p className="cuenta__producto-desc">{cuenta.productos[p.slug]}</p>}
          </div>
          <form action={p.puede_abrir ? abrirAccion : activarAccion}>
            <input type="hidden" name="producto" value={p.slug} />
            {p.puede_abrir ? (
              <button type="submit" className="btn btn--primary">
                {t.abrir}
              </button>
            ) : !p.disponible ? (
              <span className="cuenta__producto-nota">{t.proximamente}</span>
            ) : p.estado && p.estado !== "CANCELADA" ? (
              <span className="cuenta__producto-nota">{t.preparando}</span>
            ) : (
              puedeActivar && (
                <button type="submit" className="btn btn--ghost">
                  {t.activar}
                </button>
              )
            )}
          </form>
        </li>
      ))}
    </ul>
  );
}
