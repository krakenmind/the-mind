# Linear — Tickets para case03

## OPS-2026-Q2 — Epic: Cambios autorizados Banco Austral Q2

- **Team**: Operations (OPS)
- **Type**: Epic · **Priority**: High
- **Status**: In Progress
- **Owner**: Mariano Silva · **Sponsor**: Rodrigo Acosta (CTO)
- **Cliente**: Banco Austral
- **Labels**: `cliente:bau`, `change-mgmt`, `regulatorio`, `epic`
- **Created**: 2026-03-30 09:00 UYT
- **Quarter**: Q2 2026 (abril-junio)

### Description (copiar tal cual)

> # Cambios autorizados Banco Austral — Q2 2026
>
> Este epic contiene la lista cerrada de tickets autorizados a deployarse a
> producción para Banco Austral durante el Q2 2026 (abril, mayo, junio).
>
> **Por qué este epic existe**: BAU es un cliente regulado (banca). Cualquier
> cambio en sus sistemas productivos requiere un proceso documentado de
> change management. Esto incluye:
>
> 1. Aprobación previa del cambio por el comité Cloudara-BAU (mensual).
> 2. Trazabilidad: cada deploy tiene que poder mapearse a un ticket
>    autorizado en este epic.
> 3. Ventana de change management: martes y jueves 22-00 UYT.
> 4. Auditoría post-mortem: cada cambio queda en el log de cambios BAU
>    (Notion, "Log de cambios BAU 2026").
>
> **Cómo agregar un ticket nuevo a este epic**:
> - Para mantenimiento rutinario (bug fixes, performance): aprobación de
>   Mariano Silva (SRE Lead). Comentar acá pidiendo el alta.
> - Para cambios de feature o con impacto regulatorio: requiere también
>   nota a Andrea Pérez (Legal) y va al próximo comité Cloudara-BAU.
> - **NUNCA deployar a BAU un PR que no esté ligado a un ticket en este epic.**
>   Es la regla #1 que firma cada dev al onboardearse.
>
> ## Tickets autorizados Q2 2026 (lista viva, se actualiza con cada alta)
>
> - DEV-1187 — Fix: race condition en notificaciones BAU (assigned: Camila)
> - DEV-1192 — Performance: query de extractos > 5s (assigned: Tomás)
> - DEV-1198 — Upgrade dependencia node 20 LTS en auth-svc (assigned: Camila)
> - DEV-1203 — Mejora: paginación en /api/v1/transactions (assigned: Tomás)
> - SEC-441  — Rotación de claves API trimestrales (assigned: Mariano)
> - OPS-1612 — Migración logs BAU a nuevo S3 bucket (assigned: Diego)
> - DEV-1219 — Fix: timeout configurable en cliente HTTP a core bancario
>              (assigned: Federico Aguirre · NEW · agregado 2026-04-29)
>
> ## Tickets rechazados / postergados Q2
>
> - DEV-1184 — Refactor controller de pagos (postergado a Q3, demasiado
>              alcance para esta ventana).
> - DEV-1199 — Cambio en formato de extractos PDF (requiere validación
>              regulatoria, en revisión por Andrea Pérez).

### Comments

- **Mariano Silva · 2026-04-28 17:30 UYT**
  > Federico Aguirre se sumó al equipo esta semana. Le asigné DEV-1219 como
  > primer ticket. Federico, leé el runbook de deploy BAU en Notion antes
  > de arrancar.

- **Federico Aguirre · 2026-04-29 09:14 UYT**
  > Recibido Mariano, gracias. Voy a leerme el runbook hoy.

- **Mariano Silva · 2026-04-29 14:30 UYT**
  > Heads-up al equipo: Federico Aguirre se sumó al equipo backend esta
  > semana y va a hacer su primer deploy a BAU el martes 06-may con Camila
  > parejándolo. DEV-1219 ya está dado de alta en este epic. Si lo ven
  > preguntando cosas en cualquier canal, denle bola.

- **Federico Aguirre · 2026-04-29 14:45 UYT**
  > Una duda antes de arrancar: ¿el horario de change management (martes y
  > jueves 22-00) es UYT siempre o se ajusta a horario BAU si hay cambio de
  > hora?

- **Mariano Silva · 2026-04-29 14:48 UYT**
  > Siempre UYT. Uruguay no cambia hora, así que la ventana es fija. Si
  > alguna vez BAU pide otra ventana específica, lo coordinamos por mail
  > con Sebastián Calero, no informalmente. Queda en el runbook.

- **Camila Núñez · 2026-04-29 14:50 UYT**
  > Federico, para tu primera vez te recomiendo abrir el runbook de Notion
  > al lado y seguirlo paso por paso. La parte de smoke tests es la más
  > importante, no la skipees. Yo voy a estar conectada en `#cliente-bau`
  > el martes 22hs.
