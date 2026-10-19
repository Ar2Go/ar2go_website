import { signOut } from "@/auth";
import { Button } from "@/components/ui/Button";
import { admin } from "@/content/admin";
import { tipografia } from "@/lib/typography";

type EncabezadoAdminProps = { operador: string; titulo: string };

// Encabezado de todas las páginas de /admin: quién opera y cerrar sesión.
export function EncabezadoAdmin({ operador, titulo }: EncabezadoAdminProps) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0">
        <p className={tipografia.eyebrow}>{admin.eyebrow}</p>
        <h1 className={`mt-2 break-words ${tipografia.h2}`}>{titulo}</h1>
        <p className={`mt-2 ${tipografia.dato} text-gris`}>{operador}</p>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/admin/login" });
        }}
      >
        <Button type="submit" variant="secondary">
          {admin.cerrarSesion}
        </Button>
      </form>
    </div>
  );
}
