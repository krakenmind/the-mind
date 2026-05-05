# Notion — Docs para case10

## Página 1: "QBR Q1 2026 — Mercado Norte"

- **Path**: Cloudara HQ / Sales / QBRs / Mercado Norte
- **Owner**: Gabriel Ferré
- **Last edited**: 2026-04-08 18:30 UYT por Gabriel Ferré
- **Tags**: `qbr`, `cliente:mno`, `q1-2026`

### Contenido (copiar tal cual)

> # QBR Q1 2026 — Mercado Norte
>
> **Fecha de la reunión**: 2026-04-07 15:00 UYT (presencial, oficinas MNO)
> **Asistentes Cloudara**: Gabriel Ferré (AE), Lucía Castro (CEO), Mariano Silva (SRE Lead)
> **Asistentes Mercado Norte**: Lautaro Bermúdez (IT Director), Sofía Linares (Head of Engineering), Pedro Reyes (Legal Counsel — solo última media hora)
>
> ## Métricas
>
> | Indicador                     | Q4 2025 | Q1 2026 | Δ      |
> |-------------------------------|---------|---------|--------|
> | NPS                           | **8.0** | **7.1** | **-0.9** |
> | CSAT promedio (encuestas SD)  | 4.2/5   | 3.6/5   | -0.6   |
> | Disponibilidad Checkout-Web   | 99.94%  | 99.42%* | -0.52pp |
> | Tickets SD totales            | 41      | 58      | +17    |
> | Tickets SD con SLA breach     | 4       | **23**  | **+19** |
> | Tiempo promedio de primera respuesta SD | 18min | **47min** | +29min |
>
> _\* Bajo definición contractual estricta es 99.83% — ver case08 / postmortem PMT-2026-03._
>
> ## Voz del cliente (literal — Lautaro Bermúdez)
>
> > "Estamos satisfechos con el delivery del producto y con el equipo de
> > engineering, no tenemos quejas con eso. Lo que nos está costando mucho
> > es la respuesta del Service Desk. Hay tickets que tardan 2 días en ser
> > tomados, y para nosotros que dependemos del checkout en tiempo real,
> > eso es inaceptable. El incidente de marzo lo charlamos aparte, pero
> > el patrón general de service desk lento es algo que tenemos que resolver
> > si vamos a seguir trabajando juntos."
>
> > "También quiero ser transparente: estamos viendo qué nos ofrece el
> > mercado para 2026-2028. No es una decisión tomada, pero queremos
> > comparar."
>
> ## Acciones acordadas en la reunión
>
> 1. Cloudara presenta plan de refuerzo de Service Desk antes del 30-may
>    (Lucía + Lucía Mendoza).
> 2. Postmortem del incidente de marzo enviado a MNO antes del 20-abr (Mariano).
> 3. Propuesta de renovación 2026-2028 antes del 31-may (Gabriel + Esteban).
> 4. Reunión de seguimiento 2026-05-15.
>
> ## Lectura interna (Gabriel)
>
> - **Riesgo de churn: alto** dado el NPS, los tickets SD y la mención
>   explícita de "evaluar alternativas".
> - El producto en sí no es el problema (engineering está OK).
> - La palanca principal de negociación va a ser **Service Desk + SLA premium**,
>   no precio.
> - Pedro Reyes (legal) entró al final de la reunión específicamente para
>   marcar el reclamo del SLA breach. Eso es deliberado: van a usarlo en
>   la negociación.
> - Camila y Rodrigo no estaban presentes pero deberíamos sumarlos a la
>   próxima reunión para cubrir el frente engineering.

---

## Página 2: "Cotización renovación 2026-2028 — Mercado Norte"

- **Path**: Cloudara HQ / Sales / Cotizaciones / Mercado Norte / 2026
- **Owner**: Gabriel Ferré
- **Last edited**: 2026-04-22 10:50 UYT por Gabriel Ferré
- **Tags**: `cotizacion`, `cliente:mno`, `renovacion`, `draft`

### Contenido (copiar tal cual)

