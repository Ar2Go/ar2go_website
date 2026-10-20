// Cliente de la API de administración de ar2go-customers (/v1/admin/*), para
// /admin. Solo servidor. Firma con un secreto propio, distinto del de /cuenta
// (AR2GO_CUSTOMERS_SECRETO_ADMIN = ADMIN_SECRETOS_VERIFICACION allá): si se
// filtra uno, el otro no abre nada. Quién del equipo opera viaja en el cuerpo
// firmado y queda en la bitácora del plano de control.
import { ErrorCuenta, firmarCon } from "@/lib/ar2go-customers";

export type EmpresaListada = {
  id: string;
  nombre: string;
  estado: string;
  created_at: string;
  plan: string;
  plan_nombre: string;
  propietario: string | null;
  usuarios: number;
  productos: { producto: string; estado: string }[];
};

export type DetalleEmpresa = {
  empresa: {
    id: string;
    nombre: string;
    rfc: string | null;
    estado: string;
    created_at: string;
    plan: string;
    plan_nombre: string;
    estado_pago: string;
    periodo_fin: string | null;
  };
  miembros: { correo: string; nombre: string; rol: string; created_at: string }[];
  suscripciones: {
    producto: string;
    producto_nombre: string;
    estado: string;
    // Lo que recibió el producto: el estado de la empresa manda (desde ar2go-customers#8).
    estado_efectivo?: string;
    limites: Record<string, number | null>;
    version: number;
    version_aplicada: number;
    aplicado_at: string | null;
    ultimo_error: string | null;
    created_at: string;
    // Reintentos (desde ar2go-customers#9).
    intentos?: number;
    requiere_atencion?: boolean;
  }[];
  bitacora: { actor: string; accion: string; detalle: Record<string, unknown>; created_at: string }[];
  planes: { slug: string; nombre: string; precio_mensual_centavos: number | null }[];
};

export type CambioPendiente = {
  suscripcion_id: string;
  empresa_id: string;
  empresa: string;
  empresa_estado: string;
  producto: string;
  version: number;
  version_aplicada: number;
  intentos: number;
  proximo_intento_at: string | null;
  requiere_atencion: boolean;
  ultimo_error: string | null;
};

export type PersonaSinEmpresa = { correo: string; nombre: string; created_at: string };

const url = process.env.AR2GO_CUSTOMERS_URL;
const secreto = process.env.AR2GO_CUSTOMERS_SECRETO_ADMIN;

// Sin estas variables /admin muestra un aviso en vez de datos (CLAUDE.md §9).
export const hayAdminDePlanoDeControl = Boolean(url && secreto);

async function llamar<T>(ruta: string, operador: string, datos: object = {}): Promise<T> {
  if (!hayAdminDePlanoDeControl)
    throw new ErrorCuenta("SIN_PLANO_DE_CONTROL", "La administración de ar2go-customers no está configurada.");
  const cuerpo = JSON.stringify({ operador: { correo: operador }, ...datos });
  const res = await fetch(`${url!.replace(/\/$/, "")}${ruta}`, {
    method: "POST",
    headers: { "content-type": "application/json", "ar2go-firma": firmarCon(secreto!, cuerpo) },
    body: cuerpo,
    cache: "no-store",
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ErrorCuenta(json.code ?? `HTTP_${res.status}`, json.message ?? res.statusText);
  return json as T;
}

export const listarEmpresas = (operador: string) =>
  llamar<{ empresas: EmpresaListada[] }>("/v1/admin/empresas/listar", operador);

export const detalleEmpresa = (operador: string, empresaId: string) =>
  llamar<DetalleEmpresa>("/v1/admin/empresas/detalle", operador, { empresa_id: empresaId });

export const cambiarPlan = (operador: string, empresaId: string, plan: string, motivo: string) =>
  llamar<DetalleEmpresa>("/v1/admin/empresas/cambiar-plan", operador, { empresa_id: empresaId, plan, motivo });

export type AccionEmpresa = "SUSPENDER" | "REACTIVAR" | "CERRAR" | "REABRIR";

export const cambiarEstado = (operador: string, empresaId: string, accion: AccionEmpresa, motivo: string) =>
  llamar<DetalleEmpresa>("/v1/admin/empresas/cambiar-estado", operador, { empresa_id: empresaId, accion, motivo });

export const cambiosPendientes = (operador: string) =>
  llamar<{ pendientes: CambioPendiente[] }>("/v1/admin/pendientes", operador);

export const reintentar = (operador: string, suscripcionId: string) =>
  llamar<DetalleEmpresa>("/v1/admin/suscripciones/reintentar", operador, { suscripcion_id: suscripcionId });

export const personasSinEmpresa = (operador: string) =>
  llamar<{ usuarios: PersonaSinEmpresa[] }>("/v1/admin/usuarios/sin-empresa", operador);
