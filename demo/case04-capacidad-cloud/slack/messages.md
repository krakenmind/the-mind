# Slack — Mensajes para case04

## #leadership

**Anchor**: `ACC-SLACK-01`

**Gabriel Ferré · 2026-04-13 16:42 UYT**

> 👋 update de pipeline para los que vengan al review del lunes:
>
> - **Retail mediano** (oportunidad UY) — pasamos de descubrimiento a propuesta.
>   Lo mando esta semana. La idea es que arranque sobre UY-1 (les importa
>   latencia local, son nativos UY).
> - **Fintech regional** — hicieron techfit la semana pasada, entusiasmados.
>   También pidieron UY-1 por compliance de un partner. Estoy armando la
>   propuesta para que la veamos en el comité comercial del 22.
>
> Confirmé en el dashboard de capacidad que UY-1 tiene ~32% libre, así que
> ambos entran sin problema. ✌️
>
> Cualquier cosa, gritan.

**Rodrigo Acosta · 2026-04-13 17:01 UYT**
> Gabriel, ojo con UY-1. En el comité del 8 hablamos de reservar capacidad
> para crecimiento de los clientes actuales. ¿Esteban ya bajó eso al
> dashboard?

**Gabriel Ferré · 2026-04-13 17:04 UYT**
> 🤔 no sé, recién entré al dashboard hace 2 horas y mostraba 32% libre.
> Esteban, ¿está actualizado o tengo que mirarlo distinto?

_(Esteban no respondió en este thread — leyó el ping pero estaba
en otra reunión. Termina respondiendo el lunes 14, ver mail de Mariano.)_

---

## #cliente-bau

**Gabriel Ferré · 2026-04-13 11:18 UYT**

> Equipo BAU, heads up: estamos trabajando dos oportunidades nuevas que
> probablemente van a apoyarse en UY-1, lo mismo que ustedes. No debería
> haber colisión (el dashboard muestra margen) pero quería avisar por las
> dudas. Si en algún momento ven contención de recursos en su instancia
> BAU, escríbanme inmediato.

**Mariano Silva · 2026-04-13 11:30 UYT**
> Gabriel, eso lo discutimos en el comité del 8. UY-1 está más comprometido
> de lo que parece en el dashboard. Vamos a charlar offline antes de que
> avances con cliente.

**Gabriel Ferré · 2026-04-13 11:32 UYT**
> dale, te llamo a la tarde 👍

_(la llamada nunca se concreta — Gabriel viaja a una visita comercial
y queda pendiente. Mariano levanta el flag por mail al día siguiente.)_

---

## #ops-alerts

**(contexto adicional — alerta automática que disparó OPS-1567)**

**Cloudara Capacity Bot · 2026-04-12 03:14 UYT**

> 🚨 **Alerta consumo UY-1 — fuera de baseline**
>
> Tres tenants con consumo por encima del baseline de 30 días:
>
> - `tenant:bau` — CPU: +18% sobre baseline · RAM: +12% · Storage: +9%
> - `tenant:mno` — CPU: +24% sobre baseline · RAM: +21% · Storage: +14%
> - `tenant:slp` — CPU: +11% sobre baseline · RAM: +8%  · Storage: +6%
>
> Capacidad UY-1 total: 68% (vs 61% hace 30 días).
> Trend: +0.23 pts/día. Si se sostiene → 90% en 95 días.
>
> Linear ticket creado: **OPS-1567**.

**Mariano Silva · 2026-04-12 09:02 UYT**
> 👀 esto va a colisionar con la decisión del comité del 8.
> Tomo OPS-1567 yo, lo escalo.
