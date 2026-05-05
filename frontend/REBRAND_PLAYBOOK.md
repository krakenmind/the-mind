# Krakenmind Rebrand — Migration Playbook

> Branch: `feature/krakenmind-rebrand`
> Strategy: coexistencia gradual de Tailwind v4 (editorial puro) sobre Radix
> UI Themes (re-tokenizado a paleta Krakenmind). Permite migrar página por
> página sin romper el producto en cada paso.

## Estado actual

### Hecho (commits en este branch)

- **Foundation** (`31e21fd1`)
  - Tailwind v4 + tokens Krakenmind en `globals.css`
  - Variables Radix (`--olive-*`, `--emerald-*`, `--accent-*`, `--slate-*`)
    remapeadas a paleta paper/teal — todo el producto Radix existente ya
    se ve Krakenmind sin tocar componentes
  - Fuentes Fraunces + Geist + Geist Mono via `next/font`
  - Light-only (ThemeProvider hardcoded)
  - KrakenMark + KrakenWatermark + assets PNG copiados desde `landing/`
  - Paper-grain SVG noise en `body::before`
  - Primitivos editoriales en `app/components/editorial/`
- **Auth** (`70e631c8`) — hero, title section, form panel re-skineados a
  editorial puro
- **Shell + sweep** (`059e1313`) — chat sidebar header con KrakenMark +
  wordmark; `Manrope` purgado de 16 archivos

### Por hacer

| Página / módulo | Estado | Prioridad |
| --- | --- | --- |
| Chat — mensaje bubbles | tokens Krakenmind via Radix remap | M (re-skin completo recomendado) |
| Chat — input composer | tokens Krakenmind via Radix remap | A |
| Chat — agent picker / strategy dropdown | tokens via remap | M |
| Chat — citations panel / sources | tokens via remap | M |
| Chat — empty/welcome state | tokens via remap | A |
| Knowledge Base — list, sidebar, table | tokens via remap | A |
| Connectors — list, instance forms | tokens via remap | A |
| Agents — builder canvas (React Flow) | tokens custom (`--agent-flow-*`) ya migrados | B |
| Workspace — settings, users, teams | tokens via remap | M |
| Notifications | tokens via remap | B |
| Onboarding tour + surveys | tokens via remap | M |
| File preview renderers (PDF, video, sheet) | tokens via remap | B |

---

## Reglas para migrar una página

1. **Entender la página antes de tocar.** Leé `page.tsx`, `store.ts`,
   `components/`. Identificá: qué Radix componentes usa, qué inline styles,
   qué iconos.
2. **No rompas behavior.** El re-skin es visual. Hooks, stores, API calls,
   form-validation, streaming, SSE, etc. no se tocan salvo bug evidente.
3. **Sustituí Radix por editorial donde haga diferencia visual.** No
   reemplaces `Flex`/`Box` (son equivalentes a `<div className="flex">`).
   Sí reemplazá `Button`, `TextField`, `Callout`, `Card`, `Heading`, `Text`
   por `@/app/components/editorial`.
4. **Iconos.** Reemplazá `MaterialIcon name="x"` por su equivalente Lucide.
   Mapeo común:
   - `add` → `Plus`
   - `close` → `X`
   - `search` → `Search`
   - `arrow_forward` → `ArrowRight`
   - `more_vert` → `MoreVertical`
   - `chevron_right` → `ChevronRight`
   - `edit` → `Pencil`
   - `delete` → `Trash2`
   - `check` → `Check`
5. **Quitá `fontFamily` inline si es redundante.** El default ya es Geist
   por el remap de `--default-font-family`.
6. **Hex literales.** Cualquier `#rrggbb` o `rgba(...)` que aparezca
   inline → reemplazar por var(--color-X) o utility tailwind.
7. **Animaciones.** `animation: spin/pulse/shimmer ...` ya están
   definidas en globals.css. No definas nuevas keyframes en JSX.

## Mapeo Radix → Editorial