> # Cotización renovación 2026-2028 — Mercado Norte
>
> _Draft. Pendiente de validación con Esteban (FIN) y Lucía (CEO). Target
> de envío al cliente: 2026-05-25._
>
> **Período propuesto**: 2026-07-15 → 2028-07-15 (24 meses).
> **Servicio**: Checkout-Web sobre infra UY-1 + replicación BR-1.
>
> ## Tres tiers propuestos
>
> ### Tier A — Flat (precio actual)
>
> | Item                          | Año 1            | Año 2            |
> |-------------------------------|------------------|------------------|
> | Fee mensual Checkout-Web      | USD 18.500       | USD 18.500       |
> | Total anual                   | **USD 222.000**  | **USD 222.000**  |
> | Total 24 meses                | **USD 444.000**  |                  |
> | SLA disponibilidad            | 99.9% (igual al actual) |       |
> | Compromiso adicional          | _(ninguno)_      |                  |
>
> Pros: cero fricción, retención asegurada, renueva automático si no negocian.
> Cons: margen erosiona a ~28% en año 2 (ver análisis márgenes). NO incluye
> compromiso de mejora de SD que pidió Lautaro en QBR Q1.
>
> ### Tier B — Lift +5% con compromiso de Service Desk
>
> | Item                          | Año 1            | Año 2            |
> |-------------------------------|------------------|------------------|
> | Fee mensual Checkout-Web      | USD 19.425       | USD 19.425       |
> | Total anual                   | **USD 233.100**  | **USD 233.100**  |
> | Total 24 meses                | **USD 466.200**  |                  |
> | SLA disponibilidad            | 99.9% (igual)    |                  |
> | **Compromiso adicional**      | **Tiempo de primera respuesta SD ≤ 30min p95, contractualizado en anexo. Penalty 2% sobre fee mensual si no se cumple.** ||
>
> Pros: mejor margen (~33%), responde a la queja del cliente. Justificación
> clara del lift (refuerzo de SD).
> Cons: requiere realmente reforzar SD (Lucía Mendoza + 1 FTE adicional, ver
> análisis márgenes).
>
> ### Tier C — Lift +10% con SLA premium
>
> | Item                          | Año 1            | Año 2            |
> |-------------------------------|------------------|------------------|
> | Fee mensual Checkout-Web      | USD 20.350       | USD 20.350       |
> | Total anual                   | **USD 244.200**  | **USD 244.200**  |
> | Total 24 meses                | **USD 488.400**  |                  |
> | SLA disponibilidad            | **99.95%**       |                  |
> | Compromiso adicional          | Tiempo de primera respuesta SD ≤ 15min p95. RTO 1h, RPO 5min. Account manager dedicado. ||
>
> Pros: mejor margen (~36%). Posiciona como cuenta enterprise.
> Cons: **alto riesgo de churn dado el contexto** (NPS bajo, breach abierto,
> mención de "alternativas"). Difícil de defender un +10% cuando vienen de un
> trimestre malo.
>
> ## Tabla resumen (recomendaciones internas)
>
> | Tier      | Probabilidad de aceptar | Margen | Recomendación |
> |-----------|--------------------------|--------|---------------|
> | A — Flat  | Alta (>80%)              | 28-30% | Defensivo. Plan B si C falla. |
> | B — +5% SD| Media-alta (~65%)        | 33%    | **Recomendado** — pendiente input Esteban. |
> | C — +10% premium | Baja (~25%)       | 36%    | Solo si Lautaro pide upgrade activamente. |

---

## Página 3: "Tickets SD con SLA breach Q1 2026 — análisis"

- **Path**: Cloudara HQ / Service Desk / Análisis / 2026 Q1
- **Owner**: Lucía Mendoza
- **Last edited**: 2026-04-04 11:15 UYT por Lucía Mendoza
- **Tags**: `service-desk`, `sla`, `q1-2026`, `analisis`

### Contenido (copiar tal cual — sólo sección Mercado Norte)

> # Tickets SD con SLA breach — Q1 2026
>
> _Análisis trimestral. SLA contratado para clientes top-tier: primera
> respuesta ≤30min en business hours. Breach = primera respuesta >30min._
>
> ## Mercado Norte (cliente top-tier)
>
> Total tickets SD Q1 2026: **58**
> Total con SLA breach: **23 (39.6%)**
> Tiempo promedio de primera respuesta: 47min (objetivo: 18min, anterior 22min).
>
> ### Causas principales del aumento de breach
>
> 1. Vacaciones de Pablo Lima (toda la primera quincena de febrero) sin
>    backup formal.
> 2. Volumen de tickets +41% YoY sin aumento de FTE en Tier 1.
> 3. Tickets de checkout (alta prioridad) requieren coordinación con DEV
>    backend, lo que extiende el tiempo de primera respuesta sustantiva.
>
> ### Tres tickets ilustrativos para usar en negociación con MNO
>
> - **SD-2098** (8-feb-2026): cliente reporta caché con datos viejos en
>   Carpincho04. Primera respuesta: **3h 12min**. Resuelto al día siguiente.
> - **SD-2134** (3-mar-2026): cliente no puede cargar dashboard de admin.
>   Primera respuesta: **2h 04min**. Resuelto en 6hs.
> - **SD-2156** (19-mar-2026): cliente reporta error 500 intermitente en
>   checkout (ligado al incidente OPS-1432). Primera respuesta: **1h 47min**.
>   Escalado a OPS, parte del incidente mayor.
>
> _Sugerencia para Gabriel: usar estos 3 ejemplos en la propuesta de
> renovación como reconocimiento del problema y justificación del compromiso
> de mejora (Tier B de la cotización)._
