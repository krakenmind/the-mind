# Gmail — Threads para case10

## Email 1: Lautaro mencionando que están "evaluando alternativas"

- **From**: Lautaro Bermúdez <lautaro.bermudez@mercadonorte.uy>
- **To**: Gabriel Ferré <gabriel@cloudara.uy>
- **CC**: _(ninguno)_
- **Subject**: Renovación 2026 — quería ser transparente
- **Date**: 2026-03-18 16:42 UYT

### Contenido (copiar tal cual)

> Gabriel,
>
> Te escribo en frío para darte un heads-up antes de que entremos a la
> negociación formal de la renovación.
>
> Como conversamos en el QBR pasado, venimos contentos con el equipo y con
> el delivery del producto. Pero también tengo que ser honesto: en el
> directorio nos pidieron mirar qué hay en el mercado para 2026-2028 antes
> de renovar automáticamente. Estamos pidiendo cotizaciones a un par de
> alternativas (no te voy a decir cuáles, no es contra ustedes, es proceso
> formal del board).
>
> Lo que te puedo adelantar de cómo lo estamos pensando:
>
> 1. El servicio en sí está OK. Engineering no nos está fallando.
> 2. Service Desk nos está fallando bastante. La sensación interna es que
>    los tickets se demoran y eso nos pega en operación. El equipo de
>    Sofía me lo plantea casi semanal.
> 3. Cualquier propuesta de renovación que venga **sin** una mejora
>    explícita en service desk va a ser difícil de defender internamente.
> 4. Sobre precio: estamos pensando en mantener el ticket actual. Subir
>    sería difícil de justificar dado el punto 2.
>
> Te lo digo de antemano para que no nos pase como el año pasado con
> [otro proveedor], que llegamos a la mesa con expectativas muy distintas
> y se rompió la conversación.
>
> Cualquier cosa hablamos.
>
> Saludos,
>
> **Lautaro Bermúdez**
> IT Director — Mercado Norte S.A.
> lautaro.bermudez@mercadonorte.uy

---

## Email 2: forward interno de Gabriel

- **From**: Gabriel Ferré <gabriel@cloudara.uy>
- **To**: Lucía Castro <lucia@cloudara.uy>, Esteban Romero <esteban@cloudara.uy>
- **CC**: Andrea Pérez <andrea@cloudara.uy>
- **Subject**: Fwd: Renovación 2026 — quería ser transparente
- **Date**: 2026-03-18 17:20 UYT

### Contenido (copiar tal cual)

> Equipo,
>
> Forward de lo que me mandó Lautaro hace un rato. Resumen:
>
> - Están pidiendo cotizaciones a alternativas (no nos dijo cuáles).
> - El producto OK, pero **Service Desk los está matando**.
> - Cualquier propuesta sin mejora de SD se rechaza.
> - **Precio: piden mantener** (cualquier lift es difícil).
>
> Mi lectura: descartamos Tier C (+10%). Tier B (+5%) solo si vamos con
> compromiso explícito de mejora en SD. Tier A (Flat) si Esteban ve que
> el margen aguanta.
>
> Voy a armar la cotización formal con tres tiers para que Esteban analice
> la sensibilidad. Reunión interna esta semana?
>
> Gabriel

---

## Email 3: postmortem enviado al cliente (cruza con case08)

- **From**: Mariano Silva <mariano@cloudara.uy>
- **To**: Lautaro Bermúdez <lautaro.bermudez@mercadonorte.uy>, Sofía Linares <sofia.linares@mercadonorte.uy>
- **CC**: Gabriel Ferré <gabriel@cloudara.uy>, Lucía Castro <lucia@cloudara.uy>
- **Subject**: Postmortem PMT-2026-03 — Incidente Checkout-Web marzo
- **Date**: 2026-04-20 11:30 UYT
- **Adjuntos**: `PMT-2026-03_Mercado_Norte_checkout.pdf`

### Contenido (copiar tal cual)

