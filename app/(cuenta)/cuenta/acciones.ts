"use server";

// Acciones de /cuenta: alta de la empresa, activar un producto y abrirlo.
// Todas llaman a ar2go-customers desde el servidor (lib/ar2go-customers.ts);
// un error se muestra como aviso en la misma página (?aviso=<código>).
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  ErrorCuenta,
  activarProducto,
  crearEmpresa,
  lanzarProducto,
  misEmpresas,
} from "@/lib/ar2go-customers";
import { personaActual } from "./persona";

const nombreEmpresa = z.string().trim().min(2).max(120);
const slugProducto = z.string().regex(/^[a-z0-9-]{2,40}$/);

const conAviso = (code: string): never => redirect(`/cuenta?aviso=${encodeURIComponent(code)}`);
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

export async function activarAccion(datos: FormData) {
  const producto = slugProducto.safeParse(datos.get("producto"));
  if (!producto.success) conAviso("general");
  try {
    const c = await contexto();
    if (!c.empresaId) redirect("/cuenta");
    await activarProducto(c.persona, c.empresaId, producto.data!);
  } catch (e) {
    if (e instanceof ErrorCuenta) conAviso(e.code);
    throw e; // redirect() de Next se propaga
  }
  redirect("/cuenta");
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
