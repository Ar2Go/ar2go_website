// Copy de las páginas públicas de lectura de los documentos legales de la
// empresa (app/legal/[producto]/[documento]). El texto de cada documento no
// vive aquí: lo sirve ar2go-customers desde su copia de Ar2Go/docs/legal (D25).
export const legalEmpresa = {
  eyebrow: "Para empresas",
  version: "Versión",
  borrador:
    "Borrador en revisión legal: este documento todavía tiene datos por completar y no es la versión definitiva.",
  marcadores:
    "Los datos entre corchetes se completan con el nombre de tu empresa y de quien acepta al activar el producto desde tu cuenta.",
  noDisponible: "Este documento no está disponible por ahora.",
} as const;
