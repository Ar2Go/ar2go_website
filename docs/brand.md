# AR2GO — Guía de estilos

**Versión 3 · septiembre 2026 · pivote a plataforma multi-agente, tema oscuro**
**Ubicación en el repo:** `docs/brand.md`
**Consumidores:** Claude Code y cualquier persona que toque UI en `ar2go_website` o `ar2go-platform`.

Fuente única de verdad del sistema visual. Si el código contradice este archivo, gana el archivo. Para romper una regla, cámbiala aquí primero en un PR aparte con su renglón en la bitácora.

Esta versión reemplaza por completo la v2 (marino/blanco/negro, fondo claro): AR2GO pivota de vender un solo proceso por demo a una plataforma de agentes de autoservicio, y el sistema visual pasa a un **tema oscuro único** con **azul** como acento — tomado directamente de la maqueta de home aprobada el 2026-09-06, no de una exploración. Ver §12 para el detalle completo del cambio.

---

## 0. Instrucciones para Claude Code

1. Lee este archivo completo antes de escribir CSS.
2. Color, tipografía, espaciado y radio salen de los tokens de la sección 3. No inventes valores intermedios ni uses las paletas por defecto de Tailwind (`blue-600`, `slate-900`, etc.) — los tokens de este archivo existen exactamente para eso.
3. El logotipo actual (`AR2GO_t.png` → `public/brand/ar2go-logotipo-2026.png`) es un **PNG**, no un SVG vectorial — es el archivo real que entregó el dueño del proyecto, úsalo tal cual. El favicon (`app/icon.svg`) sí es SVG real, tomado del `<head>` de la propia maqueta. No fabriques un SVG del wordmark completo por tu cuenta: cuando llegue el vector real, reemplaza el PNG sin tocar nada más.
4. El sitio tiene **un solo tema** (oscuro). No hay `@media (prefers-color-scheme)` ni toggle claro/oscuro.
5. Nunca fotografía o ilustración genérica de IA (cerebros, robots, nodos conectados) — sigue prohibido (CLAUDE.md §3). Las fotos del sitio son paisaje real (fiordos noruegos, licencia Pexels), no generadas ni de stock genérico de tecnología.

### Archivos

```
public/brand/
  ar2go-logotipo-2026.png       # wordmark actual (PNG, provisional hasta tener vector)
  ar2go-logotipo.svg            # wordmark anterior (v1/v2, marino) — histórico, ya no se usa
  ar2go-logotipo-negativo.svg   # ídem, histórico
  ar2go-logotipo-mono.svg       # ídem, histórico
  ar2go-isotipo.svg             # ídem, histórico
  ar2go-whatsapp-apilado.jpg    # nunca llegó (v2) — sigue pendiente
  ar2go-whatsapp-isotipo.jpg    # nunca llegó (v2) — sigue pendiente
app/icon.svg                    # favicon actual — SVG real, del <head> de la maqueta
docs/brand.md
app/globals.css
lib/brand.ts
```

---

## 1. El sistema en una línea

Fondo oscuro (`#0B0F19`), superficies apenas más claras para tarjetas y franjas, texto casi blanco, y **un solo acento de color: azul** (`#2563EB`). Fotografía de paisaje real a sangre en las franjas grandes (hero, "Nosotros", cierre), nunca como fondo decorativo detrás de texto sin degradado de por medio.

---

## 2. Principios

- **El azul es el único acento.** Aparece en el CTA primario, en estados activos (tab seleccionado, toggle encendido) y en los íconos/gráficos que necesitan destacar. No se usa decorativamente en bloques grandes de fondo.
- **La jerarquía la cargan la tipografía y el espacio**, no el color ni las sombras. El display y los H2 van en peso **ligero (300)** — es lo que distingue esta escala de la anterior, que usaba bold.
- **Separación por línea muy sutil, cambio de superficie o aire.** Las líneas divisorias (`--color-linea`) van siempre con opacidad baja (10–20%): a opacidad completa, un gris casi blanco sobre un fondo casi negro se ve como una línea dura, no como una separación discreta.
- **Fotografía real, con degradado siempre encima para legibilidad.** Nunca la foto sola detrás de texto.

