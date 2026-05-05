# Caso 7 — Spike de costos cloud sin cuentas nuevas

**Persona**: Esteban Romero (CFO) · validación cruzada de Mariano Silva (SRE Lead)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "El billing de AWS de este mes subió 38% sin que firmáramos clientes nuevos. ¿Qué pasó?"

## Lo que pasa "detrás"

El 5-abr Mariano levantó 4 instancias `m5.4xlarge` en AWS BR-1 para correr un load test pedido por Mercado Norte (preparándose para Black Friday). El test estaba tracado en `OPS-1488`, asignado a Tomás Vidal. Mariano avisó en `#ops-alerts` que las VMs subían y Tomás cerró el ticket el 7-abr cuando el load test terminó.

Pero al cerrar, Tomás escribió en `#dev-backend` que dejaba las VMs prendidas "por si necesitamos correrlo de nuevo el viernes". Ese viernes nadie volvió a correr el test. Las cuatro instancias quedaron prendidas el resto del mes — 25 días extra a $4.5k/mes cada una contribuyen los $13.5k de delta que el CFO ve hoy.

El runbook de "Load tests" en Notion tiene el step de apagar VMs al terminar. Tomás se lo salteó. La factura de abril llegó al Drive el 1-may con el total de $48.7k vs $35.2k del mes anterior. Esteban quiere saber qué pasó antes de cerrar el cierre del mes.

Krakenmind tiene que cruzar Drive (el PDF de la factura + el CSV de breakdown) + Linear (`OPS-1488`) + Slack (`#ops-alerts` del 5-abr y `#dev-backend` del 7-abr) + Notion (runbook de load tests) y darle al CFO la causa raíz, el responsable, y la acción correctiva.

## Fuentes y evidencia

- **Google Drive** — "AWS Billing — Abril 2026.pdf" (total $48.7k) y "AWS Cost Explorer Apr 2026 breakdown.csv" (delta principal: EC2 m5.4xlarge en BR-1 desde 5-abr).
- **Linear** — `OPS-1488` (load test Mercado Norte, asignado a Tomás Vidal, status Done el 7-abr).
- **Slack** — `#ops-alerts` mensaje de Mariano del 2026-04-05 09:12 UYT levantando 4 m5.4xlarge; `#dev-backend` mensaje de Tomás del 2026-04-07 18:34 UYT diciendo que las deja prendidas.
- **Notion** — runbook "Load tests — proceso operativo" con el checklist de apagado al final.

## Respuesta esperada

> El spike de **$13.5k** (AWS abril 2026 = $48.7k vs marzo 2026 = $35.2k, +38.4%) está concentrado en EC2: **4 instancias `m5.4xlarge` en region BR-1** levantadas el 2026-04-05 a las 09:12 UYT y nunca apagadas (instance IDs `i-09c4...` en el CSV de Cost Explorer).
>
> Las levantó Mariano Silva ese día para correr un load test de Mercado Norte tracado en `OPS-1488` (assigned: Tomás Vidal). El test terminó el 2026-04-07 y el ticket se cerró ese mismo día. Pero en `#dev-backend` (07-abr 18:34) Tomás dejó constancia: *"load test terminó, dejo las VMs por si necesitamos correrlo de nuevo el viernes"*. Ese viernes nadie volvió a correr el test, y las VMs quedaron prendidas 25 días extra a ~$135/día cada una (~$13.5k de delta).
>
> El runbook "Load tests — proceso operativo" (Notion, sección final) explícitamente lista en el checklist de cierre: *"Apagar todas las instancias de test al finalizar — owner del ticket"*. Ese paso se saltó.
>
> **Acciones (en orden):**
> 1. **Apagar las 4 instancias AHORA.** Owner: Mariano Silva (puede ejecutarlo en minutos). Cierre con captura del estado terminated antes del próximo billing cycle.
> 2. **Alerta de Cost Explorer en BR-1**: trigger si el gasto mensual proyectado supera $5k en EC2. Owner: Mariano. Linear ticket nuevo: `OPS-1532` (a crear).
> 3. **Convertir el step de apagado en bloqueante** en el runbook: el ticket de load test no se puede cerrar sin captura del comando de terminate. Owner: Mariano + revisión Esteban.
> 4. Conversación de feedback con Tomás (no es un tema de billing — es un tema de proceso).

## Por qué es valioso

El CFO recibe la causa raíz en 30 segundos: ticket, fecha, responsable, monto exacto, acción correctiva. Sin Krakenmind, esto requiere bajar el CSV, mirarlo en Excel, preguntarle a SRE si recuerda algo del 5-abr, buscar en Slack, encontrar el ticket. 1+ horas y 3 personas.
