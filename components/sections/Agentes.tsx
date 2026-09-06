import Image from "next/image";
import { agentes } from "@/content/agentes";

function Check() {
  return (
    <svg className="shot__tick" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

// Miniatura de interfaz superpuesta a la foto de cada agente (.shot) —
// reproduce el bloque de la maqueta; la forma cambia según el agente
// (checklist o mensaje), ver content/agentes.ts.
function Shot({ agente }: { agente: (typeof agentes)[number] }) {
  const { shot } = agente;
  return (
    <div className="shot">
      <div className="shot__head">
        <span className="shot__dot" aria-hidden="true" />
        {shot.encabezado}
      </div>
      {shot.variante === "checklist" ? (
        shot.filas.map((fila, indice) => (
          <div className="shot__row" key={indice}>
            {fila.tipo === "check" && <Check />}
            {fila.texto}
            {fila.tipo === "alerta" && <span className="shot__tag">{fila.tag}</span>}
          </div>
        ))
      ) : (
        <>
          <div className="shot__msg">{shot.mensaje}</div>
          <div className="shot__meta">{shot.meta}</div>
          <div className="shot__row" style={{ marginTop: ".5rem" }}>
            {shot.filaFinal.texto}
            <span className="shot__tag">{shot.filaFinal.tag}</span>
          </div>
        </>
      )}
    </div>
  );
}

export function Agentes() {
  return (
    <section className="band" id="agentes">
      <div className="wrap">
        <div className="head">
          <h2>Elige el agente que tu negocio necesita hoy</h2>
          <p className="lede">
            Vienen configurados para casos concretos. Les enseñas cómo trabaja tu negocio y arrancan el primer día.
          </p>
        </div>

        <div className="agents">
          {agentes.map((agente) => (
            <article className="agent" key={agente.titulo}>
              <div className="agent__shot">
                <Image src={agente.imagen} alt={agente.alt} fill sizes="(min-width: 1000px) 33vw, 100vw" />
                <Shot agente={agente} />
              </div>
              <h3>{agente.titulo}</h3>
              <p>{agente.descripcion}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
