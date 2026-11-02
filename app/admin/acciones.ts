"use server";

// Acciones de /admin. Llaman a la API de administración de ar2go-customers
// desde el servidor (lib/ar2go-customers-admin.ts); el resultado se muestra
// como aviso en la página de la empresa (?aviso=<código>).
import { redirect } from "next/navigation";
import { z } from "zod";
import { signOut } from "@/auth";
import { ErrorCuenta } from "@/lib/ar2go-customers";
import { bloquearEnClerk, borrarEnClerk, desbloquearEnClerk } from "@/lib/clerk-admin";
import {
  agregarBloqueo,
  aprobarSolicitud,
  cambiarEstado,
  cambiarPlan,
  cambiarProducto,
  eliminarEmpresa,
  quitarBloqueo,
  rechazarSolicitud,
  reintentar,
} from "@/lib/ar2go-customers-admin";
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
// hacia los productos (PUT a Horiq), por eso pide motivo y confirmación.
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
// no tiene ADMIN_PERMITE_ELIMINAR=si): productos, ar2go-customers y Clerk (sus
// personas que no están en otra empresa y su organización). Se vuelve a la lista.
export async function eliminarEmpresaAccion(datos: FormData) {
  const operador = await operadorActual();
  const d = datosEliminar.safeParse(Object.fromEntries(datos));
  const empresaId = String(datos.get("empresa_id") ?? "");
  const destino = (aviso: string) =>
    redirect(`/admin/empresas/${encodeURIComponent(empresaId)}?aviso=${encodeURIComponent(aviso)}`);
  if (!d.success) destino(datos.get("confirmacion") ? "MOTIVO_INVALIDO" : "CONFIRMACION_INVALIDA");
  let clerk: { organizacion: string | null; usuarios: string[] } | undefined;
  try {
    clerk = (await eliminarEmpresa(operador, d.data!.empresa_id, d.data!.confirmacion, d.data!.motivo)).clerk;
  } catch (e) {
    // Un segundo envío llega cuando la empresa ya se borró: se vuelve a la lista, no a su detalle.
    if (e instanceof ErrorCuenta && e.code === "EMPRESA_NO_ENCONTRADA") redirect("/admin?aviso=EMPRESA_ELIMINADA");
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  // Ya no existe en AR2GO ni en sus productos: falta Clerk. Lo que no se pueda borrar ahí se
  // muestra en el aviso para borrarlo a mano en el panel de Clerk.
  const pendientes = clerk ? await borrarEnClerk(clerk) : [];
  if (pendientes.length) {
    console.error("[admin] Clerk no borró:", pendientes);
    redirect(`/admin?aviso=CLERK_PENDIENTE&clerk=${encodeURIComponent(pendientes.map((p) => p.id).join(", "))}`);
  }
  redirect("/admin?aviso=EMPRESA_ELIMINADA");
}

// Reintenta ya una suscripción pendiente (GET al producto y, si hace falta,
// PUT). Vuelve a /admin/pendientes con el aviso; el detalle refleja el resultado.
export async function reintentarAccion(datos: FormData) {
  const operador = await operadorActual();
  const id = z.uuid().safeParse(datos.get("suscripcion_id"));
  const destino = (aviso: string) => redirect(`/admin/pendientes?aviso=${encodeURIComponent(aviso)}`);
  if (!id.success) destino("general");
  try {
    await reintentar(operador, id.data!);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino("REINTENTADO");
}

// Botón de salir de la barra lateral (components/admin/MenuAdmin.tsx).
export async function cerrarSesionAccion() {
  await signOut({ redirectTo: "/admin/login" });
}

const datosProducto = z.object({
  empresa_id: z.uuid(),
  producto: z.string().regex(/^[a-z0-9-]{2,40}$/),
  habilitar: z.enum(["si", "no"]),
});

// Casilla de Herramientas en /admin/empresas/[id] (components/admin/Herramientas.tsx). La casilla
// ya muestra el resultado: solo se avisa si algo falló.
export async function cambiarProductoAccion(datos: FormData) {
  const operador = await operadorActual();
  const d = datosProducto.safeParse(Object.fromEntries(datos));
  const empresaId = String(datos.get("empresa_id") ?? "");
  const pagina = `/admin/empresas/${encodeURIComponent(empresaId)}`;
  if (!d.success) redirect(`${pagina}?aviso=general`);
  try {
    await cambiarProducto(operador, d.data!.empresa_id, d.data!.producto, d.data!.habilitar === "si");
  } catch (e) {
    if (e instanceof ErrorCuenta) redirect(`${pagina}?aviso=${encodeURIComponent(e.code)}`);
    throw e; // redirect() de Next se propaga
  }
  redirect(pagina);
}

// Seguridad: bloquear un correo o un dominio. Un correo exacto va también a la lista de bloqueo de
// Clerk (no puede ni registrarse); un dominio solo lo bloquea AR2GO, que borra de Clerk a quien
// alcance a registrarse en cuanto llega a /cuenta.
export async function agregarBloqueoAccion(datos: FormData) {
  const operador = await operadorActual();
  const valor = z.string().trim().toLowerCase().min(3).max(320).safeParse(datos.get("valor"));
  const destino = (aviso?: string) => redirect(`/admin/seguridad${aviso ? `?aviso=${aviso}` : ""}`);
  if (!valor.success) destino("BLOQUEO_INVALIDO");
  const v = valor.data!.includes("@") ? valor.data! : `@${valor.data!}`;
  const clerkId = v.startsWith("@") ? undefined : ((await bloquearEnClerk(v)) ?? undefined);
  try {
    await agregarBloqueo(operador, v, clerkId);
  } catch (e) {
    if (clerkId) await desbloquearEnClerk(clerkId);
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino(!v.startsWith("@") && !clerkId ? "CLERK_SIN_BLOQUEO" : undefined);
}

export async function quitarBloqueoAccion(datos: FormData) {
  const operador = await operadorActual();
  const id = z.uuid().safeParse(datos.get("id"));
  if (!id.success) redirect("/admin/seguridad?aviso=general");
  try {
    const { quitado } = await quitarBloqueo(operador, id.data!);
    if (quitado.clerk_id) await desbloquearEnClerk(quitado.clerk_id);
  } catch (e) {
    if (e instanceof ErrorCuenta) redirect(`/admin/seguridad?aviso=${encodeURIComponent(e.code)}`);
    throw e; // redirect() de Next se propaga
  }
  redirect("/admin/seguridad");
}

// Pendientes → Solicitudes de acceso (plan Explorador). Dar acceso habilita la herramienta por 2
// meses; rechazar solo la cierra. Se vuelve a Pendientes con el aviso.
async function resolverSolicitud(datos: FormData, aprobar: boolean) {
  const operador = await operadorActual();
  const id = z.uuid().safeParse(datos.get("id"));
  const destino = (aviso: string) => redirect(`/admin/pendientes?aviso=${encodeURIComponent(aviso)}`);
  if (!id.success) destino("general");
  try {
    await (aprobar ? aprobarSolicitud : rechazarSolicitud)(operador, id.data!);
  } catch (e) {
    if (e instanceof ErrorCuenta) destino(e.code);
    throw e; // redirect() de Next se propaga
  }
  destino(aprobar ? "ACCESO_APROBADO" : "SOLICITUD_RECHAZADA");
}

export async function aprobarSolicitudAccion(datos: FormData) {
  await resolverSolicitud(datos, true);
}

export async function rechazarSolicitudAccion(datos: FormData) {
  await resolverSolicitud(datos, false);
}
