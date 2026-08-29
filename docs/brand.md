# AR2GO — Guía de estilos

**Versión 2 · agosto 2026 · decisión de color cerrada**
**Ubicación en el repo:** `docs/brand.md`
**Consumidores:** Claude Code y cualquier persona que toque UI en `ar2go-web` o `ar2go-platform`.

Fuente única de verdad del sistema visual. Si el código contradice este archivo, gana el archivo. Para romper una regla, cámbiala aquí primero en un PR aparte con su renglón en la bitácora.

---

## 0. Instrucciones para Claude Code

1. Lee este archivo completo antes de escribir CSS.
2. Color, tipografía, espaciado y radio salen de los tokens de la sección 3. No inventes valores intermedios ni uses las paletas por defecto de Tailwind (`blue-900`, `gray-500`, `slate-800`).
3. Si falta un archivo en `public/brand/`, genéralo con el código SVG de la sección 8. No dibujes un logo alterno ni uses texto tipografiado como sustituto.
4. Corre el checklist de la sección 11 y repórtalo en el PR.

Agrega a `CLAUDE.md`:

> El sistema visual vive en `docs/brand.md`. Léelo antes de cualquier trabajo de interfaz. No modifiques tokens sin PR dedicado.

### Archivos

```
public/brand/
  ar2go-logotipo.svg            # principal, sobre fondo claro
  ar2go-logotipo-negativo.svg   # sobre marino o tinta
  ar2go-logotipo-mono.svg       # una tinta
  ar2go-isotipo.svg             # favicon, app icon, avatar
  ar2go-whatsapp-apilado.jpg    # ícono de grupo de WhatsApp, 1024×1024
  ar2go-whatsapp-isotipo.jpg    # alterno, monograma
docs/brand.md
app/globals.css
lib/brand.ts
```

---

## 1. El sistema en una línea

Tres colores: **marino, blanco y negro**. Un logotipo construido con trazos vectoriales de grosor constante, donde un cuadrado sólido funciona a la vez como el exponente de AR² y como el contenedor del "to go".

La decisión de color está cerrada. Las exploraciones en naranja, verde y azul señal quedaron descartadas y no deben reaparecer en ningún componente.

---

## 2. Principios

- **El marino es el único color.** Aparece una vez por pantalla visible: en el CTA primario o en el elemento destacado de la sección, nunca en ambos. El cuadrado del logotipo cuenta como uso, así que en el header no va otro elemento en marino.
- **La jerarquía la cargan la tipografía y el espacio**, no el color ni las sombras.
- **Separación por línea de 1px, cambio de fondo o aire.** Sin sombras difusas, sin gradientes, sin bordes de color.
- **Nada decorativo.** Si un elemento no comunica ni ayuda a escanear, se borra.

---

## 3. Tokens

