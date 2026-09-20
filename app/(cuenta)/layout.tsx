import Image from "next/image";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { esMX } from "@clerk/localizations";
import { apariencia } from "@/lib/clerk-appearance";
import { cuenta } from "@/content/cuenta";
import "./cuenta.css";

// Clerk se monta solo en este grupo de rutas (/crear-cuenta, /iniciar-sesion,
// /cuenta), no en el layout raíz: el resto del sitio es marketing estático y
// /admin usa Auth.js, que es otro sistema de sesión (ver CLAUDE.md §11).
//
// force-dynamic: sin NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, ClerkProvider truena
// al renderizar. Marcando estas rutas como dinámicas, `npm run build` sigue
// limpio sin las credenciales configuradas — mismo criterio que AUTH_* con
// /admin (CLAUDE.md §9).
export const dynamic = "force-dynamic";

export default function CuentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      localization={esMX}
      appearance={apariencia}
      signInUrl="/iniciar-sesion"
      signUpUrl="/crear-cuenta"
      signInFallbackRedirectUrl="/cuenta"
      signUpFallbackRedirectUrl="/cuenta"
    >
      <div className="ar-cuenta">
        {/* Mismo margen y tamaño que el logotipo del nav de la home
            (app/home.css §Navegación), sobre la foto igual que ahí. */}
        <Link href="/" className="cuenta__logo" aria-label={cuenta.volverAlSitio}>
          <Image
            src="/brand/ar2go-logotipo-2026.png"
            alt="AR2GO"
            width={104}
            height={26}
            priority
          />
        </Link>

        {children}
      </div>
    </ClerkProvider>
  );
}
