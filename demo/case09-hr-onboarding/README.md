# Caso 9 — People Ops: ¿está todo listo para el onboarding de Federica mañana?

**Persona**: Valentina Otero (People Ops)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Mañana arranca Federica Vázquez como Senior Backend Engineer en el equipo DEV. ¿Qué accesos necesita y qué falta gestionar?"

## Lo que pasa "detrás"

Federica firmó la oferta el 28-abr. Valentina abrió PEOPLE-87 con la checklist estándar del template "Onboarding — Engineer (Backend)" en Notion. La checklist tiene 8 items críticos: laptop, cuentas IT (AWS, GitHub, VPN, ssh keys, Notion, Slack), bg check, buddy assignment, acceso al repo de cliente.

A 1 día del start (Federica arranca el 6-may, hoy es 5-may), Valentina abrió **4 sub-tickets** que cubren los items 1–6 del template: SD-2199 (laptop + Slack + Google + VPN + ssh keys), OPS-1599 (AWS read-only), DEV-1078 (GitHub org) y SEC-211 (bg check). De esos cuatro, **tres están Done** (items 1–5 listos) y **SEC-211 sigue In Progress sin assignee** — eso bloquea el acceso a los repos de Banco Austral, que son críticos para el rol. **Pero además hay dos gaps silenciosos**: el item 7 (acceso a Notion) está en el template pero **nadie creó sub-ticket**, y el item 8 (Buddy assignment) está Pending dentro del PEOPLE-87.

Valentina necesita en 2 minutos saber qué falta y a quién pingear. La respuesta tiene que cruzar Notion (template + doc de capacidad de buddies), Linear (PEOPLE-87 con sus sub-tickets en OPS, DEV, SD, SEC) y Gmail (oferta firmada).

## Fuentes y evidencia

- **Linear** — `PEOPLE-87` (parent), `OPS-1599`, `DEV-1078`, `SD-2199` (Done), `SEC-211` (In Progress, sin assignee).
- **Notion** — template "Onboarding — Engineer (Backend)" y doc "Buddy program — quién está libre Q2".
- **Gmail** — thread "Welcome to Cloudara!" del 28-abr con la oferta y el welcome packet.

## Respuesta esperada

> Federica arranca mañana 6-may como Senior Backend Engineer (DEV). De los 8 items de la checklist (template "Onboarding — Engineer (Backend)" en Notion), **5 están Done**, **1 In Progress sin assignee**, y **2 gaps**:
>
> - Laptop M3 + VPN configurada — **SD-2199 Done** (3-may, Service Desk).
> - AWS read-only — **OPS-1599 Done** (2-may, Mariano Silva).
> - GitHub org `cloudara` — **DEV-1078 Done** (2-may).
> - Slack + ssh keys a Tero-Bastion — incluidos en SD-2199.
>
> **Lo que falta gestionar**:
>
> 1. **SEC-211 "Bg check Federica" — In Progress, sin assignee**. Esto bloquea el acceso a los repos de cliente (en particular `bau-backend` para Banco Austral, que es crítico porque DEV está armando el sprint de mayo sobre ese repo). Hay que pingear a alguien de SEC hoy mismo para que lo tome — sino mañana llega y no puede empezar a trabajar en cliente.
>
> 2. **Buddy assignment** (sub-tarea de PEOPLE-87, Status Pending). Según el doc de Notion "Buddy program — quién está libre Q2", **Camila Núñez** tiene capacidad este Q (los demás backends están asignados a otros). Recomiendo asignarle Camila.
>
> 3. **Acceso a Notion no aparece como sub-ticket en ningún Linear**. Está en la checklist del template pero nadie lo creó como ticket. Validar manualmente (suele hacerlo Diego desde admin de Notion en <5min, no requiere ticket formal — pero confirmá que esté).
>
> Acción inmediata sugerida: mensaje a #people o ping a Mariano para que SEC-211 quede asignado hoy. Y mandale a Camila el ping de buddy.

## Por qué es valioso

Onboarding es un proceso con muchos actores (People Ops, IT, SEC, DEV, manager) y muchos canales. Krakenmind cruza la checklist del template con los tickets reales en Linear y detecta lo que **no fue creado como ticket** (gap silencioso) además de lo que está bloqueado. Convierte una revisión manual de 30 minutos en una respuesta accionable de 15 segundos, justo antes de que la persona arranque.
