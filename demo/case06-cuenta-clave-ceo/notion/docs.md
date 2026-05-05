# Notion — Docs para case06

Workspace: **Cloudara HQ** · Section: Cuentas / Banco Austral

---

## Doc: "Cuenta Banco Austral"

- **Path**: Cloudara HQ / Cuentas / Banco Austral / _Overview
- **Owner**: Gabriel Ferré (AE)
- **Last edited**: 2026-04-20 09:14 UYT (Gabriel, update post-NPS)
- **Tags**: `cuenta`, `cliente:bau`, `tier:strategic`, `industria:banca`

### Contenido (copiar tal cual)

> # Cuenta — Banco Austral
>
> **Industria**: Banca · **Tier interno**: Strategic (top-1 del portfolio)
> **Account Executive**: Gabriel Ferré
> **Sponsor ejecutivo Cloudara**: Lucía Castro (CEO)
>
> ## Contactos clave del cliente
>
> | Nombre | Rol | Email | Notas |
> |---|---|---|---|
> | Felipe Aguirre | CIO | felipe.aguirre@bancoaustral.uy | Nuestro main contact. Estilo directo, valora data sobre opinión. 1:1 con Lucía mensual. |
> | Romina Velazco | Head of Engineering | romina.velazco@bancoaustral.uy | Día a día con el team DEV. |
> | Pedro Itzaina | Head of Risk | pedro.itzaina@bancoaustral.uy | Sponsor del módulo de fraud. |
>
> ## Salud de cuenta
>
> | Métrica | Q4 2025 | Q1 2026 | Tendencia |
> |---|---|---|---|
> | NPS (último survey) | 7.8/10 | **8.2/10** | ↑ +0.4 |
> | Tickets SD abiertos / cerrados último mes | 24 / 22 | 19 / 19 | mejor |
> | Incidentes severidad ≥ 2 último trimestre | 2 | 1 | mejor |
> | Adopción nuevos features (de los lanzados) | 64% | 71% | ↑ |
>
> Último survey NPS: 2026-04-15 (encuestados 8 stakeholders del cliente).
>
> ## Comentarios cualitativos del último NPS
>
> > "El equipo de Cloudara responde rápido. Me gustaría más visibilidad
> > en el roadmap." — Romina V.
>
> > "Los deploys estuvieron lentos a mitad de marzo." — Pedro I.
> > (NB: relacionado con OPS-1432, ya documentado).
>
> ## Contrato vigente
>
> Ver `Master Service Agreement — Banco Austral 2025-2027.pdf` en Drive.
> SLA target 99.9% por servicio. Renovación automática diciembre 2027.

---

## Doc: "Roadmap cliente — Banco Austral 2026"

- **Path**: Cloudara HQ / Cuentas / Banco Austral / Roadmap 2026
- **Owner**: Rodrigo Acosta (co-edit con Gabriel Ferré)
- **Last edited**: 2026-04-18 17:32 UYT
- **Tags**: `roadmap`, `cliente:bau`, `2026`

### Contenido (copiar tal cual)

> # Roadmap — Banco Austral 2026
>
> Acordado en QBR Q1 2026 (12-feb). Última revisión: 18-abr.
>
> ## Hitos comprometidos
>
> | # | Hito | Owner Cloudara | Owner cliente | Fecha | Status |
> |---|---|---|---|---|---|
> | 1 | Release portal web v2 | Tomás Vidal | Romina Velazco | 2026-05-30 | On track |
> | 2 | **Release módulo fraud detection v1** | Camila Núñez | Pedro Itzaina | **2026-06-15** | On track |
> | 3 | Release app mobile v3 | Camila Núñez | Romina Velazco | 2026-06-15 | **At risk (delay 2 semanas)** |
> | 4 | **Migración pipelines y workloads BR-1 → UY-2** | Mariano Silva | Romina Velazco | **2026-07-15** | **Pendiente confirmar ventana con cliente** |
> | 5 | Release fraud v2 (ML scoring) | Camila Núñez | Pedro Itzaina | 2026-09-30 | Planning |
> | 6 | QBR Q3 2026 | Lucía Castro | Felipe Aguirre | 2026-10-15 | Scheduled |
>
> ## Notas
>
> - **Hito 2 (fraud v1):** prerequisito = `DEV-PROJ-BAU-INT` (integración core).
>   Estado integración: 55% al 14-abr, en tiempo. Felipe lo mencionó como
>   prioridad en el último mail.
>
> - **Hito 3 (mobile v3):** atraso de 2 semanas atribuible al módulo de auth
>   que se rehizo durante `SEC-204` (24-28 mar). Camila replanificó. Comunicar
>   al cliente.
>
> - **Hito 4 (migración BR-1 → UY-2):** **bloqueante** — la ventana de migración
>   todavía no se confirmó con el cliente. Lucía debería traerlo al 1:1
>   con Felipe. Plan operativo en doc separado "Plan migración BR-1 → UY-2"
>   (Cloudara HQ / Engineering / Migraciones).

---

## Doc: "Cuenta Banco Austral — Notas internas para 1:1 CEO ↔ CIO"

- **Path**: Cloudara HQ / Cuentas / Banco Austral / 1on1 Lucía-Felipe
- **Owner**: Gabriel Ferré
- **Last edited**: 2026-04-20 11:00 UYT
- **Tags**: `cliente:bau`, `1on1`, `prep`

### Contenido (copiar tal cual)

> # Notas para 1:1 Lucía ↔ Felipe — preparación
>
> Frecuencia: mensual. Próximo: 2026-04-22 11:00 UYT.
>
> ## Pain points conocidos del cliente (último mes)
>
> 1. Lentitud de deploys a mitad de marzo (relacionado con OPS-1432).
>    Comunicado por Felipe en el thread de mail del 18-abr.
> 2. Quiere certeza sobre el módulo de fraud para junio.
> 3. Romina pidió más visibilidad de roadmap (en el último NPS).
>
> ## Cosas que Lucía debería traer ella
>
> - Reconocimiento del incidente OPS-1432 + plan de mitigación
>   (separar runners por cliente — action item del postmortem).
> - Confirmación de fecha 15-jun para fraud v1.
> - **Acordar ventana de migración BR-1 → UY-2** para julio. Esto es lo
>   más importante a cerrar en este 1:1 — sin ventana confirmada, no podemos
>   bloquear capacity de Mariano.
> - Adelantarle el delay del mobile v3 (2 semanas) con la causa y el plan.
>
> ## Lo que NO traer a este 1:1
>
> - Detalles operativos de SEC-204 (ya cerrado y comunicado por canal técnico).
> - Discusión de pricing — esto va al QBR, no al 1:1 mensual.
