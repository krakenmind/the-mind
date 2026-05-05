# GitHub — Artefactos para case02

> **Nota de coherencia**: la sugerencia inicial era `cloudara/billing-service`,
> pero el resto del seed (Linear DEV-1042, postmortem PMT-2025-10, bitácora)
> dice explícitamente que el bug está en `payments-svc` y que `billing-svc`
> ya usaba `BigDecimal` desde el día uno. Para no romper la consistencia uso
> el repo `cloudara/payments-service` (alias del Linear `payments-svc`). El
> resto del shape (PR de hace ~6 meses, issue, archivos, postmortem link) es
> exactamente el pedido.

---

## Repo: `cloudara/payments-service`

- **Visibility**: Private (org `cloudara`)
- **Default branch**: `main`
- **Topics**: `nodejs`, `typescript`, `payments`, `microservice`
- **Description**: "Payments microservice — validación, parsing y persistencia de pagos para clientes Cloudara."
- **Lenguaje**: TypeScript (Node.js 20 LTS)
- **CI**: GitHub Actions (`.github/workflows/ci.yml`, no se siembra en este caso, sólo se referencia)

### Tags / releases relevantes

- **Tag**: `v2.7.0` — release del 2025-10-15 que incluye el fix de DEV-1042.
- **Release notes** (extracto):
  > **v2.7.0 — 2025-10-15**
  >
  > ### Fixes
  > - Decimal parsing strict en `/api/v2/payments` (#487, DEV-1042). Resuelve
  >   crash 500 cuando el `amount` tiene más de 2 decimales. Introduce flag
  >   `STRICT_DECIMAL_PARSING` (default `true` en prod). Ver postmortem
  >   PMT-2025-10 en Notion.
  >
  > ### Internal
  > - Helper `parseAmount()` en `libs/money.ts`. **Nuevo único punto de
  >   entrada para parsear montos.** No usar `Number()` ni `parseFloat()`.

---

## Issue #482 — `[BUG] 500 en POST /api/v2/payments con montos de 4 decimales`

- **State**: Closed (closed 2025-10-15 via PR #487)
- **Author**: gabriel-ferre
- **Assignees**: cami-nunez
- **Labels**: `bug`, `priority:high`, `regression`, `cliente:mno`, `payments`
- **Milestone**: `2025-Q4`
- **Linked Linear ticket**: DEV-1042 (linked via Linear-GitHub sync)
- **Created**: 2025-10-13 16:50 UYT
- **Closed**: 2025-10-15 17:32 UYT (cerrado automáticamente por merge de #487)

### Body (copiar tal cual)

> ### Reportado vía Linear DEV-1042
>
> Mercado Norte reporta 500s en `POST /api/v2/payments` cuando el `amount`
> en el body tiene 4 decimales (su ERP exporta así).
>
> **Repro**:
> ```bash
> curl -X POST https://api.cloudara.uy/v2/payments \
>   -H 'Content-Type: application/json' \
>   -d '{"amount": "1234.5678", "currency": "UYU", "client_id": "mno-7741"}'
> # → HTTP 500
> ```
>
> Con `"amount": "1234.56"` funciona OK. Aparentemente algo en el handler
> castea string→Number y se pierde precisión, lo que después hace explotar
> la validación interna con un `RangeError` no atrapado.
>
> **Hipótesis (Camila)**: en `src/handlers/createPayment.ts` se hace
> `Number(req.body.amount)` antes de validar. Para >2 decimales hay
> overflow / pérdida de precisión cuando se multiplica por 100 para
> normalizar a centavos.
>
> **Linear**: https://linear.app/cloudara/issue/DEV-1042
> **Postmortem (cuando salga)**: PMT-2025-10 en Notion.

### Comments

- **cami-nunez · 2025-10-14 10:18 UYT**
  > Confirmé causa raíz. Línea exacta: `createPayment.ts:47`. Voy con el fix.
  > Tres cosas en el PR: helper `parseAmount` con `decimal.js`, flag
  > `STRICT_DECIMAL_PARSING`, y tests para 4-dec, 6-dec, scientific notation
  > y leading zeros. La lint rule la dejo para PR aparte (#491).

- **mariano-silva · 2025-10-14 10:31 UYT**
  > 👍 Pero antes de mergear chequeá que `payments-svc` sea el único lugar
  > donde casteamos montos. Si hay otros, los cubrimos todos en este sprint.

- **cami-nunez · 2025-10-14 10:34 UYT**
  > Ya grepeé. El único otro lugar es `billing-service` pero ahí usamos
  > `BigDecimal` desde el día uno. Esto es un rezago del split del monolito
  > 2024.

- **github-actions[bot] · 2025-10-15 17:32 UYT**
  > 🔒 Closed via #487 — `a3f9e21`.

---

## PR #487 — `fix(payments): strict decimal parsing in /api/v2/payments`

- **State**: Merged (2025-10-15 17:30 UYT, squash merge)
- **Branch**: `fix/dev-1042-decimal-parsing` → `main`
- **Author**: cami-nunez
- **Reviewers**: mariano-silva (approved), tomas-vidal (approved)
- **Labels**: `bug`, `priority:high`, `area:payments`, `cliente:mno`
- **Linked issue**: closes #482
- **Linked Linear**: DEV-1042
- **Files changed**: 6 · **Additions**: +147 · **Deletions**: -12
- **Merge commit**: `a3f9e21`

### Body (copiar tal cual)

> ## Summary
>
> Resuelve el crash 500 en `POST /api/v2/payments` cuando el `amount` tiene
> más de 2 decimales (DEV-1042, reportado por Mercado Norte).
>
> Causa raíz: el handler casteaba el string del body a `Number` antes de
> validarlo. Para montos con > 2 decimales el `Number * 100` posterior caía
> fuera de safe-integer y disparaba un `RangeError` no manejado.
>
> ## Cambios
>
> - **Nuevo**: helper `parseAmount(raw: unknown): Decimal` en `libs/money.ts`.
>   Único punto autorizado para parsear montos en el codebase. Usa
>   `decimal.js` (BigDecimal). Rechaza `Number`, scientific notation y
>   leading zeros explícitamente.
> - **Nuevo**: flag de config `STRICT_DECIMAL_PARSING` (env var, default
>   `true`). Cuando está on, si `parseAmount()` tira `ParseError`,
>   devolvemos `400 Bad Request` con detail; en lugar de 500.
> - **Refactor**: `createPayment` handler — usa `parseAmount()` y maneja
>   `ParseError` antes del `catch` general.
> - **Tests**: 8 casos nuevos cubriendo 4-dec, 6-dec, scientific notation,
>   leading zeros, números (no string), null, undefined y string vacío.
>
> ## Riesgo / rollout
>
> - Backward compatible. Si `STRICT_DECIMAL_PARSING=false` (sólo dev local),
>   comportamiento idéntico al previo (sigue tirando 500, pero ningún cliente
>   debería caer ahí en prod).
> - Default `true` en `production` y `staging` (config en etcd).
>
> ## Postmortem
>
> Postmortem completo en Notion: **PMT-2025-10 — Crash en /payments con
> decimales** (`Cloudara HQ / Engineering / Postmortems / 2025-10`).
>
> ## Closes
>
> - Closes #482
> - Linear: DEV-1042

### Files changed (resumen)

| File | +/− |
|------|-----|
| `src/handlers/createPayment.ts` | +18 / −9 |
| `src/libs/money.ts` (NEW) | +42 / −0 |
| `src/config.ts` | +3 / −0 |
| `src/handlers/__tests__/createPayment.test.ts` | +56 / −2 |
| `src/libs/__tests__/money.test.ts` (NEW) | +24 / −0 |
| `CHANGELOG.md` | +4 / −1 |

### Diff (extracto, suficiente para identificar el patrón del fix)

#### `src/handlers/createPayment.ts`

```diff
- import { validateAmount } from '../validation';
+ import { parseAmount, ParseError } from '@cloudara/libs/money';
+ import { config } from '../config';

  export async function createPayment(req, res) {
    try {
-     const amount = Number(req.body.amount);
-     validateAmount(amount);
+     const amount = parseAmount(req.body.amount);
+     // parseAmount lanza ParseError si el formato es inválido
      const payment = await paymentsRepo.create({
        amount,
        currency: req.body.currency,
        clientId: req.body.client_id,
      });
      return res.status(201).json(payment);
    } catch (e) {
+     if (e instanceof ParseError && config.STRICT_DECIMAL_PARSING) {
+       return res.status(400).json({ error: 'invalid_amount', detail: e.message });
+     }
      logger.error({ err: e }, 'createPayment failed');
      return res.status(500).json({ error: 'internal' });
    }
  }
```

#### `src/libs/money.ts` (NEW)

```diff
+ import Decimal from 'decimal.js';
+
+ export class ParseError extends Error {
+   constructor(input: string) {
+     super(`amount "${input}" is not a valid decimal string`);
+     this.name = 'ParseError';
+   }
+ }
+
+ /**
+  * Parsea un monto representado como string a BigDecimal.
+  * NO usar Number() ni parseFloat() para montos en JavaScript.
+  * Ver postmortem PMT-2025-10.
+  */
+ export function parseAmount(raw: unknown): Decimal {
+   if (typeof raw !== 'string') throw new ParseError(String(raw));
+   if (!/^-?\d+(\.\d+)?$/.test(raw)) throw new ParseError(raw);
+   try {
+     return new Decimal(raw);
+   } catch {
+     throw new ParseError(raw);
+   }
+ }
```

#### `src/config.ts`

```diff
  export const config = {
+   // Ver PMT-2025-10. Default true en prod/staging, override sólo en dev local.
+   STRICT_DECIMAL_PARSING: process.env.STRICT_DECIMAL_PARSING !== 'false',
    // ...
  };
```

### Commits (3, squash-merged a `a3f9e21`)

1. **`b71c0a4`** · `fix(payments): introduce parseAmount() helper backed by decimal.js`
   _2025-10-14 11:42 UYT — Camila Núñez_
2. **`d4e8112`** · `feat(payments): add STRICT_DECIMAL_PARSING flag and 400 path`
   _2025-10-14 16:08 UYT — Camila Núñez_
3. **`f02ae65`** · `test(payments): cover 4-dec, 6-dec, scientific notation, leading zeros`
   _2025-10-15 09:55 UYT — Camila Núñez_

### Review comments destacados

- **mariano-silva · 2025-10-14 17:20 UYT** _(en `src/libs/money.ts:14`)_
  > Buen helper. ¿Por qué la regex no acepta scientific notation? — Camila:
  > A propósito, el contrato OpenAPI dice "decimal string", scientific
  > notation no debería entrar y si entra es un error del cliente que
  > preferimos exponer con 400 antes que aceptarlo silenciosamente.
  > **mariano-silva**: 👍 acordado, dejame el comentario en el código.

- **tomas-vidal · 2025-10-14 17:45 UYT** _(en `src/handlers/createPayment.ts:51`)_
  > El `if (e instanceof ParseError && config.STRICT_DECIMAL_PARSING)` me
  > preocupa: si por error apagamos el flag en prod, volvemos a 500. ¿No
  > deberíamos tirar 400 siempre? — Camila: el flag está para poder
  > rollbackear comportamiento si el cliente protesta de un 400 que antes
  > no veía. En prod queda `true` y lo monitoreamos.

---

## Cómo usar este artefacto en la demo

Cuando Krakenmind cite el fix, debe dar:

- Link al **PR #487** (`https://github.com/cloudara/payments-service/pull/487`).
- Link al **issue #482** (cerrado por el PR).
- El **commit hash** `a3f9e21`.
- Cruce con **Linear DEV-1042** y **Notion PMT-2025-10**.

Eso muestra los 4 hops: Linear nuevo (bug actual) → Linear viejo (DEV-1042) →
GitHub (issue + PR + diff) → Notion (postmortem con la lección).
