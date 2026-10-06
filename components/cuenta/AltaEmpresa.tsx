import { crearEmpresaAccion } from "@/app/(cuenta)/cuenta/acciones";
import { cuenta } from "@/content/cuenta";

// Primera visita a /cuenta: se pide el nombre de la empresa para darla de
// alta en ar2go-customers. Formulario de servidor, sin JS en el cliente.
export function AltaEmpresa() {
  return (
    <form action={crearEmpresaAccion} className="cuenta__formulario">
      <label className="cuenta__campo">
        <span>{cuenta.alta.campo}</span>
        <input name="nombre" required minLength={2} maxLength={120} placeholder={cuenta.alta.ejemplo} />
      </label>
      <button type="submit" className="btn btn--primary">
        {cuenta.alta.enviar}
      </button>
    </form>
  );
}
