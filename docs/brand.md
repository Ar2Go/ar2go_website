# AR2GO — Guía de estilos

**Ubicación en el repo:** `docs/brand.md`
**Consumidores:** Claude Code y cualquier persona que toque UI en `ar2go-web`.

Este archivo es la fuente única de verdad del sistema visual. Si algo en el código contradice lo que dice aquí, gana este archivo. Si necesitas romper una regla, primero cámbiala aquí en un PR aparte y explica por qué.

---

## 0. Instrucciones para Claude Code

Al arrancar cualquier tarea de UI:

1. Lee este archivo completo antes de escribir CSS.
2. Los valores de color, tipografía, espaciado y radio salen de los tokens de la sección 3. No inventes valores intermedios ni uses las paletas por defecto de Tailwind (`blue-600`, `gray-500`, etc.).
3. Genera los archivos de marca con el código SVG de la sección 8 si no existen en `public/brand/`. No dibujes un logo alterno ni uses texto tipografiado como sustituto.
4. Al terminar, corre el checklist de la sección 11 y repórtalo en el PR.

Agrega esta línea a `CLAUDE.md`:

> El sistema visual vive en `docs/brand.md`. Léelo antes de cualquier trabajo de interfaz. No modifiques tokens sin PR dedicado.

### Estructura de archivos

```
public/brand/
  ar2go-logotipo.svg        # horizontal, uso por defecto
  ar2go-isotipo.svg         # cuadrado, favicon y app icon
  ar2go-logotipo-negativo.svg
docs/brand.md               # este archivo
app/globals.css             # tokens de la sección 3
lib/brand.ts                # mismos tokens exportados para JS
```

---

## 1. Estado de la decisión de color

**Pendiente.** Hay dos paletas aprobadas visualmente y una decisión de negocio sin cerrar.

| | Verde | Azul |
|---|---|---|
| Acento | `#0B8F4F` | `#1E5BD6` |
| Tinta | `#101418` | `#0D1728` |
| Contraste del acento con blanco | 4.15:1 | 5.97:1 |
| Lectura | Aprobado, proceso que corre, dinero recuperado | Infraestructura, software confiable |
| Riesgo | Vecindad con fintech de cobranza y con el verde de WhatsApp | Es el color por defecto del B2B; hay miles de logos azules |

**Activo hoy: VERDE.** Claude Code trabaja con la paleta verde hasta que este renglón diga otra cosa. El cambio a azul es una edición de seis tokens en `globals.css` más regenerar los dos SVG; no debe requerir tocar componentes. Si un componente se rompe al cambiar el acento, está mal construido.

Marino `#10327A` no es candidato a acento: contra la tinta da 1.9:1 y el cuadrado del logotipo deja de separarse de las letras. Solo sirve como fondo de sección oscura en la variante azul.

---

## 2. Principios

- **Un acento por pantalla visible.** El color aparece en el CTA primario o en el elemento destacado de la sección, nunca en ambos. El cuadrado del logotipo cuenta como uso, así que en el header no va otro elemento en color.
- **La jerarquía la carga la tipografía y el espacio**, no el color ni el peso de las sombras.
- **Separación por línea de 1px, cambio de fondo o aire.** Sin sombras difusas, sin gradientes, sin bordes de colores.
- **Nada decorativo.** Si un elemento no comunica ni ayuda a escanear, se borra.

---

## 3. Tokens

