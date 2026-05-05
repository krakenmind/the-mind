# Notion — Docs para case05

Workspace: **Cloudara HQ** · Section: Engineering / DEV / Sprints & Roadmap

---

## Doc: "Retro Sprint 24 — DEV"

- **Path**: Cloudara HQ / Engineering / DEV / Retros / 2026 / Sprint 24
- **Owner**: Camila Núñez
- **Last edited**: 2026-02-25 17:10 UYT
- **Tags**: `retro`, `sprint-24`, `team:dev`

### Contenido (copiar tal cual)

> # Retro Sprint 24 — DEV
>
> **Sprint**: 2026-02-10 → 2026-02-23
> **Facilitador**: Camila Núñez
> **Asistentes**: Camila, Tomás, Rodrigo (parcial)
>
> ## What went well
> - Cerramos 49 tickets, en línea con el promedio.
> - El refactor de la cola de eventos quedó casi listo (faltan 2 sub-tickets).
>
> ## What didn't
> - **El equipo viene cansado.** Camila y Tomás venían de cubrir on-call la
>   semana previa. La sensación es que estamos "siempre apagando incendios".
> - Mucho contexto-switch entre el roadmap y los pedidos urgentes de SD.
> - Falta gente en backend. Somos 2 y queda apretado.
>
> ## Action items
> - Hablar con Rodrigo sobre capacity y on-call rotation. **Owner: Camila**.
> - Bloquear 1 día/semana sin reuniones para foco. **Owner: Tomás**.

---

## Doc: "Retro Sprint 26 — DEV"

- **Path**: Cloudara HQ / Engineering / DEV / Retros / 2026 / Sprint 26
- **Owner**: Tomás Vidal
- **Last edited**: 2026-03-25 18:42 UYT
- **Tags**: `retro`, `sprint-26`, `team:dev`, `incident-impact`

### Contenido (copiar tal cual)

> # Retro Sprint 26 — DEV
>
> **Sprint**: 2026-03-10 → 2026-03-23
> **Facilitador**: Tomás Vidal
> **Asistentes**: Camila, Tomás, Rodrigo, Mariano (invitado)
>
> ## What went well
> - Sobrevivimos a OPS-1432. Mercado Norte volvió a operar el 19-mar.
> - El war-room funcionó: comunicación clara en `#cliente-mno`.
>
> ## What didn't
> - **Sprint demolido.** Cerramos 31 tickets vs ~50 esperados. Camila y Tomás
>   estuvieron 8 días full-time en el incidente de Mercado Norte.
> - **Estamos quemados.** El equipo viene del Sprint 24 ya cansado, y este
>   sprint se llevó el resto. Camila reporta que quiere tomarse vacaciones
>   en abril.
> - Roadmap Q2 (epic DEV-EPIC-188 — Self-service onboarding v2) no avanzó
>   en absoluto este sprint.
> - El postmortem de OPS-1432 todavía no se hizo.
>
> ## Action items
> - **Rodrigo: hablar con Lucía sobre el slip de Q2.** Es inviable cumplir
>   con el roadmap original.
> - Postmortem OPS-1432 — programar para esta semana. **Owner: Mariano**.
> - Considerar contratar un backend más. **Owner: Rodrigo**.
>
> ## Notas de Rodrigo (post-retro)
> > Equipo claramente al límite. Voy a escribirle a Lucía esta semana
> > para adelantarle que el roadmap Q2 se resiente. La fatiga es real,
> > pero la causa primaria es la asignación a incidentes — no podemos
> > pedirle al mismo equipo que cierre features y apague fuegos.

---

## Doc: "Roadmap DEV Q2 2026"

- **Path**: Cloudara HQ / Engineering / DEV / Roadmap / 2026 Q2
- **Owner**: Rodrigo Acosta
- **Last edited**: 2026-04-15 11:08 UYT (Rodrigo, comentario al final)
- **Tags**: `roadmap`, `q2-2026`, `team:dev`, `okr`

### Contenido (copiar tal cual)

> # Roadmap DEV — Q2 2026
>
> **Periodo**: 2026-04-01 → 2026-06-30
> **Owner**: Rodrigo Acosta (CTO) · Tech lead: Camila Núñez
>
> ## OKRs comprometidos
>
> | Feature | Epic | Owner | ETA original | ETA actual | Status |
> |---|---|---|---|---|---|
> | Self-service onboarding v2 | DEV-EPIC-188 | Camila | 30-may | **15-jun** | At risk |
> | Webhooks 2.0 (rate-limit + replay) | DEV-EPIC-194 | Tomás | 15-jun | **no iniciado** | Blocked |
> | Audit log API (compliance bau) | DEV-EPIC-201 | Camila | 30-jun | **postergado Q3** | Slipped |
> | Multi-region failover | DEV-EPIC-205 | Tomás | 30-jun | **postergado Q3** | Slipped |
>
> ## Status semáforo (16-abr)
>
> - 0 verde · 1 amarillo · 3 rojo / postergado.
>
> ## Comentario del owner (Rodrigo, 2026-04-15)
>
> > Cuatro features en compromiso. Dos al menos no van a entrar a Q2.
> > Hay que recalibrar con Lucía y producto. La causa primaria del slip
> > es la absorción del equipo en OPS-1432 (8 días) y SEC-204 (5 días)
> > — 13 días-equipo sobre un trimestre de ~60 días útiles para 2 devs
> > backend full-time. Eso es el ~22% del capacity del trimestre, antes
> > incluso de las vacaciones que Camila tiene pedidas para abril.
> >
> > Plan: voy al 1:1 con Lucía con los siguientes talking points:
> > 1. Bajar de 4 a 2 los compromisos Q2 (mantener Self-service onboarding
> >    + Webhooks 2.0; postergar Audit log API y Multi-region failover).
> > 2. Pedir aprobación para abrir búsqueda de un backend senior más.
> > 3. Definir budget de capacity para incident response separado del
> >    capacity de delivery (regla del 70/30).
