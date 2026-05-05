# Caso 3 — Onboarding: ¿cómo deployo a Banco Austral?

**Persona**: Developer nuevo en su primera semana
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Soy nuevo en Cloudara, tengo que deployar un cambio al backend de Banco Austral. ¿Cuál es el proceso?"

## Lo que pasa "detrás"

Federico Aguirre arrancó esta semana como dev backend. Tiene su primer ticket asignado: un fix chico en `bau-core-client` (DEV-1219, "timeout configurable en cliente HTTP a core bancario"). Le dijeron "deployalo cuando esté el PR aprobado", pero Cloudara tiene un proceso de change management estricto para BAU (es banca, hay regulación), y no es trivial encontrar todo el contexto:

- Hay un epic de Linear (`OPS-2026-Q2`) que limita qué tickets se pueden deployar este trimestre.
- Hay un README en el repo `cloudara/bau-core-client` con la sección `## Deploy`.
- Hay un workflow `.github/workflows/deploy-prod.yml` con approval gate.
- Hay un runbook en Notion con los criterios paso a paso.
- Hay un doc de arquitectura del backend de BAU en Drive.
- Hay un thread de bienvenida en Gmail con accesos y pareo.

Federico pregunta a Krakenmind. La respuesta tiene que sintetizar los 6 fragmentos en una checklist accionable.

## Fuentes y evidencia

- **Linear** — epic `OPS-2026-Q2` "Cambios autorizados Banco Austral Q2" (lista los tickets aceptados para deploy en el trimestre, incluye el comment thread con el heads-up de Federico).
- **GitHub** — repo `cloudara/bau-core-client`:
  - `README.md` con sección `## Deploy` que apunta al runbook y al workflow.
  - `.github/workflows/deploy-prod.yml` con job de aprobación manual por environment `bau-prod`, secrets nombrados (Linear, AWS OIDC, ECR, Notion), build → push ECR → deploy EKS → smoke tests → rollback automático.
  - Branch protection en `main`: 2 approvals (1 backend + 1 SRE de CODEOWNERS), signed commits, linear history, status checks obligatorios.
  - `.github/GITHUB_ACTIONS_README.md` con cómo se enciende un deploy y quién aprueba.
- **Notion** — runbook "Deploy a producción — Banco Austral" con los criterios y el flujo, **+** bitácora "Reconfirmación 2026 de la ventana de change management BAU" con la decisión institucional firmada por Lucía Castro.
- **Google Drive** — doc "Arquitectura backend BAU v3.pdf" (qué servicios hay y cuál tocás).
- **Gmail** — thread de bienvenida con Mariano y Camila ("acá tenés los accesos…", el pareo del martes).

## Respuesta esperada

> Bienvenido. El deploy a producción de Banco Austral pasa por change management estricto. Pasos:
>
> **1. Confirmá que tu PR está atado a un ticket bajo el epic `OPS-2026-Q2`** ("Cambios autorizados Banco Austral Q2"). Solo los tickets listados ahí están autorizados a salir a prod este trimestre. Si tu cambio no está en el epic, hablá con Mariano Silva antes de seguir — agregar un ticket fuera de epic requiere su aprobación explícita y, según el monto del cambio, una nota a Andrea Pérez (Legal) para revisión regulatoria.
>
> **2. PR aprobado + tests verdes**. El repo `cloudara/bau-core-client` tiene branch protection en `main`: 2 approvals obligatorios (1 backend del CODEOWNERS — Camila o Tomás — y 1 SRE — Mariano), commits firmados, linear history, y todos los status checks de `ci.yml` en verde. El runbook "Deploy a producción — Banco Austral" en Notion (`Cloudara HQ / Cloud Ops / Runbooks / BAU`) suma:
> - Si tocás `payments-svc` o `auth-svc`, OK explícito de Mariano en el ticket por riesgo regulatorio.
> - Si tocás schema de DB, revisar primero con Diego Marín.
>
> **3. Disparás el deploy con el workflow `.github/workflows/deploy-prod.yml`** (Actions → Deploy to bau-prod → Run workflow). Inputs: `ticket` (DEV-1219) y `version` (tag, ej. `v1.4.2`). El workflow:
> 1. Valida que el ticket esté en el epic OPS-2026-Q2 (si no, falla y no toca prod).
> 2. Buildea y pushea la imagen a ECR de BAU.
> 3. Pausa en el environment `bau-prod` esperando aprobación manual de un reviewer del team SRE (Mariano titular, Diego suplente). **Hasta que no aprueben, no se toca prod.**
> 4. Hace `kubectl set image` + `rollout status` en EKS `bau-prod`.
> 5. Corre smoke tests; si fallan, hace `kubectl rollout undo` automático.
> 6. Postea fila en el log de cambios BAU 2026 (Notion) vía API.
>
> Si es tu primera vez, leé `.github/GITHUB_ACTIONS_README.md` del repo, tiene el detalle del approval gate y los secrets.
>
> **4. Esperá la ventana de change management**: martes y jueves de **22:00 a 00:00 UYT**. Está documentada en el runbook y reconfirmada para 2026 en la bitácora de Lucía Castro del 2026-01-15. Fuera de esa ventana solo se deploya con un hotfix aprobado por Mariano + Lucía Castro y coordinación previa con Sebastián Calero (BAU). No hay bypass técnico — el approval gate del workflow es el mismo.
>
> **5. Validación post-deploy**: el workflow ya corre los smoke tests (login, transacción dummy, query de saldo, extracto). Si todos pasan, marcás el ticket como Done en Linear con el commit hash y la hora. Si alguno falla, el rollback automático ya corrió: avisá inmediato en `#cliente-bau` y abrí incidente con SEV-2 mínimo.
>
> **Contexto útil**:
> - El doc "Arquitectura backend BAU v3.pdf" en Drive (carpeta `Engineering / Architecture / BAU`) te muestra qué microservicios hay y cuál estás tocando. Para DEV-1219 tocás `bau-core-client` (librería compartida — un cambio impacta auth-svc, payments-svc y accounts-svc; el README del repo lo aclara).
> - Los accesos a los entornos vienen del thread de bienvenida que te mandaron Mariano y Camila el 2026-04-28. Si te falta alguno, escribíle a Valentina Otero (People Ops).
> - Camila confirmó en el thread de Linear que va a estar conectada el martes 06-may a las 22hs para parejarte el primer deploy. **No deployes solo la primera vez** — es la regla cultural, no técnica.

## Por qué es valioso

El onboarding técnico en empresas con clientes regulados es un dolor: el conocimiento está fragmentado entre runbooks, epics, docs de arquitectura, threads de Slack y emails de bienvenida. Krakenmind reemplaza el "preguntale a Mariano" (que es senior y caro) por una respuesta sintetizada con citas, en 30 segundos. El dev nuevo es productivo en su primera semana.
