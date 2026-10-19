// Quién del equipo de AR2GO está operando /admin. Solo servidor. El
// middleware ya exige sesión, pero aquí se vuelve a revisar la lista blanca:
// las páginas y las Server Actions de /admin dependen de esto, no de la ruta.
import { redirect } from "next/navigation";
import { auth, esCorreoAdmin } from "@/auth";

export async function operadorActual(): Promise<string> {
  const sesion = await auth();
  const correo = sesion?.user?.email;
  if (!esCorreoAdmin(correo)) redirect("/admin/login?error=AccessDenied");
  return correo!.trim().toLowerCase();
}
