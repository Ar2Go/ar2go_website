import { NextResponse, type NextFetchEvent, type NextMiddleware, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { auth } from "@/auth";

// Dos sistemas de sesión conviven a propósito (CLAUDE.md §11):
// - Auth.js + Google, lista blanca de correos → /admin (fábrica de agentes).
// - Clerk (correo + Google, autoservicio) → cuentas de cliente.
// Next solo permite un middleware, así que este archivo despacha por ruta:
// nunca corren los dos sobre el mismo request.

const adminMiddleware = auth((req) => {
  const estaLogueado = Boolean(req.auth);
  const esLogin = req.nextUrl.pathname === "/admin/login";

  if (esLogin) {
    return NextResponse.next();
  }

  if (!estaLogueado) {
    const destino = new URL("/admin/login", req.nextUrl);
    return NextResponse.redirect(destino);
  }

  return NextResponse.next();
  // Auth.js tipa lo que devuelve `auth()` como handler de route handler
  // (segundo argumento `{ params }`), pero como middleware Next lo invoca
  // con (request, event) — que es justo el uso que documenta Auth.js. El
  // cast alinea la firma; el comportamiento en runtime es el mismo que
  // cuando este archivo exportaba `auth(...)` directamente.
}) as unknown as NextMiddleware;

// /crear-cuenta y /iniciar-sesion son públicas (son el alta); lo único que se
// protege es /cuenta, a donde aterriza el usuario ya registrado.
const esRutaPrivadaDeCliente = createRouteMatcher(["/cuenta(.*)"]);

const clienteMiddleware = clerkMiddleware(
  async (clerkAuth, req) => {
    if (!esRutaPrivadaDeCliente(req)) return;
    const { userId, redirectToSignIn } = await clerkAuth();
    if (!userId) return redirectToSignIn();
  },
  { signInUrl: "/iniciar-sesion", signUpUrl: "/crear-cuenta" },
);

// Sin llaves de Clerk, `clerkMiddleware` truena en cada request y Vercel
// responde MIDDLEWARE_INVOCATION_FAILED: un 500 opaco, sin rastro en la
// página, para las tres rutas de cuenta. Se comprueba antes para que una
// variable de entorno faltante no se vea como una caída de routing — mismo
// criterio que /admin con AUTH_* (CLAUDE.md §9). No sustituye configurar las
// llaves: sin ellas el alta sigue sin funcionar, solo falla de forma legible.
const hayCredencialesDeClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY,
);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    return adminMiddleware(req, event);
  }

  if (!hayCredencialesDeClerk) {
    // Falla cerrado en lo privado: sin Clerk no hay forma de saber si hay
    // sesión, así que /cuenta se manda al inicio en vez de quedar abierta.
    if (esRutaPrivadaDeCliente(req)) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    return NextResponse.next();
  }

  return clienteMiddleware(req, event);
}

export const config = {
  matcher: ["/admin/:path*", "/cuenta/:path*", "/crear-cuenta/:path*", "/iniciar-sesion/:path*"],
};
