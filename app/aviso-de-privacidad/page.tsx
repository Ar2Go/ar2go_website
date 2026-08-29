import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";

// Stub del paso 4 para que el enlace del pie de página no dé 404. El borrador
// real (LFPDPPP, marcado TODO_LEGAL para revisión de abogado) llega en el
// paso 6 del PLAN.md.
export const metadata: Metadata = {
  title: "Aviso de privacidad — AR2GO",
  robots: { index: false, follow: false },
};

export default function AvisoDePrivacidadPage() {
  return (
    <Section background="papel">
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tight">
        Aviso de privacidad
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-gris">
        Estamos preparando el aviso de privacidad conforme a la LFPDPPP.
        Todavía no está publicado en su versión definitiva.
      </p>
    </Section>
  );
}
