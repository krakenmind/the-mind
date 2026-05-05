# Caso 4 — ¿Qué capacidad cloud estamos tratando como disponible aunque ya esté comprometida?

**Persona**: Mariano Silva (SRE Lead) o Rodrigo Acosta (CTO)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "¿Qué capacidad cloud estamos tratando como disponible aunque ya esté comprometida?"

## Lo que pasa "detrás"

Cloudara opera tres datacenters: UY-1 (Montevideo, propio), UY-2 (Pando, propio), BR-1 (AWS São Paulo). UY-1 es el más demandado: latencia baja para clientes uruguayos y compliance local. Hay un comité mensual ("Comité Cloudara — capacidad y continuidad") donde se reserva capacidad por cliente. **Pero la reserva del 8-abr no quedó marcada como "comprometida" en la vista pública del dashboard**, por un error de procedimiento (Esteban subió la minuta a Notion pero no marcó los flags en el dashboard de capacidad). Resultado: el dashboard sigue mostrando ~30% de UY-1 "disponible" cuando en realidad ya está reservado a clientes existentes.

Mientras tanto, Gabriel Ferré (preventa/AE) está trabajando dos oportunidades nuevas y en `#cliente-bau` y `#leadership` menciona que las va a apoyar con UY-1 ("hay capacidad", "lo vi en el dashboard").

A su vez, Mariano detecta en monitoreo (OPS-1567) que tres clientes existentes (BAU, MNO, SLP) están consumiendo crecimiento orgánico no planeado en UY-1. Manda mail a Rodrigo el 14-abr flageando el riesgo: "vamos a vender capacidad que ya prometimos".

Rodrigo pregunta a Krakenmind. La respuesta tiene que cruzar la minuta del comité, el slack de preventa, el ticket de monitoreo y el mail de Mariano para mostrar que tres fuentes apuntan a la misma bolsa de capacidad.

## Fuentes y evidencia

- **Notion** — minuta "Comité Cloudara — capacidad y continuidad" del 2026-04-08 (anchor `ACC-CLOUD-01`).
- **Slack** — `#leadership` y `#cliente-bau`, mensajes de Gabriel Ferré del 2026-04-13 (anchor `ACC-SLACK-01`).
- **Linear** — `OPS-1567` "Alertas de consumo zona UY-1" del 2026-04-12 (anchor `ACC-CLOUD-02`).
- **Gmail** — thread de Mariano a Rodrigo del 2026-04-14 flageando el riesgo.

## Respuesta esperada

> Estamos tratando ~30% de la capacidad de **UY-1** como "disponible" cuando en realidad ya está comprometida. Tres fuentes independientes apuntan a la misma bolsa:
>
> **1. Reserva del comité (`ACC-CLOUD-01`)** — Notion, minuta del 2026-04-08 ("Comité Cloudara — capacidad y continuidad"). En la sesión se reservó explícitamente capacidad de UY-1 para sostener el crecimiento orgánico de los clientes actuales (BAU, MNO, SLP, ENL) hasta fin de año. Esteban Romero quedó como owner de bajar la decisión al dashboard, pero la reserva **no quedó marcada como "comprometida"** en la vista pública. El dashboard sigue mostrando los slots como libres.
>
> **2. Slack preventa (`ACC-SLACK-01`)** — el 2026-04-13, Gabriel Ferré menciona en `#leadership` y `#cliente-bau` que está apoyando dos oportunidades nuevas (un retailer y una fintech) con capacidad UY-1, basándose en lo que ve en el dashboard ("hay margen, lo confirmé"). **Estas oportunidades no tienen reserva nominada** y compiten por la misma capacidad ya prometida en (1).
>
> **3. Consumo real (`ACC-CLOUD-02`)** — Linear OPS-1567 del 2026-04-12. Mariano detectó que BAU, MNO y SLP están consumiendo crecimiento no planeado en UY-1 (BAU +18% mom, MNO +24% mom, SLP +11% mom). Si esa curva se sostiene, la reserva del comité se queda corta antes de fin de año, y eso es **antes** de sumar las oportunidades nuevas de (2).
>
> **4. Confirmación interna** — el 2026-04-14, Mariano mandó mail a Rodrigo flageando exactamente este riesgo: "vamos a vender capacidad que ya prometimos a clientes existentes que encima están creciendo".
>
> ## Decisión recomendada
>
> 1. **Bloquear UY-1** en el dashboard hoy mismo: marcar como "comprometida" la capacidad reservada en el comité del 8-abr. Owner: Esteban (que es quien tenía el to-do).
> 2. **Las dos oportunidades nuevas de Gabriel no se cierran sin reserva nominada en UY-1**. Si UY-1 ya no entra, ofrecer UY-2 o BR-1 como alternativas (con la conversación de latencia que esto implica).
> 3. **Re-correr el forecast** con el crecimiento real visto en OPS-1567 antes del próximo comité (mayo).
> 4. **Cambio de proceso**: que las decisiones de capacidad del comité escriban directo al dashboard, no por una persona en una to-do list. Es el bug que disparó este caso.
>
> Evidencia citable: ACC-CLOUD-01, ACC-SLACK-01, ACC-CLOUD-02 + mail Mariano→Rodrigo del 2026-04-14.

## Por qué es valioso

Este es el caso más alto en valor de los 4: una decisión de C-level que cruza información de finance/ops/sales/eng y que hoy nadie ve completa porque cada quien mira su propia herramienta. Krakenmind hace visible la inconsistencia entre lo que el dashboard dice, lo que el comité acordó, lo que preventa promete y lo que el monitoreo muestra. No es un "search" — es una respuesta razonada con citas que evita un commit comercial sobre capacidad ya gastada.
