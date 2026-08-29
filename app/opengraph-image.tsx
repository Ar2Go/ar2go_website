import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export const alt = `${site.nombre} — Agente de Leads WhatsApp`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function cargarSpaceGrotesk(texto: string) {
  const url = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&text=${encodeURIComponent(texto)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) {
    throw new Error("No se pudo resolver la URL de Space Grotesk desde Google Fonts");
  }
  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}

// og:image generado con next/og (docs/brand.md §9): fondo tinta, logotipo
// negativo centrado, titular del hero en Space Grotesk. 1200×630.
export default async function Image() {
  const fontData = await cargarSpaceGrotesk(hero.titulo);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: brand.tinta,
          padding: "80px",
          fontFamily: "Space Grotesk",
        }}
      >
        <svg width="242" height="64" viewBox="-14 -14 484 128" fill="none">
          <g
            stroke="#FFFFFF"
            strokeWidth={20}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit={6}
          >
            <path d="M10,90 L37,12 H47 L74,90" />
            <path d="M20,62 H64" />
            <path d="M106,90 V10 H138 A21,21 0 0 1 138,52 H106" />
            <path d="M136,52 L162,90" />
            <path d="M326.28,21.72 A40,40 0 1 0 338,50 H306" />
            <circle cx="406" cy="50" r="40" />
          </g>
          {/* Negativo sobre tinta (docs/brand.md §7): cuadrado blanco, número en tinta. */}
          <rect x="184" y="0" width="52" height="52" rx="9" fill={brand.papel} />
          <g
            transform="translate(196.4,6) scale(0.40)"
            fill="none"
            stroke="#101418"
            strokeWidth={19}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeMiterlimit={6}
          >
            <path d="M9,32 A24,24 0 0 1 57,32 L9,91.5 H59" />
          </g>
        </svg>

        <div
          style={{
            marginTop: 48,
            fontSize: 52,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {hero.titulo}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Space Grotesk", data: fontData, weight: 700, style: "normal" }],
    },
  );
}
