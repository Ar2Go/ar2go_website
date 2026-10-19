import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Lista blanca explícita. Es la única condición real de acceso: aunque el
// consentimiento de Google Cloud esté abierto, nadie más entra a /admin.
// Ver CLAUDE.md §11 (decisión del panel de administración) antes de tocar
// este archivo — no es solo config, es la puerta de acceso.
// Desde 2026-10-18 solo la cuenta admin de AR2GO (decisión de JD, ANCLA §4):
// /admin ya muestra a los clientes reales y permite cambiarles el plan.
const CORREOS_ADMIN = ["ar2gon.2026@gmail.com"];

// Se vuelve a revisar en cada página y acción de /admin (app/admin/operador.ts):
// una sesión emitida antes de quitar a alguien de la lista sigue viva hasta
// que expira, y no debe seguir abriendo datos de clientes.
export const esCorreoAdmin = (correo: string | null | undefined) =>
  typeof correo === "string" && CORREOS_ADMIN.includes(correo.trim().toLowerCase());

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    signIn({ profile }) {
      return profile?.email_verified === true && esCorreoAdmin(profile.email);
    },
  },
});
