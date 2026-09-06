# CLAUDE.md — AR2GO Website

Este archivo orienta a Claude Code (y a cualquier humano) sobre el contexto de negocio, el stack, las convenciones y las decisiones tomadas para el sitio de marketing de AR2GO. Léelo completo antes de tocar código.

## 1. Contexto de negocio

> **Pivote 2026-09-06 (ver §11):** AR2GO dejó de vender un solo proceso administrativo por demo y pasa a ser una **plataforma de agentes de IA de autoservicio**. Esta sección describe el modelo de negocio *actual*; el modelo anterior (Agente de Leads WhatsApp, venta por demo) queda documentado como histórico en §11.

AR2GO vende **agentes de IA que se contratan como a un empleado**: se les dan permisos acotados dentro de la operación de la empresa (ERP, sistemas de la línea de producción, inventario, cuentas por pagar, etc.) y ejecutan tareas repetitivas de forma autónoma, con cada decisión registrada. El cliente se da de alta solo (autoservicio), configura el agente y lo pone a trabajar — no hay venta uno a uno obligatoria, aunque el plan Empresa sí ofrece "Hablar con ventas".

El catálogo se organiza por **agente** (cuentas por pagar, propuestas, inventario, y los que se agreguen), agrupados en la home por caso de uso ("Elige el agente que tu negocio necesita hoy") y, en la sección de casos, por industria (Manufactura, Logística, Retail, Servicios financieros) — cada tab muestra dónde entra el primer agente y qué cambia después, con una cifra de resultado real.

**Cifras de negocio confirmadas como reales** (no son placeholders `TODO_DATO`): más de 150 agentes en producción, 99.95% de disponibilidad, y los resultados por industria de `content/casos.ts` (-31% de paro no planeado, 4.2h menos por embarque, 98.6% de exactitud de inventario, 3 semanas para incorporar un requerimiento de reporte). Confirmadas explícitamente por el dueño del proyecto el 2026-09-06 — si en algún momento dejan de ser reales, hay que quitarlas o volver a marcarlas `TODO_DATO`, no dejarlas como cifra fija.

## 2. Objetivo del sitio

El sitio califica y convierte visitantes en cuentas de autoservicio, sin intervención de ventas para los planes Explorar y Equipo.

Reglas que no se negocian:

- El **precio va visible** en la página (sección Precios, `content/precio.ts`), en los tres planes (Explorar/Equipo/Empresa) — nunca detrás de un formulario para los dos primeros planes.
- CTA primario: **"Empezar gratis"**. CTA secundario (hero): **"Ver cómo funciona"** (ancla a la sección de agentes). El plan Empresa usa "Hablar con ventas" como excepción, porque ese nivel sí requiere una conversación.
- Cada sección responde a una industria o un caso de uso concreto, no describe arquitectura técnica.

**Idioma:** español de México, tuteo, sin anglicismos innecesarios ("agente" no "AI agent", "proceso" no "workflow"). Cero contenido en inglés en el sitio público (los commits sí van en inglés, ver §4).

## 3. Qué no hacer

- No inventar cifras, testimonios, logos de clientes ni casos de éxito **sin confirmación explícita del dueño del proyecto**. Las cifras actuales de `content/hero.ts` y `content/casos.ts` están confirmadas (ver §1) — cualquier cifra nueva sigue el mismo criterio: se pregunta antes de publicarla, no se inventa.
- No usar ilustraciones genéricas de IA, cerebros, robots ni nodos conectados. La fotografía del sitio es paisaje real con licencia (fiordos, Pexels) — no generada, no stock genérico de "tecnología".
- No agregar chat widget de terceros.
- No construir el **tablero de auditoría** (el que muestra conversaciones/ejecuciones del agente al dueño del negocio) en este repo — sigue siendo de otra plataforma. La única excepción, desde 2026-08-29 (ver §11), es un panel de administración interno (`/admin`) para administrar los agentes de la fábrica (`ar2go-platform`), con acceso restringido — no es una funcionalidad de cara al cliente.
- No meter contenido en inglés en el sitio.
- No cambiar de stack sin aprobación explícita (ver §5).

## 4. Repositorio y flujo de trabajo

- Repo: `Ar2Go/ar2go_website`.
- `main` se trata como protegida: todo el trabajo va en ramas `feat/*` o `fix/*`, un PR por entregable.
- Commits en **conventional commits, en inglés**, con cuerpo breve explicando el porqué cuando la decisión no sea obvia.
- `.gitignore` de Node, `.env.example` con todas las variables documentadas, `README.md` con cómo correr local, cómo desplegar, y dónde vive cada cosa.
- Este archivo (`CLAUDE.md`) se actualiza con cada decisión relevante — ver §10 "Decisiones tomadas".

## 5. Stack

