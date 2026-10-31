# public/acceso/ — fotografía de las páginas de cuenta

| Archivo | Uso |
|---|---|
| `fiordo.webp` | Panel izquierdo de `/crear-cuenta` e `/iniciar-sesion` |
| `landing.webp` | Fondo a sangre de `/cuenta` con sesión iniciada (`components/cuenta/CuentaLanding.tsx`) |
| `landing.webp` (también) | Fondo de la sección En astillero de la home (`components/sections/Astillero.tsx`) |

La carpeta se llama `acceso/` y no `cuenta/` porque `middleware.ts` protege
`/cuenta/:path*`: un archivo servido desde `/cuenta/…` se redirige a iniciar
sesión (307) y la imagen nunca carga. Mismo cuidado con `/crear-cuenta/` y
`/iniciar-sesion/`, que también están en el matcher.

Fotografía real de fiordo al atardecer (Lofoten, Noruega), aportada por el
dueño del proyecto el 2026-09-19. Misma familia visual y misma licencia
Pexels que las imágenes de `public/home/` — no es ilustración generada
(`CLAUDE.md` §3).

El original llegó en tono cálido (dorado) y no casaba con el resto del
sitio, que es frío y desaturado. La gradación se **horneó en el archivo**
(no en CSS) para que el `.webp` sea consistente con los de `public/home/`,
que también llegaron ya gradados. Receta exacta, con `sharp`, por si hay que
regenerarlo desde el original:

```js
sharp(original)
  .resize({ width: 1600 })
  .modulate({ saturation: 0.3, brightness: 0.88 })
  .tint({ r: 176, g: 196, b: 226 })
  .linear(1.05, -6)
  .webp({ quality: 82 })
```

Los degradados que van encima (tinta para legibilidad + viñeta azul de
marca) sí viven en CSS, en `app/(cuenta)/cuenta.css`, igual que los del hero
de la home en `app/home.css`.

## `landing.webp`

Fiordo con pueblo y muelle, reflejo en el agua (Noruega), aportado por el
dueño del proyecto el 2026-10-25. Llegó en tono cálido (otoño dorado). Como
va a sangre en toda la pantalla, se exportó a 2400 px y se oscureció y bajó
de contraste un poco más que `fiordo.webp`, para igualar el tono de
`public/home/hero.webp`:

```js
sharp(original)
  .resize({ width: 2400 })
  .modulate({ saturation: 0.25, brightness: 0.74 })
  .tint({ r: 176, g: 196, b: 226 })
  .linear(0.86, 6)
  .webp({ quality: 82 })
```
