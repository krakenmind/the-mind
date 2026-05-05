# Linear — Tickets para case06

## DEV-PROJ-BAU-WEB — Rediseño portal web Banco Austral

- **Team**: DEV (project)
- **Type**: Project · **Priority**: High
- **Status**: In Progress (78% — en tiempo)
- **Lead**: Tomás Vidal · **Sponsor**: Rodrigo Acosta
- **Cliente**: Banco Austral
- **Labels**: `cliente:bau`, `customer-project`, `web`
- **Started**: 2026-01-20
- **ETA**: 2026-05-30

### Description (copiar tal cual)

> Rediseño completo del portal web de Banco Austral incluyendo onboarding,
> dashboard, y módulos de productos. Acordado en kickoff con Felipe
> Aguirre (CIO) en enero. Roadmap del cliente lo tiene como hito 30-may.
>
> Sub-tickets: 24 · Done: 19 · In Progress: 3 · Backlog: 2

### Comments

- **Tomás Vidal · 2026-04-12 14:20**
  > Avance saludable. Vamos a llegar al 30-may sin sobresaltos.
  > Falta UAT del cliente — ya programado para el 15-may.

---

## DEV-PROJ-BAU-MOB — App mobile v3 Banco Austral

- **Team**: DEV (project)
- **Type**: Project · **Priority**: High
- **Status**: In Progress (42% — 2 semanas de delay)
- **Lead**: Camila Núñez · **Sponsor**: Rodrigo Acosta
- **Cliente**: Banco Austral
- **Labels**: `cliente:bau`, `customer-project`, `mobile`, `at-risk`
- **Started**: 2026-02-03
- **ETA original**: 2026-06-15 · **ETA actual**: 2026-06-30

### Description (copiar tal cual)

> Nueva versión de la app mobile (Android + iOS) integrando el módulo
> de autenticación renovado. Comprometido a Banco Austral con cierre
> 15-jun en QBR Q1.
>
> Sub-tickets: 18 · Done: 8 · In Progress: 2 · Backlog: 8

### Comments

- **Camila Núñez · 2026-04-08 16:55**
  > El proyecto está atrasado 2 semanas. Causa: durante SEC-204 (24-28 mar)
  > tuvimos que rehacer el módulo de auth, y este proyecto depende de eso.
  > Estoy reconfigurando ETA a 30-jun. Hay que comunicar al cliente.

- **Rodrigo Acosta · 2026-04-09 10:40**
  > Anotado. Lo charlo con Lucía antes de su próximo 1:1 con Felipe.

---

## DEV-PROJ-BAU-INT — Integración core bancario Banco Austral

- **Team**: DEV (project)
- **Type**: Project · **Priority**: High
- **Status**: In Progress (55% — en tiempo)
- **Lead**: Camila Núñez · **Sponsor**: Rodrigo Acosta
- **Cliente**: Banco Austral
- **Labels**: `cliente:bau`, `customer-project`, `integration`, `fraud-module`
- **Started**: 2026-02-17
- **ETA**: 2026-06-30

### Description (copiar tal cual)

> Integración con el core bancario del cliente para alimentar el módulo
> de fraud detection v1. Hito intermedio del cliente: 15-jun (release fraud
> v1). Esta integración es prerequisito.
>
> Sub-tickets: 22 · Done: 12 · In Progress: 4 · Backlog: 6

### Comments

- **Camila Núñez · 2026-04-14 11:08**
  > Vamos en tiempo. El bloque más complejo (matching de transacciones
  > en streaming) ya está prototipado. Si no aparece otra sorpresa, llegamos
  > al 15-jun para el cliente.

---

## OPS-1432 — Incident producción Mercado Norte: caída de checkout

- **Team**: Cloud Ops (OPS)
- **Type**: Incident · **Priority**: Critical
- **Status**: Done
- **Assignee**: Mariano Silva · **Reporter**: alerting@cloudara.uy
- **Cliente impactado primario**: Mercado Norte
- **Cliente impactado colateral**: Banco Austral (pipelines BR-1)
- **Labels**: `cliente:mno`, `cliente:bau:colateral`, `incident`, `prod`, `severity:1`, `region:br-1`
- **Created**: 2026-03-12 03:14 UYT
- **Resolved**: 2026-03-19 18:00 UYT (8 días)

### Description (copiar tal cual)

> Caída del flujo de checkout en producción de Mercado Norte. El war-room
> consumió capacity de pipelines compartidos en BR-1 (los pipelines de
> Banco Austral corren en la misma región).
>
> Impacto colateral en Banco Austral: deploys más lentos durante la ventana
> del incidente (no customer-facing del lado del banco; sí notado por
> el equipo del CIO).

### Comments (relevantes para case06)

- **Mariano Silva · 2026-03-15 09:30**
  > Heads-up para AE: durante el war-room los deploys de Banco Austral en
  > BR-1 están corriendo más lentos (estamos compartiendo runners).
  > Posiblemente Felipe nos pregunte. No es caído, sólo lento.

- **Gabriel Ferré · 2026-03-15 14:18**
  > Anoto y le aviso al CIO de Banco Austral por mail si lo nota.
  > Confirmado: hoy nos preguntó. Le respondí que estamos en incidente
  > en una región compartida y que se normaliza.

- **Mariano Silva · 2026-03-19 18:00**
  > Cerrado. Postmortem programado. Action item: separar runners por
  > cliente para que un incidente de uno no impacte deploys del otro.