- **Next.js 15 (App Router) + TypeScript estricto + Tailwind CSS v4.**
- Despliegue en **Vercel**. Sin infraestructura propia todavía.
- Sin librería de componentes pesada. Componentes propios; `lucide-react` solo si hace falta iconografía puntual.
- Sin CMS en esta versión: el contenido vive en archivos TypeScript tipados bajo `content/`, uno por sección, para que cambiar copy sea un PR de una línea.
- Analítica: Vercel Analytics + un evento propio por clic en cada CTA (para saber qué sección genera la demo).

**Nota sobre Astro vs. Next.js** (evaluado antes de arrancar, §11): el sitio es marketing puro y Astro rendiría islas más ligeras, pero el formulario de leads necesita Server Actions/route handlers con Resend, rate limiting y un almacén de datos — todo eso vive nativamente en Next.js sobre Vercel sin capas extra, y deja abierta la puerta a que el futuro panel/tablero de auditoría (aunque no se construya en este repo) comparta convenciones si algún día se vuelve un monorepo Next. Se mantiene Next.js 15 según el brief; no se cambia de stack.

## 6. Convenciones de código

- TypeScript estricto (`strict: true`), sin `any` implícito.
- Componentes de servidor por defecto; `"use client"` solo donde haya interactividad real (formulario, menú móvil, etc.).
- Contenido de copy **nunca hardcodeado en JSX**: vive en `content/<seccion>.ts`, tipado, importado por el componente.
- Un componente por archivo, nombre de archivo en PascalCase para componentes, kebab-case para el resto.
- Validación de datos externos (formularios, env) con **Zod**.
- Nada de dependencias que no se usen; antes de añadir una librería, preguntarse si un componente propio de <50 líneas la reemplaza.
- Los placeholders de contenido pendiente siguen convención `TODO_<TIPO>` (ver §9) para que sean grep-eables y bloqueen una revisión legal/de negocio antes de publicar.

## 7. Sistema de diseño

> El sistema visual vive en `docs/brand.md`. Léelo antes de cualquier trabajo de interfaz. No modifiques tokens sin PR dedicado.

`docs/brand.md` es la fuente única de verdad de tokens de color, tipografía, espaciado, radio, componentes y uso del logotipo — si algo en el código contradice lo que dice ese archivo, gana `docs/brand.md`. Resumen para no tener que abrirlo cada vez:

