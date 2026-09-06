import Image from "next/image";
import { agentes } from "@/content/agentes";
import { Section } from "@/components/ui/Section";
import { tipografia } from "@/lib/typography";

function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[13px] w-[13px] flex-none text-azul">
      <path d="M3 8.5l3.5 3.5L13 5" />
    </svg>
  );
}

function Etiqueta({ texto }: { texto: string }) {
  return (
    <span className="ml-auto flex-none rounded-[4px] border border-azul/35 bg-azul/[0.22] px-1.5 py-0.5 text-[0.625rem] text-azul-suave">
      {texto}
    </span>
  );
}

// Miniatura de interfaz superpuesta a la foto de cada agente — reproduce el
// bloque "shot" de la maqueta (docs/brand.md v3).
function Shot({ agente }: { agente: (typeof agentes)[number] }) {
  const { shot } = agente;
  return (
    <div className="absolute inset-x-[9%] top-1/2 z-10 -translate-y-1/2 rounded-[10px] border border-linea/15 bg-superficie/85 p-3 text-[0.6875rem] backdrop-blur-sm">
      <div className="mb-1.5 flex items-center gap-2 border-b border-linea/10 pb-1.5 text-gris">
        <span className="h-[7px] w-[7px] flex-none rounded-full bg-azul" />
        {shot.encabezado}
      </div>
      {shot.variante === "checklist" ? (
        <div>
          {shot.filas.map((fila, indice) => (
            <div
              key={indice}
              className={`flex items-center gap-2 py-1 leading-[1.35] text-niebla ${indice > 0 ? "border-t border-linea/[0.06]" : ""}`}
            >
              {fila.tipo === "check" && <Check />}
              {fila.texto}
              {fila.tipo === "alerta" && <Etiqueta texto={fila.tag} />}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="leading-[1.45] text-niebla">{shot.mensaje}</p>
          <p className="mt-2 text-[0.625rem] text-gris">{shot.meta}</p>
          <div className="mt-2 flex items-center gap-2 pt-2 text-niebla">
            {shot.filaFinal.texto}
            <Etiqueta texto={shot.filaFinal.tag} />
          </div>
        </div>
      )}
    </div>
  );
}

export function Agentes() {
  return (
    <Section background="fondo" id="agentes">
      <p className={`max-w-[20ch] ${tipografia.h2}`}>
        Elige el agente que tu negocio necesita hoy
      </p>
      <p className={`mt-4 max-w-[48ch] ${tipografia.cuerpo} text-gris`}>
        Vienen configurados para casos concretos. Les enseñas cómo trabaja tu negocio y arrancan el primer día.
      </p>

      <div className="mt-14 grid gap-8 lg:grid-cols-3">
        {agentes.map((agente) => (
          <article key={agente.titulo}>
            <div className="relative isolate aspect-[16/11] overflow-hidden rounded-shot border border-linea/10">
              <Image src={agente.imagen} alt={agente.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: "linear-gradient(180deg, rgba(11,15,25,.15), rgba(11,15,25,.55))" }}
              />
              <Shot agente={agente} />
            </div>
            <h3 className={`mt-6 mb-2 ${tipografia.h3}`}>{agente.titulo}</h3>
            <p className={`${tipografia.cuerpoChico} text-gris`}>{agente.descripcion}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
