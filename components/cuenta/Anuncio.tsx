"use client";

import { useEffect, useState } from "react";
import { cuenta } from "@/content/cuenta";

type Props = {
  // Identifica el aviso: al cerrarlo no vuelve a salir en la misma sesión
  // del navegador.
  id: string;
  texto: string;
};

// Aviso que aparece al entrar, arriba de la columna, con botón de cerrar.
// No es parte fija de la página: se recuerda en sessionStorage que ya se
// cerró. Empieza oculto y se muestra después de montar, para no parpadear
// cuando ya estaba cerrado.
export function Anuncio({ id, texto }: Props) {
  const llave = `ar2go-anuncio-${id}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(llave) !== "cerrado") setVisible(true);
  }, [llave]);

  if (!visible) return null;

  return (
    <div className="anuncio" role="status">
      <p className="anuncio__texto">{texto}</p>
      <button
        type="button"
        className="anuncio__cerrar"
        aria-label={cuenta.landing.cerrarAviso}
        onClick={() => {
          sessionStorage.setItem(llave, "cerrado");
          setVisible(false);
        }}
      >
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 3l6 6M9 3 3 9" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
    </div>
  );
}
