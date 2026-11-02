import { admin } from "@/content/admin";

// Avisos comunes de las páginas de /admin: falta la API o no respondió.
export function SinConfigurar() {
  return (
    <div className="card card-pad stack" style={{ ["--gap" as string]: "6px" }}>
      <span className="card-title">{admin.sinConfigurar.titulo}</span>
      <p className="muted" style={{ fontSize: 14 }}>
        {admin.sinConfigurar.apoyo}
      </p>
    </div>
  );
}

export function ErrorDeCarga({ error }: { error: string }) {
  return (
    <div role="alert" className="aviso rojo">
      {admin.errorCarga}: {error}
    </div>
  );
}
