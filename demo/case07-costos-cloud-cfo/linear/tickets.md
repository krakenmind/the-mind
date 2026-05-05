# Linear — Tickets para case07

## OPS-1488 — Load test Mercado Norte para escalar Black Friday

- **Team**: Cloud Ops (OPS)
- **Type**: Task · **Priority**: Medium
- **Status**: Done
- **Assignee**: Tomás Vidal · **Reporter**: Mariano Silva
- **Cliente**: Mercado Norte
- **Labels**: `cliente:mno`, `load-test`, `capacity-planning`, `region:br-1`
- **Created**: 2026-04-04 16:08 UYT
- **Started**: 2026-04-05 09:00 UYT
- **Resolved**: 2026-04-07 18:30 UYT

### Description (copiar tal cual)

> Mercado Norte pidió que validemos su capacity para Black Friday 2026.
> Plan: levantar un cluster ad-hoc de 4 nodos `m5.4xlarge` en BR-1, simular
> ~5x el tráfico pico de noviembre 2025 contra Hornero-API, y entregar
> reporte con throughput, latencia p50/p95/p99, y errores.
>
> **Owner del runbook**: ver Notion "Load tests — proceso operativo".
> **Owner del ticket**: Tomás Vidal (responsable de ejecución y cierre,
> incluyendo apagado de VMs al terminar).
>
> Costo estimado del test: ~3 días × 4 instancias × ~$135/día = **~$1.6k**.
> Aprobado por Mariano dentro del budget mensual de OPS.

### Comments

- **Mariano Silva · 2026-04-05 09:12 UYT**
  > Levanté las 4 m5.4xlarge en BR-1, ya las pasé al pool de Tomás.
  > IDs: `i-09c4a1ef`, `i-09c4b288`, `i-09c4c310`, `i-09c4d472`.
  > Te las dejo a vos para que ejecutes el load test, y te recuerdo
  > apagarlas al cerrar (está en el runbook). Tomás @tomas las usa hoy
  > y mañana. Apago el martes si para entonces ya cerramos.

- **Tomás Vidal · 2026-04-05 09:18 UYT**
  > Confirmado, recibido el handoff. Avanzo.

- **Diego Marín · 2026-04-05 09:31 UYT**
  > Heads-up: dejá registrada la fecha estimada de apagado en el
  > ticket. La última vez se nos quedaron prendidas dos semanas.

- **Mariano Silva · 2026-04-05 09:34 UYT**
  > Anotado, está en `OPS-1488`. Tomás cierra y apaga al terminar.

- **Tomás Vidal · 2026-04-05 14:42 UYT**
  > Tomadas. Empiezo el primer run a las 15:00.

- **Tomás Vidal · 2026-04-07 18:30 UYT**
  > Test terminado. Resultados en el doc del cliente. Pico simulado
  > 5x soportado, p99 1.2s (target 1.5s). Cerrando ticket.

- **Tomás Vidal · 2026-04-07 18:32 UYT**
  > Nota: dejo las 4 VMs corriendo por si necesitamos hacer una corrida
  > más el viernes (revisión con el cliente). Si el viernes no se usa,
  > las apago el lunes.

- **Tomás Vidal · 2026-04-07 18:34 UYT**
  > Aprovecho a dejar lo mismo acá para que quede explícito en el
  > ticket: cerré OPS-1488. Load test ok, p99 1.2s, 5x soportado.
  >
  > Una nota: **dejo las 4 VMs prendidas hasta el viernes** por si
  > Mercado Norte pide repetir alguna corrida con un perfil de carga
  > distinto. Si el viernes no se usa, las apago el lunes 14.

- **Camila Núñez · 2026-04-07 18:41 UYT**
  > Buenísimo, gracias. ¿Querés que coordine la corrida con el cliente
  > o lo manejás vos?

- **Tomás Vidal · 2026-04-07 18:43 UYT**
  > Lo veo el viernes con Gabriel. Si nada confirma, apago.

- **Mariano Silva · 2026-04-07 18:48 UYT**
  > 👀 ojo con el apagado. Dejá un recordatorio en tu calendario o me
  > avisás. El runbook dice apagar al cerrar.

- **Tomás Vidal · 2026-04-07 18:50 UYT**
  > 👍 anotado, te aviso el lunes si quedan.

> _(no hay comentarios posteriores. El ticket sigue en estado Done.
> Las VMs no se apagaron — Tomás nunca avisó el lunes y nadie
> validó.)_

---

## OPS-1532 — (a crear) Alerta Cost Explorer BR-1 + bloqueo en runbook load tests

- **Team**: Cloud Ops (OPS)
- **Type**: Task · **Priority**: High
- **Status**: Backlog (placeholder, a crear como follow-up de la demo)
- **Assignee**: Mariano Silva · **Reporter**: Esteban Romero
- **Labels**: `finops`, `prevention`, `runbook`
- **Created**: pendiente

### Description (placeholder, a crear)

> Follow-up al spike de billing AWS abril 2026 (+38%).
>
> 1. Configurar alerta en AWS Cost Explorer:
>    - Trigger: gasto mensual proyectado en region BR-1 supera $5k en EC2.
>    - Destinatarios: mariano@cloudara.uy, esteban@cloudara.uy.
> 2. Modificar runbook "Load tests — proceso operativo":
>    - El step "Apagar instancias" pasa a bloqueante.
>    - Cierre de ticket de load test requiere capturar el output del
>      `aws ec2 terminate-instances` o equivalente.
> 3. Audit mensual de instancias EC2 huérfanas (>7 días sin etiqueta
>    de proyecto activo).
