# Caso 6 — Brief de cuenta clave para 1:1 con CIO de Banco Austral

**Persona**: Lucía Castro (CEO)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "¿Cómo va Banco Austral? Quiero un brief para mi 1:1 con su CIO mañana."

## Lo que pasa "detrás"

Lucía tiene una reunión 1:1 mañana con Felipe Aguirre, CIO de Banco Austral. Es la cuenta más grande del portfolio (banca, contrato MSA 2025-2027) y necesita entrar con datos: estado del NPS, avance de los proyectos activos, último contacto con el CIO, y lo que el cliente puso sobre la mesa la última vez.

Banco Austral tiene tres proyectos en curso con team DEV (web, mobile, integración), un NPS sano de 8.2 (subió 0.4 puntos vs Q4), y un próximo hito grande: cierre del módulo de fraud para junio. Pero hay dos cosas en el radar que Lucía debería tener:

1. El CIO mencionó "lentitud en deploys" en el último mail — eso conecta con el incidente OPS-1432 (la caída de Mercado Norte que afectó pipelines compartidos en BR-1, donde Banco Austral también corre). No fue customer-facing pero el cliente sí lo notó.
2. La migración BR-1 → UY-2 está agendada para julio y todavía no se confirmó con el cliente la ventana.

Krakenmind tiene que cruzar Drive (contrato + minutas QBR) + Notion (cuenta + roadmap cliente) + Linear (proyectos + OPS-1432) + Gmail (último thread con el CIO) y devolverle un brief estructurado en una página.

## Fuentes y evidencia

- **Linear** — proyectos `DEV-PROJ-BAU-WEB`, `DEV-PROJ-BAU-MOB`, `DEV-PROJ-BAU-INT` (estados y % avance) + ticket `OPS-1432` y su impacto colateral en Banco Austral.
- **Notion** — página "Cuenta Banco Austral" (NPS, contactos, status) + "Roadmap cliente — Banco Austral 2026" (hitos: fraud junio, migración julio).
- **Gmail** — thread "Próximo QBR + temas pendientes" con Felipe Aguirre del 18-abr (menciona deploys lentos y módulo fraud).
- **Google Drive** — "Master Service Agreement — Banco Austral 2025-2027.pdf" (contrato, SLAs) y "QBR Q1 2026 — Banco Austral — minutas.docx".

## Respuesta esperada

> **Brief — Banco Austral · cuenta MSA 2025-2027 · CIO Felipe Aguirre**
>
> **Estado general: sano.** NPS último survey 8.2/10 (↑0.4 vs Q4 2025), tres proyectos activos, contrato vigente hasta dic-2027 con renovación automática. Cuenta más grande del portfolio.
>
> **Proyectos activos (team DEV):**
> - `DEV-PROJ-BAU-WEB` (rediseño portal web): **78% avance**, en tiempo, ETA 30-may.
> - `DEV-PROJ-BAU-MOB` (app mobile v3): **42% avance**, **2 semanas de delay**. Causa: dependencia con el módulo de auth que se rehizo durante SEC-204.
> - `DEV-PROJ-BAU-INT` (integración core bancario): **55% avance**, en tiempo, ETA 30-jun.
>
> **Último contacto con Felipe (Gmail, 18-abr — thread "Próximo QBR + temas pendientes"):** mencionó dos cosas:
> 1. *"Lentitud en deploys"* — esto se relaciona con `OPS-1432` (caída Mercado Norte 12-19 mar). Aunque el incidente no fue customer-facing para Banco Austral, comparten infra de pipelines en BR-1 y los deploys del cliente se ralentizaron esos días. Vale aclararlo y mostrar el plan post-mortem.
> 2. *"Ganas de cerrar el módulo de fraud antes de junio"* — está en el roadmap del cliente con hito 15-jun. Confirmar a Felipe que el equipo está alineado.
>
> **Próximos hitos (Notion — Roadmap cliente Banco Austral 2026):**
> - **15-jun** — release módulo de fraud (fraud detection v1).
> - **15-jul** — migración pipelines y workloads BR-1 → UY-2 (riesgo: ventana todavía no confirmada con el cliente; agendar en este 1:1).
>
> **Riesgos a flagear:**
> - Mobile con 2 semanas de delay (decisión: comunicar proactivamente o sumar dev temporal).
> - Migración BR-1 → UY-2 sin ventana acordada (no podemos llegar a fin de junio sin esto cerrado).
>
> **Talking points sugeridos para el 1:1:**
> 1. Reconocer la lentitud de deploys, explicar OPS-1432 con honestidad y mostrar el plan de mitigación.
> 2. Confirmar fecha del módulo de fraud (15-jun) y mostrar avance.
> 3. Cerrar ventana de migración BR-1 → UY-2 para julio.
> 4. Adelantar el delay del mobile v3 con propuesta de mitigación.

## Por qué es valioso

Lucía entra al 1:1 con un brief que cruza contrato, NPS, tres proyectos en Linear, dos QBRs, un mail con el CIO y un incidente reciente. Sin Krakenmind, esto es 1-2 horas de prep + pedir info a 3 equipos. Con Krakenmind, 30 segundos.
