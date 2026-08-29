import { Resend } from "resend";
import { site } from "@/content/site";
import type { Lead } from "@/lib/leads-store";

// RESEND_API_KEY todavía no existe (CLAUDE.md §9): mientras no esté
// configurada, esta función solo avisa por log y no truena el envío del
// formulario — el lead ya quedó guardado en leadsStore de cualquier forma.
export async function enviarNotificacionLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[email] RESEND_API_KEY no configurada; se omite el correo de notificación.",
    );
    return;
  }

  const resend = new Resend(apiKey);
  const asunto =
    lead.tipo === "demo"
      ? `Nueva demo: ${lead.nombre} (${lead.empresa ?? "sin empresa"})`
      : `Lista de espera: ${lead.procesoInteres}`;

  await resend.emails.send({
    // TODO_DOMINIO: reemplazar por un remitente del dominio propio una vez
    // verificado en Resend.
    from: `AR2GO <onboarding@resend.dev>`,
    to: [site.contacto.correo],
    subject: asunto,
    text: JSON.stringify(lead, null, 2),
  });
}
