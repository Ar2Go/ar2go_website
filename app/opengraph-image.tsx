import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { brand } from "@/lib/brand";
import { hero } from "@/content/hero";
import { site } from "@/content/site";

export const alt = `${site.nombre} — Agentes de IA trabajando para ti`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function cargarSpaceGrotesk(texto: string) {
  const url = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300&text=${encodeURIComponent(texto)}`;
  const css = await (await fetch(url)).text();
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) {
    throw new Error("No se pudo resolver la URL de Space Grotesk desde Google Fonts");
  }
  const fontResponse = await fetch(match[1]);
  return fontResponse.arrayBuffer();
}

// og:image (docs/brand.md): fondo oscuro de marca, logotipo AR2GO (el PNG
// real de public/brand/, no reconstruido en JSX — a diferencia del favicon,
// este logotipo no tiene fuente vectorial todavía), titular del hero en
// Space Grotesk Light. 1200×630.
export default async function Image() {
  const [fontData, logoBuffer] = await Promise.all([
    cargarSpaceGrotesk(hero.titulo),
    readFile(path.join(process.cwd(), "public/brand/ar2go-logotipo-2026.png")),
  ]);
  const logoDataUri = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: brand.fondo,
          padding: "80px",
          fontFamily: "Space Grotesk",
        }}
      >
        <img src={logoDataUri} alt="AR2GO" width={220} height={53} />

        <div
          style={{
            marginTop: 56,
            fontSize: 52,
            fontWeight: 300,
            color: brand.papel,
            letterSpacing: "-0.035em",
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
      fonts: [{ name: "Space Grotesk", data: fontData, weight: 300, style: "normal" }],
    },
  );
}
