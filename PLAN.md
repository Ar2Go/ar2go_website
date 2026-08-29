# Plan de trabajo — AR2GO website

Este plan desglosa el "Orden de trabajo" del brief en pasos entregables, cada uno como su propio PR. **Estamos en el paso 3.** El brief pide pausar y mostrar el sitio en vivo en Vercel al final del paso 3, antes de seguir con el resto de secciones.

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

## Paso 3 — Hero + producto + precio, deploy a Vercel

Objetivo: primer corte visible en vivo, con las tres secciones de mayor peso de venta.

Entregables:
- `content/site.ts` (dominio, WhatsApp, datos de contacto — con los `TODO_*` correspondientes).
- `content/hero.ts`, `content/producto.ts`, `content/precio.ts`.
- Sección Hero: titular sobre el resultado, línea de apoyo, CTA primario ("Agenda una demo") y secundario ("Pruébalo por WhatsApp", con `href="https://wa.me/TODO_WHATSAPP"` hasta tener el número real).
- Sección Producto: paso a paso (llega el mensaje → responde con tu catálogo → califica → agenda → registra → da seguimiento), visual de conversación tipo chat, no diagrama de arquitectura.
- Sección Precio: montos marcados `TODO_PRECIO`, estructurados en un solo archivo de datos para poder cambiarlos sin tocar JSX.
- Evento de analítica propio en cada CTA (Vercel Analytics `track()`), aunque el resto de secciones todavía no exista.
- Proyecto conectado a Vercel y desplegado; se comparte la URL de preview en el PR para revisión.

Criterio de salida: sitio visible en vivo en Vercel con estas tres secciones, antes de seguir con el resto.

**Este es el punto de pausa explícito del brief ("Deploy a Vercel. Quiero verlo en vivo antes de que sigas") — se espera aprobación aquí también, aunque el brief solo exige parar después del paso 1.**

## Paso 4 — Resto de secciones

Entregables:
- `content/problema.ts` (cifras `TODO_DATO`), `content/control.ts`, `content/proceso.ts` (roadmap + lista de espera por correo), `content/faq.ts`.
- Secciones: Problema, Control y límites, Cómo empezamos, Próximos procesos (con captura de correo para lista de espera — reutiliza la misma interfaz de almacenamiento del paso 5, ver abajo), FAQ, Cierre + pie de página.
- Pie de página con datos de contacto y ligas a `/aviso-de-privacidad` y `/terminos` (aunque el contenido legal completo llegue en el paso 6, las rutas deben existir para no dar 404).

## Paso 5 — Formulario y captura de leads

Entregables:
- Formulario de demo: nombre, empresa, WhatsApp, giro, "¿cuántos mensajes de prospectos recibes al día?".
- Validación con Zod, honeypot antispam, rate limit por IP.
- Server Action que: (a) envía correo vía Resend, (b) escribe la fila en un almacén simple detrás de una interfaz (`lib/leads-store.ts`) fácil de swappear después por una base de datos real.
- Estados de carga y error visibles; si falla el envío, se muestra el WhatsApp directo como salida alterna.
- Casilla de consentimiento explícito (LFPDPPP) + casilla separada para contacto comercial futuro, ambas requeridas/opcionales según corresponda.
- Reutiliza el mismo mecanismo de captura para la lista de espera de "Próximos procesos" del paso 4.

## Paso 6 — Legales, metadatos, auditoría de rendimiento y accesibilidad

Entregables:
- `/aviso-de-privacidad`: borrador conforme art. 16 LFPDPPP (responsable, domicilio, finalidades primaria/secundaria, medios ARCO, revocación), marcado `TODO_LEGAL` para revisión de abogado.
- `/terminos`: términos de uso básicos.
- Metadatos: `title`, `description`, canonical, `og:image` generado a partir del isotipo (o placeholder si el isotipo real sigue sin llegar), JSON-LD de `Organization`.
- Banner de cookies: se evalúa al final; si Vercel Analytics corre sin cookies no esenciales (caso esperado), no se agrega.
- Auditoría Lighthouse en móvil: rendimiento ≥ 95, accesibilidad 100, SEO 100. Contraste AA, foco visible, navegable con teclado. Verificación a 360px de ancho.
- `next build` limpio, cero dependencias sin usar.

---

## Notas transversales (aplican a todos los pasos)

- Cada paso es un PR separado en rama `feat/*`, contra `main`, en borrador hasta pedir aprobación.
- Ningún placeholder (`TODO_DOMINIO`, `TODO_WHATSAPP`, `TODO_LEGAL`, `TODO_DATO`, `TODO_PRECIO`) se resuelve inventando el valor real; se resuelven solo cuando el dato llegue.
- El aviso de privacidad y los términos no se marcan como "listos para publicar" hasta que haya revisión de abogado explícita sobre `TODO_LEGAL`.
- No se construye panel de administración ni tablero de auditoría en este repo en ningún paso.
