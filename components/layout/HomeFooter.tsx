import Image from "next/image";
import Link from "next/link";
import { footer } from "@/content/nav";
import { site } from "@/content/site";

export function HomeFooter() {
  return (
    <footer className="border-t border-linea/10">
      <div className="mx-auto grid w-full max-w-[1080px] gap-10 px-5 py-14 sm:grid-cols-2 md:px-8 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} className="mb-4 h-6 w-auto" />
          <p className="max-w-[30ch] text-xs text-gris">{footer.tagline}</p>
        </div>

        {footer.columnas.map((columna) => (
          <div key={columna.titulo}>
            <h4 className="mb-4 text-xs font-medium text-niebla">{columna.titulo}</h4>
            <ul className="grid gap-2.5">
              {columna.enlaces.map((enlace) => (
                <li key={enlace.label}>
                  <a href={enlace.href} className="text-xs text-gris transition-colors hover:text-niebla">
                    {enlace.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-xs font-medium text-niebla">Contacto</h4>
          <ul className="grid gap-2.5 text-xs text-gris">
            <li>
              <a href={`mailto:${site.contacto.correo}`} className="hover:text-niebla">
                {site.contacto.correo}
              </a>
            </li>
            <li>
              <a href={site.contacto.telefonoHref} className="hover:text-niebla">
                {site.contacto.telefono}
              </a>
            </li>
            <li>{site.contacto.ciudad}</li>
            <li>
              <a href={site.contacto.linkedin} className="hover:text-niebla">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1080px] flex-wrap justify-between gap-4 border-t border-linea/10 px-5 py-6 text-xs text-gris/70 md:px-8">
        <span>
          © {new Date().getFullYear()} {site.nombre}. Todos los derechos reservados.
        </span>
        <span className="flex gap-6">
          <Link href="/aviso-de-privacidad" className="hover:text-gris">
            Aviso de privacidad
          </Link>
          <Link href="/terminos" className="hover:text-gris">
            Términos
          </Link>
        </span>
      </div>
    </footer>
  );
}
