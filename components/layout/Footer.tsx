import Link from "next/link";
import { site } from "@/content/site";
import { tipografia } from "@/lib/typography";

export function Footer() {
  return (
    <footer className="border-t border-linea bg-papel">
      <div
        className={`mx-auto flex w-full max-w-[1080px] flex-col gap-4 px-5 py-10 text-gris sm:flex-row sm:items-center sm:justify-between md:px-8 ${tipografia.cuerpoChico}`}
      >
        <p>
          © {new Date().getFullYear()} {site.nombre}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a href={`mailto:${site.contacto.correo}`} className="hover:text-tinta">
            {site.contacto.correo}
          </a>
          <a href={site.whatsapp.href} className="hover:text-tinta">
            WhatsApp
          </a>
          <Link href="/aviso-de-privacidad" className="hover:text-tinta">
            Aviso de privacidad
          </Link>
          <Link href="/terminos" className="hover:text-tinta">
            Términos
          </Link>
        </div>
      </div>
    </footer>
  );
}
