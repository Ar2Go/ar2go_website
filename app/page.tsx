import { Cierre } from "@/components/sections/Cierre";
import { ComoEmpezamos } from "@/components/sections/ComoEmpezamos";
import { Control } from "@/components/sections/Control";
import { Faq } from "@/components/sections/Faq";
import { FormularioDemo } from "@/components/sections/FormularioDemo";
import { Hero } from "@/components/sections/Hero";
import { Precio } from "@/components/sections/Precio";
import { Problema } from "@/components/sections/Problema";
import { Producto } from "@/components/sections/Producto";
import { ProximosProcesos } from "@/components/sections/ProximosProcesos";

// Orden de secciones per CLAUDE.md §8. FormularioDemo es dueña del ancla
// #formulario-demo a la que apuntan todos los CTA "Agenda una demo".
export default function Home() {
  return (
    <>
      <Hero />
      <Problema />
      <Producto />
      <Control />
      <Precio />
      <ComoEmpezamos />
      <ProximosProcesos />
      <Faq />
      <FormularioDemo />
      <Cierre />
    </>
  );
}