- **Tema único, oscuro** (`docs/brand.md` v3, decisión 2026-09-06): fondo `#0B0F19`, superficies `#121826`/`#161D2E`, texto casi blanco (`--color-niebla`). No hay modo claro ni toggle — esto revierte la regla anterior de "no implementar modo oscuro", que era sobre no tener *dos* temas, no sobre cuál color de fondo usar.
- **Azul** (`#2563EB`) es el único acento de color — fondos de CTA primario, estados activos, iconos destacados. Como texto de tamaño normal se usa la variante clara `--color-azul-suave` (`#7CA4FA`): el azul base da 3.71:1 sobre el fondo, no pasa AA de texto (4.5:1).
- Tipografía: Space Grotesk (sans — display y H2 en peso **ligero/300**, no bold) + JetBrains Mono (eyebrows, precios, datos — nunca en párrafos), vía `next/font`. Escala completa en `docs/brand.md` §4, implementada en `lib/typography.ts`.
- Medida máxima de línea: 68 caracteres, sin excepción.
- Nada de sombras difusas ni gradientes decorativos — los degradados sobre fotografía (para legibilidad del texto encima) son la excepción explícita. Líneas divisorias siempre con opacidad baja (`border-linea/10`, `/20`), nunca sólidas sobre el fondo oscuro.
- Tres radios, no uno: `--radius-btn` (8px), `--radius-card` (16px), `--radius-shot` (12px, fotos de agente), `--radius-pill` (999px).
- Colores funcionales, independientes de marca: `--color-error` (#F87171) y `--color-exito` (#34D399) — aclarados frente a los tonos "de manual" para que funcionen como texto sobre fondo oscuro (ver `docs/brand.md` §3). Solo para estados reales de interfaz, nunca decorativos.
- Logotipo actual: `public/brand/ar2go-logotipo-2026.png` — es PNG, no SVG, porque es el único archivo real entregado (ver `docs/brand.md` §7 para el porqué y el pendiente de vector). El favicon (`app/icon.svg`) sí es SVG real. Los SVG del wordmark anterior (marino) quedan en `public/brand/` como histórico, sin uso activo. La excepción de siempre para reconstruir en JSX sigue siendo `app/opengraph-image.tsx` (Satori/`next/og` no soporta `next/image` ni archivos externos directamente).
- Fotografía: paisaje real con licencia (fiordos, Pexels), nunca ilustración genérica de IA (regla de §3, sin cambios).

## 8. Arquitectura de contenido

Una sola página larga (`/`) más dos páginas legales (`/aviso-de-privacidad`, `/terminos`). Orden de secciones en la home (reescrito 2026-09-06 sobre la maqueta aprobada — ver §11):

1. Nav flotante (`HomeNav.tsx`, propio de la home — no el `Header` genérico) con enlaces de ancla, "Iniciar sesión" y "Crear cuenta".
2. Hero cinematográfico: foto de fiordo a sangre + titular + los dos CTA ("Empezar gratis" / "Ver cómo funciona") + pie con las cifras de negocio confirmadas.
3. Agentes (`Agentes.tsx`): tres tarjetas con foto + miniatura de interfaz superpuesta, una por agente (cuentas por pagar, propuestas, inventario).
4. Casos por industria (`CasosPorIndustria.tsx`, client component): tabs — Manufactura / Logística / Retail / Servicios financieros — cada uno con problema, resultados y una cifra real.
5. Nosotros (`Nosotros.tsx`): franja con foto a sangre, texto de posicionamiento ("Ingeniería, no una demo bonita") y las 4 etapas de uso (Descubre/Configura/Entrena/Activa).
6. Precios (`Precios.tsx`), visible: tres planes (Explorar/Equipo/Empresa) con montos confirmados como reales.
7. CTA final (`CtaFinal.tsx`): franja con foto a sangre + CTA "Empezar gratis".
8. Pie (`HomeFooter.tsx`, propio de la home): logo, tagline, columnas Producto/Empresa/Contacto, ligas legales.

Las secciones del modelo de negocio anterior (Problema, Producto, Control, Cómo empezamos, Próximos procesos, FAQ, formulario de demo) se retiraron de la home en el pivote — ver §11 para qué pasó con su código.

Detalle de copy y aceptación por sección del diseño original (ya no vigente): ver `PLAN.md`.

### Panel de administración (`/admin`)

Fuera de la home pública, con login de Google restringido a una lista blanca de correos (hoy solo `juand86@gmail.com`, en `auth.ts`). Administra los agentes de la fábrica de `ar2go-platform` — hoy es solo el andamiaje de acceso, sin datos reales, porque esa plataforma sigue en etapa 0. Ver §11 (decisión 2026-08-29) para el porqué y el alcance exacto.

- `auth.ts` — configuración de Auth.js (NextAuth v5), proveedor Google, sesión JWT (sin base de datos). La lista blanca vive en el callback `signIn`, no en Google Cloud Console — el consentimiento de Google puede estar abierto y aun así solo entra quien está en la lista.
- `middleware.ts` — protege `/admin/*`; sin sesión, redirige a `/admin/login`.
- `/admin/login`, `/admin` — ambos `noindex`.
- Variables de entorno nuevas en `.env.example`: `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET` (ver README para cómo generarlas).

## 9. Placeholders pendientes (no publicar sin resolver)

Ya no hay `TODO_DOMINIO`: el dominio real es `ar2go.io`, comprado y asignado en `content/site.ts` (2026-09-06, ver §11). Sigue pendiente conectarlo en Vercel (Settings → Domains) y verificarlo en Resend para poder enviar correo desde `hola@ar2go.io` — ninguno de los dos es un cambio de código.

| Placeholder | Qué falta | Dónde vive |
|---|---|---|
| `TODO_WHATSAPP` | Número de WhatsApp Business | `content/site.ts` (centralizado) — ya no es el canal principal tras el pivote a autoservicio (§1), se conserva por si un flujo de contacto lo vuelve a usar |
| `TODO_TELEFONO` | Teléfono de contacto del pie de página | `content/site.ts` (centralizado) — la maqueta traía `+52 55 0000 0000` de relleno, no un número real |
| `TODO_LINKEDIN` | Liga real de LinkedIn de la empresa | `content/site.ts` (centralizado) |
| `TODO_LEGAL` | Razón social y domicilio fiscal para el aviso de privacidad (LFPDPPP) | `content/legal.ts` — marcado explícitamente como borrador para revisión de abogado |
| `RESEND_API_KEY` | Cuenta de Resend aún no existe | `.env.example`, documentada como pendiente de configurar; el flujo que la usaba (formulario de demo) quedó orgánicamente sin usar tras el pivote (§11), no bloquea el resto del trabajo |
| `AUTH_SECRET` / `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Credenciales OAuth de Google aún no creadas | `.env.example`, documentadas como pendientes; sin ellas, `/admin` no deja iniciar sesión pero el resto del sitio funciona igual |

Ya no hay `TODO_DATO` ni `TODO_PRECIO`: las cifras de negocio y los montos de los planes están confirmados como reales (§1). Si algún dato nuevo entra sin confirmar, se marca con el mismo criterio que estos placeholders, no se inventa.

Regla: **un solo lugar por placeholder**. Nunca repetir el número de WhatsApp, el teléfono o el dominio hardcodeado en más de un archivo de contenido — todo importa desde `content/site.ts`.

## 10. Cumplimiento (LFPDPPP)

- Aviso de privacidad conforme al artículo 16 de la LFPDPPP: identidad y domicilio del responsable, finalidades primarias y secundarias, medios para ejercer derechos ARCO, mecanismo de revocación. Se redacta como **borrador** marcado `TODO_LEGAL`, no se publica como definitivo sin revisión de abogado.
- Consentimiento explícito en el formulario de demo (`components/forms/DemoForm.tsx`), con **casilla separada** para contacto comercial futuro (opt-in independiente del envío del formulario) — el componente sigue existiendo y cumpliendo esto, pero desde el pivote de 2026-09-06 (§11) no está enlazado en ninguna página; queda disponible para el día en que el flujo de autoservicio necesite un formulario de contacto real.
- Términos de uso básicos.
- Banner de cookies: **solo si se terminan usando cookies no esenciales**. Si Vercel Analytics funciona sin ellas (es el caso por defecto, cookieless), no se pone banner.

## 11. Decisiones tomadas

> Registro cronológico. Cada entrada lleva fecha y el porqué, no solo el qué.

- **2026-08-26** — Se confirma stack Next.js 15 + TypeScript + Tailwind v4 sobre Vercel (no se evalúa cambio a Astro): el formulario de leads con Server Action + Resend + rate limit y el futuro crecimiento del proyecto pesan más que la ligereza extra de islas de Astro para este caso.
- **2026-08-26** — Los cuatro valores abiertos del brief (dominio, WhatsApp, razón social/domicilio legal, cuenta de Resend) se resuelven como placeholders centralizados (`TODO_DOMINIO`, `TODO_WHATSAPP`, `TODO_LEGAL`, `RESEND_API_KEY`) en vez de bloquear el arranque del proyecto. Ninguno bloquea el resto del trabajo; todos se documentan en un solo lugar para que reemplazarlos sea un PR de una línea.
- **2026-08-26** — Se entrega primero `CLAUDE.md` + `PLAN.md` en un PR en borrador, sin scaffold de Next.js todavía, siguiendo el orden de trabajo del brief (paso 1 de 6). El scaffold, sistema de diseño en Tailwind y componentes base quedan para el paso 2, tras aprobación.
- **2026-08-29** — Paso 1 aprobado y fusionado. Se hace scaffold con `create-next-app@15` en vez de `@latest` (que instala Next 16): el stack aprobado es Next.js 15. Se agrega un `overrides.postcss` en `package.json` para traer el mismo postcss parchado que ya usa `@tailwindcss/postcss`, porque el postcss que trae Next 15 internamente tiene advisories de XSS/path traversal cuyo único fix "oficial" es saltar a Next 16; el override resuelve `npm audit` a cero sin tocar el major. `/muestra` se agrega como página interna (`noindex`, sin enlace en nav) para revisar tipografía y componentes antes de meter copy real en el paso 3.
- **2026-08-29** — Paso 2 aprobado y fusionado. El dueño del proyecto autoriza explícitamente dejar de pausar por aprobación en cada paso ("ve dejando en firme los PR y avanzando"): a partir de aquí cada paso del `PLAN.md` se implementa, valida y fusiona en secuencia sin esperar luz verde previa, incluida la pausa que el brief original pedía después del paso 3. Se sigue abriendo un PR por paso para que quede trazable, y se documenta cada decisión aquí igual que antes.
- **2026-08-29** — Paso 3: copy real de hero/producto/precio. Los montos de precio (`content/precio.ts`) son los que trae el brief inicial ($9,000 MXN implementación, $2,900 MXN/mes con 300 conversaciones), marcados `TODO_PRECIO` para revisión — no se inventaron. El precio de ejemplo dentro de la conversación de muestra (`content/producto.ts`) es ilustrativo del formato de respuesta del agente, no una cifra de negocio. El CTA "Agenda una demo" apunta a `#formulario-demo`, un ancla que todavía no existe (la sección con el formulario real llega en el paso 5) — intencional, se resuelve solo cuando esa sección se agregue.
- **2026-08-29** — Paso 4: resto de secciones. Los tiempos de `content/comoEmpezamos.ts` ("mismo día", "1–2 días", "antes de una semana") son una propuesta operativa mía, no un compromiso confirmado con el equipo de implementación — revisar que sean sostenibles antes de publicar. La política de cancelación en el FAQ queda marcada `TODO_LEGAL` (condiciones y aviso previo exactos, sin confirmar). La lista de espera de "Próximos procesos" se resolvió con enlaces `mailto:` en vez de un formulario con backend, seleccionado por proceso — mide demanda sin construir infraestructura de captura antes de tiempo; el paso 5 puede reemplazarla por un Server Action real sin tocar el resto de la sección. Se le puso el ancla `#formulario-demo` a la sección Cierre para que los CTA de "Agenda una demo" ya resuelvan a algún lugar (aunque todavía no haya formulario ahí); si el paso 5 agrega el formulario como su propia sección en vez de meterlo dentro de Cierre, el ancla se mueve a esa sección nueva.
- **2026-08-29** — Paso 6 (último): legales, metadatos y accesibilidad. Al calcular contraste WCAG de los tokens de §7 encontré que el botón primario (fondo `naranja`, texto `papel`) da ~2.9:1 — falla AA (necesita 4.5:1 para texto normal). Cambié el texto del botón primario a `tinta`, que da ~6.5:1 contra `naranja`. Queda un trade-off documentado, no resuelto: el estado hover (fondo `naranja-2`, más oscuro) con texto `tinta` da ~3.9:1 — pasa el umbral de "texto grande" (3:1) pero no el de texto normal (4.5:1); usar texto `papel` en cambio resolvería el hover pero rompería el estado por defecto (~2.9:1) en sentido contrario. Ninguna combinación de texto único cubre ambos estados con los tokens fijos de `naranja`/`naranja-2` — habría que ajustar alguno de los dos hex, y esa es una decisión de marca que no me toca tomar unilateralmente. Se deja para revisión de diseño.
- **2026-08-29** — Paso 6: el aviso de privacidad y los términos (`content/legal.ts`) quedan `noindex` mientras conserven marcas `TODO_LEGAL`, para no dejar que un buscador indexe una versión legal sin revisar. El `og:image` y el favicon (`app/opengraph-image.tsx`, `app/icon.tsx`) se generan en el momento con los tokens de marca (tipografía + el cuadrado naranja) en vez de inventar el isotipo — se reemplazan cuando lleguen los SVG reales de `public/brand/`. Sin banner de cookies: Vercel Analytics no usa cookies.
- **2026-08-29** — Paso 5: formulario de demo + captura de leads. `lib/leads-store.ts` guarda por ahora solo en logs de la función (visible en el dashboard de Vercel): es la opción con menos partes móviles mientras no hay base de datos ni cuenta de un servicio externo (Airtable, Google Sheets, etc.); el correo de Resend es, mientras tanto, la vía real para enterarse de un lead nuevo. El rate limit (`lib/rate-limit.ts`) es un `Map` en memoria por proceso, no un límite distribuido — suficiente para un sitio de este tráfico, documentado como reemplazable. El ancla `#formulario-demo` se movió de la sección Cierre a la nueva sección `FormularioDemo`, que la posee ahora. La lista de espera de "Próximos procesos" dejó de usar `mailto:` y ahora comparte `leadsStore` con el formulario de demo (mismo patrón de honeypot y rate limit). Detecté y corregí que `DemoForm.tsx` importaba `opcionesMensajesPorDia` desde `lib/schemas/demo.ts` (que importa Zod): eso arrastraba Zod entero al bundle del cliente (~90 KB extra en `/`). Se movió la constante a `lib/constants/mensajes-por-dia.ts`, sin Zod, para que el componente cliente no cargue el validador del servidor.
- **2026-08-29** — Deploy en vivo diagnosticado y corregido (no por mí en el código, sino en la configuración de Vercel): el proyecto `ar2go-website-home` tenía **Framework Preset = "Other"** (y luego, a medio arreglar, "Node") en vez de "Next.js". Con "Other", Vercel usa la carpeta `public/` tal cual como salida de un sitio estático genérico en vez de correr el build output de Next — como `public/` solo tenía `brand/README.md`, cualquier ruta daba `404: NOT_FOUND` aunque el build reportara "Ready". Se corrigió a "Next.js" y se hizo redeploy. Queda documentado aquí porque no hay rastro de esto en el repo — es puramente configuración del dashboard de Vercel, y si se vuelve a crear el proyecto desde cero hay que verificar ese campo explícitamente.
- **2026-08-29** — Rebrand completo a partir de `docs/brand.md` (aportado por el dueño del proyecto como fuente única de verdad del sistema visual, con instrucciones explícitas para Claude Code en su §0). Cambios de fondo:
  - Paleta de acento única: **naranja `#FF6A13` → verde `#0B8F4F`** (con azul `#1E5BD6` documentado como alternativa inactiva). Nuevo token `--color-linea` (`#E3E1DD`) para bordes/separadores, reemplazando los `border-tinta/10` y `/20` ad hoc. Nuevo token funcional `--color-error` (`#B42318`), independiente del acento, para estados de error de formulario.
  - A diferencia del naranja, esta paleta **no tiene el problema de contraste del paso 6**: papel sobre acento da 4.15:1 (AA texto grande/gráfico, verificado en `docs/brand.md` §10) y el hover (`acento-alt`) sube a 5.2:1 en vez de bajar — así que el botón primario vuelve a texto blanco, tal como pide la guía, sin el trade-off que dejamos pendiente en el paso 6.
  - Radio dividido en dos tokens (`--radius-base`, `--radius-card`), ambos en 4px hoy pero separados por si divergen a futuro.
  - Contenedor: `max-w-5xl` (1024px) → `max-w-[1080px]`; padding lateral `px-6` fijo → `px-5 md:px-8` (20px/32px); ritmo vertical de `sm:` a `md:` como breakpoint.
  - Escala tipográfica completa de `docs/brand.md` §4 centralizada en `lib/typography.ts` (`tipografia.display/h2/h3/cuerpo/cuerpoChico/eyebrow/precio/dato`), usada por todas las secciones en vez de clases arbitrarias repetidas.
  - Se generaron los tres SVG de marca reales (`public/brand/ar2go-logotipo.svg`, `ar2go-isotipo.svg`, `ar2go-logotipo-negativo.svg`) con el código fuente exacto de `docs/brand.md` §8 — nada inventado. Esto resuelve el placeholder de logo pendiente desde el paso 2.
  - **Se agregó un header** (`components/layout/Header.tsx`) con el logotipo horizontal — el sitio no tenía ninguno hasta ahora. `docs/brand.md` §7 especifica header/pie/documentos como los usos por defecto del logotipo horizontal, y no existía un lugar para ponerlo.
  - Favicon: `app/icon.tsx` (generado con `next/og`) → `app/icon.svg` (copia estática del isotipo real), más `app/apple-icon.png` (180×180, rasterizado del isotipo con Playwright — no hay herramienta de rasterizado en el entorno, así que se renderizó el SVG en una página headless y se capturó). `app/opengraph-image.tsx` ahora usa el logotipo negativo (como elementos SVG nativos de Satori, no una referencia a archivo — excepción documentada en `CLAUDE.md` §7) más el titular real del hero en Space Grotesk, cargada en runtime desde Google Fonts.
  - `theme-color` (metadato) ahora usa `brand.acento`, vía `viewport` export (no `metadata.themeColor`, deprecado desde Next 14).
  - `docs/brand.md` se sube tal cual al repo para trazabilidad — cualquier cambio de token futuro entra por PR con una fila nueva en su bitácora (§12 de ese archivo), no editando este archivo.
- **2026-08-29** — Se agrega `/admin`: panel de administración de los agentes de la fábrica (`ar2go-platform`), con login de Google. **Revierte explícitamente** la regla de §3 ("no construir panel de administración... es sitio de marketing") y toca de refilón la de `ar2go-platform/docs/factory.md` §7 ("no interfaz de la fábrica") — el dueño del proyecto confirmó el cambio de decisión explícitamente cuando se lo pregunté, así que no lo tomé por mi cuenta. Queda pendiente reflejar esto en `ar2go-platform/docs/factory.md` — ese archivo pide que un cambio de arquitectura entre por PR aparte, así que no lo edité yo mismo en este PR; se lo señalé al dueño del proyecto.
  - Auth.js v5 (`next-auth@5.0.0-beta.32`) con proveedor Google y sesión JWT — sin base de datos, mismo criterio de "menos partes móviles" que `leads-store.ts`.
  - El control de acceso real es una lista blanca de correos (`CORREOS_ADMIN` en `auth.ts`, hoy solo `juand86@gmail.com`), verificada en el callback `signIn` — no depender del consentimiento de Google Cloud (que puede quedar abierto) para restringir quién entra.
  - `middleware.ts` protege `/admin/*` verificando solo presencia de sesión — el filtro de correo ya ocurrió en el callback, así que una sesión válida ya implica una cuenta autorizada; no hace falta repetir el chequeo de correo en cada request.
  - `/admin` hoy es un cascarón honesto: lista los cinco agentes de la fábrica como referencia, marcados "Sin conectar" — no hay API real de `ar2go-platform` que consultar todavía (sigue en etapa 0). No se inventaron datos ni estado.
  - Verificado sin credenciales reales de Google: con un `AUTH_SECRET` y client id/secret de prueba en local, confirmé que `signIn("google", ...)` arma la URL de autorización correcta (PKCE, `redirect_uri` a `/api/auth/callback/google`, scopes `openid profile email`) inspeccionando el header `x-action-redirect` de la Server Action — no se pudo probar el flujo completo (Google real) por las restricciones de red del entorno de desarrollo.
  - `npm run build` sin las variables de Auth configuradas sigue limpio y el resto del sitio no se rompe (`/admin` y `/admin/login` quedan como rutas dinámicas, no se intentan pre-renderizar en build) — mismo criterio de "no bloquea el resto del trabajo" que `RESEND_API_KEY`.
- **2026-08-29** — Segundo rebrand, **decisión de color cerrada** según `docs/brand.md` v2: verde `#0B8F4F` → **marino `#10327A`** (blanco y negro). El dueño del proyecto marca esto como definitivo — naranja, verde y azul quedan retirados y no deberían volver a proponerse. Cambios de fondo:
  - Los tokens de color se **renombran**, no solo cambian de valor: `--color-acento`/`--color-acento-alt` → `--color-marino`/`--color-marino-alt` (mismo criterio que la guía usa el nombre del color, no un rol genérico). `--color-linea` y `--color-neutro` también cambian de hex (`#E4E6E9`, `#F4F5F7`) aunque conservan el nombre.
  - **Nuevo color funcional `--color-exito` (#0B8F4F)** — sí, es el mismo hex que tenía el acento verde anterior, pero ahora es explícitamente un color de estado de interfaz (confirmaciones de formulario), no de marca; no debe usarse decorativamente. Se aplicó en la confirmación de `DemoForm` y `WaitlistForm`, con el mismo tratamiento visual que ya tenía `--color-error`.
  - **Se simplifica el radio a un solo token** `--radius-base` (se elimina `--radius-card`, que en el rebrand anterior quedó documentado como "separado por si diverge a futuro" — nunca divergió, así que la guía nueva lo consolida). `rounded-card` → `rounded-base` en todo el código.
  - **A diferencia de las dos paletas anteriores, esta trae una restricción dura documentada explícitamente**: marino sobre tinta da 1.55:1 — prohibido, no es un trade-off a evaluar como el del botón naranja (paso 6) ni una mejora automática como el verde (rebrand anterior). Afecta un solo lugar del código: el CTA primario de `components/sections/Cierre.tsx` (fondo tinta) no usa la variante `primary` normal del `Button` — se sobreescribe a fondo papel/texto tinta, tal como pide `docs/brand.md` §6 ("sobre negro el marino desaparece"). Se replicó el mismo patrón en la sección de fondo tinta de `/muestra` para que quede documentado visualmente.
  - Nuevo archivo de logo: `ar2go-logotipo-mono.svg` (una tinta, para grabado/serigrafía) — agregado a `public/brand/` desde el código fuente exacto de `docs/brand.md` §8, sin inventar nada.
  - `app/opengraph-image.tsx`: el cuadrado del logotipo negativo pasa de verde a **blanco** (con el número en tinta) — la guía especifica que sobre fondo oscuro el cuadrado va blanco, no en el color de marca.
  - Pendiente, no inventado: `docs/brand.md` §9 menciona `ar2go-whatsapp-apilado.jpg` y `ar2go-whatsapp-isotipo.jpg` (recortes circulares para WhatsApp/avatares) que no llegaron en este envío de assets — documentado en `public/brand/README.md`, no se fabricaron.
  - `docs/brand.md` también se sube a `ar2go-platform` (mismo contenido) porque ese archivo declara explícitamente a ambos repos como consumidores — sin construir ninguna interfaz ahí, solo para que el diseño esté disponible si `ar2go-platform` llega a tener UI propia.
- **2026-09-06** — **Pivote de negocio + tercer rebrand (v3), sobre una maqueta de home real, no un documento de exploración.** El dueño del proyecto subió tres archivos en la misma conversación: (1) un `.md` de sistema de diseño (paleta azul sobre fondo oscuro, logotipo "AR²GO" nuevo, sin SVG real, solo descripción); (2) un `home.html` completo y funcional (HTML/CSS/JS vainilla) con nav, hero, tarjetas de agente, tabs por industria, franja "Nosotros", precios de tres planes y CTA final — con cifras de negocio presentadas como reales (150+ agentes en producción, 99.95% disponibilidad, resultados por industria) y un modelo de autoservicio ("Crear cuenta"/"Empezar gratis") en vez del modelo de un solo proceso vendido por demo; (3) un zip con las fotos originales (fiordos noruegos, licencia Pexels) y dos PNG del logotipo real.
  - Antes de tocar código pregunté explícitamente tres cosas, porque el HTML chocaba con reglas ya cerradas de este archivo: si el pivote de negocio era real (no solo un cambio visual), si las cifras de la maqueta eran reales o debían tratarse como `TODO_DATO`, y qué precios usar. El dueño del proyecto confirmó las tres: pivote completo, cifras reales, precios de la maqueta. Sin esa confirmación no habría publicado cifras de "casos de éxito" sin clientes reales — es exactamente lo que prohíbe el §3 original, y seguiría prohibiéndolo si no hubiera confirmación explícita.
  - **Se revoca la regla "no implementar modo oscuro" de §3/§7** (paso 6 y rebrands anteriores): no era una regla sobre qué color de fondo usar, sino sobre no mantener dos temas (claro/oscuro con toggle). El sitio sigue teniendo un solo tema — ahora es oscuro por decisión de diseño, no un modo alternativo.
  - **Se retiran de la home** las secciones del modelo de negocio anterior: `Problema`, `Producto`, `Control`, `ComoEmpezamos`, `ProximosProcesos`, `Faq`, `Cierre`, `FormularioDemo` (componentes y sus `content/*.ts`) — borrados, no comentados, porque describían un producto y un modelo de venta que ya no existen. `DemoForm.tsx`, `WaitlistForm.tsx`, sus Server Actions (`app/actions/demo.ts`, `app/actions/lista-espera.ts`), `lib/leads-store.ts`, `lib/rate-limit.ts` y `lib/schemas/demo.ts` **no se borraron**: quedan sin usar (ninguna página los importa) en vez de eliminados, porque representan trabajo real (validación, rate limit, envío de correo) que puede volver a hacer falta si el plan Empresa ("Hablar con ventas") o un futuro flujo de contacto necesita un formulario real. Documentado también en §10.
  - **Nuevo home construido sobre la maqueta, no una traducción literal a CSS nuevo**: se reusó la arquitectura de componentes existente (`Section`, `Card`, `Button`, `CtaButton` para el tracking de analítica) retocando sus tokens, en vez de copiar el CSS de la maqueta a un archivo aparte — así toda la home sigue usando Tailwind v4 con los tokens de `docs/brand.md`, consistente con el resto del sitio (`CLAUDE.md` §5). Se simplificaron algunos detalles de la maqueta que no valían el costo de replicar al pixel: el nav no tiene el efecto de "pastilla que se funde en barra sólida al hacer scroll" (queda con blur fijo todo el tiempo) y no hay animaciones de entrada (`driftIn`/`rise`) — decisión de alcance, no una limitación técnica; se puede añadir después si se pide explícitamente. Las interacciones que sí importan para el contenido (menú móvil, tabs de casos por industria) están implementadas como componentes cliente de React normales, no el JS vainilla de la maqueta.
  - **Nav (`HomeNav.tsx`) y pie (`HomeFooter.tsx`) de la home son propios**, no el `Header`/`Footer` genérico: la maqueta trae su propio nav flotante y su propio pie, distintos en estructura al header/footer simple que ya existía. `Header`/`Footer` genéricos se conservan y se re-tokenizan para las páginas que sí los necesitan (`/admin`, `/admin/login`, `/aviso-de-privacidad`, `/terminos`) — antes vivían en `app/layout.tsx` envolviendo *todas* las páginas; se sacaron de ahí (si no, se hubieran duplicado con el nav/pie propio de la home) y cada página que los necesita los importa directo.
  - **Logotipo**: el PNG real (`AR2GO_t.png` del zip → `public/brand/ar2go-logotipo-2026.png`) se usa tal cual, sin vectorizar — no hay SVG fuente todavía, y dibujar uno a mano habría sido inventar el trazo exacto de una letra que no me corresponde diseñar. El favicon (`app/icon.svg`) sí es SVG real: viene copiado tal cual del `<head>` del `home.html` que subieron (el propio autor de la maqueta ya lo resolvió en vector). Los SVG del wordmark anterior (marino) quedan en `public/brand/` sin usar, por trazabilidad.
  - **Imágenes**: las 6 fotos de fiordos que usa la home (`public/home/*.webp`) son las mismas que ya traía embebidas en base64 el `home.html` original (extraídas de ahí, no de los JPG sueltos del zip, para no adivinar qué recorte/gradazo de color le aplicaron a cada una) — se confirmó que son fotografía real con licencia Pexels, no generada, así que no chocan con la regla de §3 contra ilustración genérica de IA. Las referencias fotográficas del primer `.md` de diseño (superficies geométricas, "ondas de partículas") nunca se usaron — se preguntó explícitamente y se optó por no implementarlas.
  - **Tipografía**: display y H2 pasan a peso ligero (300) en vez de bold, tal como trae la maqueta — cambio deliberado de la escala, no un descuido.
  - **Radio**: se abandona el radio único (`--radius-base`, consolidado apenas en el rebrand anterior) por tres radios distintos (`--radius-btn` 8px, `--radius-card` 16px, `--radius-shot` 12px) — la maqueta real los usa así a propósito (los shots de agente son más angostos que las tarjetas de precio), así que la "simplificación a un solo radio" del rebrand anterior queda revertida aquí con una razón concreta, no por gusto.
  - `docs/brand.md` se reescribe completo (v3) reflejando todo lo anterior; queda pendiente subir la misma actualización a `ar2go-platform` (ese repo sigue en etapa 0 sin UI propia, así que no es urgente, pero el documento se declara a sí mismo como fuente para ambos repos).
  - Verificado: `npm run lint`, `npx tsc --noEmit` y `npm run build` limpios; capturas de Playwright del home completo (desktop y 390px), la interacción de tabs (cambio de industria), el menú móvil abierto, `/terminos`, `/admin/login`, `/muestra` y el `og:image` — todas revisadas visualmente antes de este commit.
- **2026-09-06** — Dominio real comprado: `ar2go.io`. `DOMINIO` en `content/site.ts` deja de ser `TODO_DOMINIO`; raíz (sin `www`) como canónico, con `www.ar2go.io` como redirección — configuración de dominios de Vercel, no de este repo. De ahí salen `site.url`, `hola@ar2go.io` y las URLs absolutas de `metadataBase`/canonical/OG en `app/layout.tsx`, sin tocar ningún otro archivo (el propósito original del placeholder centralizado). Dos cosas siguen pendientes, ninguna es código: conectar el dominio en el proyecto de Vercel (Settings → Domains, con los registros DNS que Vercel indique) y verificar `ar2go.io` en el dashboard de Resend (SPF/DKIM propios) antes de poder enviar el correo de notificación de leads desde `hola@ar2go.io` en vez del remitente de prueba `onboarding@resend.dev` (`lib/email.ts`).
