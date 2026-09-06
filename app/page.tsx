import { Agentes } from "@/components/sections/Agentes";
import { CasosPorIndustria } from "@/components/sections/CasosPorIndustria";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Hero } from "@/components/sections/Hero";
import { Nosotros } from "@/components/sections/Nosotros";
import { Precios } from "@/components/sections/Precios";
import { HomeFooter } from "@/components/layout/HomeFooter";
import { HomeNav } from "@/components/layout/HomeNav";

// Home rehecho sobre la maqueta aprobada (2026-09-06, ver CLAUDE.md §1 y
// §8): AR2GO pivota de un solo proceso vendido por demo a una plataforma de
// agentes de autoservicio. Nav y pie son propios de esta página (no el
// Header/Footer genérico, que solo envuelve /admin y las páginas legales).
export default function Home() {
  return (
    <>
      <HomeNav />
      <Hero />
      <Agentes />
      <CasosPorIndustria />
      <Nosotros />
      <Precios />
      <CtaFinal />
      <HomeFooter />
    </>
  );
}
