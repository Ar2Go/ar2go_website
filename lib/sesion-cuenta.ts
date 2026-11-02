// /iniciar-sesion y /crear-cuenta con una sesión de Clerk ya abierta: directo a /cuenta desde el
// servidor, sin dibujar la página (se alcanzaba a ver vacía, con "Volver al sitio", mientras Clerk
// redirigía en el navegador). Sin llaves de Clerk no hay sesión que revisar.
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function aCuentaSiHaySesion() {
  if (!process.env.CLERK_SECRET_KEY || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) return;
  const { userId } = await auth();
  if (userId) redirect("/cuenta");
}
