import { ABordo } from "@/components/sections/ABordo";
import { Astillero } from "@/components/sections/Astillero";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Hero } from "@/components/sections/Hero";
import { Necesidades } from "@/components/sections/Necesidades";
import { Nosotros } from "@/components/sections/Nosotros";
import { Precios } from "@/components/sections/Precios";
import { Tripulacion } from "@/components/sections/Tripulacion";
import { HomeFooter } from "@/components/layout/HomeFooter";
import { HomeNav } from "@/components/layout/HomeNav";
import "./home.css";

// Home de la tripulación (rediseño 2026-10-31, ver CLAUDE.md §8): argonautas
// y argotipos, lo que está a bordo hoy y lo que viene. app/home.css trae el
// sistema visual de la maqueta aprobada, escapado bajo .ar-home para no
// chocar con los tokens de Tailwind que usa el resto del sitio (admin,
// legales, /muestra).
export default function Home() {
  return (
    <div className="ar-home">
      <HomeNav />
      <Hero />
      <Tripulacion />
      <ABordo />
      <Astillero />
      <Necesidades />
      <Nosotros />
      <Precios />
      <CtaFinal />
      <HomeFooter />
    </div>
  );
}
