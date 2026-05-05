# Caso 8 — Legal: ¿hubo breach del SLA con Mercado Norte en marzo?

**Persona**: Andrea Pérez (Legal)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Mercado Norte nos amenaza con que rompimos el SLA en marzo. ¿Es cierto y de cuánto sería el penalty?"

## Lo que pasa "detrás"

El 12-abr Pedro Reyes, legal counsel de Mercado Norte, mandó un mail formal reclamando un breach del SLA del servicio Checkout-Web durante marzo y pidiendo el credit correspondiente. La métrica que él cita (99.42%) es la de un dashboard genérico que mezcla degradación parcial con downtime — y bajo esa lectura el penalty caería en el tier "<99.5%" del contrato (15% del fee mensual = USD 2.775).

Pero el contrato (MSA Mercado Norte 2024-2026, sección 4) y la doc interna de Cloudara definen "downtime" de forma estricta: solo cuenta como downtime una ventana donde >50% de las requests devuelven 5xx por más de 1 minuto. El postmortem PMT-2026-03 muestra que en marzo hubo 4h 23m de downtime real bajo esa definición — 99.83%, que cae en el tier "<99.9 ≥99.5" (penalty 5% = USD 925).

Andrea necesita en 5 minutos: el cálculo, la evidencia, y una recomendación negociable. La respuesta tiene que cruzar el contrato (Drive), el postmortem (Notion), el ticket de incidente (Linear), el reporte mensual (Notion), la definición interna de downtime (Notion) y el reclamo del cliente (Gmail).

## Fuentes y evidencia

- **Linear** — `OPS-1432` (incidente Mercado Norte checkout, marzo) con la métrica real medida por SRE.
- **Notion** — postmortem `PMT-2026-03 Mercado Norte checkout`, reporte mensual de uptime de marzo, y "Definiciones contractuales — qué cuenta como downtime".
- **Gmail** — thread del 12-abr de Pedro Reyes (legal counsel de Mercado Norte) reclamando breach.
- **Google Drive** — MSA Mercado Norte 2024-2026 (secciones 4 y 7) y el fee mensual de abril 2026.

## Respuesta esperada

> Sí, hubo breach en marzo, pero hay dos lecturas y la diferencia es 3x en el penalty.
>
> **Lectura del cliente (laxa)**: el reporte mensual interno (Notion, "Reportes mensuales de uptime — clientes", marzo Mercado Norte) marca 99.42% para Checkout-Web. Bajo el contrato (MSA sección 7) eso cae en el tier `<99.5%` → penalty **15% del fee** = USD 2.775 sobre el fee de marzo (USD 18.500, ver "Mercado Norte — fee mensual abril 2026.pdf" que confirma el fee corriente).
>
> **Lectura contractual estricta**: la sección 4 del MSA define "downtime" como ventanas en las que el servicio responde con error sostenido. La doc interna "Definiciones contractuales — qué cuenta como downtime" (alineada con esa sección) lo precisa: **solo cuenta como downtime una ventana con >50% de requests 5xx por >1 minuto**. El postmortem PMT-2026-03 y el ticket OPS-1432 muestran que de los 8 días de impacto, hubo **4h 23m de downtime real** (el resto fue degradación parcial: latencia alta, errores intermitentes <50%). Eso es 99.83%, que cae en el tier `<99.9 ≥99.5` → penalty **5%** = USD 925.
>
> **Recomendación**: ofrecer USD 925 como credit de buena fe, sustentado en la definición contractual estricta. Argumento para Pedro: la métrica 99.42% del dashboard mezcla degradación con downtime; el contrato define downtime de forma específica y bajo esa definición fue 99.83%. Si fuerzan la lectura laxa, la posición de respaldo es el postmortem y el OPS-1432. Antes de responder, alinear con Lucía y Esteban — esto pega también en la renovación que vence en julio.

## Por qué es valioso

Krakenmind cierra en minutos lo que Andrea suele resolver en una tarde de buscar el contrato firmado en Drive, pedirle el postmortem a Mariano, abrir Linear, leer la definición interna de downtime y juntar todo en un mail. Más importante: detecta la ambigüedad contractual y la convierte en una posición negociable con evidencia citada.
