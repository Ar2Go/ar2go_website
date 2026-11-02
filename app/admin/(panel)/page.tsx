import type { Metadata } from "next";
import Link from "next/link";
import { badgeEstado, fecha, textoEstado } from "@/components/admin/formato";
import { SinConfigurar, ErrorDeCarga } from "@/components/admin/Estados";
import { FilaEnlace } from "@/components/admin/FilaEnlace";
import { TituloAdmin } from "@/components/admin/TituloAdmin";
import { admin } from "@/content/admin";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import {
  hayAdminDePlanoDeControl,
  listarEmpresas,
  personasSinEmpresa,
  type EmpresaListada,
} from "@/lib/ar2go-customers-admin";
import { operadorActual } from "../operador";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

// Siempre fresco: es la vista de quién se acaba de dar de alta.
export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ aviso?: string; clerk?: string }> };

export default async function AdminPage({ searchParams }: Props) {
  const operador = await operadorActual();
  const { aviso, clerk } = await searchParams;
  const t = admin.empresas;

  let datos: { empresas: EmpresaListada[]; sinEmpresa: number } | null = null;
  let error: string | null = null;
  if (hayAdminDePlanoDeControl) {
    try {
      const [e, s] = await Promise.all([listarEmpresas(operador), personasSinEmpresa(operador)]);
      datos = { empresas: e.empresas, sinEmpresa: s.usuarios.length };
    } catch (e) {
      error = e instanceof ErrorCuenta ? (admin.avisos[e.code] ?? `${e.code}: ${e.message}`) : admin.avisos.general;
    }
  }

  const porPlan = new Map<string, number>();
  for (const e of datos?.empresas ?? []) porPlan.set(e.plan_nombre, (porPlan.get(e.plan_nombre) ?? 0) + 1);
  const activas = datos?.empresas.filter((e) => e.estado === "ACTIVA").length ?? 0;

  return (
    <>
      <TituloAdmin titulo={t.titulo} apoyo={t.apoyo} aviso={aviso} detalleAviso={aviso === "CLERK_PENDIENTE" ? clerk : null} />
      {!hayAdminDePlanoDeControl && <SinConfigurar />}
      {error && <ErrorDeCarga error={error} />}

      {datos && (
        <>
          <div className="kpis">
            <div className="card kpi">
              <span className="etiqueta">{admin.resumen.empresas}</span>
              <span className="kpi-valor">{datos.empresas.length}</span>
              <span className="muted" style={{ fontSize: 13.5 }}>
                {activas} {admin.resumen.activas}
              </span>
            </div>
            <div className="card kpi">
              <span className="etiqueta">{admin.resumen.porPlan}</span>
              {porPlan.size === 0 ? (
                <span className="muted">{t.ninguno}</span>
              ) : (
                [...porPlan].map(([plan, n]) => (
                  <span key={plan} className="spread" style={{ fontSize: 14.5 }}>
                    {plan}
                    <b>{n}</b>
                  </span>
                ))
              )}
            </div>
            <Link href="/admin/sin-empresa" className="card kpi" style={{ color: "inherit", textDecoration: "none" }}>
              <span className="etiqueta">{admin.resumen.sinEmpresa}</span>
              <span className="kpi-valor">{datos.sinEmpresa}</span>
              <span className="muted" style={{ fontSize: 13.5 }}>
                {admin.resumen.sinEmpresaApoyo}
              </span>
            </Link>
          </div>

          <div className="card">
            <div className="card-head">
              <span className="card-title">{t.lista}</span>
              <span className="muted" style={{ fontSize: 13.5 }}>
                {datos.empresas.length} {datos.empresas.length === 1 ? t.empresa : t.empresasPlural}
              </span>
            </div>
            {datos.empresas.length === 0 ? (
              <p className="vacio">{t.vacio}</p>
            ) : (
              <div className="table-wrap tabla-responsiva">
                <table className="tabla" style={{ minWidth: 760 }}>
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
                    {datos.empresas.map((e) => (
                      <FilaEnlace key={e.id} href={`/admin/empresas/${e.id}`}>
                        <td className="celda-principal">
                          <Link href={`/admin/empresas/${e.id}`}>{e.nombre}</Link>
                        </td>
                        <td data-label={t.columnas.alta} className="muted" style={{ whiteSpace: "nowrap" }}>
                          {fecha(e.created_at)}
                        </td>
                        <td data-label={t.columnas.plan}>{e.plan_nombre}</td>
                        <td data-label={t.columnas.propietario} className="celda-ancha" style={{ whiteSpace: "nowrap" }}>
                          {e.propietario ?? t.ninguno}
                        </td>
                        <td data-label={t.columnas.usuarios}>{e.usuarios}</td>
                        <td data-label={t.columnas.productos}>
                          {e.productos.length === 0 ? (
                            <span className="muted">{t.ninguno}</span>
                          ) : (
                            <span className="row" style={{ ["--gap" as string]: "6px" }}>
                              {e.productos.map((p) => (
                                <span key={p.producto} className={badgeEstado(p.estado)} title={textoEstado(p.estado)}>
                                  {p.producto}
                                </span>
                              ))}
                            </span>
                          )}
                        </td>
                        <td data-label={t.columnas.estado}>
                          <span className={badgeEstado(e.estado)}>{textoEstado(e.estado)}</span>
                        </td>
                      </FilaEnlace>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
