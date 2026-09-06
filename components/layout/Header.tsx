import Image from "next/image";
import Link from "next/link";

// Header simple para /admin y las páginas legales — la home trae su propio
// nav flotante (components/layout/HomeNav.tsx), este es el que usan el
// resto de las rutas.
export function Header() {
  return (
    <header className="border-b border-linea/10 bg-fondo">
      <div className="mx-auto flex w-full max-w-[1080px] items-center px-5 py-5 md:px-8">
        <Link href="/" aria-label="AR2GO — inicio" className="inline-flex">
          <Image src="/brand/ar2go-logotipo-2026.png" alt="AR2GO" width={104} height={25} className="h-6 w-auto" />
        </Link>
      </div>
    </header>
  );
}
