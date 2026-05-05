# Caso 2 — Bug déjà vu en `/api/v2/payments`

**Persona**: Developer (Camila Núñez o Tomás Vidal)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Estoy debuggeando un crash en el endpoint POST /api/v2/payments donde devuelve 500 cuando el monto tiene más de 2 decimales. ¿Esto ya pasó antes?"

## Lo que pasa "detrás"

Octubre 2025: Mercado Norte reporta un 500 en `/api/v2/payments` cuando el monto venía con 4 decimales (cosas de su ERP). Camila Núñez lo investiga, encuentra que el handler de Node.js casteaba el `Decimal` a `Number` y se perdía precisión, lo que hacía explotar la validación posterior. Fix: introducir el flag `STRICT_DECIMAL_PARSING` que fuerza el parsing como string + `BigDecimal`. Ticket DEV-1042 cerrado, postmortem en Notion, PR #487 en `cloudara/payments-service` mergeado.

Mayo 2026: alguien (Tomás, dev nuevo en backend) pega contra el mismo síntoma. No sabe que ya pasó. Pregunta a Krakenmind. La respuesta tiene que cruzar **cuatro fuentes en cuatro hops**: el ticket viejo de Linear (DEV-1042), el issue + PR de GitHub (`cloudara/payments-service#482` / `#487`, con el diff completo), la bitácora + postmortem en Notion (PMT-2025-10), y la lección accionable — sospechar que el flag fue desactivado o que un servicio nuevo no lo respeta.

## Fuentes y evidencia

- **Linear** — `DEV-1042` (cerrado oct-2025, mismo bug, fix de Camila). Comentarios operativos del thread (Mariano pide chequear otros servicios, Camila confirma grep, tldr final con la pista para futuros) viven acá.
- **GitHub** — repo `cloudara/payments-service`:
  - Issue `#482` (closed) — reporte original linkeado a DEV-1042.
  - PR `#487` (merged 2025-10-15, commit `a3f9e21`, branch `fix/dev-1042-decimal-parsing`) — diff del fix con `parseAmount()` + flag `STRICT_DECIMAL_PARSING`, 3 commits, review approvals de Mariano y Tomás.
  - Tag `v2.7.0` con release notes que apuntan al postmortem.
- **Notion** — postmortem `PMT-2025-10 — Crash en /payments con decimales` con la lección y el flag, **+** bitácora `DEV-1042 — decimal parsing en payments-svc` con el debug volcado en caliente.
- **Google Drive** — `PR-487-diff.pdf` (export del diff del fix, archivado junto al postmortem).

## Respuesta esperada

> Sí, esto ya pasó. En octubre de 2025, **DEV-1042** ("500 en POST /api/v2/payments con montos de 4 decimales") cubrió exactamente este caso. Lo reportó Mercado Norte, lo resolvió Camila Núñez en el commit `a3f9e21` (`cloudara/payments-service#487`, mergeado el 2025-10-15, tag de release `v2.7.0`).
>
> Causa raíz, según el postmortem **PMT-2025-10** en Notion y la bitácora de debugging de Camila del 2025-10-14: el handler en Node.js casteaba el `Decimal` (que llegaba como string del cliente) a `Number` antes de validarlo, lo que para montos con más de 2 decimales perdía precisión y disparaba un `RangeError` no manejado en la validación posterior. El fix introdujo el flag `STRICT_DECIMAL_PARSING` que fuerza el parsing como string usando `BigDecimal` y rechaza con 400 si el formato no es válido (en lugar de explotar con 500).
>
> Si estás viendo el mismo síntoma hoy, sospechá:
> 1. **El flag `STRICT_DECIMAL_PARSING` se desactivó** en alguna config (revisar etcd / variables del servicio).
> 2. **Un servicio nuevo bypassea el helper `parseAmount()`** del fix y castea directo. Buscá usos de `Number(req.body.amount)` o `parseFloat(...)` en el código nuevo.
> 3. **El cliente nuevo es otro** (no Mercado Norte) — confirmá quién está mandando el request, porque el postmortem aclara que la pista era el formato del ERP.
>
> Lectura recomendada antes de tocar nada: el diff del PR en GitHub (`cloudara/payments-service#487`, archivos `src/handlers/createPayment.ts` y `src/libs/money.ts`) muestra exactamente el patrón a respetar. El mismo diff exportado a PDF (`PR-487-diff.pdf`) está en Drive, en la carpeta `Engineering / Postmortems / 2025-10` junto al postmortem.

## Por qué es valioso

Este es el caso clásico de "bug déjà vu". Sin Krakenmind, Tomás re-investiga 4 horas el mismo bug que Camila ya resolvió. Con Krakenmind, en 30 segundos ve el ticket cerrado, el postmortem, el commit y la pista accionable de qué chequear primero. El conocimiento institucional deja de depender de "preguntale a Camila".
