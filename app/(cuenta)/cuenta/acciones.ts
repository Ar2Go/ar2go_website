"use server";

// Acciones de /cuenta: alta de la empresa, cambiarle el nombre y el plan
// (desde /cuenta/configuracion), activar un producto, aceptar sus documentos
// legales (D25) y abrirlo.
// Todas llaman a ar2go-customers desde el servidor (lib/ar2go-customers.ts);
// un error se muestra como aviso en la misma página (?aviso=<código>).
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ErrorCuenta,
  aceptarLegal,
  activarProducto,
  crearEmpresa,
  lanzarProducto,
  misEmpresas,
  renombrarEmpresa,
} from "@/lib/ar2go-customers";
import { urlPago } from "@/lib/pagos";
import { personaActual } from "./persona";

const nombreEmpresa = z.string().trim().min(2).max(120);
const slugProducto = z.string().regex(/^[a-z0-9-]{2,40}$/);
// Planes de pago a los que se puede subir desde Configuración (D37).
const planDePago = z.enum(["navegante", "timonel"]);

const huella = z.string().regex(/^[0-9a-f]{64}$/);
const documentoAceptado = z.object({ slug: z.string().min(1).max(80), version: z.string().min(1).max(20), sha256: huella });

const conAviso = (code: string): never => redirect(`/cuenta?aviso=${encodeURIComponent(code)}`);
// Pantalla de aceptación del producto.
const aAceptar = (producto: string, aviso?: string): never =>
  redirect(`/cuenta/legal/${producto}${aviso ? `?aviso=${encodeURIComponent(aviso)}` : ""}`);

// IP y navegador de quien acepta, para la constancia. La IP la pone Vercel en
// x-forwarded-for (la primera es la del cliente); si no parece IP, no se manda.
async function origen() {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "").split(",")[0].trim();
  const esIp = /^[0-9.]{7,15}$/.test(ip) || /^[0-9a-f:]{2,39}$/i.test(ip);
  return { ip: esIp ? ip : null, user_agent: h.get("user-agent")?.slice(0, 500) ?? null };
}
const codigoDe = (e: unknown) => (e instanceof ErrorCuenta ? e.code : "general");

async function contexto() {
  const p = await personaActual();
  if (!p) redirect("/iniciar-sesion");
  const { empresas } = await misEmpresas(p.persona);
  return { ...p, empresaId: empresas[0]?.id as string | undefined };
}

export async function crearEmpresaAccion(datos: FormData) {
  const nombre = nombreEmpresa.safeParse(datos.get("nombre"));
  if (!nombre.success) conAviso("NOMBRE_INVALIDO");
  const p = await personaActual();
  if (!p) redirect("/iniciar-sesion");
  try {
    await crearEmpresa(p.persona, nombre.data!, p.llave);
  } catch (e) {
    conAviso(codigoDe(e));
  }
  redirect("/cuenta");
}

// Cambiar el nombre de la empresa (Configuración → Perfil). A diferencia de
// las demás, regresa el resultado en vez de redirigir: el formulario se queda
// en la misma sección y muestra el error ahí.
export type ResultadoRenombrar = { ok: boolean; error: string | null };

export async function renombrarEmpresaAccion(
  _previo: ResultadoRenombrar,
  datos: FormData,
): Promise<ResultadoRenombrar> {
  const nombre = nombreEmpresa.safeParse(datos.get("nombre"));
  if (!nombre.success) return { ok: false, error: "NOMBRE_INVALIDO" };
  // Fuera del try: redirect() avisa lanzando, y el catch lo convertiría en error.
  const p = await personaActual();
  if (!p) redirect("/iniciar-sesion");
  try {
    const { empresas } = await misEmpresas(p.persona);
    if (!empresas[0]) return { ok: false, error: "general" };
    await renombrarEmpresa(p.persona, empresas[0].id, nombre.data);
  } catch (e) {
    return { ok: false, error: codigoDe(e) };
  }
  // El nombre sale también en el encabezado y en /cuenta.
  revalidatePath("/cuenta", "layout");
  return { ok: true, error: null };
}

export async function activarAccion(datos: FormData) {
  const producto = slugProducto.safeParse(datos.get("producto"));
  if (!producto.success) conAviso("general");
  try {
    const c = await contexto();
    if (!c.empresaId) redirect("/cuenta");
    await activarProducto(c.persona, c.empresaId, producto.data!);
  } catch (e) {
    // Con la regla encendida en ar2go-customers, primero se aceptan los documentos.
    if (e instanceof ErrorCuenta && e.code === "ACEPTACION_PENDIENTE") aAceptar(producto.data!);
    if (e instanceof ErrorCuenta) conAviso(e.code);
    throw e; // redirect() de Next se propaga
  }
  redirect("/cuenta");
}

// "Aceptar y activar": registra la aceptación de cada documento (una casilla
// por documento, todas obligatorias) y, si se pidió, activa el producto en
// seguida. Con `solo_aceptar` (versión nueva de un
// producto ya activo) regresa a /cuenta sin activar.
export async function aceptarAccion(datos: FormData) {
  const producto = slugProducto.safeParse(datos.get("producto"));
  if (!producto.success) conAviso("general");
  const documentos = z.array(documentoAceptado).min(1).safeParse(
    datos.getAll("documento").map((d) => {
      const [slug, version, sha256] = String(d).split("|");
      return { slug, version, sha256 };
    }),
  );
  if (!documentos.success) conAviso("general");
  const marcados = new Set(datos.getAll("acepto").map(String));
  if (!documentos.data!.every((d) => marcados.has(d.slug))) aAceptar(producto.data!, "FALTA_CASILLA");

  const soloAceptar = datos.get("solo_aceptar") === "si";
  try {
    const c = await contexto();
    if (!c.empresaId) redirect("/cuenta");
    await aceptarLegal(c.persona, c.empresaId, producto.data!, documentos.data!, await origen());
    if (!soloAceptar) await activarProducto(c.persona, c.empresaId, producto.data!);
  } catch (e) {
    // El texto cambió mientras se leía: se vuelve a mostrar el vigente.
    if (e instanceof ErrorCuenta && e.code === "DOCUMENTO_DESACTUALIZADO") aAceptar(producto.data!, e.code);
    if (e instanceof ErrorCuenta) conAviso(e.code);
    throw e;
  }
  redirect("/cuenta");
}

// "Cambiar plan" en Configuración → Suscripción. Solo se sube a un plan de
// pago con link (lib/pagos.ts): manda al pago y el equipo de AR2GO sube el
// plan desde /admin al verlo (D36).
export async function cambiarPlanAccion(datos: FormData) {
  const plan = planDePago.safeParse(datos.get("plan"));
  if (!plan.success) conAviso("general");
  const c = await contexto();
  if (!c.empresaId) redirect("/cuenta");
  const pago = urlPago(plan.data!, c.empresaId, c.persona.correo);
  redirect(pago ?? "/cuenta/configuracion/suscripcion");
}

export async function abrirAccion(datos: FormData) {
  const producto = slugProducto.safeParse(datos.get("producto"));
  if (!producto.success) conAviso("general");
  let url: string;
  try {
    const c = await contexto();
    if (!c.empresaId) redirect("/cuenta");
    ({ url } = await lanzarProducto(c.persona, c.empresaId, producto.data!));
  } catch (e) {
    if (e instanceof ErrorCuenta) conAviso(e.code);
    throw e;
  }
  // Login único: el producto canjea el código de un solo uso con ar2go-customers.
  redirect(url);
}
