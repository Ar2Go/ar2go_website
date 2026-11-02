import type { Metadata } from "next";
import { ErrorDeCarga, SinConfigurar } from "@/components/admin/Estados";
import { fecha } from "@/components/admin/formato";
import { TituloAdmin } from "@/components/admin/TituloAdmin";
import { admin } from "@/content/admin";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { hayAdminDePlanoDeControl, personasSinEmpresa, type PersonaSinEmpresa } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "../../operador";

export const metadata: Metadata = {
  title: "Sin empresa · Panel de administración",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function SinEmpresaPage() {
  const operador = await operadorActual();
  const t = admin.sinEmpresa;
  let personas: PersonaSinEmpresa[] | null = null;
  let error: string | null = null;
  if (hayAdminDePlanoDeControl) {
    try {
      personas = (await personasSinEmpresa(operador)).usuarios;
    } catch (e) {
      error = e instanceof ErrorCuenta ? (admin.avisos[e.code] ?? `${e.code}: ${e.message}`) : admin.avisos.general;
    }
  }

  return (
    <>
      <TituloAdmin titulo={admin.menu.sinEmpresa} apoyo={t.subtitulo} />
      {!hayAdminDePlanoDeControl && <SinConfigurar />}
      {error && <ErrorDeCarga error={error} />}
      {personas && (
        <>
          <div className="card">
            <div className="card-head">
              <span className="card-title">{t.titulo}</span>
            </div>
            {personas.length === 0 ? (
              <p className="vacio">{t.vacio}</p>
            ) : (
              <div className="table-wrap tabla-responsiva">
                <table className="tabla" style={{ minWidth: 520 }}>
                  <thead>
                    <tr>
                      {Object.values(t.columnas).map((c) => (
                        <th key={c} scope="col">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {personas.map((u) => (
                      <tr key={u.correo}>
                        <td className="celda-principal romper">{u.correo}</td>
                        <td data-label={t.columnas.nombre}>{u.nombre}</td>
                        <td data-label={t.columnas.alta} className="muted" style={{ whiteSpace: "nowrap" }}>
                          {fecha(u.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <p className="muted" style={{ fontSize: 13.5, maxWidth: 760 }}>
            {t.apoyo}
          </p>
        </>
      )}
    </>
  );
}
