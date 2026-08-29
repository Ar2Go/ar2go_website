import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

// Metadatos completos (canonical, og:image, JSON-LD) llegan en el paso 6 del PLAN.md.
export const metadata: Metadata = {
  title: "AR2GO",
  description:
    "Procesos administrativos ejecutados por agentes de IA para pymes mexicanas.",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
