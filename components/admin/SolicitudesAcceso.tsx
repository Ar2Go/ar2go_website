import Link from "next/link";
import { aprobarSolicitudAccion, rechazarSolicitudAccion } from "@/app/admin/acciones";
import { BotonEnviar } from "@/components/admin/BotonEnviar";
import { fecha, transcurrido } from "@/components/admin/formato";
import { admin } from "@/content/admin";
import type { SolicitudAcceso } from "@/lib/ar2go-customers-admin";

type Props = { solicitudes: SolicitudAcceso[] | null };

// Pendientes → Solicitudes de acceso del plan Explorador, la más antigua primero, con cuánto lleva
// esperando. "Dar acceso" habilita la herramienta por 2 meses; "Rechazar" solo cierra la solicitud.
// null: la API no respondió esta parte, y se dice en vez de esconderla.
export function SolicitudesAcceso({ solicitudes }: Props) {
  const t = admin.solicitudes;
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">{t.titulo}</span>
        {solicitudes && solicitudes.length > 0 && (
          <span className="badge solido">
            {solicitudes.length} {solicitudes.length === 1 ? t.porAtender : t.porAtenderPlural}
          </span>
        )}
      </div>
      {solicitudes === null ? (
        <p className="vacio" style={{ color: "var(--rojo)" }}>
          {t.sinDatos}
        </p>
      ) : solicitudes.length === 0 ? (
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
              {solicitudes.map((s) => (
                <tr key={s.id}>
                  <td className="celda-principal">
                    <Link href={`/admin/empresas/${s.empresa_id}`}>{s.empresa}</Link>
                  </td>
                  <td data-label={t.columnas.herramienta}>{s.producto_nombre}</td>
                  <td data-label={t.columnas.quien} className="celda-ancha" style={{ whiteSpace: "nowrap" }}>
                    {s.correo}
                  </td>
                  <td data-label={t.columnas.espera} title={fecha(s.created_at)}>
                    <span className="badge ambar">{transcurrido(s.created_at)}</span>
                  </td>
                  <td className="celda-principal">
                    <div className="row" style={{ ["--gap" as string]: "8px", justifyContent: "flex-end" }}>
                      <form action={rechazarSolicitudAccion}>
                        <input type="hidden" name="id" value={s.id} />
                        <BotonEnviar className="btn btn-sm" enCurso={t.rechazando}>
                          {t.rechazar}
                        </BotonEnviar>
                      </form>
                      <form action={aprobarSolicitudAccion}>
                        <input type="hidden" name="id" value={s.id} />
                        <BotonEnviar className="btn btn-sm btn-primary" enCurso={t.aprobando}>
                          {t.aprobar}
                        </BotonEnviar>
                      </form>
                    </div>
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
