import { Hero } from "@/components/sections/Hero";
import { Precio } from "@/components/sections/Precio";
import { Producto } from "@/components/sections/Producto";

// Paso 3 del PLAN.md: hero, producto y precio con copy real. El resto de
// secciones (problema, control, cómo empezamos, próximos procesos, FAQ,
// cierre) llega en el paso 4.
export default function Home() {
  return (
    <>
      <Hero />
      <Producto />
      <Precio />
    </>
  );
}
