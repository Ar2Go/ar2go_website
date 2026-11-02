import type { Metadata } from "next";
import { agregarBloqueoAccion, quitarBloqueoAccion } from "@/app/admin/acciones";
import { ErrorDeCarga, SinConfigurar } from "@/components/admin/Estados";
import { fecha } from "@/components/admin/formato";
import { TituloAdmin } from "@/components/admin/TituloAdmin";
import { admin } from "@/content/admin";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { hayAdminDePlanoDeControl, listarBloqueos, type Bloqueo } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "../../operador";

export const metadata: Metadata = {
  title: "Seguridad · Panel de administración",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ aviso?: string }> };

// Correos y dominios que no pueden crear ni usar una cuenta de AR2GO (ni de Clerk, en el caso de los
// correos). Uno por renglón, con Quitar.
export default async function SeguridadPage({ searchParams }: Props) {
  const operador = await operadorActual();
  const { aviso } = await searchParams;
  const t = admin.seguridad;
  let bloqueos: Bloqueo[] | null = null;
  let error: string | null = null;
  if (hayAdminDePlanoDeControl) {
    try {
      bloqueos = (await listarBloqueos(operador)).bloqueos;
    } catch (e) {
      error = e instanceof ErrorCuenta ? (admin.avisos[e.code] ?? `${e.code}: ${e.message}`) : admin.avisos.general;
    }
  }

  return (
    <>
      <TituloAdmin titulo={t.titulo} apoyo={t.subtitulo} aviso={aviso} />
      {!hayAdminDePlanoDeControl && <SinConfigurar />}
      {error && <ErrorDeCarga error={error} />}
      {bloqueos && (
        <div className="card">
          <div className="card-head">
            <span className="card-title">{t.lista}</span>
          </div>
          <form action={agregarBloqueoAccion} className="card-cuerpo">
            <div className="row" style={{ alignItems: "flex-end" }}>
              <label className="campo grow">
                {t.campo}
                <input name="valor" required minLength={3} maxLength={320} autoComplete="off" placeholder={t.ejemplo} />
              </label>
              <button type="submit" className="btn btn-primary">
                {t.agregar}
              </button>
            </div>
          </form>
          {bloqueos.length === 0 ? (
            <p className="vacio" style={{ borderTop: "1px solid var(--linea)" }}>
              {t.vacio}
            </p>
          ) : (
            <div className="table-wrap tabla-responsiva" style={{ borderTop: "1px solid var(--borde)" }}>
              <table className="tabla" style={{ minWidth: 720 }}>
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
                  {bloqueos.map((b) => {
                    const dominio = b.valor.startsWith("@");
                    return (
                      <tr key={b.id}>
                        <td className="celda-principal romper" style={{ fontWeight: 600 }}>
                          {b.valor}
                        </td>
                        <td data-label={t.columnas.tipo}>
                          <span className="badge">{dominio ? t.dominio : t.correo}</span>
                        </td>
                        <td data-label={t.columnas.clerk}>
                          {b.clerk_id ? (
                            <span className="badge verde">{t.enClerk}</span>
                          ) : (
                            <span className="badge ambar">{dominio ? t.alEntrar : t.sinClerk}</span>
                          )}
                        </td>
                        <td data-label={t.columnas.quien} className="muted romper">
                          {b.creado_por.replace(/^admin:/, "")}
                        </td>
                        <td data-label={t.columnas.fecha} className="muted" style={{ whiteSpace: "nowrap" }}>
                          {fecha(b.created_at)}
                        </td>
                        <td className="celda-principal" style={{ textAlign: "right" }}>
                          <form action={quitarBloqueoAccion}>
                            <input type="hidden" name="id" value={b.id} />
                            <button type="submit" className="btn btn-sm">
                              {t.quitar}
                            </button>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
}
