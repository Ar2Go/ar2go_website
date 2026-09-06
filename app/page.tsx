import { Agentes } from "@/components/sections/Agentes";
import { CasosPorIndustria } from "@/components/sections/CasosPorIndustria";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Hero } from "@/components/sections/Hero";
import { Nosotros } from "@/components/sections/Nosotros";
import { Precios } from "@/components/sections/Precios";
import { HomeFooter } from "@/components/layout/HomeFooter";
import { HomeNav } from "@/components/layout/HomeNav";
import "./home.css";

// Home apegado al pixel a la maqueta aprobada (2026-09-06, ver CLAUDE.md §1
// y §8): AR2GO pivota de un solo proceso vendido por demo a una plataforma
// de agentes de autoservicio. app/home.css trae el CSS de la maqueta casi
// literal, escapado bajo .ar-home para no chocar con los tokens de
// Tailwind que usa el resto del sitio (admin, legales, /muestra).
export default function Home() {
  return (
    <div className="ar-home">
      <HomeNav />
      <Hero />
      <Agentes />
      <CasosPorIndustria />
      <Nosotros />
      <Precios />
      <CtaFinal />
      <HomeFooter />
    </div>
  );
}
