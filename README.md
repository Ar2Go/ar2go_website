# AR2GO — sitio de marketing

Sitio de marketing de AR2GO: procesos administrativos ejecutados por agentes
de IA para pymes mexicanas. Contexto de negocio completo, convenciones y
sistema de diseño en [`CLAUDE.md`](./CLAUDE.md). Orden de trabajo y estado de
cada paso en [`PLAN.md`](./PLAN.md).

## Stack

Next.js 15 (App Router) + TypeScript estricto + Tailwind CSS v4, desplegado
en Vercel. Sin CMS: el copy vive tipado en `content/` (a partir del paso 3).

## Correr en local

Requiere Node.js 20+.

```bash
npm install
cp .env.example .env.local   # completa las variables que ya tengas; ninguna bloquea correr en local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

- `/` — home del sitio (contenido real desde el paso 3 de `PLAN.md`).
- `/muestra` — catálogo interno de componentes base (Button, Section, Card)
  para revisar el sistema de diseño. No se enlaza desde ninguna navegación
  pública y está marcada `noindex`.

## Otros comandos

```bash
npm run build   # build de producción
npm run start   # sirve el build de producción
npm run lint    # ESLint
```

## Desplegar

El repo se despliega en [Vercel](https://vercel.com/) conectado a esta rama
de GitHub. Cada PR obtiene su propio preview deploy automático; `main` se
despliega a producción. No hay infraestructura propia además de Vercel.

Variables de entorno a configurar en el proyecto de Vercel: ver
[`.env.example`](./.env.example).

## Dónde vive cada cosa

| Carpeta | Qué contiene |
|---|---|
| `app/` | Rutas (App Router): home, páginas legales, `/muestra`. |
| `components/ui/` | Componentes base reutilizables (Button, Section, Card). |
| `content/` | Copy tipado por sección, uno por archivo (a partir del paso 3). Cambiar texto del sitio es editar aquí, no el JSX. |
| `public/brand/` | Logotipo e isotipo de marca. **Pendientes** — ver el README dentro de esa carpeta. |
| `CLAUDE.md` | Contexto de negocio, convenciones de código, sistema de diseño, decisiones tomadas. |
| `PLAN.md` | Desglose del orden de trabajo por paso/PR. |

## Placeholders pendientes

Ciertos valores del sitio no están definidos todavía (dominio, WhatsApp,
razón social para el aviso de privacidad, precios en revisión). Se marcan con
convención `TODO_<TIPO>` y viven centralizados en `content/` a partir del
paso 3. Detalle completo en `CLAUDE.md` §9.
