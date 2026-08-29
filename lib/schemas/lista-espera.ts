import { z } from "zod";

export const listaEsperaSchema = z.object({
  correo: z.email("Escribe un correo válido."),
  proceso: z.string().trim().min(2).max(100),
  // Honeypot antispam, igual que en el formulario de demo.
  sitio_web: z.string().max(0).optional().or(z.literal("")),
});

export type ListaEsperaValues = z.infer<typeof listaEsperaSchema>;
