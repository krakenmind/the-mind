# Linear — Tickets para case05

## OPS-1432 — Incident producción Mercado Norte: caída de checkout

- **Team**: Cloud Ops (OPS)
- **Type**: Incident · **Priority**: Critical
- **Status**: Done
- **Assignee**: Mariano Silva · **Reporter**: alerting@cloudara.uy
- **Cliente**: Mercado Norte
- **Labels**: `cliente:mno`, `incident`, `prod`, `severity:1`
- **Created**: 2026-03-12 03:14 UYT
- **Resolved**: 2026-03-19 18:00 UYT (8 días)
- **Devs DEV asignados**: Camila Núñez (full-time), Tomás Vidal (full-time)

### Description (copiar tal cual)

> Caída del flujo de checkout en producción de Mercado Norte. Alertas en Hornero-API
> a las 03:12 UYT (timeouts en endpoint `/checkout/confirm`). Replicación
> Mulita-DB-01 → BR-1 con lag creciente desde 02:50.
>
> Impact: ~70% de transacciones fallando en pico nocturno. Cliente notificado.
>
> Equipo on-call: Mariano (SRE), Camila (backend) y Tomás (frontend) entran a
> war-room. Esto va a consumir el resto del sprint actual (Sprint 24).

### Comments

- **Mariano Silva · 2026-03-12 04:02**
  > War-room arriba en `#cliente-mno`. Encontramos el cuello: connection pool
  > de la API saturado por un retry-storm desde la app móvil. Camila está
  > parcheando en caliente.

- **Camila Núñez · 2026-03-13 11:20**
  > Parche de retry caps deployado. La causa raíz es más profunda — hay un
  > issue de inconsistencia en la cola de eventos que arrastramos hace meses.
  > Vamos a tener que rehacer el consumer. Esto no entra en el sprint, lo
  > escalo a Rodrigo.

- **Mariano Silva · 2026-03-19 18:00**
  > Cerrado. Resumen: 8 días entre fix-en-caliente y refactor del consumer.
  > Camila y Tomás full-time. Postmortem programado para el 21-mar.

---

## SEC-204 — Vuln crítica reportada por Banco Austral (CVE-2026-0419 chain)

- **Team**: Security (SEC)
- **Type**: Vulnerability · **Priority**: Urgent
- **Status**: Done
- **Assignee**: Mariano Silva · **Reporter**: Andrea Pérez
- **Cliente**: Banco Austral
- **Labels**: `cliente:bau`, `security`, `cve`, `severity:1`
- **Created**: 2026-03-24 09:48 UYT
- **Resolved**: 2026-03-28 20:15 UYT (5 días)
- **Devs DEV asignados**: Camila Núñez (full-time)

### Description (copiar tal cual)

> Banco Austral nos reporta vía su SOC una vuln crítica encadenada
> (CVE-2026-0419 + auth bypass interno) en el módulo de autenticación
> que les expusimos en la integración. Vector: token-refresh con
> validación de audience faltante.
>
> Decisión inmediata: rotar todos los tokens emitidos en últimos 90 días,
> patchear el validador, deploy hotfix antes del cierre de la semana.
> Camila lidera el patch en backend. Mariano y Andrea coordinan
> notificación al cliente y disclosure.

### Comments

- **Camila Núñez · 2026-03-25 14:30**
  > Patch listo en staging. Cubre el bypass y agrega validación de audience.
  > Tests de regresión corriendo. Vamos a deploy mañana en ventana off-hours.

- **Andrea Pérez · 2026-03-26 10:05**
  > Notificación formal a Banco Austral enviada con ETA de fix. Felipe
  > Aguirre (CIO) acusó recibo.

- **Mariano Silva · 2026-03-28 20:15**
  > Hotfix en prod. Rotación de tokens completada. Cerrado.
  > Camila estuvo full-time 5 días en esto, después de 8 días en OPS-1432.

---

## DEV-EPIC-188 — Self-service onboarding v2

- **Team**: DEV (epic)
- **Type**: Epic · **Priority**: High
- **Status**: In Progress (planned: completar Sprint 26 — actual: 32% de tickets cerrados)
- **Assignee**: Camila Núñez
- **Labels**: `roadmap:q2-2026`, `feature`, `customer-impact`
- **Sprint comprometido**: Sprint 25–26 (planned), arrastrando hacia Sprint 28
- **Created**: 2026-02-10
- **Sub-tickets DEV**: 14 totales · 5 Done · 2 In Progress · 7 Backlog

### Description (copiar tal cual)

> Rehacer el flujo de onboarding self-service para clientes nuevos.
> Comprometido en el roadmap Q2 2026 con cierre objetivo 30-may.
> Estado actual (16-abr): 32% completado, ETA real: 15-jun.
> Causa principal del slip: equipo absorbido por OPS-1432 y SEC-204.

### Comments

- **Camila Núñez · 2026-04-02 16:45**
  > Volviendo a este epic después de 13 días afuera. Replanificando los
  > sub-tickets pendientes. Tirando alerta a Rodrigo: cierre 30-may
  > es inviable.

---

## DEV-EPIC-194 — Webhooks 2.0 (rate-limit + replay)

- **Team**: DEV (epic)
- **Type**: Epic · **Priority**: Medium
- **Status**: Backlog (planned: Sprint 27, no iniciado)
- **Assignee**: Tomás Vidal
- **Labels**: `roadmap:q2-2026`, `platform`
- **Created**: 2026-02-22
- **Sub-tickets DEV**: 9 totales · 0 Done · 0 In Progress · 9 Backlog

### Description (copiar tal cual)

> Refactor del sistema de webhooks para soportar rate-limit por consumer
> y replay de últimos 7 días. Comprometido Q2 2026.
> Estado: no iniciado. Bloqueado por capacity — Tomás estuvo asignado a
> OPS-1432 los primeros 8 días del trimestre.

---

## Throughput team DEV — referencia visual (resumen)

> Datos exportables del Linear de team DEV (filter: `team:DEV state:Done` por
> sprint).

| Sprint | Fechas | Tickets cerrados | Notas |
|--------|--------|------------------|-------|
| Sprint 22 | 2026-01-13 → 01-26 | 54 | baseline Q1 |
| Sprint 23 | 2026-01-27 → 02-09 | 51 | baseline Q1 |
| Sprint 24 | 2026-02-10 → 02-23 | 49 | tail-end OPS-1432 entró el 12-mar (sprint siguiente) |
| Sprint 25 | 2026-02-24 → 03-09 | 53 | normal |
| **Sprint 26** | **2026-03-10 → 03-23** | **31** | **OPS-1432 consumió 8d-equipo** |
| **Sprint 27** | **2026-03-24 → 04-06** | **29** | **SEC-204 + cola OPS-1432** |
| Sprint 28 | 2026-04-07 → 04-20 | 38 | recuperación parcial |

Promedio Q1 (S22–S25): **51.75** tickets/sprint.
Promedio Q2 a la fecha (S26–S28): **32.67** tickets/sprint.
**Delta: -36.9% (~ -35%).**
