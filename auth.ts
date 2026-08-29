import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// Lista blanca explícita. Es la única condición real de acceso: aunque el
// consentimiento de Google Cloud esté abierto, nadie más entra a /admin.
// Ver CLAUDE.md §11 (decisión del panel de administración) antes de tocar
// este archivo — no es solo config, es la puerta de acceso.
const CORREOS_ADMIN = ["juand86@gmail.com"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  trustHost: true,
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    signIn({ profile }) {
      const correo = profile?.email;
      return typeof correo === "string" && CORREOS_ADMIN.includes(correo);
    },
  },
});
