# Caso 10 — Sales / CEO: ¿qué tenemos para negociar la renovación de Mercado Norte?

**Persona**: Gabriel Ferré (Account Executive) — con Lucía Castro (CEO) en copia
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "El contrato de Mercado Norte vence en julio. ¿Qué tenemos para negociar la renovación?"

## Lo que pasa "detrás"

El MSA de Mercado Norte vence el 15-jul-2026. Valor anual actual: USD 222k. Gabriel tiene una cotización lista en Notion con tres tiers (Lift+5%, Flat, Lift+10% con SLA premium) y necesita decidir qué ofrecer en la próxima reunión con Lautaro Bermúdez (IT Director del cliente).

El contexto es delicado: NPS Q1 cayó de 8.0 a 7.1, hubo un SLA breach en marzo (case08 — Pedro Reyes lo está usando como leverage), Service Desk acumuló 23 tickets con SLA breach el último trimestre, y el 18-mar Lautaro ya mencionó que están "evaluando alternativas". Esteban (CFO) ya tiene un análisis interno (FIN-512) recomendando tier Flat para retener.

La respuesta tiene que cruzar el contrato vigente y márgenes (Drive), QBR + cotización + análisis CFO (Notion), historial de tickets y el ticket FIN-512 (Linear), y los mails con Lautaro y el postmortem (Gmail). Y conectar con case08: hay que cerrar el credit del SLA breach con buena fe **antes** de presentar pricing — sino la negociación arranca con el cliente sintiéndose maltratado.

## Fuentes y evidencia

- **Linear** — `FIN-512` (análisis renovación de Esteban) y los 3 tickets de SD breach mencionables (`SD-2098`, `SD-2134`, `SD-2156`).
- **Notion** — QBR Q1 2026 Mercado Norte, "Cotización renovación 2026-2028 — Mercado Norte" (los 3 tiers).
- **Gmail** — thread del 18-mar de Gabriel con Lautaro ("evaluando alternativas") y thread del 20-abr con el postmortem de marzo.
- **Google Drive** — MSA vigente Mercado Norte 2024-2026 + "Análisis márgenes Mercado Norte 2024-2025.pdf".

## Respuesta esperada

> El contrato vence el 15-jul-2026. Valor anual actual USD 222k (USD 18.500/mes). Margen actual 38% (mínimo aceptable 28%, ver "Análisis márgenes Mercado Norte 2024-2025.pdf"). Contexto **desfavorable** para subir precio:
>
> - **NPS Q1 2026 = 7.1**, cayó 0.9 desde Q4 2025 (8.0). Ver QBR Q1.
> - **SLA breach marzo 2026** (case08, OPS-1432). Pedro Reyes lo usa de leverage (mail 12-abr) y Lautaro lo mencionó en la negociación (thread 20-abr).
> - **23 tickets con SLA breach en Service Desk el último trimestre** (ejemplos: SD-2098, SD-2134, SD-2156). Es la queja explícita de Lautaro en el QBR Q1: "satisfecho con el delivery, frustrado con respuestas lentas en service desk".
> - **18-mar Lautaro escribió que están "evaluando alternativas"** — señal de churn risk.
>
> La cotización en Notion tiene tres tiers:
>
> | Tier              | Precio anual | Margen estimado | Riesgo de churn |
> |-------------------|--------------|------------------|-----------------|
> | Flat              | USD 222k     | ~28-30%          | **Bajo**        |
> | Lift +5%          | USD 233k     | ~33%             | Medio           |
> | Lift +10% + SLA premium | USD 244k | ~36%         | **Alto**        |
>
> Esteban (CFO) ya analizó el caso en **FIN-512** y recomienda **tier Flat** para retener. Margen baja a ~28-30% (en el piso aceptable) pero protege la cuenta.
>
> **Recomendación**: ir con **Flat o Lift +5%** acompañado de un compromiso explícito de mejorar Service Desk antes de junio (refuerzo de Tier 1, métrica de tiempo de respuesta en el contrato como anexo). NO ir con Lift +10%: el riesgo de churn dado el contexto es alto y perder Mercado Norte son USD 222k anuales.
>
> **Acción previa crítica (cruza con case08)**: cerrar el reclamo del SLA breach con buena fe ANTES de presentar pricing. Ofrecer USD 925 como credit (5% bajo definición contractual estricta) con explicación clara y postmortem adjunto. Si llegamos a la mesa de renovación con el reclamo abierto, el cliente arranca enojado y el techo de tier Flat se vuelve piso.

## Por qué es valioso

Krakenmind cruza señales que normalmente viven en cuatro herramientas distintas (CRM/Notion para QBR y pricing, Linear para tickets de soporte, Gmail para conversaciones con el cliente, Drive para el contrato y márgenes) y arma una posición de negociación con datos concretos. Lo que normalmente le toma a Gabriel medio día de armar manualmente — y un bias casi inevitable hacia el tier que más le conviene a su comisión — queda en una respuesta de 1 minuto con una recomendación defendible.
