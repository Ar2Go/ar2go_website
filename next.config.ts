import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // /sign-in y /sign-up son las rutas por defecto de Clerk. Las del sitio son
  // /iniciar-sesion y /crear-cuenta (dentro de app/(cuenta), donde vive el
  // ClerkProvider); si un correo o enlace de Clerk apunta a las de inglés, se
  // redirige en vez de dar 404 o de montar <SignIn> fuera del provider.
  async redirects() {
    return [
      { source: "/sign-in/:path*", destination: "/iniciar-sesion", permanent: false },
      { source: "/sign-up/:path*", destination: "/crear-cuenta", permanent: false },
    ];
  },
};

export default nextConfig;
