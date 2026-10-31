import { esMX } from "@clerk/localizations";

// Traducción de Clerk (es-MX) con nuestras correcciones encima. La de
// @clerk/localizations trae "Inicar sesión" en el enlace de crear cuenta a
// iniciar sesión (signUp.start.actionLink).
export const localizacion = {
  ...esMX,
  signUp: {
    ...esMX.signUp,
    start: {
      ...esMX.signUp?.start,
      actionLink: "Iniciar sesión",
    },
  },
};
