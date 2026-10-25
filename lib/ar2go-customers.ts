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
  // false si la empresa está suspendida o cerrada (desde ar2go-customers#8).
  puede_activar?: boolean;
  // Documentos legales de la empresa que faltan por aceptar (D25, desde
  // ar2go-customers#11). Con `exigida`, Activar responde ACEPTACION_PENDIENTE.
  legal?: { exigida: boolean; pendientes: { slug: string; titulo: string; version: string }[] };
};

// Documento legal tal como lo acepta la persona: texto con el nombre de la
// empresa y de quien acepta ya sustituidos, y su huella SHA-256.
export type DocumentoLegal = {
  slug: string;
  titulo: string;
  version: string;
  aceptado: boolean;
  todo_legal: number;
  texto: string;
  sha256: string;
};

// Lectura pública: sin empresa, las variables se ven como marcadores.
export type DocumentoPublico = Pick<DocumentoLegal, "slug" | "titulo" | "version" | "todo_legal" | "texto">;

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

// AR2GO-Firma: t=<unix>,v1=HMAC-SHA256(secreto, "<t>.<cuerpo>"). La usa
// también lib/ar2go-customers-admin.ts, con su propio secreto.
export function firmarCon(secretoFirma: string, cuerpo: string): string {
  const t = Math.floor(Date.now() / 1000);
  return `t=${t},v1=${createHmac("sha256", secretoFirma).update(`${t}.${cuerpo}`).digest("hex")}`;
}
const firmar = (cuerpo: string) => firmarCon(secreto!, cuerpo);

async function llamar<T>(ruta: string, persona: Persona | null, datos: object = {}): Promise<T> {
  if (!hayPlanoDeControl) throw new ErrorCuenta("SIN_PLANO_DE_CONTROL", "ar2go-customers no está configurado.");
  const cuerpo = JSON.stringify(persona ? { usuario: persona, ...datos } : datos);
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

// Solo PROPIETARIO o ADMIN; el nombre nuevo viaja a los productos en el
// estado deseado (ar2go-customers sube la versión de cada suscripción viva).
export const renombrarEmpresa = (p: Persona, empresaId: string, nombre: string) =>
  llamar<Resumen>("/v1/cuenta/empresas/renombrar", p, { empresa_id: empresaId, nombre });

export const resumen = (p: Persona, empresaId: string) =>
  llamar<Resumen>("/v1/cuenta/resumen", p, { empresa_id: empresaId });

export const activarProducto = (p: Persona, empresaId: string, producto: string) =>
  llamar<Resumen>("/v1/cuenta/productos/activar", p, { empresa_id: empresaId, producto });

export const lanzarProducto = (p: Persona, empresaId: string, producto: string) =>
  llamar<{ url: string }>("/v1/cuenta/productos/lanzar", p, { empresa_id: empresaId, producto });

export const documentosLegales = (p: Persona, empresaId: string, producto: string) =>
  llamar<{ exigida: boolean; documentos: DocumentoLegal[] }>("/v1/cuenta/legal/documentos", p, {
    empresa_id: empresaId,
    producto,
  });

// La IP y el navegador los toma el sitio de la solicitud de la persona:
// ar2go-customers solo ve la IP de Vercel.
export const aceptarLegal = (
  p: Persona,
  empresaId: string,
  producto: string,
  documentos: { slug: string; version: string; sha256: string }[],
  origen: { ip: string | null; user_agent: string | null },
) =>
  llamar<Resumen>("/v1/cuenta/legal/aceptar", p, { empresa_id: empresaId, producto, documentos, ...origen });

export const documentosPublicos = (producto: string) =>
  llamar<{ documentos: DocumentoPublico[] }>("/v1/legal/documentos", null, { producto });
