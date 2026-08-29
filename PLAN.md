# Plan de trabajo — AR2GO website

Este plan desglosa el "Orden de trabajo" del brief en pasos entregables, cada uno como su propio PR. **Los 6 pasos están completos.** El dueño del proyecto autorizó avanzar y fusionar sin pausar a esperar aprobación en cada paso (2026-08-29). Pendientes reales antes de que el sitio se pueda llamar "listo para publicar": resolver los placeholders `TODO_*` (dominio, WhatsApp, razón social/domicilio legal, precios, cifras del problema, cuenta de Resend) y correr una auditoría de Lighthouse contra el deploy real de Vercel.

## Paso 1 — `CLAUDE.md` y plan ✅ aprobado y fusionado (2026-08-29)

Entregables:
- `CLAUDE.md`: contexto de negocio, stack, convenciones, sistema de diseño, placeholders pendientes, registro de decisiones.
- `PLAN.md` (este archivo).

Sin scaffold de Next.js, sin dependencias, sin deploy. Nada que ejecutar todavía.

**Preguntas abiertas del brief (§12), ya resueltas para no bloquear el arranque:**

| Pregunta | Resolución |
|---|---|
| Dominio del sitio | Placeholder `TODO_DOMINIO`, centralizado en `content/site.ts` |
| Número de WhatsApp Business | Placeholder `TODO_WHATSAPP`, centralizado en `content/site.ts` |
| Razón social para aviso de privacidad | Placeholder `TODO_LEGAL: [Razón social] S.A. de C.V.` + domicilio fiscal por definir, marcado como borrador para revisión de abogado |
| Cuenta de Resend | No existe todavía; se documenta `RESEND_API_KEY` en `.env.example` como pendiente de configurar, sin bloquear el resto |

---

## Paso 2 — Repo, scaffold y sistema de diseño ✅ hecho (2026-08-29)

Objetivo: dejar la base técnica lista y visualmente demostrable, sin copy real todavía.

Entregables:
- `create-next-app` (Next.js 15, App Router, TypeScript estricto, Tailwind v4, ESLint).
- `.gitignore` de Node, `.env.example` con `RESEND_API_KEY` (marcada pendiente) y cualquier otra variable que aparezca en el camino.
- `README.md`: cómo correr local, cómo desplegar a Vercel, dónde vive cada cosa (content/, components/, app/).
- Tokens de color y tipografía de §7 de `CLAUDE.md` cableados en Tailwind v4 (`@theme` o `globals.css`), incluyendo `next/font` para la sans geométrica y la monoespaciada.
- Componentes base: `Button` (primario/secundario, con la regla del naranja-una-sola-vez ya resuelta a nivel de componente, no de copy), `Section` (contenedor con fondo `--neutro`/`--papel` alternable), `Card`.
- Página de muestra (`/muestra` o similar, **no enlazada desde la navegación pública**) que enseñe los tres componentes en sus variantes, para revisar el sistema de diseño antes de meterlo en la home real.
- `public/brand/`: si los SVG de logo no han llegado, se deja un `README` corto en esa carpeta documentando qué falta y qué nombre de archivo se espera (`ar2go-logotipo.svg`, `ar2go-isotipo.svg`), sin inventar el logo.

Criterio de salida: `next build` limpio, sin errores de TypeScript/ESLint, página de muestra revisable en preview de Vercel o local. **Cumplido.**

## Paso 3 — Hero + producto + precio, deploy a Vercel ✅ hecho (2026-08-29)

Objetivo: primer corte visible en vivo, con las tres secciones de mayor peso de venta.

Entregables:
- `content/site.ts` (dominio, WhatsApp, datos de contacto — con los `TODO_*` correspondientes).
- `content/hero.ts`, `content/producto.ts`, `content/precio.ts`.
- Sección Hero: titular sobre el resultado, línea de apoyo, CTA primario ("Agenda una demo") y secundario ("Pruébalo por WhatsApp", con `href="https://wa.me/TODO_WHATSAPP"` hasta tener el número real).
- Sección Producto: paso a paso (llega el mensaje → responde con tu catálogo → califica → agenda → registra → da seguimiento), visual de conversación tipo chat, no diagrama de arquitectura.
- Sección Precio: montos marcados `TODO_PRECIO`, estructurados en un solo archivo de datos para poder cambiarlos sin tocar JSX.
- Evento de analítica propio en cada CTA (Vercel Analytics `track()`), aunque el resto de secciones todavía no exista.
- Proyecto conectado a Vercel y desplegado; se comparte la URL de preview en el PR para revisión.

Criterio de salida: sitio visible en vivo en Vercel con estas tres secciones, antes de seguir con el resto. **Cumplido** — preview de Vercel enlazado en el PR de este paso.

El brief pedía pausar aquí para ver el sitio en vivo antes de seguir; el dueño del proyecto autorizó explícitamente seguir fusionando y avanzando sin esperar aprobación paso por paso (2026-08-29), así que se continúa directo al paso 4.

## Paso 4 — Resto de secciones ✅ hecho (2026-08-29)

