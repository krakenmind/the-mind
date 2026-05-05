# Google Drive — Archivos para case02

## Archivo: `PR-487-diff.pdf`

- **Path**: My Drive / Cloudara / Engineering / Postmortems / 2025-10 / PR-487-diff.pdf
- **Owner**: camila@cloudara.uy
- **Shared with**: dev@cloudara.uy (group), mariano@cloudara.uy
- **Uploaded**: 2025-10-15 18:45 UYT
- **Size**: 124 KB
- **Type**: PDF (export del diff del PR-487)

### Contenido (descripción de lo que contiene el PDF — copiar tal cual como "extracto" si la demo lo pide)

> # PR-487 — Fix decimal parsing in payments-svc
>
> **Author**: Camila Núñez (camila@cloudara.uy)
> **Reviewers**: Mariano Silva, Tomás Vidal
> **Merged**: 2025-10-15 17:30 UYT
> **Commit**: a3f9e21
> **Branch**: `fix/dev-1042-decimal-parsing` → `main`
> **Files changed**: 6 · **Additions**: +147 · **Deletions**: -12
>
> ---
>
> ### `payments-svc/src/handlers/createPayment.ts`
>
> ```diff
> - import { validateAmount } from '../validation';
> + import { parseAmount } from '@cloudara/libs/money';
> + import { config } from '../config';
>
>   export async function createPayment(req, res) {
>     try {
> -     const amount = Number(req.body.amount);
> -     validateAmount(amount);
> +     const amount = parseAmount(req.body.amount);
> +     // parseAmount lanza ParseError si el formato es inválido
>       const payment = await paymentsRepo.create({
>         amount,
>         currency: req.body.currency,
>         clientId: req.body.client_id,
>       });
>       res.status(201).json(payment);
>     } catch (e) {
> +     if (e instanceof ParseError && config.STRICT_DECIMAL_PARSING) {
> +       return res.status(400).json({ error: 'invalid_amount', detail: e.message });
> +     }
>       logger.error({ err: e }, 'createPayment failed');
>       res.status(500).json({ error: 'internal' });
>     }
>   }
> ```
>
> ### `libs/money.ts` (nuevo archivo)
>
> ```diff
> + import Decimal from 'decimal.js';
> +
> + export class ParseError extends Error {
> +   constructor(input: string) {
> +     super(`amount "${input}" is not a valid decimal string`);
> +   }
> + }
> +
> + /**
> +  * Parsea un monto representado como string a BigDecimal.
> +  * NO usar Number() ni parseFloat() para montos en JavaScript.
> +  * Ver postmortem PMT-2025-10.
> +  */
> + export function parseAmount(raw: unknown): Decimal {
> +   if (typeof raw !== 'string') throw new ParseError(String(raw));
> +   if (!/^-?\d+(\.\d+)?$/.test(raw)) throw new ParseError(raw);
> +   try {
> +     return new Decimal(raw);
> +   } catch {
> +     throw new ParseError(raw);
> +   }
> + }
> ```
>
> ### `payments-svc/src/config.ts`
>
> ```diff
>   export const config = {
> +   STRICT_DECIMAL_PARSING: process.env.STRICT_DECIMAL_PARSING !== 'false',
>     // ...
>   };
> ```
>
> ### Tests agregados
>
> - `parseAmount("1234.5678")` → `Decimal("1234.5678")` ✓
> - `parseAmount("1234.123456")` → `Decimal("1234.123456")` ✓
> - `parseAmount("1e5")` → `ParseError` ✓ (no aceptamos notación científica)
> - `parseAmount("01234.5")` → `ParseError` ✓ (no aceptamos leading zeros)
> - `parseAmount(1234.5)` → `ParseError` ✓ (no aceptamos number, sólo string)
> - `POST /payments` con `"amount": "1234.5678"` y flag on → `400` con detail
> - `POST /payments` con `"amount": "1234.5678"` y flag off → `500` (legacy)
>
> ---
>
> _Adjunto al postmortem PMT-2025-10 para referencia futura._
