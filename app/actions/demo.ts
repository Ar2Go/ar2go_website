"use server";

import { headers } from "next/headers";
import { enviarNotificacionLead } from "@/lib/email";
import { leadsStore } from "@/lib/leads-store";
import { excedeLimite, ipDesdeEncabezados } from "@/lib/rate-limit";
import { demoFormSchema } from "@/lib/schemas/demo";

export type EstadoFormularioDemo =
  | { status: "idle" }
  | { status: "error"; mensaje: string }
  | { status: "exito" };

export async function enviarFormularioDemo(
  _estadoPrevio: EstadoFormularioDemo,
  formData: FormData,
): Promise<EstadoFormularioDemo> {
  const ip = ipDesdeEncabezados(await headers());

  if (excedeLimite(ip)) {
    return {
      status: "error",
      mensaje:
        "Hiciste varios intentos seguidos. Espera un minuto e inténtalo otra vez.",
    };
  }

  const resultado = demoFormSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!resultado.success) {
    return {
      status: "error",
      mensaje:
        resultado.error.issues[0]?.message ?? "Revisa los datos del formulario.",
    };
  }

  // Honeypot lleno: probablemente un bot. Se descarta en silencio, sin
  // guardar el lead ni avisar al remitente que algo salió mal.
  if (resultado.data.sitio_web) {
    return { status: "exito" };
  }

  const lead = {
    tipo: "demo" as const,
    nombre: resultado.data.nombre,
    empresa: resultado.data.empresa,
    whatsapp: resultado.data.whatsapp,
    giro: resultado.data.giro,
    mensajesPorDia: resultado.data.mensajesPorDia,
    aceptaContactoComercial: resultado.data.aceptaContactoComercial === "on",
    creadoEn: new Date().toISOString(),
  };

  try {
    await leadsStore.guardar(lead);
  } catch (error) {
    console.error("[formulario-demo] error al guardar el lead", error);
    return {
      status: "error",
      mensaje:
        "No pudimos guardar tu solicitud. Escríbenos directo por WhatsApp mientras lo resolvemos.",
    };
  }

  // El correo es best-effort: si Resend falla o no está configurado, el
  // lead ya quedó guardado — no bloqueamos el éxito del formulario por eso.
  try {
    await enviarNotificacionLead(lead);
  } catch (error) {
    console.error(
      "[formulario-demo] error al enviar el correo de notificación",
      error,
    );
  }

  return { status: "exito" };
}
