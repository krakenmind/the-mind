# Slack — Mensajes para case07

---

## Channel: `#ops-alerts`

### Mensaje · Mariano Silva · 2026-04-05 09:12 UYT

> levanto 4 instancias `m5.4xlarge` en BR-1 para el load test de Mercado Norte (`OPS-1488`). IDs:
> ```
> i-09c4a1ef
> i-09c4b288
> i-09c4c310
> i-09c4d472
> ```
> Tomás @tomas las usa hoy y mañana. Apago el martes si para entonces ya cerramos.

#### Reactions
- 👍 (3) — Rodrigo, Camila, Diego
- 🚀 (1) — Tomás

#### Replies en thread

- **Tomás Vidal · 2026-04-05 09:18**
  > Confirmado, recibido el handoff. Avanzo.

- **Diego Marín · 2026-04-05 09:31**
  > Heads-up: dejá registrada la fecha estimada de apagado en el ticket.
  > La última vez se nos quedaron prendidas dos semanas.

- **Mariano Silva · 2026-04-05 09:34**
  > Anotado, está en `OPS-1488`. Tomás cierra y apaga al terminar.

---

## Channel: `#dev-backend`

### Mensaje · Tomás Vidal · 2026-04-07 18:34 UYT

> Cerré `OPS-1488`. Load test ok, p99 1.2s, 5x soportado.
>
> Una nota: **dejo las 4 VMs prendidas hasta el viernes** por si Mercado Norte pide
> repetir alguna corrida con un perfil de carga distinto. Si el viernes no
> se usa, las apago el lunes 14.

#### Reactions
- 🎉 (4) — Camila, Mariano, Rodrigo, Pablo
- 👀 (1) — Mariano

#### Replies en thread

- **Camila Núñez · 2026-04-07 18:41**
  > Buenísimo, gracias. ¿Querés que coordine la corrida con el cliente
  > o lo manejás vos?

- **Tomás Vidal · 2026-04-07 18:43**
  > Lo veo el viernes con Gabriel. Si nada confirma, apago.

- **Mariano Silva · 2026-04-07 18:48**
  > 👀 ojo con el apagado. Dejá un recordatorio en tu calendario o me
  > avisás. El runbook dice apagar al cerrar.

- **Tomás Vidal · 2026-04-07 18:50**
  > 👍 anotado, te aviso el lunes si quedan.

> _(después del 7-abr no hay más mensajes en este thread. Las VMs siguieron
> corriendo todo abril. Para la demo: mostrar este thread al lado del
> `#ops-alerts` del 5-abr y del Cost Explorer del Drive.)_

---

## Channel: `#leadership` (privado, sólo C-level)

### Mensaje · Esteban Romero · 2026-05-01 10:08 UYT

> Bajé el billing de AWS de abril del Drive — total **$48.7k** vs **$35.2k** de
> marzo. **+38%** sin cuentas nuevas firmadas. Antes de cerrar el mes
> necesito entender el delta. Voy a preguntarle a Krakenmind.

#### Reactions
- 👀 (2) — Lucía, Rodrigo

> _(este mensaje es opcional para la demo — sirve para que el demoer
> ponga en escena el momento en que el CFO decide preguntarle al asistente.)_
