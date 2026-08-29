import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

// Stub del paso 4 para que el enlace del pie de página no dé 404. Los
// términos de uso reales llegan en el paso 6 del PLAN.md.
export const metadata: Metadata = {
  title: "Términos de uso — AR2GO",
  robots: { index: false, follow: false },
};

export default function TerminosPage() {
  return (
    <Section background="papel">
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tight">
        Términos de uso
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-gris">
        Estamos preparando los términos de uso del sitio y del servicio.
        Todavía no están publicados en su versión definitiva.
      </p>
    </Section>
  );
}
