# Linear — Tickets para case08

## OPS-1432 — Incident Mercado Norte checkout — degradación marzo 2026

- **Team**: Operations (OPS)
- **Type**: Incident · **Priority**: High
- **Status**: Done (cerrado tras postmortem)
- **Assignee**: Mariano Silva · **Reporter**: Mariano Silva
- **Cliente**: Mercado Norte
- **Labels**: `incident`, `cliente:mno`, `checkout-web`, `sla-impact`
- **Created**: 2026-03-08 09:42 UYT
- **Resolved**: 2026-03-16 18:10 UYT
- **Duración impacto total**: 8 días (08-mar a 16-mar)
- **Downtime contractual medido (5xx >50% por >1min)**: 4h 23m

### Description (copiar tal cual)

> Degradación intermitente del servicio Checkout-Web (Mercado Norte, UY-1)
> entre el 2026-03-08 y el 2026-03-16. Síntomas:
>
> - Latencia p95 elevada (4-9s vs baseline 800ms)
> - Errores 5xx esporádicos en oleadas (5-30% del tráfico, picos hasta 78%)
> - Caídas duras (>50% 5xx por >1 min) acumuladas: **4h 23m**
> - El cliente percibe "8 días de problemas" porque la experiencia degradada
>   le impactó conversión, pero el downtime per definición contractual es
>   sólo el tiempo en que >50% de requests devolvieron 5xx por >1min.
>
> Causa raíz: pool de conexiones del servicio de pagos saturado tras un
> cambio de versión del SDK del PSP (ver postmortem PMT-2026-03 en Notion).
>
> Métricas crudas (Prometheus, exportadas a CSV en el ticket):
> - Total de minutos del mes: 44.640 (marzo tiene 31 días)
> - Minutos en estado "downtime contractual" (>50% 5xx >1min): 263 min (4h 23m)
> - Minutos en estado "degradación parcial" (5xx 5-50%, latencia alta): ~7.200 min
> - **Disponibilidad bajo definición contractual (Sección 4.2 MSA)**:
>   (44640 - 263) / 44640 = **99.41% → recalculado tras revisión: 99.83%**
>   _(Nota Mariano: el 99.41% inicial era erróneo, mezclaba degradación
>   parcial con downtime. El número correcto bajo Sección 4.2 es 99.83%.
>   Ver corrección en comments.)_

### Comments

- **Mariano Silva · 2026-03-16 19:40**
  > Cerramos el incidente. Saco el postmortem PMT-2026-03 mañana.
  > El número crudo del dashboard genérico marca 99.42% (cuenta degradación
  > parcial como downtime). Bajo la definición contractual del MSA
  > (Sección 4.2: >50% 5xx por >1min) el cálculo es **99.83%**. Hay que
  > tener cuidado con cuál métrica reportamos y a quién.

- **Camila Núñez · 2026-03-17 10:12**
  > Confirmo el patch del SDK del PSP en producción desde anoche. No vimos
  > más oleadas de 5xx desde el 16-mar 18:00. Pool ampliado de 50 a 200
  > conexiones, además.

- **Mariano Silva · 2026-03-17 10:30**
  > Postmortem subido a Notion: PMT-2026-03. Cierro el ticket. Si Legal
  > o Sales necesitan los CSVs los tienen adjuntos acá.

- **Andrea Pérez · 2026-04-12 16:05**
  > Reabro brevemente para sumar contexto: Pedro Reyes (legal MNO) reclama
  > breach con la métrica del 99.42% y pide credit del 15%. Los números
  > crudos están acá. Estoy armando respuesta con el postmortem y la
  > definición contractual. CC a Lucía y Esteban por el impacto en la
  > renovación.

- **Mariano Silva · 2026-04-12 17:20**
  > Andrea, te pasé también por DM el archivo CSV con la cronología
  > minuto a minuto. Cualquier número que necesites validado, avisame.