### `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Color */
  --color-marino:     #10327A;   /* marca, CTA primario, cuadrado del logo */
  --color-marino-alt: #0B2559;   /* hover y presionado */
  --color-tinta:      #101418;   /* texto y letras del logotipo */
  --color-papel:      #FFFFFF;
  --color-gris:       #6B7076;   /* texto secundario */
  --color-linea:      #E4E6E9;
  --color-neutro:     #F4F5F7;   /* fondos de sección */

  /* Funcionales — no son colores de marca, no se usan decorativamente */
  --color-error:      #B42318;
  --color-exito:      #0B8F4F;

  /* Tipografía */
  --font-sans: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace;

  /* Radio */
  --radius-base: 4px;
}
```

### `lib/brand.ts`

```ts
export const brand = {
  marino: "#10327A",
  marinoAlt: "#0B2559",
  tinta: "#101418",
  papel: "#FFFFFF",
  gris: "#6B7076",
  linea: "#E4E6E9",
  neutro: "#F4F5F7",
} as const;
```

Se usa en `og:image`, `theme-color` y cualquier SVG generado en runtime. Si diverge de `globals.css`, es bug.

### La restricción que hay que entender

El marino sobre tinta da 1.55:1. Son dos oscuros que no se separan. De ahí salen dos reglas duras:

- **Nunca texto marino sobre negro, ni texto negro sobre marino.**
- En el logotipo, el cuadrado marino junto a las letras negras funciona porque es una **masa sólida entre trazos abiertos**, y porque lleva el número reservado en blanco. Es diferencia de forma, no de contraste. Ese recurso no se extiende a otros elementos: fuera del logotipo, marino y negro nunca se tocan.

---

## 4. Tipografía

Dos familias, cargadas con `next/font/google`.

- **Space Grotesk** — títulos y cuerpo.
- **JetBrains Mono** — etiquetas, precios, números, microcopy.

La monoespaciada es lo que le da carácter al sitio. Va en eyebrows, precios, cifras y pies de figura. Nunca en párrafos.

| Rol | Tamaño | Tracking | Interlínea | Familia |
|---|---|---|---|---|
| Display (hero) | `clamp(2.25rem, 6vw, 4rem)` | `-0.03em` | `1.02` | sans 700 |
| H2 sección | `clamp(1.75rem, 4vw, 2.5rem)` | `-0.02em` | `1.08` | sans 700 |
| H3 | `1.25rem` | `-0.01em` | `1.2` | sans 500 |
| Cuerpo | `1.0625rem` | `0` | `1.55` | sans 400 |
| Cuerpo chico | `0.9375rem` | `0` | `1.5` | sans 400 |
| Eyebrow | `0.6875rem` | `0.18em` | `1` | mono 600, mayúsculas |
| Precio | `2rem` | `-0.02em` | `1` | mono 600 |
| Pie / dato | `0.6875rem` | `0.05em` | `1.4` | mono 400 |

**Medida máxima: 68 caracteres.** `max-w-[68ch]` en todo párrafo, sin excepción. Títulos apretados y cuerpo cómodo: ese contraste es la mitad del carácter del sitio.

---

## 5. Espaciado y layout

- Contenedor `max-w-[1080px]`, padding lateral 20px en móvil, 32px desde `md`.
- Ritmo de sección `py-16` móvil, `py-24` desde `md`.
- Solo múltiplos de 4px. Nada de valores arbitrarios.
- Separación entre secciones: línea de 1px en `--color-linea` **o** cambio a fondo `--color-neutro`, alternando. Nunca las dos.
- Debe leerse bien a 360px de ancho.

---

## 6. Componentes

**Botón primario.** Fondo marino, texto blanco, radio 4px, padding `12px 20px`, peso 500, sin borde ni sombra. Hover: `--color-marino-alt`, transición 120ms. Foco: `outline: 2px solid var(--color-tinta); outline-offset: 2px`.

**Botón secundario.** Transparente, texto tinta, borde 1px tinta. Hover: fondo tinta, texto blanco.

**Tarjeta.** Fondo papel, borde 1px línea, radio 4px, padding 24px. Sin sombra ni elevación en hover. Para destacar, cambia el fondo a neutro.

**Sección oscura.** Fondo tinta con texto blanco. El CTA dentro de una sección oscura va en blanco con texto tinta, no en marino: sobre negro el marino desaparece.

**Eyebrow.** Mono, mayúsculas, gris, tracking `0.18em`. Siempre arriba de un título, nunca solo.

**Bloque de precio.** Cifra en mono a 2rem; unidad y periodicidad en gris a tamaño de cuerpo chico. El precio va visible en la página, nunca detrás de un formulario.

**Estados.** Error `#B42318` con texto explicativo bajo el campo, nunca solo color. Éxito `#0B8F4F`. Son colores funcionales de interfaz, no de marca: no aparecen en ilustración, fondos ni acentos decorativos.

---

## 7. Uso del logotipo

| Archivo | Cuándo |
|---|---|
| `ar2go-logotipo.svg` | Fondo claro. Uso por defecto: header, pie, documentos |
| `ar2go-logotipo-negativo.svg` | Sobre marino o tinta. Letras y cuadrado en blanco, número en el color del fondo |
| `ar2go-logotipo-mono.svg` | Una tinta: grabado, serigrafía, sellos |
| `ar2go-isotipo.svg` | Favicon, app icon, avatar, `og:image`. Nunca en el header |

- **Zona de reserva:** el ancho del cuadrado —52% de la altura de caja— libre por los cuatro lados.
- **Tamaño mínimo:** 120px de ancho en pantalla, 30mm impreso. Abajo de eso, isotipo.
- **Regla del número:** sobre fondo claro el cuadrado va marino con el 2 en blanco; sobre fondo oscuro el cuadrado va blanco con el 2 en el color del fondo. La masa sólida siempre se conserva.

### Prohibido
Sustituir el cuadrado por un `2` tipográfico o un superíndice real. Condensar, estirar, inclinar, contornear. Sombras, gradientes, glow. Recolorear a cualquier hex fuera de esta guía. Poner el logotipo sobre fotografía sin caja sólida detrás. Usar el logotipo horizontal donde el recorte sea circular.

---

## 8. Código fuente

Las letras son trazos de grosor 20 sobre caja de 100 de alto. Sin dependencia tipográfica: el logo se ve igual en cualquier máquina.