Entregables:
- `content/problema.ts` (cifras `TODO_DATO`), `content/control.ts`, `content/comoEmpezamos.ts`, `content/proximosProcesos.ts` (roadmap + lista de espera), `content/faq.ts`, `content/cierre.ts`.
- Secciones: Problema, Control y límites, Cómo empezamos, Próximos procesos, FAQ, Cierre + pie de página (`components/layout/Footer.tsx`, global en `app/layout.tsx`).
- Pie de página con datos de contacto y ligas a `/aviso-de-privacidad` y `/terminos` — se agregaron como páginas stub (`noindex`) para que no den 404; el contenido legal completo llega en el paso 6.
- La lista de espera de "Próximos procesos" quedó como enlace `mailto:` por proceso, no un formulario con backend — mide demanda sin construir infraestructura antes de tiempo. El paso 5 puede reemplazarlo por un Server Action sin tocar el resto de la sección.
- Se agregó el ancla `#formulario-demo` a la sección Cierre: los CTA "Agenda una demo" ya no apuntan a un lugar inexistente, aunque todavía no hay formulario ahí — eso es el paso 5.

## Paso 5 — Formulario y captura de leads ✅ hecho (2026-08-29)

Entregables:
- Formulario de demo (`components/forms/DemoForm.tsx`, sección `FormularioDemo`): nombre, empresa, WhatsApp, giro, "¿cuántos mensajes de prospectos recibes al día?". Ahora dueño del ancla `#formulario-demo`.
- Validación con Zod (`lib/schemas/demo.ts`, `lib/schemas/lista-espera.ts`), honeypot antispam (`components/forms/HoneypotField.tsx`), rate limit por IP en memoria (`lib/rate-limit.ts`).
- Server Actions (`app/actions/demo.ts`, `app/actions/lista-espera.ts`) que: (a) intentan enviar correo vía Resend (`lib/email.ts`, no truena si `RESEND_API_KEY` no está configurada — solo lo avisa por log), (b) escriben el lead en `lib/leads-store.ts`, una interfaz con una implementación mínima por logs (sin base de datos ni servicio externo todavía) para poder swappearla después sin tocar quien la llama.
- Estados de carga (`useActionState`) y error visibles; si falla el guardado, se muestra el WhatsApp directo como salida alterna.
- Casilla de consentimiento explícito (LFPDPPP, requerida) + casilla separada para contacto comercial futuro (opcional), independientes entre sí.
- La lista de espera de "Próximos procesos" del paso 4 se migró del enlace `mailto:` a un mini-formulario (`components/forms/WaitlistForm.tsx`) que reutiliza el mismo `leadsStore` y el mismo patrón de honeypot/rate-limit.

Validado localmente end-to-end (formulario de demo y lista de espera, éxito y log del lead) además de lint/tsc/build.

## Paso 6 — Legales, metadatos, auditoría de rendimiento y accesibilidad ✅ hecho (2026-08-29)

Entregables:
- `content/legal.ts` + `/aviso-de-privacidad`: borrador conforme art. 16 LFPDPPP (responsable, domicilio, finalidades primaria/secundaria, medios ARCO, revocación), marcado `TODO_LEGAL` para revisión de abogado. `noindex` hasta que se apruebe.
- `/terminos`: términos de uso básicos, mismo estatus de borrador.
- Metadatos en `app/layout.tsx`: `title` (con template), `description`, `alternates.canonical`, Open Graph + Twitter Card, favicon (`app/icon.tsx`) y `og:image` (`app/opengraph-image.tsx`) generados con los tokens de marca (sin inventar el isotipo — ver `public/brand/README.md`), JSON-LD de `Organization` (`components/seo/OrganizationJsonLd.tsx`). `app/robots.ts` y `app/sitemap.ts` agregados de paso.
- Banner de cookies: no se agrega. Vercel Analytics corre sin cookies no esenciales.
- Accesibilidad: se detectó y corrigió que el botón primario (`bg-naranja` + texto `papel`) daba ~2.9:1 de contraste, por debajo de AA — se cambió el texto a `tinta` (~6.5:1). Detalle y el trade-off que queda pendiente (estado hover) en `CLAUDE.md` §11.
- `next build`, lint y `tsc --noEmit` limpios. `npx depcheck` marca varias devDependencies como "sin uso" (`tailwindcss`, `typescript`, `eslint-config-next`, etc.) — son falsos positivos: se usan vía configuración (`postcss.config.mjs`, `tsconfig.json`, `eslint.config.mjs`), no vía imports que depcheck pueda rastrear.
- No se corrió una auditoría de Lighthouse real (requiere el sitio desplegado en Vercel); se verificó a mano contraste (cálculo de razones WCAG), navegación por teclado (elementos interactivos con foco visible nativo o `focus-visible:outline`) y el layout a 360px.

---

## Notas transversales (aplican a todos los pasos)

- Cada paso es un PR separado en rama `feat/*`, contra `main`, en borrador hasta pedir aprobación.
- Ningún placeholder (`TODO_DOMINIO`, `TODO_WHATSAPP`, `TODO_LEGAL`, `TODO_DATO`, `TODO_PRECIO`) se resuelve inventando el valor real; se resuelven solo cuando el dato llegue.
- El aviso de privacidad y los términos no se marcan como "listos para publicar" hasta que haya revisión de abogado explícita sobre `TODO_LEGAL`.
- No se construye panel de administración ni tablero de auditoría en este repo en ningún paso.
