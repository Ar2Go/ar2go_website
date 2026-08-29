import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Footer } from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { site } from "@/content/site";
import "./globals.css";

// Familia geométrica única para todo el sitio (CLAUDE.md §7).
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
});

// Monoespaciada para eyebrows, precios y microcopy — nunca para párrafos.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "latin-ext"],
});

const DESCRIPCION =
  "Agente de IA que atiende tus prospectos de WhatsApp, cotiza con tu catálogo y agenda la demo. Precio visible, sin llamada de ventas.";

// site.url usa TODO_DOMINIO hasta tener el dominio real (CLAUDE.md §9): las
// URLs absolutas de metadataBase/canonical/OG quedan con ese placeholder
// visible en vez de un dominio inventado.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — Agente de Leads WhatsApp`,
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
    title: `${site.nombre} — Agente de Leads WhatsApp`,
    description: DESCRIPCION,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.nombre} — Agente de Leads WhatsApp`,
    description: DESCRIPCION,
  },
};

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
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
