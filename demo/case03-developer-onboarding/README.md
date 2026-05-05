# Caso 3 — Onboarding: ¿cómo deployo a Banco Austral?

**Persona**: Developer nuevo en su primera semana
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Soy nuevo en Cloudara, tengo que deployar un cambio al backend de Banco Austral. ¿Cuál es el proceso?"

## Lo que pasa "detrás"

Federico Aguirre arrancó esta semana como dev backend. Tiene su primer ticket asignado: un fix chico en el servicio de notificaciones de Banco Austral. Le dijeron "deployalo cuando esté el PR aprobado", pero Cloudara tiene un proceso de change management estricto para BAU (es banca, hay regulación), y no es trivial encontrar todo el contexto:

- Hay un runbook en Notion con los criterios.
- Hay un epic de Linear (`OPS-2026-Q2`) que limita qué tickets se pueden deployar este trimestre.
- Hay un doc de arquitectura del backend de BAU en Drive.
- Hay un thread de bienvenida en Gmail con accesos.
- Hay un pinned message en Slack `#cliente-bau` con la ventana de change.

Federico pregunta a Krakenmind. La respuesta tiene que sintetizar los 5 fragmentos en una checklist accionable.

## Fuentes y evidencia

- **Linear** — epic `OPS-2026-Q2` "Cambios autorizados Banco Austral Q2" (lista los tickets aceptados para deploy en el trimestre).
- **Notion** — runbook "Deploy a producción — Banco Austral" con los criterios y el flujo.
- **Google Drive** — doc "Arquitectura backend BAU v3.pdf" (qué servicios hay y cuál tocás).
- **Gmail** — thread de bienvenida con Mariano y Camila ("acá tenés los accesos…").
- **Slack** — `#cliente-bau`, pinned message con la ventana de change management.

## Respuesta esperada

> Bienvenido. El deploy a producción de Banco Austral pasa por change management estricto. Pasos:
>
> **1. Confirmá que tu PR está atado a un ticket bajo el epic `OPS-2026-Q2`** ("Cambios autorizados Banco Austral Q2"). Solo los tickets listados ahí están autorizados a salir a prod este trimestre. Si tu cambio no está en el epic, hablá con Mariano Silva antes de seguir — agregar un ticket fuera de epic requiere su aprobación explícita y, según el monto del cambio, una nota a Andrea Pérez (Legal) para revisión regulatoria.
>
> **2. PR aprobado + tests verdes**. El runbook "Deploy a producción — Banco Austral" en Notion (`Cloudara HQ / Cloud Ops / Runbooks / BAU`) lista los criterios:
> - 1 reviewer del equipo backend (Camila o Tomás).
> - 1 reviewer de SRE (Mariano).
> - CI verde en `main` después del merge.
> - Si tocás `payments-svc` o `auth-svc`, también necesitás OK explícito de Mariano por riesgo regulatorio.
>
> **3. Esperá la ventana de change management**: martes y jueves de **22:00 a 00:00 UYT**. Está fijado como pinned message en `#cliente-bau` (lo pinneó Lucía Castro el 2026-01-15). Fuera de esa ventana solo se deploya con un hotfix aprobado por Mariano + Lucía Castro.
>
> **4. Antes de arrancar, posteá en `#cliente-bau`**: "arranco deploy de \<ticket\>, ETA \<X\>". Cuando termine, posteá "deploy completo, validando salud". Si algo se rompe, rollback automático con `kubectl rollout undo` (el runbook lo detalla).
>
> **5. Validación post-deploy**: el runbook tiene una checklist de smoke tests que tenés que correr (login, transacción dummy, query de saldo). Si todos pasan, marcás el ticket como Done. Si alguno falla, rollback inmediato.
>
> **Contexto útil**:
> - El doc "Arquitectura backend BAU v3.pdf" en Drive (carpeta `Engineering / Architecture / BAU`) te muestra qué microservicios hay y cuál estás tocando.
> - Los accesos a los entornos vienen del thread de bienvenida que te mandaron Mariano y Camila el 2026-04-28. Si te falta alguno, escribíle a Valentina Otero (People Ops).
> - Lucía Mendoza (SD Lead) recomienda tener `#cliente-bau` siempre abierto durante el deploy por si el cliente pregunta.

## Por qué es valioso

El onboarding técnico en empresas con clientes regulados es un dolor: el conocimiento está fragmentado entre runbooks, epics, docs de arquitectura, threads de Slack y emails de bienvenida. Krakenmind reemplaza el "preguntale a Mariano" (que es senior y caro) por una respuesta sintetizada con citas, en 30 segundos. El dev nuevo es productivo en su primera semana.
