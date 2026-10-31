import type { ReactNode } from "react";
import { HomeCtaLink } from "@/components/analytics/HomeCtaLink";
import { aBordo } from "@/content/aBordo";

type Producto = typeof aBordo.postio | typeof aBordo.horiq;

// Ficha de producto a dos columnas: contenido y botón a la izquierda y, a la
// derecha, el mockup que le toque. El botón va aparte del contenido para que,
// en una columna (móvil), quede al final, después del mockup.
function Ficha({ producto, boton, children }: { producto: Producto; boton: string; children: ReactNode }) {
  return (
    <article className="spot">
      <div className="spot__body">
        <div className="spot__kind">
          <span className={`badge badge--${producto.tipo}`}>{producto.badge}</span>
          <span className="eyebrow eyebrow--plain">{producto.etiqueta}</span>
        </div>
        <h3 className="spot__name">{producto.nombre}</h3>
        <p className="spot__sub">{producto.subtitulo}</p>
        <p className="spot__desc">{producto.descripcion}</p>
        <ol className="spot__list">
          {producto.puntos.map((punto, indice) => (
            <li key={punto}>
              <span>{String(indice + 1).padStart(2, "0")}</span>
              {punto}
            </li>
          ))}
        </ol>
      </div>
      <div className="spot__mock">{children}</div>
      <div className="spot__cta">
        <HomeCtaLink
          href={producto.cta.href}
          section={`a_bordo_${producto.nombre.toLowerCase()}`}
          label={producto.cta.label}
          className={`btn btn--lg ${boton}`}
          icon
        />
      </div>
    </article>
  );
}

function ColaPostio() {
  const { mock } = aBordo.postio;
  return (
    <div className="mock">
      <div className="mock__head">
        <span>{mock.titulo}</span>
        <span>{mock.periodo}</span>
      </div>
      <ul className="queue">
        {mock.publicaciones.map((publicacion) => (
          <li key={publicacion.titulo}>
            <span className="queue__thumb" aria-hidden="true">
              {publicacion.red}
            </span>
            <div>
              <p>{publicacion.titulo}</p>
              <div className="queue__meta">
                <span>{publicacion.cuando}</span>
                <span className={`state state--${publicacion.tono}`}>{publicacion.estado}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExpedienteHoriq() {
  const { mock } = aBordo.horiq;
  return (
    <div className="mock">
      <div className="mock__head">
        <span>{mock.titulo}</span>
        <span className="state state--acento">{mock.estado}</span>
      </div>
      <div className="record">
        <div className="record__top">
          <div>
            <p className="record__name">{mock.nombre}</p>
            <p className="record__id">{mock.folio}</p>
          </div>
          <span className="badge badge--argonauta">{mock.sello}</span>
        </div>
        <dl className="record__stats">
          {mock.metricas.map((metrica) => (
            <div key={metrica.etiqueta}>
              <dt>{metrica.etiqueta}</dt>
              <dd>{metrica.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
      <ul className="record__list">
        {mock.incluye.map((fila) => (
          <li key={fila.concepto}>
            <span>{fila.concepto}</span>
            <span className="state state--acento">{fila.estado}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ABordo() {
  return (
    <section className="band band--tight">
      <div className="wrap">
        <div className="head head--row">
          <div>
            <p className="eyebrow">{aBordo.eyebrow}</p>
            <h2>{aBordo.titulo}</h2>
          </div>
          <p className="lede">{aBordo.apoyo}</p>
        </div>

        <div className="spots">
          <Ficha producto={aBordo.postio} boton="btn--primary">
            <ColaPostio />
          </Ficha>
          <Ficha producto={aBordo.horiq} boton="btn--secondary">
            <ExpedienteHoriq />
          </Ficha>
        </div>
      </div>
    </section>
  );
}
