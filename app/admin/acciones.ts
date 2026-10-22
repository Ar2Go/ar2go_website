"use server";

// Acciones de /admin. Llaman a la API de administración de ar2go-customers
// desde el servidor (lib/ar2go-customers-admin.ts); el resultado se muestra
// como aviso en la página de la empresa (?aviso=<código>).
import { redirect } from "next/navigation";
import { z } from "zod";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { cambiarEstado, cambiarPlan, eliminarEmpresa, reintentar } from "@/lib/ar2go-customers-admin";
import { operadorActual } from "./operador";

const datosCambioPlan = z.object({
  empresa_id: z.uuid(),
  plan: z.string().regex(/^[a-z0-9-]{2,40}$/),
  motivo: z.string().trim().min(3).max(500),
});

export async function cambiarPlanAccion(datos: FormData) {
  const operador = await operadorActual();
  const d = datosCambioPlan.safeParse(Object.fromEntries(datos));
  const empresaId = String(datos.get("empresa_id") ?? "");
  const destino = (aviso: string) =>
    redirect(`/admin/empresas/${encodeURIComponent(empresaId)}?aviso=${encodeURIComponent(aviso)}`);
  if (!d.success) destino("MOTIVO_INVALIDO");
  try {
    await cambiarPlan(operador, d.data!.empresa_id, d.data!.plan, d.data!.motivo);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino("PLAN_CAMBIADO");
}

const datosCambioEstado = z.object({
  empresa_id: z.uuid(),
  accion: z.enum(["SUSPENDER", "REACTIVAR", "CERRAR", "REABRIR"]),
  motivo: z.string().trim().min(3).max(500),
  confirmo: z.literal("si"),
});

// Suspender, reactivar, cerrar o reabrir la empresa. Es una escritura real
// hacia los productos (PUT a HorIQ), por eso pide motivo y confirmación.
export async function cambiarEstadoAccion(datos: FormData) {
  const operador = await operadorActual();
  const d = datosCambioEstado.safeParse(Object.fromEntries(datos));
  const empresaId = String(datos.get("empresa_id") ?? "");
  const destino = (aviso: string) =>
    redirect(`/admin/empresas/${encodeURIComponent(empresaId)}?aviso=${encodeURIComponent(aviso)}`);
  if (!d.success) destino(datos.get("confirmo") === "si" ? "MOTIVO_INVALIDO" : "CONFIRMACION_FALTANTE");
  try {
    await cambiarEstado(operador, d.data!.empresa_id, d.data!.accion, d.data!.motivo);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino("ESTADO_CAMBIADO");
}

const datosEliminar = z.object({
  empresa_id: z.uuid(),
  confirmacion: z.string().trim().min(1).max(200),
  motivo: z.string().trim().min(3).max(500),
});

// Borrado total de la empresa, solo en pruebas (ar2go-customers lo rechaza si
// no tiene ADMIN_PERMITE_ELIMINAR=si). Si sale bien, la empresa ya no existe y
// se vuelve a la lista.
export async function eliminarEmpresaAccion(datos: FormData) {
  const operador = await operadorActual();
  const d = datosEliminar.safeParse(Object.fromEntries(datos));
  const empresaId = String(datos.get("empresa_id") ?? "");
  const destino = (aviso: string) =>
    redirect(`/admin/empresas/${encodeURIComponent(empresaId)}?aviso=${encodeURIComponent(aviso)}`);
  if (!d.success) destino(datos.get("confirmacion") ? "MOTIVO_INVALIDO" : "CONFIRMACION_INVALIDA");
  try {
    await eliminarEmpresa(operador, d.data!.empresa_id, d.data!.confirmacion, d.data!.motivo);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  redirect("/admin?aviso=EMPRESA_ELIMINADA");
}

// Reintenta ya una suscripción pendiente (GET al producto y, si hace falta,
// PUT). Vuelve a /admin con el aviso; el detalle refleja el resultado.
export async function reintentarAccion(datos: FormData) {
  const operador = await operadorActual();
  const id = z.uuid().safeParse(datos.get("suscripcion_id"));
  const destino = (aviso: string) => redirect(`/admin?aviso=${encodeURIComponent(aviso)}#pendientes-titulo`);
  if (!id.success) destino("general");
  try {
    await reintentar(operador, id.data!);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino("REINTENTADO");
}
