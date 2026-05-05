# Slack — Mensajes para case02

## #dev-backend

**Camila Núñez · 2025-10-14 10:14 UYT**

> 🐛 caí en el bug de DEV-1042. Para que quede acá la explicación porque me
> volvió loca un rato.
>
> El POST /api/v2/payments tira 500 cuando el monto tiene >2 decimales.
> Causa raíz: en `createPayment.ts:47` hacíamos:
>
> ```
> const amount = Number(req.body.amount);
> validateAmount(amount);
> ```
>
> El `amount` llega como string ("1234.5678"). El `Number()` lo convierte a
> float 64. Hasta ahí "todo bien". Pero después en `validateAmount` hacemos
> `amount * 100` (para pasar a centavos) y aplicamos `Number.isSafeInteger`.
> Para ciertos valores el resultado del `* 100` no es safe integer y tira
> `RangeError`, que NO está atrapado en el handler. Por eso 500 y no 400.
>
> Fix que voy a proponer:
> 1. Helper `parseAmount(raw: string): BigDecimal` (con `decimal.js`).
> 2. Flag `STRICT_DECIMAL_PARSING`. Si está on (siempre en prod) y el parse
>    falla, devolvemos 400 con mensaje claro.
> 3. Lint rule para prohibir `Number()` sobre cosas que se llamen `amount`,
>    `price`, `total`, etc.
>
> El bug es viejo, lo que cambió ahora es que MNO empezó a mandar montos
> con 4 decimales desde su ERP. Antes nadie mandaba >2 decimales, así que
> el bug nunca se disparó.

**Tomás Vidal · 2025-10-14 10:22 UYT**
> 😱 horrible. Eso es exactamente el ejemplo de "nunca uses float para plata"
> del libro de Effective JS. ¿La rule de lint la armás vos o queda para mí?

**Camila Núñez · 2025-10-14 10:24 UYT**
> Yo arranco, te paso PR para review. Probable que sea PR-491 separado del fix.

**Mariano Silva · 2025-10-14 10:30 UYT**
> 👍 Camila, ojo de chequear que `payments-svc` no es el único lugar. Si hay
> otro servicio que parsee montos lo tenemos que cubrir también.

**Camila Núñez · 2025-10-14 10:32 UYT**
> Sí, ya grepeé. Lo único más afuera es `billing-svc` pero ahí ya usa
> BigDecimal desde el día uno. Esto es un rezago de cuando `payments-svc`
> se separó del monolito en 2024 y se trajo el código viejo.

**Camila Núñez · 2025-10-15 17:35 UYT**
> ✅ PR-487 mergeado. Postmortem en Notion (PMT-2025-10).
> Tldr para futuros que caigan acá: si ven 500 en /payments con decimales,
> chequear primero el flag `STRICT_DECIMAL_PARSING` y si algún servicio
> nuevo bypassea `parseAmount()`. NO re-investiguen desde cero.

**Tomás Vidal · 2025-10-15 17:40 UYT**
> 🙏 gracias Cami, queda anclado.
