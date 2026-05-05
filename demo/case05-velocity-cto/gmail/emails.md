# Gmail — Threads para case05

## Thread "Roadmap Q2 — heads up"

- **Participants**: Rodrigo Acosta <rodrigo@cloudara.uy> · Lucía Castro <lucia@cloudara.uy>
- **Date**: 2026-03-28
- **Labels**: `internal`, `leadership`, `roadmap`

### Email 1 — Rodrigo → Lucía · 2026-03-28 16:42 UYT
**Subject**: Roadmap Q2 — heads up

> Hola Lu,
>
> Te escribo para adelantarte algo antes del all-hands del lunes así no te
> agarra de sorpresa: el roadmap Q2 del equipo de DEV se va a atrasar.
>
> Contexto: este trimestre tuvimos dos golpes grandes que consumieron al
> equipo backend casi en su totalidad:
>
> 1. **OPS-1432** — la caída de checkout de Mercado Norte (12 → 19 de marzo).
>    Camila y Tomás estuvieron full-time 8 días entre el fix-en-caliente y
>    el refactor del consumer de eventos. Cliente recuperado, pero el sprint
>    quedó devastado: cerramos 31 tickets vs ~50 que veníamos haciendo.
>
> 2. **SEC-204** — la vuln crítica que nos reportó el SOC de Banco Austral
>    el 24-mar. Camila otra vez al frente, 5 días para patchear, rotar
>    tokens y notificar. Cerrado el 28 (hoy).
>
> Sumando: 13 días-equipo en incidentes sobre un trimestre que para 2 devs
> backend full-time son ~60 días útiles. Eso es ~22% del capacity. Y todavía
> tenemos a Camila con vacaciones pedidas para la segunda quincena de abril.
>
> Consecuencia concreta: de las 4 features comprometidas para Q2 (Self-service
> onboarding v2, Webhooks 2.0, Audit log API, Multi-region failover), te
> proyecto que **vamos a poder cerrar 2 a lo sumo, y con la onboarding v2
> deslizándose ~2 semanas**. Las otras dos las tendría que postergar a Q3.
>
> Lo que me gustaría discutir en nuestro 1:1:
>
> - Cuáles 2 priorizamos (mi voto: onboarding v2 + webhooks 2.0 — son las
>   dos con compromiso a clientes externos).
> - Aprobación para abrir búsqueda de un backend senior más. Camila como
>   single point of failure entró a los dos incidentes y se nota.
> - Acordar una regla 70/30 de capacity (delivery / incident response) para
>   no volver a comprometer roadmap como si tuviéramos 100% disponible.
>
> No es la primera vez que pasa esto, pero esta vez está bien medido. Tengo
> los datos en Linear y en el doc "Roadmap DEV Q2 2026" del Notion del equipo.
>
> Hablamos el lunes.
>
> Abrazo,
> Rodrigo

### Email 2 — Lucía → Rodrigo · 2026-03-28 19:08 UYT
**Subject**: Re: Roadmap Q2 — heads up

> Gracias por el heads-up Ro, mejor enterarme ahora que en junio.
>
> De acuerdo en que entremos al lunes con los números a la vista. Mandame
> el doc de Notion antes así lo miro tranquila el domingo. Sobre la búsqueda
> del backend, vamos para adelante — pasame el perfil con Valentina esta
> semana.
>
> Sobre la regla 70/30 me convence; me gustaría ver cómo lo presentamos
> al resto del leadership porque va a tener implicancias en cómo prometemos
> a clientes.
>
> Lu
