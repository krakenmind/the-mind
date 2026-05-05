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
- **ETA**: 2026-06-12 (3-day buffer antes del release fraud v1 del cliente)

### Description (copiar tal cual)

> Integración con el core bancario del cliente para alimentar el módulo
> de fraud detection v1. Hito intermedio del cliente: 15-jun (release fraud
> v1). Esta integración es prerequisito y debe estar completa con buffer.
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

### Description (copiar tal cual — versión canónica, comparte con case05)

> Caída del flujo de checkout en producción de Mercado Norte. Alertas en
> Hornero-API a las 03:12 UYT (timeouts en endpoint `/checkout/confirm`).
> Replicación Mulita-DB-01 → BR-1 con lag creciente desde 02:50.
>
> Impact: ~70% de transacciones fallando en pico nocturno. Cliente
> notificado.
>
> Equipo on-call: Mariano (SRE), Camila (backend) y Tomás (frontend)
> entran a war-room. Esto va a consumir el resto del sprint actual.

### Comments (relevantes para case06 — colateral Banco Austral)

- **Mariano Silva · 2026-03-12 14:18**
  > Heads-up: el war-room está consumiendo capacity de los runners de BR-1
  > (compartidos con Banco Austral). Sus deploys arrancaron a colear.
  > Avisé al AE de la cuenta.

- **Mariano Silva · 2026-03-15 09:30**
  > Update colateral BAU: durante el war-room los deploys de Banco Austral
  > en BR-1 están corriendo más lentos (compartimos runners). No es
  > customer-facing del lado del banco, pero el equipo del CIO lo notó.
  > Action item post-incidente: separar runners por cliente.
  > Posiblemente Felipe nos pregunte. No es caído, sólo lento.

- **Gabriel Ferré · 2026-03-15 14:18**
  > Anoto y le aviso al CIO de Banco Austral por mail si lo nota.
  > Confirmado: hoy nos preguntó. Le respondí que estamos en incidente
  > en una región compartida y que se normaliza.

- **Mariano Silva · 2026-03-19 18:00**
  > Cerrado. Postmortem programado. Action item: separar runners por
  > cliente para que un incidente de uno no impacte deploys del otro.
