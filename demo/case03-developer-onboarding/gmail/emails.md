# Gmail — Threads para case03

## Email 1: bienvenida a Federico (con accesos)

- **From**: Mariano Silva <mariano@cloudara.uy>
- **To**: Federico Aguirre <federico@cloudara.uy>
- **CC**: camila@cloudara.uy, valentina@cloudara.uy
- **Subject**: ¡Bienvenido a Cloudara! Accesos y primeros pasos
- **Date**: 2026-04-28 09:30 UYT

### Contenido (copiar tal cual)

> Federico,
>
> ¡Bienvenido al equipo! Te paso lo importante para tu primera semana en backend.
>
> ## Accesos
>
> Los siguientes están aprovisionados (te tienen que llegar mails de cada uno):
>
> - GitHub: invitación al org `cloudara-org` con permisos de dev en repos
>   `bau-*`, `mno-*`, `slp-*`.
> - Slack: invitación al workspace cloudara.slack.com. Sumate a #general,
>   #dev-backend, #cliente-bau, #ops-alerts.
> - VPN: instructivo en mail aparte de Diego Marín.
> - Bastion `Tero-Bastion`: tu llave SSH ya está cargada (la que mandaste
>   ayer). Usuario: `federico`.
> - Cluster Kubernetes `bau-prod`: lectura por ahora, no escritura. Te
>   habilitamos escritura cuando hagas tu primer deploy supervisado.
> - Notion: workspace "Cloudara HQ", acceso completo a Engineering y
>   Cloud Ops, lectura a Legal y Finance.
> - Google Drive: carpeta "Cloudara Engineering" compartida con tu mail.
>
> Si te falta alguno, escribíle a Valentina (valentina@cloudara.uy, en CC).
>
> ## Tu primer ticket
>
> Te asigné **DEV-1219** ("Fix: timeout configurable en cliente HTTP a core
> bancario"). Es un cambio chico, ideal para arrancar. Está en el epic
> OPS-2026-Q2 (cambios autorizados Banco Austral Q2).
>
> ## Lecturas obligatorias antes de tu primer deploy
>
> 1. Notion → "Deploy a producción — Banco Austral" (runbook). Es **clave**,
>    BAU es regulado y el proceso de change management tiene reglas duras.
> 2. Google Drive → "Arquitectura backend BAU v3.pdf". Te vas a ubicar en
>    qué microservicios hay y cuál vas a tocar (en tu caso, `bau-core-client`).
> 3. Slack #cliente-bau → mirá los mensajes pinneados (la ventana de change
>    management es lo más importante).
>
> ## Pareo
>
> Camila te va a parear los primeros días. Coordinen ustedes el horario.
> Para el deploy de DEV-1219 hacelo con ella en pareja la primera vez (no
> solo), así ves el flujo end-to-end.
>
> Cualquier duda, escribíme.
>
> Saludos,
> Mariano

---

## Email 2: respuesta de Camila al thread

- **From**: Camila Núñez <camila@cloudara.uy>
- **To**: Federico Aguirre <federico@cloudara.uy>
- **CC**: mariano@cloudara.uy, valentina@cloudara.uy
- **Subject**: Re: ¡Bienvenido a Cloudara! Accesos y primeros pasos
- **Date**: 2026-04-28 10:05 UYT

### Contenido (copiar tal cual)

> Federico, bienvenido!
>
> Sumo dos cosas al mail de Mariano:
>
> 1. Para tu fix de DEV-1219 vas a tocar `bau-core-client/src/http/client.ts`.
>    Hay un test de integración que corre contra un mock del core bancario
>    (Sebastián de BAU nos lo dejó corriendo en staging). Probalo localmente
>    con `npm run test:integration -- --grep timeout` antes de mandar PR.
>
> 2. **No deployes solo la primera vez**. En serio. El proceso de BAU tiene
>    pasos que parecen burocráticos pero son los que nos mantienen sin
>    incidentes regulatorios. Coordinemos el deploy juntos para martes
>    06-may a las 22hs. Yo voy a estar conectada.
>
> Si necesitás algo, gritame por Slack.
>
> Saludos!
> Cami

---

## Email 3: instructivo de VPN (referencia, mismo thread)

- **From**: Diego Marín <diego@cloudara.uy>
- **To**: Federico Aguirre <federico@cloudara.uy>
- **CC**: mariano@cloudara.uy
- **Subject**: VPN Cloudara — config para vos
- **Date**: 2026-04-28 14:12 UYT

### Contenido (copiar tal cual)

> Federico,
>
> Adjunto config OpenVPN. Importante:
>
> - Usuario: `federico.aguirre`
> - Server: `vpn.cloudara.uy`
> - 2FA obligatorio (te llega QR aparte por SMS).
>
> Una vez conectado a la VPN admin tenés ruta a:
>
> - Bastion: `Tero-Bastion` (10.40.99.2)
> - Inventario de servidores: ver Notion → "Inventario Servidores Cloudara"
>
> Para BAU específicamente NO te conectás directo a sus servidores; siempre
> pasás por el cluster Kubernetes `bau-prod`. Si necesitás SSH a alguna VM
> es por el bastion y siempre con sesión grabada.
>
> Saludos,
> Diego
