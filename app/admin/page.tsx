import type { Metadata } from "next";
import Link from "next/link";
import { EncabezadoAdmin } from "@/components/admin/EncabezadoAdmin";
import { claseEstado, fecha } from "@/components/admin/formato";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { admin } from "@/content/admin";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import {
  hayAdminDePlanoDeControl,
  listarEmpresas,
  personasSinEmpresa,
  type EmpresaListada,
  type PersonaSinEmpresa,
} from "@/lib/ar2go-customers-admin";
import { medidaMaxima, tipografia } from "@/lib/typography";
import { operadorActual } from "./operador";

export const metadata: Metadata = {
  title: "Panel de administración",
  robots: { index: false, follow: false },
};

// Siempre fresco: es la vista de quién se acaba de dar de alta.
export const dynamic = "force-dynamic";

const th = `px-3 py-2 text-left ${tipografia.eyebrow}`;
const td = `px-3 py-3 align-top ${tipografia.cuerpoChico}`;

export default async function AdminPage() {
  const operador = await operadorActual();

  let datos: { empresas: EmpresaListada[]; sinEmpresa: PersonaSinEmpresa[] } | null = null;
  let error: string | null = null;
  if (hayAdminDePlanoDeControl) {
    try {
      const [e, s] = await Promise.all([listarEmpresas(operador), personasSinEmpresa(operador)]);
      datos = { empresas: e.empresas, sinEmpresa: s.usuarios };
    } catch (e) {
      error = e instanceof ErrorCuenta ? (admin.avisos[e.code] ?? `${e.code}: ${e.message}`) : admin.avisos.general;
    }
  }

  const porPlan = new Map<string, number>();
  for (const e of datos?.empresas ?? []) porPlan.set(e.plan_nombre, (porPlan.get(e.plan_nombre) ?? 0) + 1);

  return (
    <>
      <Header />
      <Section background="fondo">
        <EncabezadoAdmin operador={operador} titulo={admin.empresas.titulo} />

        {!hayAdminDePlanoDeControl && (
          <Card className="mt-10">
            <p className={tipografia.h3}>{admin.sinConfigurar.titulo}</p>
            <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>
              {admin.sinConfigurar.apoyo}
            </p>
          </Card>
        )}

        {error && (
          <p
            role="alert"
            className={`mt-10 rounded-card border border-error/40 bg-error/10 p-4 ${tipografia.cuerpoChico} text-error`}
          >
            {admin.errorCarga}: {error}
          </p>
        )}

        {datos && (
          <>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <Card>
                <p className={tipografia.eyebrow}>{admin.resumen.empresas}</p>
                <p className={`mt-3 ${tipografia.precio}`}>{datos.empresas.length}</p>
              </Card>
              <Card>
                <p className={tipografia.eyebrow}>{admin.resumen.porPlan}</p>
                <ul className={`mt-3 space-y-1 ${tipografia.cuerpoChico}`}>
                  {[...porPlan].map(([plan, n]) => (
                    <li key={plan}>
                      {plan} · <span className="font-mono">{n}</span>
                    </li>
                  ))}
                  {porPlan.size === 0 && <li className="text-gris">{admin.empresas.ninguno}</li>}
                </ul>
              </Card>
              <Card>
                <p className={tipografia.eyebrow}>{admin.resumen.sinEmpresa}</p>
                <p className={`mt-3 ${tipografia.precio}`}>{datos.sinEmpresa.length}</p>
              </Card>
            </div>

            <p className={`mt-12 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>{admin.empresas.apoyo}</p>
            {datos.empresas.length === 0 ? (
              <p className={`mt-4 ${tipografia.cuerpoChico} text-gris`}>{admin.empresas.vacio}</p>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead className="bg-superficie">
                    <tr>
                      {Object.values(admin.empresas.columnas).map((c) => (
                        <th key={c} scope="col" className={th}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datos.empresas.map((e) => (
                      <tr key={e.id} className="border-t border-linea/10">
                        <td className={td}>
                          <Link
                            href={`/admin/empresas/${e.id}`}
                            className="text-azul-suave underline-offset-4 hover:underline"
                          >
                            {e.nombre}
                          </Link>
                        </td>
                        <td className={`${td} whitespace-nowrap text-gris`}>{fecha(e.created_at)}</td>
                        <td className={td}>{e.plan_nombre}</td>
                        <td className={`${td} break-all`}>{e.propietario ?? admin.empresas.ninguno}</td>
                        <td className={`${td} font-mono`}>{e.usuarios}</td>
                        <td className={td}>
                          {e.productos.length === 0
                            ? admin.empresas.ninguno
                            : e.productos.map((p) => (
                                <span key={p.producto} className="mr-2 inline-block">
                                  {p.producto} <span className={claseEstado(p.estado)}>{p.estado}</span>
                                </span>
                              ))}
                        </td>
                        <td className={`${td} ${claseEstado(e.estado)}`}>{e.estado}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <h2 className={`mt-16 ${tipografia.h3}`}>{admin.sinEmpresa.titulo}</h2>
            <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>{admin.sinEmpresa.apoyo}</p>
            {datos.sinEmpresa.length === 0 ? (
              <p className={`mt-4 ${tipografia.cuerpoChico} text-gris`}>{admin.sinEmpresa.vacio}</p>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
                <table className="w-full min-w-[520px] border-collapse">
                  <thead className="bg-superficie">
                    <tr>
                      {Object.values(admin.sinEmpresa.columnas).map((c) => (
                        <th key={c} scope="col" className={th}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {datos.sinEmpresa.map((u) => (
                      <tr key={u.correo} className="border-t border-linea/10">
                        <td className={`${td} break-all`}>{u.correo}</td>
                        <td className={td}>{u.nombre}</td>
                        <td className={`${td} whitespace-nowrap text-gris`}>{fecha(u.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </Section>
      <Footer />
    </>
  );
}
