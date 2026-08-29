import { DemoForm } from "@/components/forms/DemoForm";
import { Section } from "@/components/ui/Section";

export function FormularioDemo() {
  return (
    <Section background="neutro" id="formulario-demo">
      <p className="font-mono text-sm uppercase tracking-wide text-gris">
        Agenda una demo
      </p>
      <h2 className="mt-2 max-w-2xl text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl">
        Cuéntanos de tu negocio y te contactamos por WhatsApp.
      </h2>

      <div className="mt-10 max-w-xl">
        <DemoForm />
      </div>
    </Section>
  );
}
