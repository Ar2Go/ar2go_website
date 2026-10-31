import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { brand } from "@/lib/brand";
import { site } from "@/content/site";
import "./globals.css";

// Familia geométrica única para todo el sitio. Sistema visual completo en
// docs/brand.md — léelo antes de tocar tipografía, color o espaciado.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

// Monoespaciada para eyebrows, precios y microcopy — nunca para párrafos.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
});

const TITULO = `${site.nombre} — Tu tripulación de IA para la PyME`;
const DESCRIPCION =
  "Argonautas: agentes de IA que trabajan solos. Argotipos: software inteligente llave en mano. Postio para redes sociales y Horiq para el expediente digital de asistencia. Empieza gratis.";

// site.url resuelve a https://ar2go.io (content/site.ts) — dominio real
// desde 2026-09-06.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO,
    template: `%s — ${site.nombre}`,
  },
  description: DESCRIPCION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: site.nombre,
    title: TITULO,
    description: DESCRIPCION,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
};

// docs/brand.md.
export const viewport: Viewport = {
  themeColor: brand.fondo,
};

// Sin Header/Footer genérico aquí: la home trae su propio nav flotante y pie
// (maqueta 2026-09-06, ver components/layout/HomeNav.tsx y HomeFooter.tsx);
// /admin y las páginas legales usan Header/Footer directamente en su propia
// página (components/layout/Header.tsx y Footer.tsx).
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <OrganizationJsonLd />
        <div className="flex-1">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}