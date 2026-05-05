# Notion — Docs para case02

## Página: "PMT-2025-10 — Crash en /payments con decimales"

- **Path**: Cloudara HQ / Engineering / Postmortems / 2025-10 / PMT-2025-10
- **Owner**: Camila Núñez
- **Created**: 2025-10-16 14:30 UYT
- **Last edited**: 2025-10-17 09:48 UYT por Mariano Silva (revisión)
- **Tags**: `postmortem`, `payments`, `cliente:mno`, `regression`, `backend`

### Contenido (copiar tal cual)

> # Postmortem PMT-2025-10
> ## Crash en POST /api/v2/payments con montos de más de 2 decimales
>
> **Autor**: Camila Núñez (Backend)
> **Reviewer**: Mariano Silva (SRE Lead)
> **Fecha del incidente**: 2025-10-13
> **Severidad**: SEV-3 (impacto a un cliente, sin pérdida de datos)
> **Tickets**: DEV-1042 · PR-487
> **Estado**: Cerrado
>
> ---
>
> ### Resumen ejecutivo
>
> El endpoint `POST /api/v2/payments` devolvía HTTP 500 cuando el cliente
> Mercado Norte enviaba montos con más de 2 decimales. La causa fue un cast
> implícito de string a `Number` antes de la validación, que perdía precisión
> y disparaba un `RangeError` no manejado. El fix introduce un helper
> `parseAmount()` y un flag `STRICT_DECIMAL_PARSING`.
>
> ### Línea de tiempo (UYT)
>
> - **2025-10-13 16:30** — MNO empieza a recibir 500s al sincronizar batch de pagos.
> - **2025-10-13 16:42** — Gabriel Ferré abre DEV-1042 con repro.
> - **2025-10-14 10:15** — Camila confirma causa raíz en `createPayment.ts:47`.
> - **2025-10-15 11:02** — PR-487 listo para review.
> - **2025-10-15 17:30** — Mergeado a main.
> - **2025-10-15 18:00** — Deploy a prod, ventana acordada con MNO.
> - **2025-10-15 18:10** — MNO valida, ticket cerrado.
>
> ### Causa raíz
>
> En `payments-svc/src/handlers/createPayment.ts` (línea 47), el handler hacía:
>
> ```ts
> const amount = Number(req.body.amount);  // <-- ACÁ PERDÍA PRECISIÓN
> validateAmount(amount);
> ```
>
> El campo `amount` llegaba como string desde el cliente (correcto, así está
> en el contrato OpenAPI). El `Number()` sobre `"1234.5678"` devolvía
> `1234.5678`, pero el `validateAmount` interno multiplicaba por 100 para
> normalizar a centavos y aplicaba `Number.isSafeInteger`, lo que para
> ciertos valores fallaba con un `RangeError` que el handler no atrapaba.
>
> ### Lección aprendida
>
> **Nunca castear montos a `Number` en JavaScript.** Los floats IEEE-754 no
> representan decimales con precisión. Toda lógica de dinero debe usar
> `BigDecimal` (paquete `decimal.js`) y mantener el valor como string en los
> límites de la API.
>
> ### Acciones
>
> 1. **Helper `parseAmount(raw: string): BigDecimal`** en `libs/money.ts` —
>    única forma autorizada de parsear montos en el codebase.
> 2. **Flag `STRICT_DECIMAL_PARSING`** (etcd: `/cloudara/payments-svc/strict_decimal_parsing`).
>    - `true` en `production`, `staging` (default).
>    - `false` permitido sólo en `dev` local.
>    - Cuando es `true`, si el parseo falla devolvemos `400 Bad Request` con
>      mensaje claro, en lugar de `500`.
> 3. **Lint rule** (eslint custom): prohibir `Number(...)` y `parseFloat(...)`
>    sobre cualquier variable cuyo nombre contenga `amount`, `price`, `total`
>    o `cost`. PR-491 lo agrega.
> 4. **Checklist de PR review** para `payments-svc`: confirmar que cualquier
>    nuevo lugar que toque montos pasa por `parseAmount()`.
>
> ### Riesgo residual
>
> Si en el futuro alguien:
>
> - **Desactiva el flag** `STRICT_DECIMAL_PARSING` por error en config —
>   el handler vuelve a tirar 500 en lugar de 400, aunque el dato sigue
>   procesándose mal en el helper viejo.
> - **Crea un servicio nuevo** que toque montos sin usar el helper
>   `parseAmount()` — el lint rule debería atraparlo, pero no cubre código
>   en otros repos.
>
> Si vuelve a aparecer el síntoma de 500 en `/payments`, **chequear primero
> esos dos puntos** antes de re-investigar la causa.