---

## 3. Tokens

### `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Superficies — de más oscura a menos oscura */
  --color-fondo:           #0B0F19; /* fondo base de toda página */
  --color-superficie:      #121826; /* tarjetas, nav, franjas alternas */
  --color-superficie-alta: #161D2E; /* tarjeta destacada (plan más elegido) */

  /* Azul de marca — único acento de color del sitio */
  --color-azul:        #2563EB; /* fondos: CTA primario, estados activos, iconos */
  --color-azul-claro:  #3B76F6; /* hover/pressed de elementos con fondo azul */
  --color-azul-suave:  #7CA4FA; /* texto/enlaces sobre fondo oscuro */

  /* Texto y líneas */
  --color-niebla: #E6E9EF; /* texto de cuerpo por defecto */
  --color-gris:   #A0A7B4; /* texto secundario */
  --color-papel:  #FFFFFF; /* texto de énfasis, logotipo en negativo */
  --color-linea:  #E6E9EF; /* separadores — siempre con opacidad baja */

  /* Funcionales */
  --color-error: #F87171;
  --color-exito: #34D399;

  /* Tipografía */
  --font-sans: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace;

  /* Radio — tres tamaños, no uno solo */
  --radius-btn:  8px;
  --radius-card: 16px;
  --radius-shot: 12px;
  --radius-pill: 999px;
}
```

### `lib/brand.ts`

```ts
export const brand = {
  fondo: "#0B0F19",
  superficie: "#121826",
  superficieAlta: "#161D2E",
  azul: "#2563EB",
  azulClaro: "#3B76F6",
  azulSuave: "#7CA4FA",
  niebla: "#E6E9EF",
  gris: "#A0A7B4",
  papel: "#FFFFFF",
  linea: "#E6E9EF",
  error: "#F87171",
  exito: "#34D399",
} as const;
```

Se usa en `og:image`, `theme-color` y cualquier SVG generado en runtime. Si diverge de `globals.css`, es bug.

### Por qué hay dos azules de texto

El azul de marca (`#2563EB`) da **3.71:1** como texto sobre `--color-fondo` — no pasa AA de texto normal (4.5:1), solo texto grande/componentes UI (3:1). `--color-azul-suave` (`#7CA4FA`) es la misma familia, aclarada para dar **5.21:1** — es la que se usa en enlaces, texto del botón secundario y cualquier texto de tamaño normal sobre fondo oscuro. El azul base se reserva para **fondos** (donde el requisito es contraste de 3:1 contra el fondo de página, no 4.5:1 de texto).

### Por qué error/éxito ya no son los tonos "de manual"

Los tonos de error/éxito clásicos (`#B42318` rojo oscuro, `#0B8F4F` verde oscuro) están pensados para texto sobre fondo **claro**. Sobre `--color-fondo` dan 2.91:1 y 4.61:1 — el primero reprueba AA, el segundo pasa justo en el límite. Se aclararon a `#F87171` / `#34D399` (6.9:1 / 9.9:1) para que ambos funcionen con margen como texto e ícono sobre fondo oscuro.

---

## 4. Tipografía

Dos familias, cargadas con `next/font/google`.

- **Space Grotesk** — títulos y cuerpo. Fuente variable: se usan varios pesos (300 ligero, 400 regular, 500 medio).
- **JetBrains Mono** — etiquetas, precios, números, microcopy.

