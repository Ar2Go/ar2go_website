import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { legal } from "@/content/legal";

// Términos de uso básicos — mismo estatus de borrador que el aviso de
// privacidad, ver CLAUDE.md §10.
export const metadata: Metadata = {
  title: "Términos de uso",
  robots: { index: false, follow: true },
};

export default function TerminosPage() {
  return (
    <Section background="papel">
      <h1 className="text-4xl font-bold leading-[1.05] tracking-tight">
        {legal.terminos.titulo}
      </h1>
      <div
        role="note"
        className="mt-6 max-w-[68ch] rounded-ar2go border border-naranja-2/40 bg-naranja-2/5 p-4 text-sm"
      >
        Este es un borrador en revisión legal, todavía no es la versión
        definitiva. Última actualización: {legal.ultimaActualizacion}.
      </div>

      <div className="mt-10 max-w-[68ch] space-y-8">
        {legal.terminos.secciones.map((seccion) => (
          <div key={seccion.titulo}>
            <h2 className="text-xl font-medium">{seccion.titulo}</h2>
            <p className="mt-2 text-gris">{seccion.contenido}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
