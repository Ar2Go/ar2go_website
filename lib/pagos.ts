// Links de pago de Stripe por producto (D7). Puente hasta la fase 3 de
// ar2go-customers (checkout, portal y webhooks): por ahora, al activar un
// producto, /cuenta manda a la persona a su link de pago. Son links del modo
// de PRUEBA de Stripe (tarjeta 4242 4242 4242 4242); no cobran.
//
// Un link de pago no es secreto: es la misma URL que vería quien paga.
const linksPago: Record<string, string> = {
  horiq: "https://buy.stripe.com/test_6oU28r6ch6kX3Ng6OfdQQ00",
};

// Si el producto tiene link de pago (para ofrecer el plan Equipo al activarlo).
export function tienePago(slug: string): boolean {
  return Object.hasOwn(linksPago, slug);
}

// URL de pago del producto, o null si no tiene. client_reference_id lleva la
// empresa para conciliar el pago cuando lleguen los webhooks; el correo se
// prellena para que la persona no lo vuelva a escribir.
export function urlPago(slug: string, empresaId: string, correo: string): string | null {
  const base = linksPago[slug];
  if (!base) return null;
  const url = new URL(base);
  url.searchParams.set("client_reference_id", empresaId);
  if (correo) url.searchParams.set("prefilled_email", correo);
  return url.toString();
}