| Rol | Tamaño | Tracking | Interlínea | Familia |
|---|---|---|---|---|
| Display (hero) | `clamp(2.6rem, 6.2vw, 5.2rem)` | `-0.035em` | `1.04` | sans **300 (ligero)** |
| H2 sección | `clamp(1.95rem, 3.7vw, 3rem)` | `-0.035em` | `1.04` | sans **300 (ligero)** |
| H3 | `1.2rem` | `-0.015em` | `1.3` | sans 500 |
| Cuerpo | `1.0625rem` | `0` | `1.6` | sans 400 |
| Cuerpo chico | `0.9375rem` | `0` | `1.5` | sans 400 |
| Eyebrow | `0.6875rem` | `0.18em` | `1` | mono 600, mayúsculas |
| Precio | `2rem` | `-0.02em` | `1` | mono 600 |
| Pie / dato | `0.6875rem` | `0.05em` | `1.4` | mono 400 |

El peso ligero en display/H2 es el cambio más visible frente a la versión anterior (que usaba bold ahí) — le da al sitio un aire más editorial/técnico, menos "cartel".

**Medida máxima: 68 caracteres.** `max-w-[68ch]` en todo párrafo largo, sin excepción.

---

## 5. Espaciado y layout

- Contenedor `max-w-[1080px]` para secciones de contenido con `Section`; la maqueta de home usa hasta `max-w-[1240px]` en su propio nav/hero.
- Ritmo de sección `py-16` móvil, `py-24` desde `md`.
- Separación entre secciones: cambio de superficie (`--color-fondo` ↔ `--color-superficie`) o franja fotográfica con degradado — ya no una línea divisoria entre cada sección, porque el fondo ya es oscuro por defecto y una línea de 1px se pierde o se ve dura.
- Debe leerse bien a 360px de ancho.

---

## 6. Componentes

**Botón primario.** Fondo azul, texto blanco, radio de botón (8px), padding `12px 20px`, peso 500, sin borde ni sombra. Hover: `--color-azul-claro`. Foco: `outline: 2px solid var(--color-azul); outline-offset: 2px`.

**Botón secundario.** Transparente, borde y texto en azul-suave. Hover: fondo azul al 14% de opacidad, borde azul sólido, texto blanco.

**Botón ghost.** Fondo casi transparente (`--color-fondo` al 35%), borde línea sutil, texto niebla. Se usa para el CTA secundario del hero, donde ni el primario ni el secundario (ambos con azul) tendrían suficiente contraste sobre la foto.

**Tarjeta.** Fondo superficie, borde línea al 10%, radio de tarjeta (16px), padding 24–30px según el contexto. Sin sombra ni elevación en hover.

**Franja con foto a sangre.** La imagen ocupa el ancho completo de la sección con un degradado encima (oscurece los bordes, deja legible el centro) — nunca la foto sola detrás del texto.

**Eyebrow.** Mono, mayúsculas, gris, tracking `0.18em`. Siempre arriba de un título.

**Bloque de precio.** Cifra en peso ligero (300) a tamaño grande (2.4rem+); unidad y periodicidad en gris a tamaño de cuerpo chico. El precio va visible en la página, nunca detrás de un formulario ni de un "contáctanos" cuando el plan lo permite.

**Estados.** Error `#F87171`, éxito `#34D399`, siempre con texto explicativo, nunca solo color. Son colores funcionales, no de marca: no aparecen en ilustración, fondos ni acentos decorativos.

---

## 7. Uso del logotipo

El wordmark actual es **"AR²GO"**: la "A" sin travesaño (forma de vértice), el "2" en superíndice, y una barra azul horizontal bajo la "G" como único acento de color del logotipo.

| Archivo | Cuándo |
|---|---|
| `ar2go-logotipo-2026.png` | Uso por defecto — header, pie de página, `og:image`. Es PNG (no vector) porque es el único archivo real disponible; se reemplaza por SVG cuando exista. |
| `app/icon.svg` | Favicon — cuadrado oscuro redondeado con el vértice de la "A" en niebla y una barra azul, tomado tal cual del `<head>` de la maqueta aprobada. |