### `ar2go-logotipo.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-14 -14 484 128" width="968" height="256" role="img" aria-label="AR2GO">
  <title>AR2GO</title>
  <g fill="none" stroke="#101418" stroke-width="20" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="6">
    <path d="M10,90 L37,12 H47 L74,90"/>
    <path d="M20,62 H64"/>
    <path d="M106,90 V10 H138 A21,21 0 0 1 138,52 H106"/>
    <path d="M136,52 L162,90"/>
    <path d="M326.28,21.72 A40,40 0 1 0 338,50 H306"/>
    <circle cx="406" cy="50" r="40"/>
  </g>
  <rect x="184" y="0" width="52" height="52" rx="9" fill="#10327A"/>
  <g transform="translate(196.4,6) scale(0.40)" fill="none" stroke="#FFFFFF" stroke-width="19" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="6">
    <path d="M9,32 A24,24 0 0 1 57,32 L9,91.5 H59"/>
  </g>
</svg>
```

### `ar2go-logotipo-negativo.svg`
Mismo archivo con las letras en `#FFFFFF`, el cuadrado en `#FFFFFF` y el número en el color del fondo (`#101418` o `#10327A`).

### `ar2go-logotipo-mono.svg`
Mismo archivo con el cuadrado en `#101418` y el número en `#FFFFFF`.

### `ar2go-isotipo.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="AR2GO">
  <title>AR2GO — isotipo</title>
  <rect width="1024" height="1024" rx="228" fill="#10327A"/>
  <g transform="translate(184,366) scale(2.92)">
    <g fill="none" stroke="#FFFFFF" stroke-width="20" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="6">
      <path d="M10,90 L37,12 H47 L74,90"/>
      <path d="M20,62 H64"/>
      <path d="M106,90 V10 H138 A21,21 0 0 1 138,52 H106"/>
      <path d="M136,52 L162,90"/>
    </g>
    <rect x="176" y="0" width="48" height="48" rx="8" fill="#FFFFFF"/>
  </g>
</svg>
```

---

## 9. Recortes circulares

WhatsApp, avatares y perfiles recortan en círculo. Ahí el radio del isotipo se pierde y las esquinas se cortan, así que hay archivos aparte a sangre completa y sin radio:

- `ar2go-whatsapp-apilado.jpg` — nombre completo en dos renglones, AR² sobre GO. Es la versión legible en círculo.
- `ar2go-whatsapp-isotipo.jpg` — monograma AR con el cuadrado, para cuando el contexto ya identifica a la empresa.

El logotipo horizontal no se usa en recorte circular: para que las puntas quepan hay que encogerlo tanto que las letras pierden casi la mitad de su tamaño.

---

## 10. Accesibilidad

| Combinación | Ratio | Veredicto |
|---|---|---|
| Tinta sobre papel | 18.4:1 | AAA |
| Marino sobre papel | 11.9:1 | AAA |
| Blanco sobre marino | 11.9:1 | AAA |
| Gris `#6B7076` sobre papel | 4.8:1 | AA cuerpo |
| Marino sobre tinta | 1.55:1 | **Prohibido** |

Reglas duras: el gris no baja de `#6B7076`. Marino y tinta nunca se tocan fuera del logotipo. El foco siempre visible; `outline: none` sin reemplazo es un bug. Ningún significado se comunica solo con color.

---

## 11. Checklist de PR

- [ ] Cero hexadecimales literales en componentes
- [ ] Cero clases de color por defecto de Tailwind
- [ ] Un solo uso del marino por pantalla visible
- [ ] Ninguna combinación marino sobre tinta
- [ ] Todo párrafo con `max-w-[68ch]`
- [ ] Legible y usable a 360px
- [ ] Foco visible y navegación por teclado
- [ ] Sin sombras, gradientes ni animación decorativa
- [ ] Logotipo desde `public/brand/`, nunca reconstruido en JSX
- [ ] Lighthouse móvil: rendimiento ≥ 95, accesibilidad 100

---

## 12. Bitácora

| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-08 | Sistema inicial: cuadrado como exponente y contenedor, letras vectoriales | Identidad base |
| 2026-08 | Acento naranja `#FF6A13` | Lectura de logística y "para llevar" |
| 2026-08 | Naranja → verde `#0B8F4F` | Dirección |
| 2026-08 | Verde → azul señal `#1E5BD6`, comparativo abierto | Dirección |
| 2026-08 | **Cerrado: marino `#10327A`, blanco y negro.** Verde y azul señal retirados | Decisión final. Marino da 11.9:1 sobre blanco y es el que mejor aguanta el recorte circular |

Cada cambio de token entra por PR con su renglón aquí.
