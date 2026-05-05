# Gmail — Threads para case04

## Email 1: Mariano flagea el riesgo a Rodrigo

- **From**: Mariano Silva <mariano@cloudara.uy>
- **To**: Rodrigo Acosta <rodrigo@cloudara.uy>
- **CC**: esteban@cloudara.uy
- **Subject**: ⚠️ Capacidad UY-1: vamos a vender lo que ya prometimos
- **Date**: 2026-04-14 09:48 UYT

### Contenido (copiar tal cual)

> Rodrigo,
>
> Pongo por escrito un riesgo que viene cocinándose hace unos días, porque
> creo que hay que tomar decisión esta semana antes de que sea más caro.
>
> ## TL;DR
>
> Estamos en camino a vender capacidad de UY-1 que ya está prometida (en los
> hechos, aunque no en el dashboard) a clientes existentes. Tres fuentes
> independientes apuntan a lo mismo:
>
> 1. **Comité del 8-abr** (minuta en Notion, anchor ACC-CLOUD-01): se
>    reservaron 28 pts de UY-1 para crecimiento orgánico de BAU, MNO, SLP.
>    Esteban quedó con la action item de bajarlo al dashboard antes del 14.
>    Hoy es 14 y todavía no está aplicado: el dashboard sigue mostrando
>    ~32% libre cuando en realidad lo libre real es ~4%.
>
> 2. **Slack #leadership y #cliente-bau del 13-abr** (anchor ACC-SLACK-01):
>    Gabriel está empujando dos oportunidades nuevas (un retailer y una
>    fintech) basándose en lo que ve en el dashboard. En su mensaje del
>    13-abr a las 16:42 dice textual "confirmé en el dashboard de capacidad
>    que UY-1 tiene ~32% libre". Le dejé un mensaje en #cliente-bau pidiendo
>    charlar offline; viajó y quedó pendiente.
>
> 3. **OPS-1567** (alerta automática del 12-abr, anchor ACC-CLOUD-02):
>    BAU, MNO y SLP están consumiendo crecimiento orgánico **por encima**
>    del baseline (BAU +18%, MNO +24%, SLP +11%). El forecast del comité
>    asumía esos números, pero la curva real ya los iguala. Si se sostiene
>    → 90% UY-1 hacia 2026-07-15.
>
> Es decir: la capacidad que el comité reservó ya se está consumiendo, el
> dashboard no refleja la reserva, y preventa está vendiendo en base al
> dashboard. Si cerramos las dos oportunidades nuevas a UY-1, en julio
> tenemos un problema: o migramos workloads de clientes (caro y feo), o
> compramos racks de urgencia (6-8 semanas de lead time mínimo), o
> degradamos SLO. Ninguna es buena.
>
> ## Decisión recomendada
>
> 1. **Bloquear UY-1 en el dashboard hoy mismo**. Que Esteban marque los
>    28 pts como "comprometida" y bajemos el "disponible" público a 4 pts.
> 2. **Pausar las dos oportunidades nuevas en UY-1**. Gabriel re-cotiza con
>    UY-2 o BR-1 como destino. Si el cliente exige UY-1, escalamos a Lucía
>    para evaluar caso por caso.
> 3. **Adelantar el forecast** al próximo comité (no esperar a 2026-05-13):
>    proponer reunión esta semana o la próxima.
> 4. **Cambio de proceso**: que las decisiones del comité escriban directo
>    al dashboard, no por to-do humano. Es exactamente el tipo de error que
>    siempre va a pasar si dependemos de que alguien lo recuerde.
>
> Con OPS-1543 estoy armando el inventario de workloads movibles. Adelanto
> que el margen real de maniobra es ~7 pts si tuviéramos que mover cosas,
> y eso no alcanza si el crecimiento se sostiene.
>
> Avisame cómo seguimos. Yo puedo armar la propuesta para Lucía y Esteban
> si querés, pero necesito tu OK para pausar UY-1 antes de que Gabriel
> avance con cliente.
>
> Saludos,
> Mariano

---

## Email 2: respuesta de Rodrigo

- **From**: Rodrigo Acosta <rodrigo@cloudara.uy>
- **To**: Mariano Silva <mariano@cloudara.uy>
- **CC**: esteban@cloudara.uy, lucia@cloudara.uy
- **Subject**: Re: ⚠️ Capacidad UY-1: vamos a vender lo que ya prometimos
- **Date**: 2026-04-14 10:25 UYT

### Contenido (copiar tal cual)

> Mariano,
>
> Gracias por escribirlo así de claro. Sumo a Lucía en CC porque esto
> termina siendo decisión comercial de ella también.
>
> Estoy de acuerdo con bloquear UY-1 hoy. Esteban, ¿podés actualizar el
> dashboard antes de las 14hs? Ya con eso evitamos que Gabriel siga
> cotizando sobre un número falso.
>
> Para las dos oportunidades nuevas: que Gabriel arme alternativas con UY-2
> y BR-1 para llevar a cliente. Si no entran ahí, lo subimos al comité.
>
> Sobre el cambio de proceso (decisiones del comité → dashboard
> automático): coincido 100%. Lo metemos como tema en el comité del 13-may.
>
> Mariano, ¿podés tirar invitación para una sesión esta semana con Lucía,
> Esteban, vos y yo, para cerrar el plan?
>
> Saludos,
> Rodrigo

---

## Email 3: respuesta de Esteban (ack)

- **From**: Esteban Romero <esteban@cloudara.uy>
- **To**: Rodrigo Acosta <rodrigo@cloudara.uy>, Mariano Silva <mariano@cloudara.uy>
- **CC**: lucia@cloudara.uy
- **Subject**: Re: ⚠️ Capacidad UY-1: vamos a vender lo que ya prometimos
- **Date**: 2026-04-14 10:42 UYT

### Contenido (copiar tal cual)

> Recibido. Mea culpa por la action item — la tenía agendada pero se me
> pasó el lunes. Antes de las 14hs queda el dashboard con los 28 pts
> marcados como "comprometida". También voy a revisar los otros dashboards
> por si hay otras decisiones del comité que no aterrizaron.
>
> Mariano, hoy te paso captura cuando esté.
>
> Saludos,
> Esteban
