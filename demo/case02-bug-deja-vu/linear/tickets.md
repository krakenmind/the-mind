# Linear — Tickets para case02

## DEV-1042 — 500 en POST /api/v2/payments con montos de 4 decimales

- **Team**: Development (DEV)
- **Type**: Bug · **Priority**: High
- **Status**: Done
- **Assignee**: Camila Núñez · **Reporter**: Gabriel Ferré (vía cliente)
- **Cliente**: Mercado Norte
- **Labels**: `cliente:mno`, `backend`, `payments`, `regression`
- **Created**: 2025-10-13 16:42 UYT
- **Completed**: 2025-10-15 18:10 UYT
- **PR**: PR-487 (`pipeshub/payments-svc`)
- **Commit**: `a3f9e21`

### Description (copiar tal cual)

> Mercado Norte reporta que cuando llaman POST /api/v2/payments con un body donde
> el campo `amount` tiene 4 decimales (ej. `"amount": "1234.5678"`), la API devuelve
> 500 Internal Server Error en lugar de procesar el pago o devolver un 400 informativo.
>
> Repro:
>   curl -X POST https://api.cloudara.uy/v2/payments \
>     -H 'Content-Type: application/json' \
>     -d '{"amount": "1234.5678", "currency": "UYU", "client_id": "mno-7741"}'
>   → HTTP 500
>
> Con `"amount": "1234.56"` funciona bien. El cliente exporta los montos desde su
> ERP que aparentemente trabaja en 4 decimales.
>
> Pista preliminar (Camila): mirando los logs veo un `RangeError` en el helper de
> validación. El monto entra como string pero algo lo castea a Number antes de
> validarlo y se pierde precisión.

### Comments

- **Camila Núñez · 2025-10-14 10:15 UYT**
  > Confirmé causa raíz. En `payments-svc/src/handlers/createPayment.ts` línea 47
  > hacíamos `Number(req.body.amount)` antes de pasar a `validateAmount()`.
  > Para montos con > 2 decimales el cast a Number pierde precisión y la
  > validación post-cast tira RangeError no atrapado. Detallé en thread de
  > #dev-backend.

- **Camila Núñez · 2025-10-15 11:02 UYT**
  > PR-487 abierto. Cambios principales:
  > - Helper nuevo `parseAmount(raw: string): BigDecimal` en `libs/money.ts`.
  > - Flag `STRICT_DECIMAL_PARSING` (default `true` en prod, `false` en dev local).
  > - Si el flag está on y el monto no parsea con `BigDecimal`, devolvemos 400
  >   con mensaje claro en lugar de 500.
  > - Tests para 4-dec, 6-dec, scientific notation, y leading zeros.

- **Camila Núñez · 2025-10-15 18:10 UYT**
  > Mergeado y deployado. Validé con MNO, confirmaron que funciona.
  > Postmortem en Notion: PMT-2025-10. Cierro ticket.

- **Mariano Silva · 2025-10-14 10:30 UYT**
  > 👍 Camila, ojo de chequear que `payments-svc` no es el único lugar. Si hay
  > otro servicio que parsee montos lo tenemos que cubrir también.

- **Camila Núñez · 2025-10-14 10:32 UYT**
  > Sí, ya grepeé. Lo único más afuera es `billing-svc` pero ahí ya usa
  > BigDecimal desde el día uno. Esto es un rezago de cuando `payments-svc`
  > se separó del monolito en 2024 y se trajo el código viejo.

- **Camila Núñez · 2025-10-15 17:35 UYT**
  > ✅ PR-487 mergeado. Postmortem en Notion (PMT-2025-10).
  > Tldr para futuros que caigan acá: si ven 500 en /payments con decimales,
  > chequear primero el flag `STRICT_DECIMAL_PARSING` y si algún servicio
  > nuevo bypassea `parseAmount()`. NO re-investiguen desde cero.

- **Mariano Silva · 2025-10-15 18:25 UYT**
  > Buen trabajo. Sumemos al checklist de PR review: si tocás `payments-svc`,
  > pasá por el helper `parseAmount()` y no castees a Number.
