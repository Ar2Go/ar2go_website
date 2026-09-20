# public/acceso/ — fotografía de las páginas de cuenta

| Archivo | Uso |
|---|---|
| `fiordo.webp` | Panel izquierdo de `/crear-cuenta`, `/iniciar-sesion` y `/cuenta` |

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
