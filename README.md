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

- `/` — home del sitio.
- `/aviso-de-privacidad`, `/terminos` — borradores legales, marcados `noindex`
  hasta que se resuelvan sus `TODO_LEGAL` y haya revisión de abogado.
- `/muestra` — catálogo interno de componentes base (Button, Section, Card)
  para revisar el sistema de diseño. No se enlaza desde ninguna navegación
  pública y está marcada `noindex`.
- `/admin` — panel de administración de los agentes de la fábrica
  (`ar2go-platform`), con login de Google restringido a una lista blanca de
  correos. Ver "Panel de administración" más abajo para configurarlo en
  local.

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
| `app/` | Rutas (App Router): home, páginas legales, `/muestra`, `/admin`. |
| `app/actions/` | Server Actions (formulario de demo, lista de espera). |
| `auth.ts`, `middleware.ts` | Login de Google y protección de `/admin` (Auth.js). |
| `components/ui/` | Componentes base reutilizables (Button, Section, Card). |
| `components/sections/` | Una sección de la home por archivo, en el orden de `CLAUDE.md` §8. |
| `components/forms/` | Formularios cliente (`DemoForm`, `WaitlistForm`) y el campo honeypot compartido. |
| `content/` | Copy tipado por sección, uno por archivo. Cambiar texto del sitio es editar aquí, no el JSX. |
| `lib/` | Validación (Zod), rate limit, envío de correo (Resend) y la interfaz de almacenamiento de leads (`leads-store.ts`). |
| `components/seo/` | JSON-LD de `Organization`. |
| `app/icon.svg`, `app/apple-icon.png`, `app/opengraph-image.tsx` | Favicon, ícono de iOS y `og:image`, generados a partir del isotipo real. |
| `app/robots.ts`, `app/sitemap.ts` | `robots.txt` y `sitemap.xml`. |
| `public/brand/` | Logotipo e isotipo de marca (SVG reales). |
| `docs/brand.md` | **Fuente única de verdad del sistema visual** — tokens, tipografía, componentes, uso del logotipo. Léelo antes de tocar cualquier UI. |
| `lib/brand.ts`, `lib/typography.ts` | Los tokens de `docs/brand.md` y la escala tipográfica, como constantes de JS/Tailwind. |
| `CLAUDE.md` | Contexto de negocio, convenciones de código, decisiones tomadas. |
| `PLAN.md` | Desglose del orden de trabajo por paso/PR. |

## Formulario de demo y leads

El formulario de demo y la lista de espera de "Próximos procesos" guardan
cada envío con `lib/leads-store.ts` y, si `RESEND_API_KEY` está configurada,
mandan también un correo de aviso. Mientras no haya una cuenta de Resend ni
un almacén real conectado, los leads quedan **solo en los logs de la función
en Vercel** (`[lead] {...}` en el dashboard) — es la opción con menos partes
móviles, no un CRM. Cambiarlo por un almacén de verdad es reemplazar
`lib/leads-store.ts` sin tocar los Server Actions que lo llaman.

## Panel de administración (`/admin`)

Login con Google, hecho con [Auth.js](https://authjs.dev) (`next-auth@5`). El
acceso está restringido a una lista blanca de correos en `auth.ts`
(`CORREOS_ADMIN`) — hoy solo `juand86@gmail.com`. Agregar a alguien más es
editar esa lista, no la configuración de Google Cloud.

Para probarlo en local:

1. Ve a [Google Cloud Console → Credenciales](https://console.cloud.google.com/apis/credentials)
   (en el proyecto de Google que uses para AR2GO; créalo si no existe).
2. Crea un **ID de cliente de OAuth** de tipo "Aplicación web".
3. En **URIs de redireccionamiento autorizados**, agrega:
   - `http://localhost:3000/api/auth/callback/google` (para local)
   - `https://<tu-dominio-de-vercel>/api/auth/callback/google` (para producción/preview)
4. Copia el **Client ID** y el **Client secret** a tu `.env.local`:
   ```bash
   AUTH_GOOGLE_ID=...
   AUTH_GOOGLE_SECRET=...
   AUTH_SECRET=$(openssl rand -base64 32)   # o cualquier cadena aleatoria larga
   ```
5. `npm run dev` y entra a `/admin` — te manda a `/admin/login` si no tienes sesión.

Sin estas variables, `/admin` no deja iniciar sesión pero el resto del sitio
funciona igual (ver `CLAUDE.md` §9).

## Placeholders pendientes

Ciertos valores del sitio no están definidos todavía (dominio, WhatsApp,
razón social para el aviso de privacidad, precios en revisión). Se marcan con
convención `TODO_<TIPO>` y viven centralizados en `content/` a partir del
paso 3. Detalle completo en `CLAUDE.md` §9.
