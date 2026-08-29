import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { medidaMaxima, tipografia } from "@/lib/typography";

// Página interna de revisión del sistema de diseño. Sistema visual completo
// en docs/brand.md. No se enlaza desde ninguna navegación pública y se saca
// del índice de buscadores mientras el sitio no tiene rutas reales que la
// reemplacen.
export const metadata: Metadata = {
  title: "Muestra de componentes — AR2GO",
  robots: { index: false, follow: false },
};

export default function MuestraPage() {
  return (
    <>
      <Section background="papel">
        <p className={tipografia.eyebrow}>Eyebrow / mono</p>
        <h1 className={`mt-2 ${tipografia.display}`}>Título nivel 1</h1>
        <h2 className={`mt-8 ${tipografia.h2}`}>Título nivel 2</h2>
        <h3 className={`mt-6 ${tipografia.h3}`}>Título nivel 3</h3>
        <p className={`mt-4 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
          Cuerpo de texto cómodo de leer, con medida máxima de 68 caracteres
          para que los párrafos largos no se estiren en pantallas anchas.
          Esta es la familia geométrica única del sitio.
        </p>
        <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>
          Cuerpo chico, para texto secundario dentro de tarjetas y listas.
        </p>
        <p className={`mt-4 ${tipografia.precio}`}>$2,900 MXN</p>
        <p className={`mt-1 ${tipografia.dato} text-gris`}>
          Pie / dato — 29 AGO 2026
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#" variant="primary">
            Agenda una demo
          </Button>
          <Button href="#" variant="secondary">
            Pruébalo por WhatsApp
          </Button>
          <Button variant="primary" disabled>
            Botón deshabilitado
          </Button>
        </div>
      </Section>

      <Section background="neutro">
        <h2 className={tipografia.h2}>Section — fondo neutro</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className={tipografia.eyebrow}>Tarjeta</p>
            <p className={`mt-2 ${tipografia.h3}`}>Implementación</p>
            <p className={`mt-1 ${tipografia.precio}`}>$9,000 MXN</p>
          </Card>
          <Card>
            <p className={tipografia.eyebrow}>Tarjeta</p>
            <p className={`mt-2 ${tipografia.h3}`}>Renta mensual</p>
            <p className={`mt-1 ${tipografia.precio}`}>$2,900 MXN</p>
          </Card>
          <Card>
            <p className={tipografia.eyebrow}>Tarjeta</p>
            <p className={`mt-2 ${tipografia.h3}`}>Conversaciones</p>
            <p className={`mt-1 ${tipografia.precio}`}>300 incluidas</p>
          </Card>
        </div>
      </Section>

      <Section background="tinta">
        <h2 className={`${tipografia.h2} text-papel`}>Section — fondo tinta</h2>
        <p className={`mt-4 ${medidaMaxima} ${tipografia.cuerpo} text-papel/80`}>
          Para cierres de sección o bloques de alto contraste. El acento no se
          usa aquí para no competir con el CTA primario de la pantalla.
        </p>
      </Section>
    </>
  );
}