| Radix Themes | Editorial | Notas |
| --- | --- | --- |
| `<Button>` | `<Button>` (de `editorial`) | Pill, variants `primary`/`secondary`/`ghost`/`signal`/`link` |
| `<IconButton>` | `<Button variant="ghost" size="icon">` | |
| `<TextField>` | `<Input>` | Hairline border-bottom, abyss focus |
| `<TextArea>` | `<TextArea>` | Hairline border full |
| `<Heading>` | `<Heading level="h2">` | Fraunces, sizes hero/display/h1..h6 |
| `<Text>` | `<Text size="base" tone="muted">` | Geist, tones ink/muted/dim/abyss/paper/signal |
| `<Card>` | `<GridCell>` o `<Section>` | `gap-px border bg-rule` para grids |
| `<Callout>` | `<Section>` con eyebrow | hairline + eyebrow editorial |
| `<Badge>` | `<Badge variant="outline">` | Mono uppercase trackeado |
| `<Tabs>` | TBD — usar `@radix-ui/react-tabs` headless + estilo eyebrow | |
| `<Dialog>` | `<Dialog>` (de `editorial`) | Paper bg, hairline border, no shadow exagerada |
| `<DropdownMenu>` | TBD — usar `@radix-ui/react-dropdown-menu` headless con estilo paper-blur | |

## Patrones editoriales (replicar de `landing/`)

- **Sección con número editorial**:
  ```tsx
  <Section>
    <SectionMark number="03" label="Resultados" />
    <Heading level="display" className="mt-6">
      Título con <em className="text-abyss not-italic font-medium italic">una palabra</em> en italic teal.
    </Heading>
    <Text size="lg" tone="muted" className="mt-6 max-w-2xl">
      Body en Geist, tono muted, max-width controlado.
    </Text>
  </Section>
  ```

- **Grid de cards spreadsheet-style**:
  ```tsx
  <GridCells cols={1} mdCols={3}>
    <GridCell>{...}</GridCell>
    <GridCell>{...}</GridCell>
    <GridCell>{...}</GridCell>
  </GridCells>
  ```

- **Eyebrow + heading + body**:
  ```tsx
  <Eyebrow tone="muted">Capa operativa</Eyebrow>
  <Heading level="h2" className="mt-2">…</Heading>
  ```

- **Botón primario con stamp**:
  ```tsx
  <Button variant="primary">
    <Stamp variant="signal" />
    Empezar ahora
  </Button>
  ```

## Convenciones de copy

- Voseo natural en español (UY/AR). "Empezá", "subí", "configurá".
- Una palabra italic teal por heading — no más.
- Eyebrow corto (≤4 palabras), uppercase via `.eyebrow`.
- Sin promesas de ETA, sin métricas falsas, sin logos sin permiso.

## Limpieza pendiente

- [ ] **Hex literales hardcodeados** (~10 archivos):
  - `app/components/file-preview/renderers/spreadsheet-renderer.tsx` (15+ hex)
  - `app/(public)/oauth/components/oauth-connection-outcome.tsx` (4 hex
    state colors — success / error / denied)
  - `app/components/ui/file-type-icons.tsx` (15 fill literales)
  - `app/(main)/chat/components/chat-sidebar.tsx` (`#ef4444`)
- [ ] **Material Icons → Lucide** (~600 callsites). Migración progresiva
  página por página — no urgente. Mientras, el CDN sigue cargado.
- [ ] **Lottie loader** (`app/components/ui/lottie-loader.tsx`) usa el
  PipesHub mark — reemplazar JSON o quitar Lottie a favor del KrakenMark
  con animación CSS.
- [ ] **Login page assets** (`public/login-page-assets/`) — bg dark,
  vectors de connectors, pipeshub white wordmark — todos huérfanos
  después del re-skin del hero. Borrar cuando se confirme.
- [ ] **`frontend/CLAUDE.md`** desactualizado: dice "No Tailwind CSS" y
  "Always use Radix UI Themes". Reescribir con la nueva convención
  (Tailwind + editorial primitivos + Radix Themes para componentes
  legacy).

## Cómo correr el dev server

El stack está dockerizado. Ver `deployment/docker-compose/hot-reload/`.

```bash
docker compose -f deployment/docker-compose/hot-reload/docker-compose.dev.arango.yml -p pipeshub-ai up -d
```

Frontend en `http://localhost:3001`. Hot-reload via bind-mount; las
ediciones a `frontend/app/**` se aplican solas. Cambios a `package.json`
requieren `npm install` adentro del container:

```bash
docker exec pipeshub-ai-pipeshub-ai-1 sh -c 'cd /app/frontend && npm install'
```
