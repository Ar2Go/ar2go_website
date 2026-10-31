export const ctaFinal = {
  eyebrow: "Listos para zarpar",
  titulo: "Tu primer tripulante empieza hoy.",
  // "Sin tarjeta": el alta y el plan Explorador no pasan por Stripe; el link
  // de pago solo aparece al elegir un plan de pago (lib/pagos.ts).
  apoyo:
    "Crea tu cuenta gratis, elige a Postio o a Horiq y ponlo a trabajar en minutos. Sin tarjeta, sin implementación.",
  ctaPrimario: { label: "Empezar gratis", href: "/crear-cuenta" },
  imagen: "/home/cta.webp",
} as const;
