import Link from "next/link";
import { reintentarAccion } from "@/app/admin/acciones";
import { fecha } from "@/components/admin/formato";
import { admin } from "@/content/admin";
import type { CambioPendiente } from "@/lib/ar2go-customers-admin";

type Props = { pendientes: CambioPendiente[] | null };

// Cambios que algún producto todavía no confirma, en todas las empresas
// (ar2go-customers reintenta solo cada 15 min con espera creciente). Los que
// requieren atención van primero y se pueden reintentar a mano. null: la API
// no respondió esta parte, y se dice en vez de esconderla.
export function CambiosPendientes({ pendientes }: Props) {
  const t = admin.pendientes;
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">{t.titulo}</span>
        {pendientes && pendientes.length > 0 && (
          <span className="badge solido">
            {pendientes.length} {t.porConfirmar}
          </span>
        )}
      </div>
      {pendientes === null ? (
        <p className="vacio" style={{ color: "var(--rojo)" }}>
          {t.sinDatos}
        </p>
      ) : pendientes.length === 0 ? (
        <p className="vacio">{t.vacio}</p>
      ) : (
        <div className="table-wrap tabla-responsiva">
          <table className="tabla" style={{ minWidth: 820 }}>
            <thead>
              <tr>
                {Object.values(t.columnas).map((c, i) => (
                  <th key={i} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pendientes.map((p) => (
                <tr key={p.suscripcion_id}>
                  <td className="celda-principal">
                    <Link href={`/admin/empresas/${p.empresa_id}`}>{p.empresa}</Link>
                  </td>
                  <td data-label={t.columnas.producto}>{p.producto}</td>
                  <td data-label={t.columnas.version}>
                    {p.version_aplicada} / {p.version}
                  </td>
                  <td data-label={t.columnas.estado}>
                    {p.requiere_atencion ? (
                      <span className="badge rojo">{t.requiereAtencion}</span>
                    ) : (
                      <span className="muted">
                        {t.siguiente} {fecha(p.proximo_intento_at)}
                      </span>
                    )}
                    <span className="muted" style={{ display: "block", fontSize: 12.5, marginTop: 4 }}>
                      {p.intentos} {t.intentos}
                    </span>
                  </td>
                  <td data-label={t.columnas.error} className="muted romper">{p.ultimo_error ?? "—"}</td>
                  <td className="celda-principal">
                    <form action={reintentarAccion}>
                      <input type="hidden" name="suscripcion_id" value={p.suscripcion_id} />
                      <button type="submit" className="btn btn-sm">
                        {t.reintentar}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
