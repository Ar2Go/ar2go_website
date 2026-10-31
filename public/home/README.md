# public/home/ — fotografía de la home

Seis recortes (`.webp`) de paisaje real (fiordos y montañas de Noruega),
extraídos tal cual del `home.html` aprobado (embebidos ahí en base64) — se
usaron esos archivos y no los `.jpg` originales sueltos que llegaron en el
mismo envío, para no adivinar el recorte/gradación de color exactos que ya
traían aplicados en la maqueta.

Licencia Pexels (gratuita, uso comercial permitido, sin atribución
obligatoria). No son fotografía generada ni ilustración genérica de IA —
cumplen la regla de `CLAUDE.md` §3.

| Archivo | Uso |
|---|---|
| `hero.webp` | Fondo del hero |
| `agente-tramite.webp` | Tarjeta "Ejecutan el trámite" |
| `agente-propuesta.webp` | Tarjeta "Crean contigo" |
| `agente-inventario.webp` | Tarjeta "Vigilan y avisan" |
| `nosotros.webp` | Franja "Ingeniería, no una demo bonita" |
| `cta.webp` | Franja de CTA final |
| `tripulacion.webp` | Fondo de 01 La tripulación |

`tripulacion.webp` (pico sobre un fiordo, Noruega) la aportó el dueño del
proyecto el 2026-10-31, a color. Se gradó con la misma receta que
`public/acceso/landing.webp` (ver su README): ancho 2400 px,
`modulate({ saturation: 0.25, brightness: 0.74 })`,
`tint({ r: 176, g: 196, b: 226 })`, `linear(0.86, 6)`, WebP calidad 82.