El wordmark anterior (marino, con el cuadrado-exponente) queda **histórico** en `public/brand/ar2go-*.svg` — no se usa en ningún componente activo, se conserva por trazabilidad.

### Pendiente

- Vector SVG real del wordmark "AR²GO" (hoy solo hay PNG).
- Recortes circulares para WhatsApp/avatares (`ar2go-whatsapp-*.jpg`) — nunca llegaron, siguen sin fabricar.

---

## 8. Imágenes / estilo visual

Fotografía de paisaje real (fiordos, montañas, niebla — Noruega), con licencia Pexels, no generada ni de stock genérico de "tecnología/IA". Tratamiento: tono frío/azulado, siempre con degradado hacia `--color-fondo` en los bordes para que el texto encima quede legible. Se usa en tres lugares: hero, franja "Nosotros" y CTA de cierre. Las tarjetas de agente (`Agentes.tsx`) usan recortes de la misma fototeca, más pequeños, con una miniatura de interfaz superpuesta.

**Sigue prohibido** (CLAUDE.md §3): ilustración genérica de IA, cerebros, robots, nodos conectados.

---

## 9. Accesibilidad

| Combinación | Ratio | Veredicto |
|---|---|---|
| Niebla sobre fondo | 19.1:1 | AAA |
| Niebla sobre superficie | 17.7:1 | AAA |
| Gris sobre fondo | 7.9:1 | AAA |
| Blanco sobre azul (botón primario) | 5.17:1 | AA |
| Azul-suave sobre fondo (texto/enlaces) | 5.21:1 | AA |
| Azul de marca sobre fondo (solo fondos/UI, no texto normal) | 3.71:1 | AA large/UI únicamente |
| Error (`#F87171`) sobre fondo | 6.9:1 | AAA |
| Éxito (`#34D399`) sobre fondo | 9.9:1 | AAA |

Reglas duras: el azul de marca (`#2563EB`) nunca se usa como texto de tamaño normal — para eso existe azul-suave. El foco siempre visible; `outline: none` sin reemplazo es un bug. Ningún significado se comunica solo con color.

---

## 10. Checklist de PR

- [ ] Cero hexadecimales literales en componentes (todo vía tokens)
- [ ] Cero clases de color por defecto de Tailwind
- [ ] Azul de marca (`#2563EB`) nunca como texto de tamaño normal — usar azul-suave
- [ ] Todo párrafo largo con `max-w-[68ch]`
- [ ] Legible y usable a 360px
- [ ] Foco visible y navegación por teclado
- [ ] Sin sombras difusas ni animación decorativa gratuita
- [ ] Ninguna fotografía/ilustración genérica de IA
- [ ] Logotipo desde `public/brand/`, nunca reconstruido a mano salvo el favicon (ya es SVG real de la maqueta)

---

## 11. Bitácora

| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-08 | Sistema inicial: cuadrado como exponente y contenedor, letras vectoriales, fondo claro | Identidad base |
| 2026-08 | Acento naranja `#FF6A13` → verde `#0B8F4F` → azul señal `#1E5BD6` (comparativo) | Exploración de color |
| 2026-08 | **v2 — cerrado:** marino `#10327A`, blanco y negro, fondo claro | Decisión de color, luego revertida |
| 2026-09-06 | **v3 — pivote completo:** AR2GO pasa de vender un solo proceso por demo a una plataforma de agentes de autoservicio. Nuevo wordmark "AR²GO", tema oscuro único (`#0B0F19`/`#121826`), azul `#2563EB` como acento, tipografía display/H2 a peso ligero, tres radios (8/16/12/999px) en vez de uno solo, fotografía de paisaje real en vez de fondo claro liso. Tomado directamente de una maqueta de home aprobada por el dueño del proyecto (`docs/brand.md` ya no documenta una exploración, documenta lo construido) | Pivote de negocio + rediseño completo |

Cada cambio de token entra por PR con su renglón aquí.
