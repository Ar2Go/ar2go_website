import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/ui/Section";
import { legal } from "@/content/legal";
import { medidaMaxima, tipografia } from "@/lib/typography";

// Borrador conforme al artículo 16 de la LFPDPPP — pendiente de revisión de
// abogado antes de publicarse como definitivo (CLAUDE.md §10). noindex
// mientras siga siendo borrador: no queremos que un buscador indexe una
// versión legal sin revisar.
export const metadata: Metadata = {
  title: "Aviso de privacidad",
  robots: { index: false, follow: true },
};

export default function AvisoDePrivacidadPage() {
  return (
    <>
      <Header />
      <Section background="fondo">
        <h1 className={tipografia.display}>{legal.avisoPrivacidad.titulo}</h1>
        <div
          role="note"
          className={`mt-6 ${medidaMaxima} rounded-card border border-linea/10 bg-superficie p-4 ${tipografia.cuerpoChico}`}
        >
          <p className={tipografia.eyebrow}>Borrador</p>
          <p className="mt-1">
            En revisión legal, todavía no es la versión definitiva. Última
            actualización: {legal.ultimaActualizacion}.
          </p>
        </div>

        <div className={`mt-10 ${medidaMaxima} space-y-8`}>
          {legal.avisoPrivacidad.secciones.map((seccion) => (
            <div key={seccion.titulo}>
              <h2 className={tipografia.h3}>{seccion.titulo}</h2>
              <p className={`mt-2 ${tipografia.cuerpo} text-gris`}>
                {seccion.contenido}
              </p>
            </div>
          ))}
        </div>
      </Section>
      <Footer />
    </>
  );
}
