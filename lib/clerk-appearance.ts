import type { ComponentProps } from "react";
import type { ClerkProvider } from "@clerk/nextjs";
import { brand } from "@/lib/brand";

type Apariencia = NonNullable<ComponentProps<typeof ClerkProvider>["appearance"]>;

// Los formularios de Clerk se pintan con los tokens de docs/brand.md (tema
// oscuro único, azul como acento) para que no se vean como un widget ajeno
// pegado al sitio. Lo que no alcanza esta API se resuelve por CSS en
// app/(cuenta)/cuenta.css, con las clases públicas `cl-<descriptor>`.
export const apariencia: Apariencia = {
  options: {
    // "flush" quita el recuadro, la sombra y el padding externo de la
    // tarjeta de Clerk: la composición (foto a la izquierda, columna de
    // formulario a la derecha) ya la pone components/layout/CuentaSplit.tsx,
    // y una tarjeta encima se veía como un widget pegado.
    elevation: "flush",
    // El aviso naranja "Development mode" solo aparece con llaves de
    // desarrollo (con las de producción desaparece solo), pero rompe el
    // look del formulario mientras probamos: el naranja no existe en la
    // paleta desde el rebrand de 2026-08-29.
    unsafe_disableDevelopmentModeWarnings: true,
  },
  variables: {
    colorBackground: brand.superficie,
    colorForeground: brand.niebla,
    colorMutedForeground: brand.gris,
    colorPrimary: brand.azul,
    colorPrimaryForeground: brand.papel,
    colorInput: brand.fondo,
    colorInputForeground: brand.niebla,
    // --color-linea siempre con opacidad baja sobre fondo oscuro
    // (docs/brand.md §3): sólido se ve como una línea blanca dura.
    colorBorder: "rgba(230, 233, 239, 0.12)",
    colorDanger: brand.error,
    colorSuccess: brand.exito,
    colorModalBackdrop: "rgba(11, 15, 25, 0.72)",
    fontFamily: "var(--font-space-grotesk)",
    fontFamilyButtons: "var(--font-space-grotesk)",
    borderRadius: "8px", // --radius-btn
  },
  elements: {
    // docs/brand.md §3 prohíbe sombras difusas.
    cardBox: { boxShadow: "none" },
    card: { boxShadow: "none" },
    socialButtonsBlockButtonText: { fontWeight: 500 },
    // El color del botón "Continuar con Google" (blanco, no la superficie
    // oscura ni el azul primario que Clerk le pone en /iniciar-sesion) vive
    // en app/(cuenta)/cuenta.css: cambia según la pantalla y hay que
    // cubrirlo por descriptor `cl-*`, no solo por este elemento.
  },
};
