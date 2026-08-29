"use client";

import { useActionState } from "react";
import {
  enviarFormularioDemo,
  type EstadoFormularioDemo,
} from "@/app/actions/demo";
import { HoneypotField } from "@/components/forms/HoneypotField";
import { site } from "@/content/site";
import { opcionesMensajesPorDia } from "@/lib/constants/mensajes-por-dia";

const estadoInicial: EstadoFormularioDemo = { status: "idle" };

const CAMPO_CLASES =
  "w-full rounded-ar2go border border-tinta/20 bg-papel px-3 py-2 text-tinta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta";

export function DemoForm() {
  const [estado, accion, pendiente] = useActionState(
    enviarFormularioDemo,
    estadoInicial,
  );

  if (estado.status === "exito") {
    return (
      <div className="rounded-ar2go border border-tinta/10 bg-papel p-6 text-tinta">
        <p className="text-lg font-medium">Listo, recibimos tu solicitud.</p>
        <p className="mt-2 text-gris">
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
      className="grid gap-5 rounded-ar2go border border-tinta/10 bg-papel p-6 text-tinta"
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
        <div
          role="alert"
          className="rounded-ar2go border border-naranja-2/40 bg-naranja-2/5 p-4 text-sm"
        >
          <p>{estado.mensaje}</p>
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

      <button
        type="submit"
        disabled={pendiente}
        className="inline-flex items-center justify-center rounded-ar2go bg-naranja px-6 py-3 font-medium text-papel transition-colors hover:bg-naranja-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta disabled:pointer-events-none disabled:opacity-50"
      >
        {pendiente ? "Enviando…" : "Agenda una demo"}
      </button>
    </form>
  );
}
