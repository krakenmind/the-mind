# GitHub — Artefactos para case03

> **Nota de coherencia**: la sugerencia inicial era `cloudara/bau-backend`,
> pero el resto del seed (arquitectura BAU v3 en Drive, gmail de bienvenida,
> runbook) no menciona un repo único `bau-backend` — el sistema BAU vive
> en 6 repos separados. El primer deploy de Federico (DEV-1219) toca
> `bau-core-client`, así que ese es el repo donde el README "## Deploy"
> efectivamente sirve para su onboarding. Igualmente, todo equipo de Cloudara
> que toca BAU termina abriendo este repo, así que el README es el primer
> hop natural. Si en la demo conviene mostrar otro repo del fleet (ej.
> `bau-payments-svc`), el patrón es idéntico — el workflow vive en cada uno.

---

## Repo: `cloudara/bau-core-client`

- **Visibility**: Private (org `cloudara`)
- **Default branch**: `main` (rama protegida, ver más abajo)
- **Topics**: `bau`, `cliente-banco-austral`, `nodejs`, `typescript`, `library`, `core-banking-client`
- **Description**: "Cliente HTTP para integración con el core bancario de Banco Austral. Consumido por bau-auth-svc, bau-payments-svc y bau-accounts-svc."
- **Lenguaje**: TypeScript (Node.js 20 LTS)
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`, `.github/workflows/deploy-prod.yml`)
- **CODEOWNERS**: backend (`@cloudara/backend`) + sre (`@cloudara/sre`)

---

## Archivo: `README.md` (raíz del repo)

```markdown
# bau-core-client

Cliente HTTP TypeScript para hablar con el **core bancario de Banco Austral
(BAU)**. Esta librería es consumida por:

- `bau-auth-svc` (autenticación y MFA)
- `bau-payments-svc` (transferencias y pagos)
- `bau-accounts-svc` (saldos y extractos)

> Como es una librería compartida, **un cambio acá impacta tres servicios**.
> El runbook de deploy (más abajo) cubre el orden y la validación por servicio.

## Tabla de contenidos

