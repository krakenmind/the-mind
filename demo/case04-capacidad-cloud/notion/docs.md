# Notion — Docs para case04

## Página: "Comité Cloudara — capacidad y continuidad — sesión 2026-04-08"

- **Path**: Cloudara HQ / Leadership / Comités / Capacidad y continuidad / 2026-04-08
- **Owner**: Esteban Romero (CFO)
- **Authors**: Lucía Castro, Rodrigo Acosta, Esteban Romero, Mariano Silva, Gabriel Ferré
- **Last edited**: 2026-04-09 11:20 UYT por Esteban Romero
- **Tags**: `comité`, `capacidad`, `cloud`, `forecast-2026`
- **Anchor ID**: **ACC-CLOUD-01**

### Contenido (copiar tal cual)

> # Comité Cloudara — Capacidad y continuidad
> ## Sesión del 2026-04-08
>
> **Asistentes**: Lucía Castro (CEO), Rodrigo Acosta (CTO), Esteban Romero (CFO),
> Mariano Silva (SRE Lead), Gabriel Ferré (AE).
>
> **Ausente con aviso**: Andrea Pérez (Legal).
>
> **Anchor**: `ACC-CLOUD-01`
>
> ---
>
> ### Agenda
>
> 1. Estado de capacidad actual (UY-1, UY-2, BR-1).
> 2. Forecast 2026 — proyección crecimiento orgánico clientes actuales.
> 3. Decisión: reserva de capacidad por cliente.
> 4. Pipeline comercial — oportunidades nuevas Q2/Q3.
> 5. Riesgos y continuidad.
>
> ---
>
> ### 1. Estado de capacidad actual
>
> Mariano presenta:
>
> | DC    | Capacidad total | Uso actual | Disponible (vista pública) |
> |-------|-----------------|------------|----------------------------|
> | UY-1  | 100%            | 68%        | 32%                        |
> | UY-2  | 100%            | 41%        | 59%                        |
> | BR-1  | 100%            | 55%        | 45%                        |
>
> **Observación crítica de Mariano**: la columna "Disponible" no descuenta
> reservas para crecimiento de clientes actuales. Es engañosa.
>
> ### 2. Forecast 2026
>
> Proyección de crecimiento orgánico clientes actuales (basada en consumo
> últimos 6 meses, con un colchón del 15%):
>
> - **Banco Austral**: +18% YoY → consumirá +14 pts de UY-1 hacia fin de año.
> - **Mercado Norte**: +24% YoY → consumirá +9 pts de UY-1.
> - **Salud Plus**: +11% YoY → consumirá +5 pts de UY-1.
> - **Energía Litoral**: estable, sin crecimiento esperado.
> - **Ministerio del Sur** y **Fletes UY** están en UY-2 / BR-1, no impactan UY-1.
>
> Total proyectado de crecimiento orgánico en UY-1: **+28 pts** sobre el 68% actual,
> es decir, **uso esperado fin de año = 96%**.
>
> ### 3. Decisión — Reserva de capacidad
>
> El comité **resuelve reservar 28 puntos porcentuales de UY-1** para sostener
> el crecimiento orgánico proyectado de los clientes existentes (BAU, MNO, SLP).
> Esto deja como margen real disponible para nuevas ventas en UY-1: **~4 puntos
> porcentuales**, no 32 como muestra el dashboard.
>
> **Acción** (owner: Esteban): bajar esta decisión al dashboard de capacidad
> antes del lunes 14-abr, marcando los 28 puntos como "comprometida — clientes
> actuales" para que la vista pública refleje la realidad.
>
> > ⚠️ Importante: hasta que esto se aplique, asumir que UY-1 está
> > virtualmente lleno para nuevas ventas. Cualquier oportunidad nueva debe
> > ofrecerse en UY-2 o BR-1.
>
> ### 4. Pipeline comercial Q2/Q3
>
> Gabriel presenta el pipeline:
>
> - **Retail mediano (UY)** — fase de propuesta, $80k/mes, prefiere UY-1.
> - **Fintech regional** — fase de descubrimiento, $140k/mes, abierta a UY-1 o BR-1.
> - 4 oportunidades más, todas chicas, con destino UY-2 / BR-1.
>
> **Decisión**: las dos primeras (retail y fintech) **no se cierran con UY-1
> hasta tener reserva nominada**. Gabriel acuerda re-evaluar UY-2 como
> alternativa primaria.
>
> ### 5. Riesgos y continuidad
>
> - Si UY-1 se llena antes de fin de año, vamos a tener que migrar workloads
>   no críticos a UY-2 o BR-1 con costo y latencia. Mariano ya empezó
>   inventario de qué se puede mover (queda en OPS-1543).
> - El proceso actual (decidir en comité, anotar en Notion, esperar que alguien
>   actualice el dashboard) es frágil. Esto se discutió antes y sigue pendiente.
>
> ### Próximos pasos
>
> - [x] Subir minuta a Notion (Esteban) — done 2026-04-09.
> - [ ] Marcar 28 pts UY-1 como "comprometida" en el dashboard (Esteban) —
>       **DUE 2026-04-14** ⚠️
> - [ ] Comunicar a preventa la nueva regla de UY-1 (Gabriel + Lucía).
> - [ ] Mariano arma propuesta de proceso para que las decisiones del comité
>       impacten el dashboard de forma automática (próxima sesión).
> - [ ] Re-correr forecast con datos de mayo (próxima sesión, 2026-05-13).
>
> ---
>
> _Acta cerrada · 2026-04-09 · Esteban Romero_

