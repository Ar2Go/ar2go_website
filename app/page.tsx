import { Cierre } from "@/components/sections/Cierre";
import { ComoEmpezamos } from "@/components/sections/ComoEmpezamos";
import { Control } from "@/components/sections/Control";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Precio } from "@/components/sections/Precio";
import { Problema } from "@/components/sections/Problema";
import { Producto } from "@/components/sections/Producto";
import { ProximosProcesos } from "@/components/sections/ProximosProcesos";

// Orden de secciones per CLAUDE.md §8. El formulario de demo real (paso 5)
// se inserta antes de Cierre; por ahora los CTA "Agenda una demo" resuelven
// en el ancla de Cierre (#formulario-demo).
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
      <Cierre />
    </>
  );
}
