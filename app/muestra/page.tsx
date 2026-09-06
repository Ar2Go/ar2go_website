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
      <Section background="fondo">
        <p className={tipografia.eyebrow}>Eyebrow / mono</p>
        <h1 className={`mt-2 ${tipografia.display}`}>Título nivel 1</h1>
        <h2 className={`mt-8 ${tipografia.h2}`}>Título nivel 2</h2>
        <h3 className={`mt-6 ${tipografia.h3}`}>Título nivel 3</h3>
        <p className={`mt-4 ${medidaMaxima} ${tipografia.cuerpo} text-gris`}>
          Cuerpo de texto cómodo de leer, con medida máxima de 68 caracteres
          para que los párrafos largos no se estiren en pantallas anchas.
          Esta es la familia geométrica única del sitio — display y h2 van en
          peso ligero (300), a diferencia del resto de la escala.
        </p>
        <p className={`mt-2 ${medidaMaxima} ${tipografia.cuerpoChico} text-gris`}>
          Cuerpo chico, para texto secundario dentro de tarjetas y listas.
        </p>
        <p className={`mt-4 ${tipografia.precio}`}>$4,900 MXN</p>
        <p className={`mt-1 ${tipografia.dato} text-gris`}>
          Pie / dato — 06 SEP 2026
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="#" variant="primary">
            Empezar gratis
          </Button>
          <Button href="#" variant="secondary">
            Hablar con ventas
          </Button>
          <Button href="#" variant="ghost">
            Ver cómo funciona
          </Button>
          <Button variant="primary" disabled>
            Botón deshabilitado
          </Button>
        </div>
      </Section>

      <Section background="superficie">
        <h2 className={tipografia.h2}>Section — fondo superficie</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Card>
            <p className={tipografia.eyebrow}>Tarjeta</p>
            <p className={`mt-2 ${tipografia.h3}`}>Explorar</p>
            <p className={`mt-1 ${tipografia.precio}`}>$0</p>
          </Card>
          <Card>
            <p className={tipografia.eyebrow}>Tarjeta</p>
            <p className={`mt-2 ${tipografia.h3}`}>Equipo</p>
            <p className={`mt-1 ${tipografia.precio}`}>$4,900</p>
          </Card>
          <Card>
            <p className={tipografia.eyebrow}>Tarjeta</p>
            <p className={`mt-2 ${tipografia.h3}`}>Empresa</p>
            <p className={`mt-1 ${tipografia.precio}`}>A medida</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
