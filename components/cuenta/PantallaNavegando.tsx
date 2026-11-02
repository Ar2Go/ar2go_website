"use client";

import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Navegando } from "@/components/cuenta/Navegando";

const MINIMO_MS = 1500;
const RUTAS = ["/iniciar-sesion", "/crear-cuenta"];

// Pantalla completa al entrar a /iniciar-sesion o /crear-cuenta: solo el barco y "Navegando" durante
// al menos 1.5 segundos y hasta que Clerk cargue. Se retira (desvanece) solo si hay un formulario que
// mostrar: sin sesión y fuera del regreso de Google (sso-callback). Con sesión, o regresando de Google,
// Clerk manda a /cuenta: la pantalla se queda hasta que /cuenta ya está, para que nunca se vea la página
// vacía con "Volver al sitio". Se decide una sola vez, con la ruta de entrada: /cuenta no la muestra.
export function PantallaNavegando() {
  const pathname = usePathname();
  const [aplica] = useState(() => RUTAS.some((ruta) => pathname.startsWith(ruta)));
  const { isLoaded, isSignedIn } = useAuth();
  const [minimoCumplido, setMinimoCumplido] = useState(false);
  const [retirada, setRetirada] = useState(false);
  const enRuta = RUTAS.some((ruta) => pathname.startsWith(ruta));
  const hayFormulario = isLoaded && !isSignedIn && !pathname.includes("sso-callback");
  const saliendo = minimoCumplido && hayFormulario;

  useEffect(() => {
    const temporizador = window.setTimeout(() => setMinimoCumplido(true), MINIMO_MS);
    return () => window.clearTimeout(temporizador);
  }, []);

  useEffect(() => {
    if (!saliendo) return;
    const temporizador = window.setTimeout(() => setRetirada(true), 400);
    return () => window.clearTimeout(temporizador);
  }, [saliendo]);

  // Ya en /cuenta (Clerk terminó de redirigir): fuera, sin desvanecer, la página ya está lista.
  if (!aplica || retirada || !enRuta) return null;
  return (
    <div className={`navegando-pantalla${saliendo ? " navegando-pantalla--sale" : ""}`}>
      <span className="navegando-pantalla__logo">
        <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={26} priority />
      </span>
      <Navegando />
    </div>
  );
}
