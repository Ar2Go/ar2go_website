# CLAUDE.md — AR2GO Website

Este archivo orienta a Claude Code (y a cualquier humano) sobre el contexto de negocio, el stack, las convenciones y las decisiones tomadas para el sitio de marketing de AR2GO. Léelo completo antes de tocar código.

## 1. Contexto de negocio

AR2GO vende **procesos administrativos ejecutados por agentes de IA** a pymes mexicanas. El cliente no compra software: compra el resultado del proceso, y AR2GO responde por que corra.

El catálogo se organiza **por proceso, no por industria**. El SAT y WhatsApp estandarizaron la capa de datos de la pyme mexicana, así que un mismo proceso empaquetado sirve para giros distintos con ~20% de configuración.

**Primer producto en venta: Agente de Leads WhatsApp.** Atiende conversaciones entrantes de prospectos, responde con el catálogo del cliente, califica, cotiza a precio de lista, agenda en el calendario, registra en el CRM y da seguimiento programado. Opera de forma autónoma dentro de un **espacio de acciones acotado**; escala a un humano cuando hay descuentos, compromisos de fecha, reclamos de clientes existentes, temas legales, o tres intercambios sin avanzar.

**Roadmap (mostrado como "próximamente"):** Conciliación y aplicación de pagos, Cobranza de cuentas por cobrar, Cuentas por pagar.

## 2. Objetivo del sitio

Una sola métrica: **demos agendadas por visitante**. El sitio califica solo, sin que nadie del equipo venda uno a uno.

Reglas que no se negocian:

- El **precio va visible** en la página. La pyme mexicana descarta al proveedor que esconde el precio detrás de un formulario.
- CTA primario: **"Agenda una demo"**. CTA secundario: **"Pruébalo por WhatsApp"** (el visitante habla directo con el agente).
- Cada sección responde una objeción concreta, no describe tecnología.

**Idioma:** español de México, tuteo, sin anglicismos innecesarios ("agente" no "AI agent", "proceso" no "workflow"). Cero contenido en inglés en el sitio público (los commits sí van en inglés, ver §4).

## 3. Qué no hacer

- No inventar cifras, testimonios, logos de clientes ni casos de éxito. Sin clientes todavía; un testimonio falso mata la venta cuando se descubre.
- No usar ilustraciones genéricas de IA, cerebros, robots ni nodos conectados.
- No agregar chat widget de terceros; el canal es WhatsApp.
- No construir el panel de administración ni el tablero de auditoría en este repo (es sitio de marketing).
- No meter contenido en inglés en el sitio.
- No cambiar de stack sin aprobación explícita (ver §5).
- No implementar modo oscuro en esta versión.

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

Archivos de marca esperados en `public/brand/`: `ar2go-logotipo.svg` (horizontal) y `ar2go-isotipo.svg` (cuadrado, para favicon y `og:image`). **Pendiente:** estos archivos no existen todavía en el repo — no se debe inventar el logo; se deja como placeholder documentado hasta que se reciban los SVG reales.

### Tokens de color

```
--tinta:     #101418   /* texto y fondos oscuros */
--naranja:   #FF6A13   /* acento único */
--naranja-2: #C24F06   /* hover */
--gris:      #6B7076   /* texto secundario */
--neutro:    #F4F3F1   /* fondos de sección */
--papel:     #FFFFFF
```

### Reglas de aplicación

- El naranja aparece **una sola vez por pantalla visible**: en el CTA primario o en el elemento destacado de la sección, nunca en ambos. El logotipo ya trae su cuadrado naranja y cuenta como uso.
- Tipografía: una sola familia geométrica sans para todo (Space Grotesk o similar, vía `next/font`), más una monoespaciada para etiquetas, precios y datos. La monoespaciada le da carácter al sitio; se usa en eyebrows, precios y microcopy — nunca en párrafos.
- Escala tipográfica con salto real entre niveles: títulos apretados (`tracking-tight`, `leading-[1.05]`), cuerpo cómodo a 16–18px con medida máxima de 68 caracteres.
- Nada de sombras difusas ni gradientes. Separación por línea de 1px, cambio de fondo o espacio en blanco.
- Bordes: 4px de radio en tarjetas y botones, consistente con el radio del cuadrado del logo.
- Modo oscuro: no implementado en esta versión.

## 8. Arquitectura de contenido

Una sola página larga (`/`) más dos páginas legales (`/aviso-de-privacidad`, `/terminos`). Orden de secciones en la home:

1. Hero (titular sobre el resultado + línea de apoyo + los dos CTA).
2. El problema, en números del visitante (placeholders `TODO_DATO`).
3. El producto, paso a paso, con visual de conversación (no diagrama de arquitectura).
4. Control y límites (espacio de acciones acotado, escalamiento a humano, tablero de auditoría — descrito, no construido).
5. Precio, visible (placeholders `TODO_PRECIO`).
6. Cómo empezamos (tres pasos con tiempo asociado).
7. Próximos procesos + lista de espera por correo.
8. FAQ.
9. Cierre con CTA + pie con contacto y ligas legales.

Detalle de copy y aceptación por sección: ver `PLAN.md`.

## 9. Placeholders pendientes (no publicar sin resolver)

| Placeholder | Qué falta | Dónde vive |
|---|---|---|
| `TODO_DOMINIO` | Dominio definitivo del sitio | `content/site.ts` (centralizado) |
| `TODO_WHATSAPP` | Número de WhatsApp Business para el CTA "Pruébalo por WhatsApp" | `content/site.ts` (centralizado) |
| `TODO_LEGAL` | Razón social y domicilio fiscal para el aviso de privacidad (LFPDPPP) | `content/legal.ts` — marcado explícitamente como borrador para revisión de abogado |
| `TODO_DATO` | Cifras del "problema" (leads fuera de horario, tiempo de primera respuesta, etc.) | `content/problema.ts` |
| `TODO_PRECIO` | Montos de implementación/renta, en revisión | `content/precio.ts` |
| `RESEND_API_KEY` | Cuenta de Resend aún no existe | `.env.example`, documentada como pendiente de configurar, no bloquea el resto del trabajo |

Regla: **un solo lugar por placeholder**. Nunca repetir el número de WhatsApp o el dominio hardcodeado en más de un archivo de contenido — todo importa desde `content/site.ts`.

## 10. Cumplimiento (LFPDPPP)

- Aviso de privacidad conforme al artículo 16 de la LFPDPPP: identidad y domicilio del responsable, finalidades primarias y secundarias, medios para ejercer derechos ARCO, mecanismo de revocación. Se redacta como **borrador** marcado `TODO_LEGAL`, no se publica como definitivo sin revisión de abogado.
- Consentimiento explícito en el formulario de demo, con **casilla separada** para contacto comercial futuro (opt-in independiente del envío del formulario).
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
