# Linear — Tickets para case04

## OPS-1567 — Alertas de consumo zona UY-1: tres tenants creciendo fuera de baseline

- **Team**: Operations (OPS)
- **Type**: Investigation · **Priority**: High
- **Status**: In Progress
- **Assignee**: Mariano Silva · **Reporter**: Capacity Bot (auto-creado)
- **Labels**: `capacidad`, `uy-1`, `forecast`, `cliente:bau`, `cliente:mno`, `cliente:slp`
- **Created**: 2026-04-12 03:14 UYT (auto)
- **Anchor ID**: **ACC-CLOUD-02**

### Description (copiar tal cual)

> Alerta auto-generada por Capacity Bot. Tres tenants en UY-1 con consumo
> por encima del baseline de 30 días, sostenido durante > 7 días.
>
> ## Datos
>
> | Tenant | CPU vs baseline | RAM vs baseline | Storage vs baseline |
> |--------|-----------------|-----------------|---------------------|
> | bau    | +18%            | +12%            | +9%                 |
> | mno    | +24%            | +21%            | +14%                |
> | slp    | +11%            | +8%             | +6%                 |
>
> ## Capacidad UY-1
>
> - Hace 30 días: 61%
> - Hoy: 68%
> - Trend: +0.23 pts / día
> - Si se sostiene → **90% en 95 días** (≈ 2026-07-15)
>
> ## Por qué importa
>
> Esto colisiona directo con la decisión del Comité Cloudara — capacidad y
> continuidad del 2026-04-08 (anchor `ACC-CLOUD-01`), donde se reservaron
> 28 pts de UY-1 para crecimiento orgánico de clientes actuales. El consumo
> real está superando incluso esa proyección.
>
> El dashboard público sigue mostrando ~32% disponible, **pero ese número
> está mal**: no descuenta la reserva del comité ni el crecimiento real
> medido acá.
>
> ## Acciones
>
> - [ ] Cruzar con Esteban: confirmar si la reserva del comité ya está
>       reflejada en el dashboard o sigue pendiente.
> - [ ] Mariano: re-forecast con la nueva curva de consumo, llevar al
>       próximo comité (2026-05-13).
> - [ ] Levantar el riesgo a Rodrigo (CTO) por mail. **Hecho 2026-04-14**.
> - [ ] Hablar con Gabriel: las dos oportunidades nuevas que está empujando
>       a UY-1 no entran si el forecast se sostiene.
>
> ## Riesgo
>
> Si cerramos las dos oportunidades nuevas a UY-1 sin reserva nominada y el
> crecimiento orgánico se sostiene, llegamos a saturar UY-1 entre julio y
> agosto. Eso implica:
>
> - Migrar workloads no críticos a UY-2 o BR-1 con costo y latencia para los
>   clientes existentes.
> - O comprar capacidad nueva en UY-1 (lead time de 6-8 semanas para racks).
> - O degradar SLO con clientes.
>
> Ninguna de las tres es deseable. La decisión correcta hoy es no vender UY-1.

### Comments

- **Mariano Silva · 2026-04-12 09:02 UYT**
  > Tomo este ticket yo. Voy a cruzar con la minuta del comité del 8.

- **Mariano Silva · 2026-04-12 14:25 UYT**
  > Confirmado: la reserva del comité (ACC-CLOUD-01) **no quedó marcada
  > en el dashboard**. Esteban tenía la action item pero está pendiente.
  > Esto explica por qué Gabriel sigue viendo "32% libre" cuando en realidad
  > es ~4%.

- **Mariano Silva · 2026-04-13 11:35 UYT**
  > Gabriel mencionó dos oportunidades nuevas en #cliente-bau y #leadership
  > apoyadas en UY-1 (ver `ACC-SLACK-01`). Le dejé mensaje que charlemos
  > offline. Quedó pendiente, voy a escalarlo.

- **Mariano Silva · 2026-04-14 09:50 UYT**
  > Mandé mail a Rodrigo flageando el riesgo. Espero respuesta para definir
  > la decisión: ¿bloqueamos UY-1 hoy mismo o esperamos al próximo comité?
  > Mi recomendación: bloquear hoy.

---

## OPS-1543 — Inventario de workloads movibles UY-1 → UY-2 / BR-1 (referencia)

- **Team**: Operations (OPS)
- **Type**: Task · **Priority**: Medium
- **Status**: In Progress
- **Assignee**: Mariano Silva
- **Labels**: `capacidad`, `continuidad`
- **Created**: 2026-04-09 (post-comité)

### Description (copiar tal cual)

> Action item del Comité Cloudara — capacidad y continuidad (2026-04-08,
> ACC-CLOUD-01). Si UY-1 se llena, necesitamos saber qué workloads se pueden
> mover sin impacto crítico al cliente.
>
> Inventario en construcción. Bocetado:
>
> - **Movibles a UY-2 sin impacto**: workloads batch de Energía Litoral
>   (procesamiento de lecturas, no time-sensitive). ≈ 3 pts UY-1.
> - **Movibles a BR-1 con re-config de cliente**: data warehouses de
>   Mercado Norte. Latencia OK porque no es transaccional. ≈ 4 pts UY-1.
> - **No movibles**: workloads de BAU (compliance local, latencia <10ms).
>   Workloads de Salud Plus (PII regulada, debe estar en UY).
>
> Total margen de maniobra real: ~7 pts UY-1 si nos vemos forzados.
> No alcanza si el crecimiento orgánico se sostiene.