### `app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Color — paleta VERDE activa */
  --color-tinta:      #101418;
  --color-acento:     #0B8F4F;
  --color-acento-alt: #0A7D48;   /* hover y presionado */
  --color-gris:       #6B7076;
  --color-linea:      #E3E1DD;
  --color-neutro:     #F4F3F1;
  --color-papel:      #FFFFFF;

  /* Paleta AZUL — inactiva, no borrar
  --color-tinta:      #0D1728;
  --color-acento:     #1E5BD6;
  --color-acento-alt: #1746A8;
  --color-gris:       #64707F;
  --color-linea:      #E2E6EC;
  --color-neutro:     #F2F4F7;
  --color-marino:     #10327A;
  */

  /* Tipografía */
  --font-sans: var(--font-space-grotesk), ui-sans-serif, system-ui, sans-serif;
  --font-mono: var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, monospace;

  /* Radio */
  --radius-base: 4px;
  --radius-card: 4px;
}
```

### `lib/brand.ts`

```ts
export const brand = {
  tinta: "#101418",
  acento: "#0B8F4F",
  acentoAlt: "#0A7D48",
  gris: "#6B7076",
  linea: "#E3E1DD",
  neutro: "#F4F3F1",
  papel: "#FFFFFF",
} as const;
```

Se usa para `og:image`, metadatos de tema y cualquier SVG generado en runtime. Debe coincidir con `globals.css`; si divergen, es bug.

---

## 4. Tipografía

Dos familias, cargadas con `next/font/google` para evitar CLS y peticiones a Google en runtime.

- **Space Grotesk** — títulos y cuerpo.
- **JetBrains Mono** — etiquetas, precios, números, microcopy, badges.

La monoespaciada es lo que le da carácter al sitio. Úsala en eyebrows, precios, cifras y pies de figura. Nunca en párrafos.

### Escala

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

**Medida máxima de línea: 68 caracteres.** Aplica `max-w-[68ch]` a todo párrafo, sin excepción.

Los títulos van apretados y el cuerpo cómodo. Ese contraste es la mitad del carácter del sitio.

---

## 5. Espaciado y layout

- Contenedor: `max-w-[1080px]`, padding lateral `20px` en móvil, `32px` desde `md`.
- Ritmo vertical de sección: `py-16` en móvil, `py-24` desde `md`. Sin excepciones para "que se vea más lleno".
- Escala de espacio: solo múltiplos de 4px. Usa la escala de Tailwind y no valores arbitrarios.
- Separación entre secciones: línea `1px solid var(--color-linea)` o cambio a fondo `--color-neutro`, alternando. Nunca las dos a la vez.
- El sitio debe leerse bien a 360px de ancho. Es el ancho real de buena parte del tráfico de pyme mexicana.

---

## 6. Componentes

### Botón primario
Fondo `--color-acento`, texto blanco, `radius-base`, padding `12px 20px`, peso 500, sin borde, sin sombra. Hover: fondo `--color-acento-alt` con transición de 120ms. Foco: `outline: 2px solid var(--color-tinta); outline-offset: 2px`.

### Botón secundario
Fondo transparente, texto `--color-tinta`, borde `1px solid var(--color-tinta)`. Hover: fondo `--color-tinta`, texto blanco.

### Tarjeta
Fondo `--color-papel`, borde `1px solid --color-linea`, `radius-card`, padding `24px`. Sin sombra, sin hover elevado. Si necesita destacar, cambia el fondo a `--color-neutro`.

### Eyebrow
Mono, mayúsculas, `--color-gris`, tracking `0.18em`. Siempre arriba del título de sección, nunca solo.

### Bloque de precio
Cifra en mono a `2rem`, unidad y periodicidad en `--color-gris` al lado a tamaño de cuerpo chico. El precio va visible en la página; no se esconde detrás de formulario.

### Estados de formulario
Error en `#B42318` con texto explicativo debajo del campo, nunca solo con color. Éxito en `--color-acento` únicamente si el acento activo es verde; si el acento es azul, éxito usa `#0B8F4F` como color funcional independiente del acento de marca.

---

## 7. Uso del logotipo

- **Horizontal** (`ar2go-logotipo.svg`): uso por defecto. Header, pie, documentos.
- **Isotipo** (`ar2go-isotipo.svg`): favicon, app icon, avatar, `og:image`. Nunca en el header del sitio.
- **Zona de reserva:** el ancho del cuadrado del logotipo (52 unidades sobre una caja de 100 de alto, es decir 52% de la altura) libre por los cuatro lados.
- **Tamaño mínimo:** 120px de ancho en pantalla, 30mm impreso. Abajo de eso, isotipo.
- **Sobre fondo oscuro:** letras en blanco, cuadrado en el acento, número del cuadrado en tinta.
- **Sobre el acento:** todo en blanco, número del cuadrado en el acento.
- **Una tinta:** cuadrado del mismo color que las letras.

