// Cliente de ar2go-customers, el plano de control de AR2GO (ver CLAUDE.md §8,
// "Plano de control"). Solo corre en el servidor: firma cada llamada con el
// secreto del sitio, que nunca llega al navegador.
//
// El sitio verifica la sesión de Clerk y le pasa a ar2go-customers quién es la
// persona dentro del cuerpo firmado. Contrato y reglas en AR2GO/Ar2Go
// (docs/arquitectura.md §5) y en el README de ar2go-customers.
import { createHmac } from "node:crypto";

export type Persona = { clerk_user_id: string; correo: string; nombre: string };

export type Producto = {
  slug: string;
  nombre: string;
  estado: string | null;
  listo: boolean;
  disponible: boolean;
  puede_abrir: boolean;
};

export type Resumen = {
  empresa: { id: string; nombre: string; estado: string; plan: string; plan_nombre: string };
  rol: string;
  productos: Producto[];
};

// Error con el código estable que regresa ar2go-customers (p. ej. CUOTA_PENDIENTE).
export class ErrorCuenta extends Error {
  constructor(
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = "ErrorCuenta";
  }
}

const url = process.env.AR2GO_CUSTOMERS_URL;
const secreto = process.env.AR2GO_CUSTOMERS_SECRETO;

// Sin estas variables /cuenta sigue funcionando como cascarón: mismo criterio
// que AUTH_* y RESEND_API_KEY (CLAUDE.md §9).
export const hayPlanoDeControl = Boolean(url && secreto);

// AR2GO-Firma: t=<unix>,v1=HMAC-SHA256(secreto, "<t>.<cuerpo>").
function firmar(cuerpo: string): string {
  const t = Math.floor(Date.now() / 1000);
  return `t=${t},v1=${createHmac("sha256", secreto!).update(`${t}.${cuerpo}`).digest("hex")}`;
}

async function llamar<T>(ruta: string, persona: Persona, datos: object = {}): Promise<T> {
  if (!hayPlanoDeControl) throw new ErrorCuenta("SIN_PLANO_DE_CONTROL", "ar2go-customers no está configurado.");
  const cuerpo = JSON.stringify({ usuario: persona, ...datos });
  const res = await fetch(`${url!.replace(/\/$/, "")}${ruta}`, {
    method: "POST",
    headers: { "content-type": "application/json", "ar2go-firma": firmar(cuerpo) },
    body: cuerpo,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ErrorCuenta(json.code ?? `HTTP_${res.status}`, json.message ?? res.statusText);
  return json as T;
}

// Mientras el sitio no use Organizations de Clerk, cada persona que se da de
// alta tiene una empresa, ligada a su usuario. Cuando se activen, se pasa el
// id de la organización activa y nada más cambia.
export const llaveEmpresa = (clerkUserId: string, orgId?: string | null) => orgId ?? `usuario:${clerkUserId}`;

export const misEmpresas = (p: Persona) =>
  llamar<{ empresas: { id: string; nombre: string; rol: string }[] }>("/v1/cuenta/mis-empresas", p);

export const crearEmpresa = (p: Persona, nombre: string, clerkOrgId: string) =>
  llamar<Resumen>("/v1/cuenta/empresas/crear", p, { empresa: { nombre, clerk_org_id: clerkOrgId } });

export const resumen = (p: Persona, empresaId: string) =>
  llamar<Resumen>("/v1/cuenta/resumen", p, { empresa_id: empresaId });

export const activarProducto = (p: Persona, empresaId: string, producto: string) =>
  llamar<Resumen>("/v1/cuenta/productos/activar", p, { empresa_id: empresaId, producto });

export const lanzarProducto = (p: Persona, empresaId: string, producto: string) =>
  llamar<{ url: string }>("/v1/cuenta/productos/lanzar", p, { empresa_id: empresaId, producto });
