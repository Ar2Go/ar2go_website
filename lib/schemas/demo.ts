import { z } from "zod";
import { opcionesMensajesPorDia } from "@/lib/constants/mensajes-por-dia";

export const demoFormSchema = z.object({
  nombre: z.string().trim().min(2, "Escribe tu nombre.").max(100),
  empresa: z.string().trim().min(2, "Escribe el nombre de tu empresa.").max(100),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Escribe un número de WhatsApp válido.")
    .max(20),
  giro: z
    .string()
    .trim()
    .min(2, "Cuéntanos a qué se dedica tu negocio.")
    .max(100),
  mensajesPorDia: z.enum(opcionesMensajesPorDia, {
    error: "Selecciona una opción.",
  }),
  // Checkboxes HTML: "on" cuando están marcados, ausentes si no.
  aceptaAvisoPrivacidad: z.literal("on", {
    error: "Debes aceptar el aviso de privacidad para continuar.",
  }),
  aceptaContactoComercial: z.literal("on").optional(),
  // Honeypot antispam: debe llegar vacío. Si un bot lo llena, se descarta
  // en silencio (ver app/actions/demo.ts).
  sitio_web: z.string().max(0).optional().or(z.literal("")),
});

export type DemoFormValues = z.infer<typeof demoFormSchema>;