- [Quickstart](#quickstart)
- [Arquitectura](#arquitectura)
- [Tests](#tests)
- [Deploy](#deploy)
- [Soporte](#soporte)

## Quickstart

```bash
nvm use            # Node 20 LTS, ver .nvmrc
npm ci
npm run build
npm test
```

Para correr los tests de integración (mock del core bancario en staging):

```bash
npm run test:integration -- --grep timeout
```

## Arquitectura

Documento de arquitectura completo: **"Arquitectura backend BAU v3.pdf"**
(Google Drive, `Cloudara / Engineering / Architecture / BAU`).

`bau-core-client` expone un cliente HTTP con:

- Reintentos con backoff exponencial.
- Timeouts configurables por endpoint (ver DEV-1219).
- Pooling de conexiones por host BAU.
- Tracing OpenTelemetry.

## Tests

- **Unit**: `npm test` — corre con cada PR.
- **Integración**: `npm run test:integration` — mock de BAU en staging.
- **Contract**: `npm run test:contract` — valida contra el OpenAPI de BAU.

## Deploy

> ⚠️ **BAU es cliente regulado (banca).** El deploy a producción **no es
> un `git push`**. Pasa por change management estricto. Si es tu primer
> deploy, leé esto entero antes de tocar nada.

### Antes de deployar

1. Tu PR debe estar atado a un ticket bajo el epic Linear **`OPS-2026-Q2`**
   ("Cambios autorizados Banco Austral Q2"). Si tu cambio no está en el
   epic, **PARÁ** y hablá con Mariano Silva (SRE Lead).
2. PR aprobado por: 1 reviewer de backend (Camila o Tomás) + 1 reviewer
   de SRE (Mariano).
3. CI verde en `main` post-merge.

### Cómo se dispara el deploy a producción

El deploy a `bau-prod` corre vía GitHub Actions, no manualmente:

- **Workflow**: [`.github/workflows/deploy-prod.yml`](.github/workflows/deploy-prod.yml)
- **Trigger**: manual (`workflow_dispatch`) por miembros del team `@cloudara/sre`.
- **Aprobación**: el job de deploy usa el environment `bau-prod`, que
  requiere **aprobación manual de un reviewer de SRE** (Mariano Silva).

### Documentación operativa

El proceso completo paso a paso vive en el runbook de Notion:
**"Deploy a producción — Banco Austral"** (`Cloudara HQ / Cloud Ops /
Runbooks / BAU / Deploy a producción`). Cubre:

- Ventana de change management (martes y jueves 22-00 UYT).
- Hotfixes (requieren OK de Mariano + Lucía Castro).
- Smoke tests post-deploy y rollback.
- Log de cambios mensual auditable que se le manda a BAU.

> Si tenés acceso al Notion workspace pero no encontrás el runbook,
> escribíle a Valentina Otero (People Ops).

### Más información sobre GitHub Actions

Cómo se enciende el deploy, quién aprueba y qué secrets requiere:
ver [`.github/GITHUB_ACTIONS_README.md`](.github/GITHUB_ACTIONS_README.md).

## Soporte

- **Slack**: `#dev-backend` (preguntas técnicas), `#cliente-bau` (durante
  un deploy a prod).
- **Owners**: Camila Núñez (backend), Mariano Silva (SRE).
- **Cliente**: Banco Austral. Contacto técnico: Sebastián Calero
  (sebastian.calero@bancoaustral.uy).
```

---

## Archivo: `.github/workflows/deploy-prod.yml`

```yaml
name: Deploy to bau-prod

# Disparo manual. NO se deploya a prod en push a main automáticamente,
# por política de change management con BAU. Ver runbook de Notion
# "Deploy a producción — Banco Austral".
on:
  workflow_dispatch:
    inputs:
      ticket:
        description: 'Ticket Linear (debe estar en epic OPS-2026-Q2-Q2)'
        required: true
        type: string
      version:
        description: 'Tag de versión a deployar (ej. v1.4.2)'
        required: true
        type: string

# Cancelar runs concurrentes — no queremos dos deploys simultáneos a BAU.
concurrency:
  group: deploy-prod-bau
  cancel-in-progress: false

permissions:
  contents: read
  id-token: write       # Para AWS OIDC (asume rol bau-prod-deployer).
  deployments: write    # Para escribir el GitHub Deployment.

jobs:
  # 1) Sanity checks: confirma que el tag existe, que está en main,
  #    y que el ticket pasó la validación.
  validate:
    name: Validate inputs
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Confirmar que el tag existe y apunta a main
        run: |
          git fetch --tags
          if ! git tag -l "${{ inputs.version }}" | grep -q .; then
            echo "::error::Tag ${{ inputs.version }} no existe"; exit 1
          fi
          # El commit del tag debe estar en main (deploy sólo desde main).
          git merge-base --is-ancestor "${{ inputs.version }}" origin/main \
            || (echo "::error::Tag no está en main"; exit 1)

      - name: Confirmar que el ticket está en epic OPS-2026-Q2
        # Llama a Linear API y rechaza el run si el ticket no está bajo el epic.
        run: ./scripts/ci/check-ticket-in-epic.sh "${{ inputs.ticket }}"
        env:
          LINEAR_API_KEY: ${{ secrets.LINEAR_API_KEY }}

  # 2) Build y push de la imagen Docker a ECR (registry de cliente BAU).
  build:
    name: Build & push image
    needs: [validate]
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
        with: { ref: ${{ inputs.version }} }

      - name: Setup Node
        uses: actions/setup-node@v4
        with: { node-version-file: '.nvmrc', cache: 'npm' }

      - run: npm ci
      - run: npm run build
      - run: npm test

      # OIDC → asume rol read/write a ECR de BAU.
      - name: Configure AWS creds (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_BAU_PROD_BUILD }}
          aws-region: sa-east-1

      - name: Login to ECR
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build & push Docker image
        run: |
          docker build -t bau-core-client:${{ inputs.version }} .
          docker tag bau-core-client:${{ inputs.version }} \
            ${{ secrets.ECR_REGISTRY_BAU }}/bau-core-client:${{ inputs.version }}
          docker push \
            ${{ secrets.ECR_REGISTRY_BAU }}/bau-core-client:${{ inputs.version }}

  # 3) Approval gate. Usa el environment `bau-prod` que tiene reviewers
  #    requeridos (SRE team) configurados en Settings > Environments.
  #    Esto hace que el job se "pause" hasta que Mariano (o un suplente
  #    del team SRE) clickee Approve en la UI de Actions.
  deploy:
    name: Deploy to bau-prod (manual approval)
    needs: [build]
    runs-on: ubuntu-22.04
    environment:
      name: bau-prod
      url: https://api.bancoaustral.uy/health
    steps:
      - uses: actions/checkout@v4
        with: { ref: ${{ inputs.version }} }

      - name: Configure AWS creds for bau-prod (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: ${{ secrets.AWS_ROLE_BAU_PROD_DEPLOY }}
          aws-region: sa-east-1

      # kubeconfig al cluster bau-prod (BR-1, AWS São Paulo).
      - name: Setup kubectl + kubeconfig (bau-prod)
        run: |
          aws eks update-kubeconfig --name bau-prod --region sa-east-1
          kubectl config use-context bau-prod

      - name: Apply manifest y rollout
        run: |
          # Manifests viven en cloudara/bau-deploy. Acá hacemos `set image`
          # con la versión recién pusheada (más simple y auditable que `apply`).
          kubectl -n bau-prod set image deployment/bau-core-client \
            bau-core-client=${{ secrets.ECR_REGISTRY_BAU }}/bau-core-client:${{ inputs.version }}
          kubectl -n bau-prod rollout status deployment/bau-core-client --timeout=5m

      - name: Smoke tests
        # Corre la suite contra prod. Si falla, el step siguiente hace rollback.
        run: ./scripts/ci/smoke-tests-bau-prod.sh
        env:
          BAU_SMOKETEST_TOKEN: ${{ secrets.BAU_SMOKETEST_TOKEN }}

      - name: Rollback si smoke falla
        if: failure()
        run: |
          kubectl -n bau-prod rollout undo deployment/bau-core-client
          kubectl -n bau-prod rollout status deployment/bau-core-client
          echo "::error::Deploy revertido. Avisar en Slack #cliente-bau y abrir incidente."
          exit 1

      - name: Anotar deploy en log de cambios BAU
        # Postea fila al Notion "Log de cambios BAU 2026" vía API.
        run: ./scripts/ci/log-bau-change.sh \
          --ticket "${{ inputs.ticket }}" \
          --version "${{ inputs.version }}" \
          --service bau-core-client
        env:
          NOTION_API_TOKEN: ${{ secrets.NOTION_API_TOKEN }}
```

### Secrets requeridos (configurados a nivel org `cloudara` o environment `bau-prod`)

| Nombre | Scope | Descripción |
|--------|-------|-------------|
| `LINEAR_API_KEY` | org | Llamar a Linear para validar epic OPS-2026-Q2. |
| `AWS_ROLE_BAU_PROD_BUILD` | env `bau-prod` | Rol OIDC con permisos read/write a ECR de BAU. |
| `AWS_ROLE_BAU_PROD_DEPLOY` | env `bau-prod` | Rol OIDC con permisos a EKS `bau-prod`. |
| `ECR_REGISTRY_BAU` | env `bau-prod` | URL del registry ECR del cliente BAU. |
| `BAU_SMOKETEST_TOKEN` | env `bau-prod` | Token del usuario test de BAU para smoke tests. |
| `NOTION_API_TOKEN` | org | Para postear fila al log de cambios BAU 2026. |

---

## Branch protection: `main`

- **Rule**: `main`
- **Require a pull request before merging**: ✅
  - Required approving reviews: **2**
  - Required reviewers from CODEOWNERS: ✅ (uno de `@cloudara/backend` y uno de `@cloudara/sre`)
  - Dismiss stale approvals when new commits are pushed: ✅
- **Require status checks to pass**:
  - `ci / build` (GitHub Actions)
  - `ci / unit-tests`
  - `ci / contract-tests`
  - `ci / lint-and-typecheck`
- **Require linear history**: ✅ (sólo squash merge habilitado)
- **Require signed commits**: ✅
- **Require conversation resolution before merging**: ✅
- **Restrict who can push to matching branches**: solo el bot
  `cloudara-merge-queue[bot]` puede hacer push directo (para hotfixes
  formales aprobados por C-level).
- **Allow force pushes**: ❌
- **Allow deletions**: ❌

> Esta regla es la que asegura que **ningún PR llega a `main` sin doble
> review** y que el CI completo pasó. Es la "puerta 1" antes del job de
> approval manual en el workflow de deploy.

---

## Archivo: `.github/GITHUB_ACTIONS_README.md`

```markdown
# CI/CD para bau-core-client

## Workflows

| Workflow | Trigger | Qué hace |
|----------|---------|----------|
| `ci.yml` | Push a cualquier rama, PR a `main` | Lint, typecheck, unit tests, contract tests. |
| `deploy-prod.yml` | `workflow_dispatch` manual | Build, push imagen a ECR BAU, deploy a EKS `bau-prod`, smoke tests, rollback automático si falla, log a Notion. |

## ¿Cómo se enciende un deploy a `bau-prod`?

1. Confirmá que tu PR está mergeado a `main` y que tenés un tag de
   release apuntando al commit (ej. `v1.4.2`). Si no hay tag, creá uno
   con `git tag v1.4.2 <sha> && git push --tags`.
2. Confirmá que tu ticket está en el epic Linear **`OPS-2026-Q2`**.
   El job `validate` del workflow lo va a chequear vía Linear API y
   rechazar el run si no.
3. Confirmá que estás dentro de la **ventana de change management**
   (martes/jueves 22-00 UYT). Fuera de la ventana el deploy técnicamente
   se puede correr, pero no se debe — ver runbook.
4. En GitHub: **Actions → Deploy to bau-prod → Run workflow**. Inputs:
   - `ticket`: el ID del ticket Linear (ej. `DEV-1219`).
   - `version`: el tag a deployar (ej. `v1.4.2`).
5. **Avisá en Slack `#cliente-bau`** que arrancás. El runbook tiene el
   formato exacto del mensaje.

## ¿Quién aprueba el deploy?

El job `deploy` del workflow corre dentro del environment **`bau-prod`**,
que está configurado (Settings → Environments → bau-prod) con:

- **Required reviewers**: equipo `@cloudara/sre` (Mariano Silva titular,
  Diego Marín suplente).
- **Wait timer**: 0 (se aprueba en el momento).
- **Deployment branches**: sólo `main` (no se puede deployar desde
  feature branches).

Cuando el job llega al step de `deploy`, GitHub pausa el run y notifica
a los reviewers de SRE. Ellos clickean **Approve and deploy** en la UI
de Actions. Hasta que no aprueben, no se toca prod.

> El reviewer que aprueba **debe estar al lado del dev que dispara** el
> deploy, no aprobar a ciegas. Esa es la regla cultural; la de GitHub
> sólo asegura que alguien clickee.

## ¿Qué pasa si el deploy falla?

- Si falla en `validate` o `build`: nada llegó a prod, fixeás y volvés a
  correr.
- Si falla en el step `Smoke tests` del job `deploy`: el step
  `Rollback si smoke falla` corre automáticamente
  (`kubectl rollout undo`) y el run termina en rojo. **Avisá inmediato
  en `#cliente-bau` y abrí un incidente en Linear con SEV-2 mínimo.**

## ¿Y los hotfixes fuera de ventana?

El workflow no tiene un "modo hotfix" especial. La diferencia es procedural:

1. Aprobación escrita de Mariano + Lucía Castro (CEO) en el ticket Linear.
2. Coordinación con Sebastián Calero (BAU) por mail.
3. Disparo del workflow normal con esa coordinación previa.

No hay bypass técnico. Si querés saltearte el approval del environment,
no se puede — esa es la idea.

## Secrets

Ver el archivo `.github/workflows/deploy-prod.yml` (sección "Secrets
requeridos") para la lista completa. Si necesitás rotar uno: hablá con
Diego Marín (Network Admin / Security).

## Owners de este pipeline

- **CI workflows**: Camila Núñez.
- **Deploy workflow + environment `bau-prod`**: Mariano Silva.
- **Branch protection rules**: Mariano Silva (sólo SRE puede modificar).
```

---

## Cómo usar este artefacto en la demo

Cuando Krakenmind responda al onboarding de Federico, debe poder citar:

1. **Linear ticket de Federico** (DEV-1219) bajo epic OPS-2026-Q2.
2. **README de `cloudara/bau-core-client`**, sección `## Deploy`.
3. **Workflow `.github/workflows/deploy-prod.yml`** (con el detalle del
   approval gate y los secrets requeridos).
4. **Runbook de Notion** "Deploy a producción — Banco Austral".
5. **Gmail de bienvenida** de Mariano + Camila (accesos + pareo el martes).

Ese es el cruce de 5 hops, 5 fuentes (Linear → GitHub README → GitHub
workflow → Notion runbook → Gmail).
