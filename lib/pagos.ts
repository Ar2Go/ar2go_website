// Links de pago de Stripe por plan (D7, D37). Puente hasta la fase 3 de
// ar2go-customers (checkout, portal y webhooks): por ahora, al cambiar de plan
// en Configuración → Suscripción, se manda a la persona al link de pago y el
// equipo de AR2GO sube el plan desde /admin al ver el pago (D36). Son links
// del modo de PRUEBA de Stripe (tarjeta 4242 4242 4242 4242); no cobran.
//
// Navegante usa por ahora el link de prueba que se armó para Horiq con el
// plan Equipo (otro monto); faltan los links de US$499 y de Timonel (US$999).
//
// Un link de pago no es secreto: es la misma URL que vería quien paga.
const linksPago: Record<string, string> = {
  navegante: "https://buy.stripe.com/test_6oU28r6ch6kX3Ng6OfdQQ00",
};

// Si el plan tiene link de pago.
export function tienePago(plan: string): boolean {
  return Object.hasOwn(linksPago, plan);
}

// URL de pago del plan, o null si no tiene. client_reference_id lleva la
// empresa para conciliar el pago cuando lleguen los webhooks; el correo se
// prellena para que la persona no lo vuelva a escribir.
export function urlPago(plan: string, empresaId: string, correo: string): string | null {
  const base = linksPago[plan];
  if (!base) return null;
  const url = new URL(base);
  url.searchParams.set("client_reference_id", empresaId);
  if (correo) url.searchParams.set("prefilled_email", correo);
  return url.toString();
}
