// Dibuja el texto de un documento legal de AR2GO/Ar2Go (docs/legal/*.md) tal
// como llega de ar2go-customers: encabezados, párrafos, listas, citas y
// tablas sencillas, más **negritas**. Sin librería de Markdown (CLAUDE.md §6):
// estos textos solo usan eso, y lo que no se reconoce sale como párrafo.

type Props = { texto: string; className?: string };

const enLinea = (t: string) =>
  t
    .split(/(\*\*[^*]+\*\*)/g)
    .map((parte, i) =>
      parte.startsWith("**") && parte.endsWith("**") ? <strong key={i}>{parte.slice(2, -2)}</strong> : parte,
    );

const celdas = (fila: string) =>
  fila
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

function Bloque({ bloque }: { bloque: string }) {
  const lineas = bloque.split("\n");
  const titulo = /^(#{1,3}) (.+)$/.exec(bloque);
  if (titulo && lineas.length === 1) {
    const nivel = titulo[1].length;
    if (nivel === 1) return <h2>{enLinea(titulo[2])}</h2>;
    if (nivel === 2) return <h3>{enLinea(titulo[2])}</h3>;
    return <h4>{enLinea(titulo[2])}</h4>;
  }
  if (lineas.every((l) => l.startsWith("|"))) {
    const [cabeza, , ...filas] = lineas;
    return (
      <div className="texto-legal__tabla">
        <table>
          <thead>
            <tr>
              {celdas(cabeza).map((c, i) => (
                <th key={i}>{enLinea(c)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filas.map((f, i) => (
              <tr key={i}>
                {celdas(f).map((c, j) => (
                  <td key={j}>{enLinea(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  // "**Subtítulo**" seguido de su lista, sin línea en blanco entre los dos.
  if (lineas.length > 1 && !/^(- |\d+\. )/.test(lineas[0]) && lineas.slice(1).every((l) => /^(- |\d+\. )/.test(l)))
    return (
      <>
        <Bloque bloque={lineas[0]} />
        <Bloque bloque={lineas.slice(1).join("\n")} />
      </>
    );
  if (lineas.every((l) => /^(- |\d+\. )/.test(l))) {
    const items = lineas.map((l) => l.replace(/^(- |\d+\. )/, ""));
    const Lista = /^\d/.test(lineas[0]) ? "ol" : "ul";
    return (
      <Lista>
        {items.map((it, i) => (
          <li key={i}>{enLinea(it)}</li>
        ))}
      </Lista>
    );
  }
  if (lineas.every((l) => l.startsWith(">")))
    return <blockquote>{enLinea(lineas.map((l) => l.replace(/^>\s?/, "")).join(" "))}</blockquote>;
  if (bloque === "---") return <hr />;
  return <p>{enLinea(lineas.join(" "))}</p>;
}

export function TextoLegal({ texto, className = "" }: Props) {
  // Un encabezado pegado a su contenido se separa: cada uno es su propio bloque.
  const bloques = texto
    .replace(/^(#{1,3} .+)$/gm, "\n$1\n")
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  return (
    <div className={`texto-legal ${className}`}>
      {bloques.map((b, i) => (
        <Bloque key={i} bloque={b} />
      ))}
    </div>
  );
}
