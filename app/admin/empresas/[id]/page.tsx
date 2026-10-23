import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CambiarEstado } from "@/components/admin/CambiarEstado";
import { EliminarEmpresa } from "@/components/admin/EliminarEmpresa";
import { EncabezadoAdmin } from "@/components/admin/EncabezadoAdmin";
import { claseEstado, fecha } from "@/components/admin/formato";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { admin } from "@/content/admin";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { detalleEmpresa, hayAdminDePlanoDeControl, type DetalleEmpresa } from "@/lib/ar2go-customers-admin";
import { medidaMaxima, tipografia } from "@/lib/typography";
import { cambiarPlanAccion } from "../../acciones";
import { operadorActual } from "../../operador";

export const metadata: Metadata = {
  title: "Cliente · Panel de administración",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ES_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const th = `px-3 py-2 text-left ${tipografia.eyebrow}`;
const td = `px-3 py-3 align-top ${tipografia.cuerpoChico}`;
const campo =
  "mt-2 w-full rounded-btn border border-linea/20 bg-fondo px-3 py-2 text-niebla focus-visible:outline focus-visible:outline-2 focus-visible:outline-azul";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aviso?: string }>;
};

const limites = (l: Record<string, number | null>) =>
  Object.entries(l)
    .map(([k, v]) => `${k}: ${v ?? admin.detalle.sinLimite}`)
    .join(", ") || "—";

