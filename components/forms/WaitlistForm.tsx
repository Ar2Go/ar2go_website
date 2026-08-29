"use client";

import { useActionState } from "react";
import {
  enviarListaEspera,
  type EstadoListaEspera,
} from "@/app/actions/lista-espera";
import { HoneypotField } from "@/components/forms/HoneypotField";

const estadoInicial: EstadoListaEspera = { status: "idle" };

type WaitlistFormProps = {
  proceso: string;
  cta: string;
};

export function WaitlistForm({ proceso, cta }: WaitlistFormProps) {
  const [estado, accion, pendiente] = useActionState(
    enviarListaEspera,
    estadoInicial,
  );

  if (estado.status === "exito") {
    return (
      <p className="mt-4 text-sm text-gris">
        Listo, te avisamos en cuanto esté disponible.
      </p>
    );
  }

  return (
    <form action={accion} className="mt-2">
      <HoneypotField />
      <input type="hidden" name="proceso" value={proceso} />
      <div className="flex gap-2">
        <label htmlFor={`correo-${proceso}`} className="sr-only">
          Correo
        </label>
        <input
          id={`correo-${proceso}`}
          type="email"
          name="correo"
          required
          placeholder="tu@correo.com"
          className="min-w-0 flex-1 rounded-ar2go border border-tinta/20 px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tinta"
        />
        <button
          type="submit"
          disabled={pendiente}
          className="whitespace-nowrap rounded-ar2go border border-tinta px-3 py-2 text-sm font-medium hover:bg-neutro disabled:opacity-50"
        >
          {pendiente ? "…" : cta}
        </button>
      </div>
      {estado.status === "error" && (
        <p role="alert" className="mt-2 text-sm text-naranja-2">
          {estado.mensaje}
        </p>
      )}
    </form>
  );
}
