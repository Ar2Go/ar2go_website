import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { TextoLegal } from "@/components/legal/TextoLegal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Section } from "@/components/ui/Section";
import { legalEmpresa } from "@/content/legal-empresa";
import { documentosPublicos, hayPlanoDeControl } from "@/lib/ar2go-customers";
import { medidaMaxima, tipografia } from "@/lib/typography";

type Props = { params: Promise<{ producto: string; documento: string }> };

export const dynamic = "force-dynamic";

// Lectura pública de los documentos que la empresa acepta al activar un
// producto (D25): términos y contrato de encargo de datos. Los sirve
// ar2go-customers con las variables como marcadores. Quedan `noindex`
// mientras tengan marcas TODO_LEGAL, igual que /terminos (CLAUDE.md §10).
const documento = cache(async (producto: string, slug: string) => {
  if (!hayPlanoDeControl || !/^[a-z0-9-]{2,40}$/.test(producto) || !/^[a-z0-9-]{2,80}$/.test(slug)) return null;
  try {
    const { documentos } = await documentosPublicos(producto);
    return documentos.find((d) => d.slug === slug) ?? null;
  } catch (e) {
    console.error("[legal] ar2go-customers no respondió:", e);
    return null;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { producto, documento: slug } = await params;
  const d = await documento(producto, slug);
  return {
    title: d?.titulo ?? legalEmpresa.noDisponible,
    robots: { index: !!d && d.todo_legal === 0, follow: true },
  };
}

export default async function DocumentoLegalPage({ params }: Props) {
  const { producto, documento: slug } = await params;
  const d = await documento(producto, slug);
  if (!d) notFound();
  return (
    <>
      <Header />
      <Section background="fondo">
        <p className={tipografia.eyebrow}>{legalEmpresa.eyebrow}</p>
        <h1 className={`mt-3 ${tipografia.display}`}>{d.titulo}</h1>
        <p className={`mt-3 ${tipografia.cuerpoChico} text-gris`}>
          {legalEmpresa.version} {d.version}
        </p>
        <div
          role="note"
          className={`mt-6 ${medidaMaxima} space-y-2 rounded-card border border-linea/10 bg-superficie p-4 ${tipografia.cuerpoChico}`}
        >
          {d.todo_legal > 0 && <p>{legalEmpresa.borrador}</p>}
          <p>{legalEmpresa.marcadores}</p>
        </div>
        {/* El primer encabezado del texto es el título, ya puesto arriba. */}
        <TextoLegal texto={d.texto.replace(/^# .+\n+/, "")} className="mt-10 text-niebla" />
      </Section>
      <Footer />
    </>
  );
}
