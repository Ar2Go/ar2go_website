import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { cambiarPlanAccion } from "@/app/admin/acciones";
import { CambiarEstado } from "@/components/admin/CambiarEstado";
import { EliminarEmpresa } from "@/components/admin/EliminarEmpresa";
import { diaDePrueba, fecha, transcurrido } from "@/components/admin/formato";
import { Herramientas } from "@/components/admin/Herramientas";
import { Icono } from "@/components/admin/Icono";
import { TituloAdmin } from "@/components/admin/TituloAdmin";
import { admin } from "@/content/admin";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { detalleEmpresa, hayAdminDePlanoDeControl, type DetalleEmpresa } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "../../../operador";

export const metadata: Metadata = {
  title: "Cliente · Panel de administración",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ES_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ aviso?: string }>;
};

// Detalle de un cliente: Datos, Herramientas habilitadas, Cambiar plan, Activar o desactivar cuenta,
// Eliminar cuenta y Bitácora.
export default async function EmpresaAdminPage({ params, searchParams }: Props) {
  const operador = await operadorActual();
  const [{ id }, { aviso }] = await Promise.all([params, searchParams]);
  // Una empresa que ya no existe (recién eliminada o un enlace viejo) regresa a la lista.
  if (!ES_UUID.test(id)) redirect("/admin?aviso=EMPRESA_NO_ENCONTRADA");
  if (!hayAdminDePlanoDeControl) notFound();

  let d: DetalleEmpresa;
  try {
    d = await detalleEmpresa(operador, id);
  } catch (e) {
    if (e instanceof ErrorCuenta && e.code === "EMPRESA_NO_ENCONTRADA") redirect("/admin?aviso=EMPRESA_NO_ENCONTRADA");
    throw e;
  }
  const t = admin.detalle;
  const propietario = d.miembros.find((m) => m.rol === "PROPIETARIO") ?? d.miembros[0];
  const datos: [string, string][] = [
    [t.campos.empresa, d.empresa.nombre],
    [t.campos.correo, propietario?.correo ?? "—"],
    [t.campos.responsable, propietario?.nombre ?? "—"],
    [t.campos.alta, fecha(d.empresa.created_at)],
  ];
  // Una casilla por producto del catálogo; marcada si la suscripción está viva.
  const herramientas = (d.productos ?? []).map((p) => {
    const s = d.suscripciones.find((x) => x.producto === p.slug);
    const pedida = d.solicitudes?.find((x) => x.producto === p.slug);
    return {
      slug: p.slug,
      nombre: p.nombre,
      disponible: p.disponible,
      habilitada: !!s && s.estado !== "CANCELADA" && s.estado !== "ELIMINADA",
      pendiente: !!s && s.version_aplicada < s.version,
      prueba: s?.acceso_hasta ? admin.herramientas.prueba(diaDePrueba(s.acceso_hasta)) : null,
      solicitud: pedida ? admin.herramientas.solicitud(transcurrido(pedida.created_at)) : null,
    };
  });

  return (
    <>
      <Link href="/admin" className="volver">
        <Icono nombre="atras" tamano={16} />
        {t.volver}
      </Link>
      <TituloAdmin titulo={d.empresa.nombre} apoyo={`plan ${d.empresa.plan_nombre}`} aviso={aviso} />

      <div className="rejilla-2">
        <div className="card">
          <div className="card-head">
            <span className="card-title">{t.datos}</span>
          </div>
          <div className="card-lista">
            {datos.map(([k, v]) => (
              <div key={k} className="kv">
                <span className="muted">{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>

        <Herramientas empresaId={d.empresa.id} herramientas={herramientas} />

        <div className="card">
          <div className="card-head">
            <span className="card-title">{admin.cambiarPlan.titulo}</span>
          </div>
          <form action={cambiarPlanAccion} className="card-cuerpo">
            <input type="hidden" name="empresa_id" value={d.empresa.id} />
            <label className="campo">
              {admin.cambiarPlan.plan}
              <select name="plan" defaultValue={d.empresa.plan}>
                {d.planes.map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label className="campo">
              {admin.cambiarPlan.motivo}
              <input
                name="motivo"
                required
                minLength={3}
                maxLength={500}
                placeholder={admin.cambiarPlan.ejemplo}
              />
            </label>
            <div className="card-pie">
              <button type="submit" className="btn btn-primary">
                {admin.cambiarPlan.enviar}
              </button>
            </div>
          </form>
        </div>

        <CambiarEstado empresaId={d.empresa.id} estado={d.empresa.estado} />
      </div>

      {d.puede_eliminar && <EliminarEmpresa empresaId={d.empresa.id} nombre={d.empresa.nombre} />}

      <div className="card">
        <div className="card-head">
          <span className="card-title">{t.bitacora}</span>
        </div>
        <div className="table-wrap tabla-responsiva">
          <table className="tabla" style={{ minWidth: 720 }}>
            <thead>
              <tr>
                {Object.values(t.columnasBitacora).map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {d.bitacora.map((b, i) => (
                <tr key={`${b.created_at}-${i}`}>
                  <td data-label={t.columnasBitacora.fecha} className="muted" style={{ whiteSpace: "nowrap" }}>
                    {fecha(b.created_at)}
                  </td>
                  <td data-label={t.columnasBitacora.actor} className="romper celda-ancha">
                    {b.actor}
                  </td>
                  <td data-label={t.columnasBitacora.accion}>{admin.acciones[b.accion] ?? b.accion}</td>
                  <td
                    data-label={t.columnasBitacora.detalle}
                    className="muted romper celda-ancha"
                    style={{ fontSize: 13 }}
                  >
                    {Object.keys(b.detalle).length ? JSON.stringify(b.detalle) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
