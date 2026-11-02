"use client";

import { useFormStatus } from "react-dom";

type Props = { className: string; children: React.ReactNode; enCurso: string };

// Botón de envío que se desactiva mientras la acción trabaja, para que no se mande dos veces
// (p. ej. Eliminar cuenta, que tarda mientras borra en cada producto y en Clerk).
export function BotonEnviar({ className, children, enCurso }: Props) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending ? enCurso : children}
    </button>
  );
}
