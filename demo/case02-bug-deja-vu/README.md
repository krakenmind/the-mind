# Caso 2 — Bug déjà vu en `/api/v2/payments`

**Persona**: Developer (Camila Núñez o Tomás Vidal)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Estoy debuggeando un crash en el endpoint POST /api/v2/payments donde devuelve 500 cuando el monto tiene más de 2 decimales. ¿Esto ya pasó antes?"

## Lo que pasa "detrás"

Octubre 2025: Mercado Norte reporta un 500 en `/api/v2/payments` cuando el monto venía con 4 decimales (cosas de su ERP). Camila Núñez lo investiga, encuentra que el handler de Node.js casteaba el `Decimal` a `Number` y se perdía precisión, lo que hacía explotar la validación posterior. Fix: introducir el flag `STRICT_DECIMAL_PARSING` que fuerza el parsing como string + `BigDecimal`. Ticket DEV-1042 cerrado, postmortem en Notion, PR-487 mergeado.

Mayo 2026: alguien (Tomás, dev nuevo en backend) pega contra el mismo síntoma. No sabe que ya pasó. Pregunta a Krakenmind. La respuesta tiene que cruzar el ticket viejo de Linear, el thread de Slack del 14-oct, el postmortem de Notion y el PDF del diff en Drive — y sospechar que el flag fue desactivado o que un servicio nuevo no lo respeta.

## Fuentes y evidencia

- **Linear** — `DEV-1042` (cerrado oct-2025, mismo bug, fix de Camila).
- **Notion** — postmortem `PMT-2025-10 — Crash en /payments con decimales` con la lección y el flag.
- **Slack** — `#dev-backend`, thread del 2025-10-14 con la causa raíz explicada por Camila.
- **Google Drive** — `PR-487-diff.pdf` (export del diff del fix).

## Respuesta esperada

> Sí, esto ya pasó. En octubre de 2025, **DEV-1042** ("500 en POST /api/v2/payments con montos de 4 decimales") cubrió exactamente este caso. Lo reportó Mercado Norte, lo resolvió Camila Núñez en el commit `a3f9e21` (PR-487, mergeado el 2025-10-15).
>
> Causa raíz, según el postmortem **PMT-2025-10** en Notion y el thread de Camila en `#dev-backend` del 2025-10-14: el handler en Node.js casteaba el `Decimal` (que llegaba como string del cliente) a `Number` antes de validarlo, lo que para montos con más de 2 decimales perdía precisión y disparaba un `RangeError` no manejado en la validación posterior. El fix introdujo el flag `STRICT_DECIMAL_PARSING` que fuerza el parsing como string usando `BigDecimal` y rechaza con 400 si el formato no es válido (en lugar de explotar con 500).
>
> Si estás viendo el mismo síntoma hoy, sospechá:
> 1. **El flag `STRICT_DECIMAL_PARSING` se desactivó** en alguna config (revisar etcd / variables del servicio).
> 2. **Un servicio nuevo bypassea el helper `parseAmount()`** del fix y castea directo. Buscá usos de `Number(req.body.amount)` o `parseFloat(...)` en el código nuevo.
> 3. **El cliente nuevo es otro** (no Mercado Norte) — confirmá quién está mandando el request, porque el postmortem aclara que la pista era el formato del ERP.
>
> Lectura recomendada antes de tocar nada: el PDF `PR-487-diff.pdf` en Drive (carpeta `Engineering / Postmortems / 2025-10`), tiene el diff completo del fix.

## Por qué es valioso

Este es el caso clásico de "bug déjà vu". Sin Krakenmind, Tomás re-investiga 4 horas el mismo bug que Camila ya resolvió. Con Krakenmind, en 30 segundos ve el ticket cerrado, el postmortem, el commit y la pista accionable de qué chequear primero. El conocimiento institucional deja de depender de "preguntale a Camila".
