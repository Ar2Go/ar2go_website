import { NextResponse } from "next/server";
import { auth } from "@/auth";

// Protege /admin/*. La verificación de correo real vive en auth.ts
// (callbacks.signIn) — esto solo decide si dejamos pasar una sesión que ya
// pasó por ahí, o mandamos a /admin/login.
export default auth((req) => {
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
});

export const config = {
  matcher: ["/admin/:path*"],
};
