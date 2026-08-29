"use client";

import { useActionState } from "react";
import {
  enviarFormularioDemo,
  type EstadoFormularioDemo,
} from "@/app/actions/demo";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { Button } from "@/components/ui/Button";
import { site } from "@/content/site";
import { opcionesMensajesPorDia } from "@/lib/constants/mensajes-por-dia";
import { tipografia } from "@/lib/typography";

const estadoInicial: EstadoFormularioDemo = { status: "idle" };

const CAMPO_CLASES =
  "w-full rounded-base border border-linea bg-papel px-3 py-2 text-tinta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta";

export function DemoForm() {
  const [estado, accion, pendiente] = useActionState(
    enviarFormularioDemo,
    estadoInicial,
  );

  if (estado.status === "exito") {
    return (
      <div className="rounded-card border border-linea bg-papel p-6 text-tinta">
        <p className={tipografia.h3}>Listo, recibimos tu solicitud.</p>
        <p className={`mt-2 ${tipografia.cuerpo} text-gris`}>
          Te contactamos por WhatsApp para agendar la demo. Si prefieres
          adelantarlo, escríbenos ahora:{" "}
          <a href={site.whatsapp.href} className="underline underline-offset-4">
            {site.whatsapp.href}
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      action={accion}
      className="grid gap-5 rounded-card border border-linea bg-papel p-6 text-tinta"
    >
      <HoneypotField />

      <div className="grid gap-2">
        <label htmlFor="nombre" className="text-sm font-medium">
          Nombre
        </label>
        <input id="nombre" name="nombre" type="text" required className={CAMPO_CLASES} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="empresa" className="text-sm font-medium">
          Empresa
        </label>
        <input id="empresa" name="empresa" type="text" required className={CAMPO_CLASES} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="whatsapp" className="text-sm font-medium">
          WhatsApp
        </label>
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          placeholder="55 1234 5678"
          className={CAMPO_CLASES}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="giro" className="text-sm font-medium">
          Giro del negocio
        </label>
        <input id="giro" name="giro" type="text" required className={CAMPO_CLASES} />
      </div>

      <div className="grid gap-2">
        <label htmlFor="mensajesPorDia" className="text-sm font-medium">
          ¿Cuántos mensajes de prospectos recibes al día?
        </label>
        <select
          id="mensajesPorDia"
          name="mensajesPorDia"
          required
          defaultValue=""
          className={CAMPO_CLASES}
        >
          <option value="" disabled>
            Selecciona una opción
          </option>
          {opcionesMensajesPorDia.map((opcion) => (
            <option key={opcion} value={opcion}>
              {opcion}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 text-sm text-gris">
        <input
          type="checkbox"
          name="aceptaAvisoPrivacidad"
          required
          className="mt-1"
        />
        Acepto el{" "}
        <a href="/aviso-de-privacidad" className="underline underline-offset-4">
          aviso de privacidad
        </a>
        .
      </label>

      <label className="flex items-start gap-3 text-sm text-gris">
        <input
          type="checkbox"
          name="aceptaContactoComercial"
          className="mt-1"
        />
        Acepto que me contacten para ofertas y novedades de AR2GO (opcional).
      </label>

      {estado.status === "error" && (
        // Error en el color funcional de docs/brand.md §6, con texto
        // explicativo — nunca solo con color.
        <div
          role="alert"
          className="rounded-base border border-error/40 bg-error/5 p-4 text-sm text-tinta"
        >
          <p className="font-medium text-error">{estado.mensaje}</p>
          <p className="mt-2">
            Si el problema sigue, escríbenos directo:{" "}
            <a
              href={site.whatsapp.href}
              className="underline underline-offset-4"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      )}

      <Button type="submit" variant="primary" disabled={pendiente}>
        {pendiente ? "Enviando…" : "Agenda una demo"}
      </Button>
    </form>
  );
}
