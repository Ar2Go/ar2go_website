import { DemoForm } from "@/components/forms/DemoForm";
import { Section } from "@/components/ui/Section";
import { tipografia } from "@/lib/typography";

export function FormularioDemo() {
  return (
    <Section background="neutro" id="formulario-demo">
      <p className={tipografia.eyebrow}>Agenda una demo</p>
      <h2 className={`mt-2 max-w-2xl ${tipografia.h2}`}>
        Cuéntanos de tu negocio y te contactamos por WhatsApp.
      </h2>

      <div className="mt-10 max-w-xl">
        <DemoForm />
      </div>
    </Section>
  );
}