---

## Página: "Bitácora — Pipeline UY-1: heads-up de preventa y disconnect con comité"

- **Path**: Cloudara HQ / Leadership / Bitácoras / 2026-04 / Pipeline UY-1
- **Owner**: Mariano Silva
- **Authors**: Gabriel Ferré, Rodrigo Acosta, Mariano Silva
- **Last edited**: 2026-04-13 17:05 UYT por Mariano Silva
- **Tags**: `bitácora`, `capacidad`, `uy-1`, `preventa`, `pipeline`
- **Anchor ID**: **ACC-SLACK-01**

### Contenido (copiar tal cual)

> # Bitácora — Pipeline UY-1: heads-up de preventa y disconnect con comité
>
> **Anchor**: `ACC-SLACK-01`
>
> Hilo de discusión que arrancó como dos heads-up paralelos de Gabriel
> (uno al equipo BAU, otro a leadership) y terminó disparando el escalado
> a Rodrigo del 14-abr. Lo dejo acá para que quede el contexto cruzado
> con la minuta del comité del 8-abr (`ACC-CLOUD-01`) y con OPS-1567
> (`ACC-CLOUD-02`).
>
> ---
>
> ## Heads-up al equipo BAU — 2026-04-13 11:18 UYT
>
> **Gabriel Ferré · 11:18** — Equipo BAU, heads up: estamos trabajando
> dos oportunidades nuevas que probablemente van a apoyarse en UY-1, lo
> mismo que ustedes. No debería haber colisión (el dashboard muestra
> margen) pero quería avisar por las dudas. Si en algún momento ven
> contención de recursos en su instancia BAU, escríbanme inmediato.
>
> **Mariano Silva · 11:30** — Gabriel, eso lo discutimos en el comité
> del 8. UY-1 está más comprometido de lo que parece en el dashboard.
> Vamos a charlar offline antes de que avances con cliente.
>
> **Gabriel Ferré · 11:32** — dale, te llamo a la tarde 👍
>
> _(la llamada nunca se concreta — Gabriel viaja a una visita comercial
> y queda pendiente. Mariano levanta el flag por mail al día siguiente,
> 14-abr, dirigido a Rodrigo.)_
>
> ---
>
> ## Update de pipeline a leadership — 2026-04-13 16:42 UYT
>
> **Gabriel Ferré · 16:42** — 👋 update de pipeline para los que vengan
> al review del lunes:
>
> - **Retail mediano** (oportunidad UY) — pasamos de descubrimiento a
>   propuesta. Lo mando esta semana. La idea es que arranque sobre UY-1
>   (les importa latencia local, son nativos UY).
> - **Fintech regional** — hicieron techfit la semana pasada,
>   entusiasmados. También pidieron UY-1 por compliance de un partner.
>   Estoy armando la propuesta para que la veamos en el comité comercial
>   del 22.
>
> Confirmé en el dashboard de capacidad que UY-1 tiene ~32% libre, así
> que ambos entran sin problema. ✌️ Cualquier cosa, gritan.
>
> **Rodrigo Acosta · 17:01** — Gabriel, ojo con UY-1. En el comité del 8
> hablamos de reservar capacidad para crecimiento de los clientes
> actuales. ¿Esteban ya bajó eso al dashboard?
>
> **Gabriel Ferré · 17:04** — 🤔 no sé, recién entré al dashboard hace 2
> horas y mostraba 32% libre. Esteban, ¿está actualizado o tengo que
> mirarlo distinto?
>
> _(Esteban no respondió en este hilo — leyó el ping pero estaba en otra
> reunión. Termina respondiendo el lunes 14, ver mail de Mariano del
> 14-abr.)_
>
> ---
>
> ## Por qué importa
>
> Acá quedan tres pistas alineadas:
>
> 1. **Gabriel está vendiendo UY-1 sobre un dato erróneo del dashboard**
>    (cree que hay 32% libre porque la reserva del comité no quedó
>    marcada — ver `ACC-CLOUD-01`).
> 2. **Rodrigo intuye el problema** y pregunta al toque, pero Esteban
>    (owner de bajar la decisión al dashboard) no responde a tiempo.
> 3. **Mariano levanta el flag** y termina escalándolo por mail el día
>    siguiente al CTO.
>
> Es exactamente el tipo de disconnect que el caso Krakenmind expone:
> cuatro fuentes diferentes apuntando a la misma bolsa de capacidad y
> nadie ve la foto completa.
>
> ---
>
> _Bitácora archivada · 2026-04-13 · Mariano Silva_
