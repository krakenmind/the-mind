# Caso 5 — Velocity del equipo DEV en caída

**Persona**: Rodrigo Acosta (CTO)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "¿Por qué bajó la velocity del equipo de DEV en el último trimestre?"

## Lo que pasa "detrás"

Rodrigo entra al 1:1 con Lucía (CEO) la semana que viene y va a tener que explicar por qué el roadmap Q2 no llega en tiempo. La narrativa fácil es "el equipo está cansado" — y es lo que aparece en las dos retros del trimestre. Pero esa es la consecuencia, no la causa.

La causa real es que dos incidentes grandes (OPS-1432 — caída prod Mercado Norte de 8 días, y SEC-204 — vuln crítica de Banco Austral de 5 días) consumieron 13 días-equipo combinados. Tres devs full-time entraron a esos incidentes durante sprints comprometidos, y el throughput de tickets cerrados en los sprints siguientes se desplomó: pasamos de ~52 tickets cerrados por sprint en Q1 a ~34 en Q2 (-35%). Cuatro features del roadmap Q2 ("Self-service onboarding v2", "Webhooks 2.0", "Audit log API", "Multi-region failover") quedaron desplazadas.

Rodrigo ya escribió un mail a Lucía el 28-mar adelantando que el roadmap se atrasa. Krakenmind tiene que conectar Linear (throughput + los dos tickets) + Notion (retros + roadmap) + Gmail (mail a Lucía) y devolverle a Rodrigo un brief que él pueda usar mañana.

## Fuentes y evidencia

- **Linear** — `OPS-1432` (incident Mercado Norte, 8 días), `SEC-204` (vuln Banco Austral, 5 días), throughput tickets cerrados team DEV Q1 vs Q2 (epics `DEV-EPIC-188` y `DEV-EPIC-194` como referencia visual).
- **Notion** — "Retro Sprint 24" y "Retro Sprint 26" (ambas flagean fatiga), y "Roadmap DEV Q2 2026" con OKRs comprometidos vs estado actual.
- **Gmail** — thread "Roadmap Q2 — heads up" del 28-mar entre Rodrigo y Lucía.

## Respuesta esperada

> La velocity del team DEV bajó ~35% entre Q1 y Q2 (de 52 a 34 tickets cerrados por sprint promedio). La causa raíz **no es fatiga** — la fatiga reportada en las retros de los sprints 24 y 26 es síntoma. La causa son dos incidentes que consumieron 13 días-equipo combinados:
>
> - **`OPS-1432`** — caída prod Mercado Norte (12-mar → 19-mar). Camila Núñez y Tomás Vidal full-time, 8 días-equipo. Cliente impactado: Mercado Norte.
> - **`SEC-204`** — vuln crítica reportada por Banco Austral (24-mar → 28-mar). Camila Núñez nuevamente + soporte de Mariano. 5 días-equipo, alta criticidad.
>
> Esto desplazó 4 features del roadmap Q2 que están en "Roadmap DEV Q2 2026" (Notion): Self-service onboarding v2, Webhooks 2.0, Audit log API, Multi-region failover. Rodrigo ya adelantó esto a Lucía en el mail "Roadmap Q2 — heads up" del 28-mar.
>
> Recomendación: rebalancear roadmap Q2 (drop o postergar 2 de los 4 features), separar capacity de incident response del capacity de delivery en el plan Q3, y blindar a Camila Núñez como single point of failure (entró a los dos incidentes).

## Por qué es valioso

Rodrigo entra al 1:1 con la CEO con una causa raíz cuantificada (13 días-equipo, 4 features), no con una sensación. Krakenmind reemplaza una hora de cruzar Linear con Notion y Gmail por una respuesta accionable con citas.
