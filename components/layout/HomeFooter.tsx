import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/nav";
import { site } from "@/content/site";

export function HomeFooter() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__grid">
          <div className="foot__logo">
            <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} />
            <p className="foot__tag">{footer.tagline}</p>
          </div>

          {footer.columnas.map((columna) => (
            <div key={columna.titulo}>
              <h4>{columna.titulo}</h4>
              <ul>
                {columna.enlaces.map((enlace) => (
                  <li key={enlace.label}>
                    <a href={enlace.href}>{enlace.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>Contacto</h4>
            <ul>
              <li>
                <a href={`mailto:${site.contacto.correo}`}>{site.contacto.correo}</a>
              </li>
              <li>
                <a href={site.contacto.telefonoHref}>{site.contacto.telefono}</a>
              </li>
              <li>{site.contacto.ciudad}</li>
              <li>
                <a href={site.contacto.linkedin}>LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot__base">
          <span>
            © {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.
          </span>
          <span>
            <Link href="/aviso-de-privacidad">Aviso de privacidad</Link> &nbsp;&nbsp;{" "}
            <Link href="/terminos">Términos</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
