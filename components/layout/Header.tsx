import Link from "next/link";

// Logotipo horizontal en el header, uso por defecto (docs/brand.md §7).
// Se referencia el SVG real de public/brand/, nunca reconstruido en JSX.
export function Header() {
  return (
    <header className="border-b border-linea bg-papel">
      <div className="mx-auto flex w-full max-w-[1080px] items-center px-5 py-5 md:px-8">
        <Link href="/" aria-label="AR2GO — inicio" className="inline-flex">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/ar2go-logotipo.svg" alt="AR2GO" className="h-8 w-auto" />
        </Link>
      </div>
    </header>
  );
}
