import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Favicon generado con los tokens de marca mientras no exista el isotipo
// real (public/brand/README.md): un cuadrado naranja sobre tinta, no un
// logo inventado. Reemplazar cuando llegue ar2go-isotipo.svg.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#101418",
        }}
      >
        <div
          style={{
            width: 18,
            height: 18,
            backgroundColor: "#FF6A13",
            borderRadius: 4,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