export default async function EmpresaAdminPage({ params, searchParams }: Props) {
  const operador = await operadorActual();
  const [{ id }, { aviso }] = await Promise.all([params, searchParams]);
  if (!ES_UUID.test(id) || !hayAdminDePlanoDeControl) notFound();

  let d: DetalleEmpresa;
  try {
    d = await detalleEmpresa(operador, id);
  } catch (e) {
    if (e instanceof ErrorCuenta && e.code === "EMPRESA_NO_ENCONTRADA") notFound();
    throw e;
  }
  const textoAviso = aviso ? (admin.avisos[aviso] ?? admin.avisos.general) : null;
  const esExito = aviso === "PLAN_CAMBIADO" || aviso === "ESTADO_CAMBIADO";
  const datos: [string, string, string?][] = [
    [admin.detalle.campos.alta, fecha(d.empresa.created_at)],
    [admin.detalle.campos.estado, d.empresa.estado, claseEstado(d.empresa.estado)],
    [admin.detalle.campos.plan, d.empresa.plan_nombre],
    [admin.detalle.campos.pago, d.empresa.estado_pago, claseEstado(d.empresa.estado_pago)],
    [admin.detalle.campos.rfc, d.empresa.rfc ?? "—"],
    [admin.detalle.campos.id, d.empresa.id],
  ];

  return (
    <>
      <Header />
      <Section background="fondo">
        <Link href="/admin" className={`${tipografia.cuerpoChico} text-azul-suave underline-offset-4 hover:underline`}>
          ← {admin.detalle.volver}
        </Link>
        <div className="mt-6">
          <EncabezadoAdmin operador={operador} titulo={d.empresa.nombre} />
        </div>

        {textoAviso && (
          <p
            role={esExito ? "status" : "alert"}
            className={`mt-8 rounded-card border p-4 ${tipografia.cuerpoChico} ${
              esExito ? "border-exito/40 bg-exito/10 text-exito" : "border-error/40 bg-error/10 text-error"
            }`}
          >
            {textoAviso}
          </p>
        )}

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Card>
            <p className={tipografia.eyebrow}>{admin.detalle.datos}</p>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
              {datos.map(([k, v, clase]) => (
                <div key={k} className="contents">
                  <dt className={`${tipografia.cuerpoChico} text-gris`}>{k}</dt>
                  <dd className={`${tipografia.cuerpoChico} break-all ${clase ?? ""}`}>{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <p className={tipografia.eyebrow}>{admin.cambiarPlan.titulo}</p>
            <p className={`mt-3 ${tipografia.cuerpoChico} text-gris`}>{admin.cambiarPlan.apoyo}</p>
            <form action={cambiarPlanAccion} className="mt-4">
              <input type="hidden" name="empresa_id" value={d.empresa.id} />
              <label className={`block ${tipografia.cuerpoChico}`}>
                {admin.cambiarPlan.plan}
                <select name="plan" defaultValue={d.empresa.plan} className={campo}>
                  {d.planes.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </label>
              <label className={`mt-4 block ${tipografia.cuerpoChico}`}>
                {admin.cambiarPlan.motivo}
                <input
                  name="motivo"
                  required
                  minLength={3}
                  maxLength={500}
                  placeholder={admin.cambiarPlan.ejemplo}
                  className={campo}
                />
              </label>
              <Button type="submit" variant="primary" className="mt-5">
                {admin.cambiarPlan.enviar}
              </Button>
            </form>
          </Card>

          <CambiarEstado empresaId={d.empresa.id} estado={d.empresa.estado} campo={campo} />
        </div>

        {d.puede_eliminar && <EliminarEmpresa empresaId={d.empresa.id} nombre={d.empresa.nombre} campo={campo} />}

        <h2 className={`mt-14 ${tipografia.h3}`}>{admin.detalle.miembros}</h2>
        <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
          <table className="w-full min-w-[560px] border-collapse">
            <tbody>
              {d.miembros.map((m) => (
                <tr key={m.correo} className="border-t border-linea/10 first:border-t-0">
                  <td className={`${td} break-all`}>{m.correo}</td>
                  <td className={td}>{m.nombre}</td>
                  <td className={`${td} font-mono`}>{m.rol}</td>
                  <td className={`${td} whitespace-nowrap text-gris`}>{fecha(m.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className={`mt-14 ${tipografia.h3}`}>{admin.detalle.suscripciones}</h2>
        {d.suscripciones.length === 0 ? (
          <p className={`mt-4 ${tipografia.cuerpoChico} text-gris`}>{admin.detalle.sinSuscripciones}</p>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
            <table className="w-full min-w-[720px] border-collapse">
              <thead className="bg-superficie">
                <tr>
                  {Object.values(admin.detalle.columnasSuscripcion).map((c) => (
                    <th key={c} scope="col" className={th}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.suscripciones.map((s) => (
                  <tr key={s.producto} className="border-t border-linea/10">
                    <td className={td}>{s.producto_nombre}</td>
                    <td className={`${td} ${claseEstado(s.estado_efectivo ?? s.estado)}`}>
                      {s.estado_efectivo ?? s.estado}
                    </td>
                    <td className={`${td} font-mono`}>{limites(s.limites)}</td>
                    <td className={td}>
                      <span className="font-mono">
                        {s.version_aplicada} / {s.version}
                      </span>
                      {s.version_aplicada < s.version && (
                        <span className="ml-2 text-error">
                          {s.requiere_atencion ? admin.pendientes.requiereAtencion : admin.detalle.pendiente}
                        </span>
                      )}
                    </td>
                    <td className={`${td} break-all text-gris`}>{s.ultimo_error ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {d.legal && (
          <>
            <h2 className={`mt-14 ${tipografia.h3}`}>{admin.legal.titulo}</h2>
            <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>
              {admin.legal.apoyo} {d.legal.exigida ? admin.legal.exigida : admin.legal.noExigida}
            </p>
            {d.legal.documentos
              .filter((doc) => doc.todo_legal > 0)
              .map((doc) => (
                <p
                  key={doc.slug}
                  role="note"
                  className={`mt-3 rounded-card border border-error/40 bg-error/10 p-3 text-error ${tipografia.cuerpoChico}`}
                >
                  {admin.legal.todoLegal(doc.slug, doc.version, doc.todo_legal)}
                </p>
              ))}
            {d.legal.aceptaciones.length === 0 ? (
              <p className={`mt-4 ${tipografia.cuerpoChico} text-gris`}>{admin.legal.sinAceptaciones}</p>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead className="bg-superficie">
                    <tr>
                      {Object.values(admin.legal.columnas).map((c) => (
                        <th key={c} scope="col" className={th}>
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.legal.aceptaciones.map((a) => (
                      <tr key={`${a.documento}-${a.version}-${a.created_at}`} className="border-t border-linea/10">
                        <td className={`${td} whitespace-nowrap text-gris`}>{fecha(a.created_at)}</td>
                        <td className={td}>{a.documento}</td>
                        <td className={`${td} font-mono`}>{a.version}</td>
                        <td className={`${td} break-all`}>
                          {a.aceptante} · {a.correo}
                        </td>
                        <td className={`${td} font-mono text-gris`}>{a.ip ?? "—"}</td>
                        <td className={`${td} break-all font-mono text-gris`} title={a.sha256_texto}>
                          {a.sha256_texto.slice(0, 16)}…
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        <h2 className={`mt-14 ${tipografia.h3}`}>{admin.detalle.bitacora}</h2>
        <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>{admin.detalle.bitacoraApoyo}</p>
        <div className="mt-4 overflow-x-auto rounded-card border border-linea/10">
          <table className="w-full min-w-[720px] border-collapse">
            <thead className="bg-superficie">
              <tr>
                {Object.values(admin.detalle.columnasBitacora).map((c) => (
                  <th key={c} scope="col" className={th}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.bitacora.map((b, i) => (
                <tr key={`${b.created_at}-${i}`} className="border-t border-linea/10">
                  <td className={`${td} whitespace-nowrap text-gris`}>{fecha(b.created_at)}</td>
                  <td className={`${td} break-all`}>{b.actor}</td>
                  <td className={td}>{admin.acciones[b.accion] ?? b.accion}</td>
                  <td className={`${td} break-all font-mono text-gris`}>
                    {Object.keys(b.detalle).length ? JSON.stringify(b.detalle) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Footer />
    </>
  );
}
