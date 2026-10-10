// Quién es la persona con sesión de Clerk, en la forma que espera
// ar2go-customers. Solo servidor.
import { auth, currentUser } from "@clerk/nextjs/server";
import { llaveEmpresa, type Persona } from "@/lib/ar2go-customers";

export async function personaActual(): Promise<{ persona: Persona; llave: string } | null> {
  const [usuario, sesion] = await Promise.all([currentUser(), auth()]);
  if (!usuario) return null;
  const correo = usuario.primaryEmailAddress?.emailAddress ?? "";
  const nombre = [usuario.firstName, usuario.lastName].filter(Boolean).join(" ") || correo;
  return {
    persona: { clerk_user_id: usuario.id, correo, nombre },
    llave: llaveEmpresa(usuario.id, sesion.orgId),
  };
}