> Lautaro, Sofía,
>
> Como prometimos en el QBR Q1, les envío el postmortem completo del
> incidente del Checkout-Web de marzo (8-mar al 16-mar). En el PDF están
> la cronología, el análisis de causa raíz y las acciones correctivas
> que ya aplicamos.
>
> Resumen rápido:
>
> - Causa raíz: saturación del pool de conexiones del SDK del PSP tras
>   un upgrade de versión. No fue una caída total, fueron 8 días de
>   degradación intermitente con 4h 23m de downtime efectivo bajo la
>   definición contractual del MSA.
> - Fix: pool ampliado de 50 a 200 conexiones + circuit breaker.
> - Aprendizaje: agregamos los upgrades del PSP a la lista de cambios
>   sensibles del comité de change.
>
> En cuanto a la disponibilidad efectiva del mes y el credit que
> corresponde, Andrea Pérez (Legal) está coordinando con Pedro Reyes
> en una conversación aparte. La cifra que Pedro mencionó (99.42%)
> proviene de un dashboard genérico nuestro que mezcla degradación
> parcial con downtime. Bajo la definición contractual estricta del
> MSA (Sección 4.2), la disponibilidad fue de 99.83%. Esa diferencia
> y el credit asociado lo van a cerrar Andrea y Pedro entre esta
> semana y la próxima.
>
> Quedo a disposición para cualquier consulta técnica.
>
> Saludos,
>
> **Mariano Silva**
> SRE Lead · Cloudara

---

## Email 4: respuesta de Lautaro mencionando que esto pesa en la negociación

- **From**: Lautaro Bermúdez <lautaro.bermudez@mercadonorte.uy>
- **To**: Mariano Silva <mariano@cloudara.uy>
- **CC**: Gabriel Ferré <gabriel@cloudara.uy>, Sofía Linares <sofia.linares@mercadonorte.uy>, Pedro Reyes <pedro.reyes@mercadonorte.uy>
- **Subject**: Re: Postmortem PMT-2026-03 — Incidente Checkout-Web marzo
- **Date**: 2026-04-20 18:14 UYT

### Contenido (copiar tal cual)

> Mariano, gracias por el postmortem, lo voy a leer con detalle.
>
> Gabriel, sumo a Pedro al hilo. Lo que paso a Pedro es que esta conversación
> técnica del incidente y el credit asociado se va a leer junto con la
> propuesta de renovación. No quiero que sea un quid pro quo cerrado, pero
> tampoco vamos a ir a la mesa de renovación con un reclamo abierto. La
> expectativa nuestra es que cuando llegue la propuesta de Cloudara para
> 2026-2028, el tema del incidente de marzo ya esté cerrado de forma justa.
>
> Saludos,
> Lautaro

---

## Email 5: respuesta interna de Lucía a Gabriel

- **From**: Lucía Castro <lucia@cloudara.uy>
- **To**: Gabriel Ferré <gabriel@cloudara.uy>, Esteban Romero <esteban@cloudara.uy>, Andrea Pérez <andrea@cloudara.uy>
- **Subject**: Re: Postmortem PMT-2026-03 — Incidente Checkout-Web marzo
- **Date**: 2026-04-20 19:05 UYT

### Contenido (copiar tal cual)

> Equipo,
>
> Confirmado lo que veníamos hablando: Lautaro está atando el credit del
> incidente con la renovación. No es agresivo pero es claro.
>
> Andrea: cerrá el credit con Pedro la semana que viene. Mi lectura:
> ofrecer el 5% (USD 925, lectura contractual estricta) con explicación
> clara y postmortem. Si pelea fuerte, podemos subir a 7-8% como gesto,
> pero no llegar al 15%. Coordiná conmigo antes de mandar.
>
> Gabriel: la cotización con tres tiers la presentamos DESPUÉS de cerrar
> el credit. No antes. Trabajá con Esteban (FIN-512) para tener el
> análisis de margen listo el 15-may.
>
> Lucía
