// Borrado en Clerk de lo que deja una empresa eliminada desde /admin (app/admin/acciones.ts):
// sus personas que no están en otra empresa y, si la empresa se creó dentro de una, su
// organización. ar2go-customers ya las borró de su base y regresa los ids. Solo servidor.
import { clerkClient } from "@clerk/nextjs/server";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";

export type PendienteClerk = { id: string; error: string };

/** Lo que no se pudo borrar; un id que Clerk ya no tiene (404) cuenta como borrado. */
export async function borrarEnClerk(d: { organizacion: string | null; usuarios: string[] }): Promise<PendienteClerk[]> {
  const ids = [...d.usuarios, ...(d.organizacion ? [d.organizacion] : [])];
  if (!ids.length) return [];
  if (!process.env.CLERK_SECRET_KEY) return ids.map((id) => ({ id, error: "Falta CLERK_SECRET_KEY" }));
  const clerk = await clerkClient();
  const pendientes: PendienteClerk[] = [];
  const borrar = async (id: string, fn: () => Promise<unknown>) => {
    try {
      await fn();
    } catch (e) {
      if (isClerkAPIResponseError(e) && e.status === 404) return;
      pendientes.push({ id, error: e instanceof Error ? e.message : String(e) });
    }
  };
  if (d.organizacion) await borrar(d.organizacion, () => clerk.organizations.deleteOrganization(d.organizacion!));
  for (const id of d.usuarios) await borrar(id, () => clerk.users.deleteUser(id));
  return pendientes;
}

// Lista de bloqueo de Clerk (Seguridad en /admin): solo acepta correos exactos, no dominios. Un
// correo ahí no puede registrarse ni entrar. null si no se pudo (sin llave o el plan no lo permite);
// AR2GO lo bloquea igual.
export async function bloquearEnClerk(correo: string): Promise<string | null> {
  if (!process.env.CLERK_SECRET_KEY) return null;
  try {
    const clerk = await clerkClient();
    return (await clerk.blocklistIdentifiers.createBlocklistIdentifier({ identifier: correo })).id;
  } catch (e) {
    console.error("[admin] Clerk no bloqueó", correo, isClerkAPIResponseError(e) ? JSON.stringify(e.errors) : e);
    return null;
  }
}

export async function desbloquearEnClerk(id: string): Promise<void> {
  if (!process.env.CLERK_SECRET_KEY) return;
  try {
    const clerk = await clerkClient();
    await clerk.blocklistIdentifiers.deleteBlocklistIdentifier(id);
  } catch (e) {
    if (isClerkAPIResponseError(e) && e.status === 404) return;
    console.error("[admin] Clerk no desbloqueó", id, e);
  }
}

/** Borra de Clerk a una persona bloqueada que alcanzó a registrarse (p. ej. por un dominio bloqueado). */
export async function borrarUsuarioClerk(id: string): Promise<void> {
  const pendientes = await borrarEnClerk({ organizacion: null, usuarios: [id] });
  if (pendientes.length) console.error("[cuenta] Clerk no borró a una persona bloqueada:", pendientes);
}
