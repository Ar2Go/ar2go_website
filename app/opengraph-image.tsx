import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "AR2GO — Agente de Leads WhatsApp";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// og:image generado con los tokens de marca mientras no exista el isotipo
// real (public/brand/README.md) — nada de logo inventado, solo tipografía y
// color de marca. Reemplazar por una versión con el isotipo cuando llegue.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#101418",
          color: "#FFFFFF",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            backgroundColor: "#FF6A13",
            borderRadius: 8,
            marginBottom: 48,
          }}
        />
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
          {site.nombre}
        </div>
        <div style={{ fontSize: 34, color: "#9BA0A6", marginTop: 24, maxWidth: 900 }}>
          Agente de Leads WhatsApp para pymes mexicanas
        </div>
      </div>
    ),
    { ...size },
  );
}
