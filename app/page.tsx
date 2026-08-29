import { Section } from "@/components/ui/Section";

// Placeholder del paso 2 (scaffold + sistema de diseño). El home real —hero,
// producto, precio y el resto de secciones— llega en los pasos 3 y 4 del
// PLAN.md. Ver /muestra para el catálogo de componentes base.
export default function Home() {
  return (
    <Section background="papel" className="flex-1">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        AR2GO
      </p>
      <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
        Sitio en construcción.
      </h1>
      <p className="mt-4 max-w-[68ch] text-lg text-gris">
        El home real (hero, producto y precio) llega en el siguiente PR. Este
        es el andamiaje del paso 2: sistema de diseño y componentes base.
      </p>
    </Section>
  );
}
