"use client";

import { useRouter } from "next/navigation";

type Props = { href: string; children: React.ReactNode };

// Renglón de tabla que abre `href` con un clic en cualquier parte. El enlace de la primera celda se
// queda para el teclado, los lectores de pantalla y abrir en otra pestaña; seleccionar texto no navega.
export function FilaEnlace({ href, children }: Props) {
  const router = useRouter();
  return (
    <tr
      className="fila-enlace"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("a, button, input, select, textarea")) return;
        if (window.getSelection()?.toString()) return;
        router.push(href);
      }}
    >
      {children}
    </tr>
  );
}
