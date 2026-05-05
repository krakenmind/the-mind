# Google Drive — Archivos para case03

## Archivo: `Arquitectura backend BAU v3.pdf`

- **Path**: My Drive / Cloudara / Engineering / Architecture / BAU / Arquitectura backend BAU v3.pdf
- **Owner**: rodrigo@cloudara.uy
- **Shared with**: dev@cloudara.uy (group), sre@cloudara.uy (group)
- **Uploaded**: 2026-03-12 17:40 UYT (versión 3, reemplaza v2 de 2025-09)
- **Size**: 2.4 MB
- **Type**: PDF

### Contenido (descripción de lo que contiene el PDF — copiar tal cual como "extracto" si la demo lo pide)

> # Arquitectura backend Banco Austral · v3
>
> **Autor**: Rodrigo Acosta (CTO)
> **Reviewers**: Mariano Silva, Camila Núñez
> **Versión**: 3.0 · marzo 2026
> **Cliente**: Banco Austral (BAU)
>
> ---
>
> ## 1. Vista general
>
> El backend que Cloudara opera para BAU es un sistema de microservicios
> en Kubernetes (cluster `bau-prod`, hosteado en BR-1 / AWS São Paulo
> con réplica fría en UY-1). Frente a las apps móviles y web del banco,
> exponemos un API gateway que enruta a 6 servicios principales.
>
> ## 2. Servicios
>
> ### 2.1 `bau-api-gateway`
> Gateway principal. Termina TLS, valida JWT, enruta a servicios internos.
> Repo: `cloudara-org/bau-api-gateway`. Deploy: standard (ver runbook).
>
> ### 2.2 `bau-auth-svc`
> Autenticación de clientes finales (login, MFA, recuperación de password).
> Integra con el core bancario para validación de credenciales.
> Repo: `cloudara-org/bau-auth-svc`.
> **Riesgo regulatorio**: ALTO. Cualquier cambio requiere OK de Mariano +
> revisión de Andrea (Legal).
>
> ### 2.3 `bau-payments-svc`
> Procesa transferencias, pagos de servicios, débitos automáticos.
> Repo: `cloudara-org/bau-payments-svc`.
> **Riesgo regulatorio**: ALTO. Mismo flujo que auth-svc.
>
> ### 2.4 `bau-accounts-svc`
> Consulta de saldos, extractos, movimientos.
> Repo: `cloudara-org/bau-accounts-svc`.
> Riesgo: medio (lectura, no escribe en core bancario).
>
> ### 2.5 `bau-notifications-svc`
> Envío de notificaciones push, SMS y mail a clientes BAU.
> Repo: `cloudara-org/bau-notifications-svc`.
> Riesgo: bajo (no toca dinero, no toca PII regulada).
>
> ### 2.6 `bau-core-client` (LIBRERÍA, no servicio)
> Cliente HTTP para hablar con el core bancario de BAU. Usado por
> auth-svc, payments-svc y accounts-svc.
> Repo: `cloudara-org/bau-core-client`.
> **Importante**: como es una librería compartida, un cambio acá impacta
> tres servicios. Hay que deployar los tres en orden y validar cada uno.
>
> ## 3. Infraestructura
>
> - **Cluster Kubernetes**: `bau-prod` (BR-1).
> - **Bastion de acceso**: `Tero-Bastion` (10.40.99.2 desde la VPN admin
>   Cloudara).
> - **Base de datos**: el core bancario es de BAU, no nuestro. Nosotros
>   sólo tenemos `Mulita-DB-01` para datos operacionales (idempotency
>   keys, audit logs, sesiones).
> - **Logs**: Loki, retention 90 días. Buscables por servicio, ticket,
>   client_id (anonimizado).
> - **Métricas**: Prometheus + Grafana. Dashboard "BAU SLOs" tiene los
>   indicadores que reportamos al banco mensualmente.
>
> ## 4. Diagrama de dependencias (texto)
>
> ```
> [App móvil BAU] ──┐
>                   ├──> [bau-api-gateway] ──> [bau-auth-svc]      ──┐
> [App web BAU]   ──┘                          [bau-payments-svc]  ──┼──> [bau-core-client] ──> [Core bancario BAU]
>                                              [bau-accounts-svc]  ──┘
>                                              [bau-notifications-svc] ──> [SMS/Push/Mail providers]
> ```
>
> ## 5. Cosas a tener en cuenta antes de deployar
>
> - El core bancario tiene timeouts agresivos (5s default). Si tu cambio
>   puede aumentar latencia, validá con Mariano antes.
> - BAU tiene auditoría externa cuatrimestral. Cualquier cambio que toque
>   payments o auth queda en el log de cambios mensual que se les manda.
> - Los rollbacks son rápidos (kubectl rollout undo) pero NO recuperan
>   datos en flight. Si tu deploy procesó transacciones reales y luego
>   hace rollback, hay que reconciliar manualmente con BAU. Por eso la
>   ventana es nocturna y con baja carga.
>
> ## 6. Contactos del lado de BAU
>
> - **Sebastián Calero** (sebastian.calero@bancoaustral.uy) — contacto
>   técnico, recibe el ping de cada deploy.
> - **Mónica Beltrán** (monica.beltran@bancoaustral.uy) — compliance,
>   recibe el log de cambios mensual.
> - **Equipo on-call BAU** (oncall@bancoaustral.uy) — para incidentes
>   fuera de horario.
>
> ---
>
> _Versionado: este PDF se actualiza cada cambio mayor de arquitectura.
> v3 incorpora la separación de `bau-core-client` como librería (antes
> estaba duplicado en cada servicio, oct-2025)._
