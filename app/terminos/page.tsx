import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { legal } from "@/content/legal";
import { medidaMaxima, tipografia } from "@/lib/typography";

// Términos de uso básicos — mismo estatus de borrador que el aviso de
// privacidad, ver CLAUDE.md §10.
export const metadata: Metadata = {
  title: "Términos de uso",
  robots: { index: false, follow: true },
};

export default function TerminosPage() {
  return (
    <Section background="papel">
      <h1 className={tipografia.display}>{legal.terminos.titulo}</h1>
      <div
        role="note"
        className={`mt-6 ${medidaMaxima} rounded-card border border-linea bg-neutro p-4 ${tipografia.cuerpoChico}`}
      >
        <p className={tipografia.eyebrow}>Borrador</p>
        <p className="mt-1">
          En revisión legal, todavía no es la versión definitiva. Última
          actualización: {legal.ultimaActualizacion}.
        </p>
      </div>

      <div className={`mt-10 ${medidaMaxima} space-y-8`}>
        {legal.terminos.secciones.map((seccion) => (
          <div key={seccion.titulo}>
            <h2 className={tipografia.h3}>{seccion.titulo}</h2>
            <p className={`mt-2 ${tipografia.cuerpo} text-gris`}>
              {seccion.contenido}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
