# Notion — Docs para case03

## Página: "Deploy a producción — Banco Austral"

- **Path**: Cloudara HQ / Cloud Ops / Runbooks / BAU / Deploy a producción
- **Owner**: Mariano Silva
- **Last edited**: 2026-04-15 11:20 UYT por Mariano Silva
- **Tags**: `runbook`, `cliente:bau`, `change-mgmt`, `deploy`, `regulatorio`
- **Reviewed by**: Rodrigo Acosta (CTO), Andrea Pérez (Legal)

### Contenido (copiar tal cual)

> # Runbook — Deploy a producción · Banco Austral
>
> _Versión 3.2 · Última actualización: 2026-04-15 (Mariano)_
>
> > **Audiencia**: developers que deployan código a entornos productivos de
> > Banco Austral. Si es tu primer deploy a BAU, leelo entero antes de tocar
> > nada. Si tenés dudas, preguntá a Mariano antes que después.
>
> ## 0. Pre-requisitos
>
> - [ ] Tu PR está aprobado y mergeado a `main`.
> - [ ] Los CI checks están verdes en `main` post-merge.
> - [ ] El ticket asociado está en el epic **OPS-2026-Q2** ("Cambios
>       autorizados Banco Austral Q2"). Si no está, **PARÁ** y hablá con Mariano.
> - [ ] Si tocás `payments-svc` o `auth-svc`: tenés OK explícito de Mariano
>       en el ticket.
> - [ ] Tenés acceso a:
>   - VPN admin Cloudara (`vpn.cloudara.uy`).
>   - Bastion `Tero-Bastion` (10.40.99.2).
>   - Kubeconfig de cluster `bau-prod`.
>   - Slack `#cliente-bau`.
>   - GitHub `cloudara-org/bau-*` repos.
>   _Si te falta alguno: Valentina Otero (People Ops)._
>
> ## 1. Aprobaciones de PR
>
> Para que un PR sea elegible para deploy a BAU prod:
>
> - **1 reviewer del equipo backend**: Camila Núñez o Tomás Vidal.
> - **1 reviewer de SRE**: Mariano Silva.
> - **CI verde** post-merge en `main`.
> - **Si toca `payments-svc` o `auth-svc`**: aprobación adicional escrita
>   de Mariano en el ticket por riesgo regulatorio.
> - **Si introduce cambio de schema en DB**: revisar primero con Diego Marín.
>
> ## 2. Ventana de change management
>
> **Martes y jueves, 22:00 a 00:00 UYT.**
>
> Esto está pinneado en `#cliente-bau`. Está acordado con BAU desde
> 2024 y no se mueve unilateralmente.
>
> Excepciones:
>
> - **Hotfix**: requiere aprobación de Mariano + Lucía Castro (CEO). Ventana
>   acordada ad-hoc con el contacto técnico de BAU (Sebastián Calero,
>   sebastian.calero@bancoaustral.uy).
> - **Rollback de un deploy fallido**: no requiere ventana, pero sí avisar
>   inmediato en `#cliente-bau` y abrir incidente en Linear.
>
> ## 3. Procedimiento de deploy (paso a paso)
>
> 1. **22:00 UYT — Anuncio**: postear en `#cliente-bau`:
>    > 🚀 arranco deploy de \<TICKET-ID\> (\<descripción 1 línea\>). ETA \<X\> minutos.
>
> 2. **Conectarse al bastion y al cluster**:
>    ```bash
>    ssh -A admin@tero-bastion.cloudara.uy
>    kubectl config use-context bau-prod
>    ```
>
> 3. **Confirmar imagen y tag**:
>    ```bash
>    kubectl describe deployment <svc> -n bau-prod | grep Image
>    ```
>
> 4. **Aplicar el manifiesto** (los manifests están en
>    `cloudara-org/bau-deploy/k8s/<svc>/`):
>    ```bash
>    kubectl apply -f k8s/<svc>/deployment.yaml -n bau-prod
>    kubectl rollout status deployment/<svc> -n bau-prod --timeout=5m
>    ```
>
> 5. **Smoke tests** (correr todos):
>    - `bau-smoketest login` — login con usuario test.
>    - `bau-smoketest tx-dummy` — transacción dummy en cuenta test.
>    - `bau-smoketest balance` — query de saldo.
>    - `bau-smoketest extracts` — query de extracto últimos 30 días.
>    Todos tienen que devolver `OK`. Si alguno falla → **rollback**.
>
> 6. **Rollback (si algo se rompe)**:
>    ```bash
>    kubectl rollout undo deployment/<svc> -n bau-prod
>    kubectl rollout status deployment/<svc> -n bau-prod
>    ```
>    Después: postear en `#cliente-bau` y abrir incidente en Linear con
>    severity SEV-2 mínimo.
>
> 7. **Cierre**: postear en `#cliente-bau`:
>    > ✅ deploy de \<TICKET-ID\> completo. Smoke tests OK. Cierro ticket.
>
> 8. **Marcar el ticket como Done en Linear** y agregar comentario con la
>    hora del deploy y el commit hash.
>
> 9. **Anotar en el log de cambios BAU 2026** (Notion, ver más abajo). Es
>    el registro auditable que se le manda a BAU cada mes.
>
> ## 4. Log de cambios BAU 2026
>
> El log de cambios está en `Cloudara HQ / Cloud Ops / Cliente / BAU /
> Log de cambios 2026`. Cada deploy a prod debe agregar una fila con:
>
> | Fecha | Ticket | Servicio | Quién | Resultado | Notas |
> |-------|--------|----------|-------|-----------|-------|
>
> Esto se exporta y se le manda al CTO de BAU el primer día hábil de cada mes.
>
> ## 5. Contactos en BAU
>
> - **Contacto técnico**: Sebastián Calero (sebastian.calero@bancoaustral.uy).
>   Para coordinar hotfixes o reportar incidentes durante un deploy.
> - **Contacto regulatorio**: Mónica Beltrán (monica.beltran@bancoaustral.uy).
>   Para cambios con impacto regulatorio (vía Andrea Pérez).
>
> ## 6. Errores comunes (memoria institucional)
>
> - **"Mi PR no está en OPS-2026-Q2 pero es trivial"**: no, no lo deployes.
>   Pedile a Mariano que lo agregue al epic primero. Es 5 minutos y te
>   evita una auditoría rara.
> - **"Voy a deployar fuera de la ventana porque BAU dijo que estaba bien"**:
>   confirmá por mail (no Slack) y dejá constancia en el ticket. Mariano
>   tiene que estar en copia.
> - **"Los smoke tests pasaron pero hay logs de error"**: rollback. No te
>   confíes. Investigá con calma fuera de la ventana de prod.
