# Linear — Tickets para case10

## FIN-512 — Análisis renovación MNO 2026-2028

- **Team**: Finance (FIN)
- **Type**: Task · **Priority**: High
- **Status**: In Progress
- **Assignee**: Esteban Romero · **Reporter**: Lucía Castro
- **Labels**: `renovacion`, `cliente:mno`, `q2-2026`
- **Created**: 2026-04-22 09:45 UYT
- **Due date**: 2026-05-15

### Description (copiar tal cual)

> Análisis financiero para renovación del MSA con Mercado Norte (vence
> 2026-07-15). Insumos:
>
> - "Análisis márgenes Mercado Norte 2024-2025.pdf" (Drive — preparado por mí en enero).
> - QBR Q1 2026 (Notion) — NPS, métricas SD, voz del cliente.
> - Cotización con tres tiers (Notion — Gabriel).
> - Postmortem del incidente de marzo (OPS-1432, PMT-2026-03).
>
> Output esperado: recomendación de tier para llevar a la mesa, con
> justificación financiera y de riesgo de churn.

### Comments

- **Esteban Romero · 2026-04-25 17:10**
  > Primera lectura: con NPS 7.1, SLA breach abierto y mención de
  > "alternativas", el upside de Tier C (+10%) es muy bajo. La probabilidad
  > de churn que estimo en ese escenario es 25-35%. Si pierdo MNO son
  > USD 222k anuales: el valor esperado de ofrecer +10% es **menor** que
  > el de ofrecer Flat. Tier B (+5%) es el equilibrio.
  >
  > **Recomendación preliminar: Tier B (+5%) si logramos comprometer el
  > refuerzo de SD. Si no, Flat para retener.** Lift +10% lo descarto.

- **Esteban Romero · 2026-04-28 14:22**
  > Ajuste: hablé con Lucía Mendoza y el refuerzo de SD requiere 1 FTE
  > adicional (~USD 28k anuales) o redistribución de carga (más viable).
  > Si vamos con redistribución, Tier B sigue siendo viable con margen ~32%.
  >
  > Recomendación final pendiente: Tier B con redistribución de SD,
  > o Tier A (Flat) como fallback. **NO ir a Tier C bajo este contexto.**
  > Termino el análisis para el 2026-05-15 antes de la próxima reunión MNO.

- **Lucía Castro · 2026-04-29 09:00**
  > 👍 alineada con tu lectura. Antes de presentar pricing tenemos que
  > cerrar el reclamo del SLA breach con buena fe — Andrea está en eso
  > (case08). Si llegamos a la mesa con eso abierto el techo se vuelve piso.

---

## SD-2098 — Mercado Norte: caché con datos viejos en Carpincho04

- **Team**: Service Desk (SD)
- **Type**: Bug · **Priority**: Medium
- **Status**: Done
- **Assignee**: Pablo Lima · **Reporter**: Pablo Lima (forwarded del cliente)
- **Cliente**: Mercado Norte
- **Labels**: `cliente:mno`, `cache`, `sla-breach`
- **Created**: 2026-02-08 14:22 UYT
- **First response**: 2026-02-08 17:34 UYT (**3h 12min — BREACH**, target 30min)
- **Resolved**: 2026-02-09 11:50 UYT

### Description (copiar tal cual)

> Cliente reporta que el caché Redis en Carpincho04 está devolviendo precios
> de productos con valores de hace 2 días. Impacto: usuarios finales ven
> precios desactualizados durante checkout.

### Comments

- **Pablo Lima · 2026-02-08 17:34**
  > Tomado. Reviso TTL de las keys.
- **Pablo Lima · 2026-02-09 11:50**
  > TTL configurado a 30s en lugar de 30min. Patch aplicado, validado con
  > el cliente. Cierro.
- _Nota interna_: breach se debió a que Pablo estaba de licencia (vacaciones
  primera quincena de febrero) y no había backup formal asignado.

---

## SD-2134 — Mercado Norte: dashboard admin no carga

- **Team**: Service Desk (SD)
- **Type**: Bug · **Priority**: High
- **Status**: Done
- **Assignee**: Lucía Mendoza · **Reporter**: Lucía Mendoza
- **Cliente**: Mercado Norte
- **Labels**: `cliente:mno`, `frontend`, `sla-breach`
- **Created**: 2026-03-03 10:18 UYT
- **First response**: 2026-03-03 12:22 UYT (**2h 04min — BREACH**)
- **Resolved**: 2026-03-03 16:10 UYT

### Description (copiar tal cual)

> El usuario admin de MNO (admin@mercadonorte.uy) no puede cargar el panel
> de administración del checkout. Pantalla blanca, error 500 en la consola.

### Comments

- **Lucía Mendoza · 2026-03-03 12:22**
  > Tomado. Veo que es un bug del componente `<MetricsPanel>` con datos
  > vacíos. Lo paso a Tomás.
- **Tomás Vidal · 2026-03-03 16:10**
  > Patch deployed. Cierro.

---

## SD-2156 — Mercado Norte: error 500 intermitente en checkout

- **Team**: Service Desk (SD)
- **Type**: Bug · **Priority**: Urgent
- **Status**: Done (escalado a OPS-1432)
- **Assignee**: Pablo Lima → escalado a Mariano Silva
- **Cliente**: Mercado Norte
- **Labels**: `cliente:mno`, `checkout-web`, `sla-breach`, `escalado-ops`
- **Created**: 2026-03-19 09:14 UYT
- **First response**: 2026-03-19 11:01 UYT (**1h 47min — BREACH**)
- **Resolved**: 2026-03-19 16:00 UYT (workaround) / 2026-03-16 18:00 UYT (fix definitivo en OPS-1432)

### Description (copiar tal cual)

> Cliente reporta error 500 intermitente en POST /checkout/confirm.
> Patrón: oleadas, NO caída total. Ya tenemos el incidente abierto en OPS-1432.

### Comments

- **Pablo Lima · 2026-03-19 11:01**
  > Tomado. Es la misma oleada que estamos viendo en OPS-1432, escalo a Mariano.
- **Mariano Silva · 2026-03-19 16:00**
  > Workaround aplicado (failover a BR-1). Fix definitivo trackeado en
  > OPS-1432. Cierro este SD con root cause apuntando al postmortem.
