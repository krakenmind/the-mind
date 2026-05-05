# Gmail — Threads para case08

## Email 1: reclamo formal de Mercado Norte

- **From**: Pedro Reyes <pedro.reyes@mercadonorte.uy>
- **To**: Andrea Pérez <andrea@cloudara.uy>
- **CC**: Lautaro Bermúdez <lautaro.bermudez@mercadonorte.uy>, legal@mercadonorte.uy
- **Subject**: Reclamo formal — Incumplimiento SLA Checkout-Web marzo 2026
- **Date**: 2026-04-12 10:14 UYT

### Contenido (copiar tal cual)

> Estimada Andrea,
>
> Por medio de la presente, en mi carácter de Legal Counsel de Mercado Norte
> S.A., notifico formalmente a Cloudara S.A. el incumplimiento del nivel de
> servicio comprometido para el servicio "Checkout-Web" durante el mes de
> marzo de 2026, conforme a la Sección 4 del Master Service Agreement
> celebrado entre las partes con fecha 15 de julio de 2024.
>
> De acuerdo con el reporte mensual de uptime que ustedes mismos nos enviaron
> el día 2 de abril (firmado por Mariano Silva), la disponibilidad efectiva
> del servicio durante marzo fue de **99.42%**, encontrándose por debajo del
> compromiso contractual del 99.9%.
>
> En consecuencia, y en virtud del esquema escalonado previsto en la Sección 7
> del MSA, corresponde aplicar una penalidad equivalente al **15% del fee
> mensual** del servicio afectado (tier "<99.5%"), que estimamos en USD 2.775
> sobre el fee de marzo. Solicitamos que dicho crédito sea acreditado en la
> próxima factura emitida.
>
> Asimismo, dejamos constancia de nuestra preocupación: el incidente impactó
> ocho días de operación de nuestro checkout, lo que tuvo consecuencias
> directas sobre conversión y experiencia del usuario final. Esto será
> considerado en la negociación de renovación que tenemos pautada para julio.
>
> Quedamos a la espera de su respuesta dentro de los plazos contractuales
> previstos (Sección 7.3, treinta días corridos).
>
> Saludos cordiales,
>
> **Pedro Reyes**
> Legal Counsel — Mercado Norte S.A.
> pedro.reyes@mercadonorte.uy
> +598 99 887 332

---

## Email 2: forward interno de Andrea al equipo

- **From**: Andrea Pérez <andrea@cloudara.uy>
- **To**: Lucía Castro <lucia@cloudara.uy>, Esteban Romero <esteban@cloudara.uy>, Mariano Silva <mariano@cloudara.uy>
- **CC**: Gabriel Ferré <gabriel@cloudara.uy>
- **Subject**: Fwd: Reclamo formal — Incumplimiento SLA Checkout-Web marzo 2026
- **Date**: 2026-04-12 11:30 UYT

### Contenido (copiar tal cual)

> Hola equipo,
>
> Reenvío el reclamo de Pedro Reyes (Legal MNO) que llegó esta mañana. Cuelga
> del incidente de marzo (OPS-1432, postmortem PMT-2026-03).
>
> Resumen rápido:
>
> - Pedro reclama 15% del fee = USD 2.775 con la métrica del 99.42% del
>   reporte que les enviamos el 2-abr.
> - Esa métrica es la del dashboard genérico, no la contractual. Bajo la
>   Sección 4.2 del MSA (downtime = >50% 5xx >1min) el cálculo real es 99.83%
>   y cae en tier 5% = USD 925.
> - Mariano me confirmó los números crudos en OPS-1432 ayer.
>
> Mi propuesta: ofrecer USD 925 como credit, sustentado en la definición
> contractual estricta. Si pelean, mostrar postmortem y CSVs de Prometheus.
>
> Antes de responderle a Pedro me gustaría coordinar con Gabriel porque
> esto entra en la negociación de renovación de julio. ¿Llamada hoy 15hs?
>
> Saludos,
> Andrea

---

## Email 3: respuesta de Mariano confirmando números

- **From**: Mariano Silva <mariano@cloudara.uy>
- **To**: Andrea Pérez <andrea@cloudara.uy>
- **CC**: Lucía Castro <lucia@cloudara.uy>, Esteban Romero <esteban@cloudara.uy>
- **Subject**: Re: Fwd: Reclamo formal — Incumplimiento SLA Checkout-Web marzo 2026
- **Date**: 2026-04-12 12:05 UYT

### Contenido (copiar tal cual)

> Andrea,
>
> Confirmado, los números son:
>
> - Disponibilidad bajo definición contractual estricta (Sección 4.2 MSA,
>   ventanas >50% 5xx por >1min): **99.83%** → tier 5% → USD 925.
> - Disponibilidad bajo el dashboard genérico que les mandamos el 2-abr
>   (incluye degradación parcial): **99.42%** → tier 15% → USD 2.775.
>
> El gap viene de que el dashboard mete en el saco "downtime" toda ventana
> con 5xx >5%, que NO es lo que dice el contrato. El contrato es bien claro
> en la Sección 4.2: >50% 5xx por >1min continuo.
>
> Tengo los CSVs minuto a minuto adjuntos en OPS-1432 si los necesitás para
> respaldar. La cronología tiene 11 ventanas de "downtime contractual" en
> el mes, sumando 263 minutos = 4h 23m.
>
> Mi recomendación táctica: **antes** de responderle a Pedro, actualicemos
> el reporte mensual que le mandamos al cliente para que use la métrica
> contractual. Sino seguimos pisando la misma piedra mes a mes.
>
> Confirmado para 15hs.
>
> Mariano