### Prohibido
Sustituir el cuadrado por un `2` tipográfico o un superíndice. Condensar, estirar, inclinar, contornear. Sombras, gradientes, glow. Recolorear a cualquier hex fuera de esta guía. Encimar el logotipo sobre fotografía sin caja sólida detrás.

---

## 8. Código fuente de los archivos

Las letras son trazos vectoriales de grosor 20 sobre caja de 100 de alto. No hay dependencia tipográfica: el logo se ve igual en cualquier máquina. Para generar la variante azul, sustituye `#0B8F4F` por `#1E5BD6` y `#101418` por `#0D1728`.

### `public/brand/ar2go-logotipo.svg`

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
  <rect x="184" y="0" width="52" height="52" rx="9" fill="#0B8F4F"/>
  <g transform="translate(196.4,6) scale(0.40)" fill="none" stroke="#FFFFFF" stroke-width="19" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="6">
    <path d="M9,32 A24,24 0 0 1 57,32 L9,91.5 H59"/>
  </g>
</svg>
```

### `public/brand/ar2go-isotipo.svg`

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024" role="img" aria-label="AR2GO">
  <title>AR2GO — isotipo</title>
  <rect width="1024" height="1024" rx="228" fill="#0B8F4F"/>
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

### `public/brand/ar2go-logotipo-negativo.svg`

Mismo archivo que el horizontal con dos cambios: `stroke="#101418"` pasa a `stroke="#FFFFFF"` en el grupo de letras, y el `stroke` del número dentro del cuadrado pasa de `#FFFFFF` a `#101418`.

---

## 9. Favicon, app icon y og:image

- `app/icon.svg` — copia del isotipo. Next lo sirve como favicon.
- `app/apple-icon.png` — isotipo rasterizado a 180×180.
- `app/opengraph-image.tsx` — generado con `next/og`: fondo tinta, logotipo negativo centrado, y el titular del hero en Space Grotesk. 1200×630.
- `theme-color`: el valor de `--color-acento`.

Verifica el isotipo a 32px y a 16px antes de dar por buena cualquier variante de color. Es donde más se rompe.

---

## 10. Accesibilidad

Contrastes ya verificados, no hay que recalcularlos:

| Combinación | Ratio | Veredicto |
|---|---|---|
| Tinta `#101418` sobre papel | 18.4:1 | AAA |
| Gris `#6B7076` sobre papel | 4.8:1 | AA cuerpo |
| Blanco sobre verde `#0B8F4F` | 4.15:1 | AA texto grande y elementos gráficos |
| Blanco sobre azul `#1E5BD6` | 5.97:1 | AA cuerpo |
| Verde sobre tinta | 4.45:1 | AA |

Reglas duras: el gris no baja de `#6B7076`; el acento no se usa como color de texto de cuerpo sobre blanco; el estado de foco siempre visible y nunca removido con `outline: none` sin reemplazo; ningún significado se comunica solo con color.

---

## 11. Checklist de PR

- [ ] Cero hexadecimales literales en componentes; todo sale de tokens
- [ ] Cero clases de color por defecto de Tailwind (`text-gray-500`, `bg-blue-600`)
- [ ] Un solo uso del acento por pantalla visible
- [ ] Todo párrafo con medida máxima de 68 caracteres
- [ ] Legible y usable a 360px de ancho
- [ ] Foco visible en todo elemento interactivo, navegable con teclado
- [ ] Sin sombras, gradientes ni animaciones decorativas
- [ ] Logotipo desde `public/brand/`, nunca reconstruido en JSX
- [ ] Lighthouse móvil: rendimiento ≥ 95, accesibilidad 100

---

## 12. Bitácora de cambios

| Fecha | Cambio | Motivo |
|---|---|---|
| 2026-08 | Sistema inicial: tinta, acento único, cuadrado como exponente y contenedor | Identidad base |
| 2026-08 | Acento naranja `#FF6A13` reemplazado por verde `#0B8F4F` | Decisión de dirección |
| 2026-08 | Variante azul `#1E5BD6` documentada como alternativa | Comparativo abierto |

Cada cambio de token entra por PR con una fila nueva aquí.
