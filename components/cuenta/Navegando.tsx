import { cuenta } from "@/content/cuenta";

// Barco pequeño que se mece sobre las olas, con "Navegando" abajo. Lo usa
// PantallaNavegando al entrar a /iniciar-sesion y /crear-cuenta. Estilos en
// app/(cuenta)/cuenta.css; con prefers-reduced-motion queda quieto.
export function Navegando() {
  return (
    <div className="navegando" role="status">
      <svg viewBox="0 0 120 64" fill="none" aria-hidden="true">
        <g className="navegando__barco">
          <path d="M60 8v30" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
          <path d="M62 11l20 24H62z" fill="currentColor" opacity={0.85} />
          <path d="M58 16L44 35h14z" fill="currentColor" opacity={0.55} />
          <path d="M36 40h48l-8 9H44z" fill="currentColor" />
        </g>
        <g className="navegando__olas" stroke="currentColor" strokeWidth={2} strokeLinecap="round" opacity={0.6}>
          <path d="M-40 54c10 0 10-5 20-5s10 5 20 5 10-5 20-5 10 5 20 5 10-5 20-5 10 5 20 5 10-5 20-5 10 5 20 5 10-5 20-5 10 5 20 5" />
        </g>
      </svg>
      <span>{cuenta.navegando}</span>
    </div>
  );
}
