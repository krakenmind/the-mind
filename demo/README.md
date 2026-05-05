# Demo Krakenmind — Casos de prueba

Casos preparados para demo el día siguiente. Cada caso demuestra el valor central de Krakenmind: **unir puntos repartidos en múltiples fuentes** (Linear, Notion, Gmail, Google Drive, Slack) para responder una pregunta real con evidencia trazable.

Cada caso vive en su propia carpeta (`case01/` … `case10/`) e incluye:

- `README.md` — qué demuestra, persona objetivo, **prompt sugerido**, respuesta esperada, fuentes usadas y los "puntos a unir".
- Una subcarpeta por conector (`linear/`, `notion/`, `gmail/`, `google-drive/`, `slack/`) con un `.md` que describe **qué artefactos crear ahí** para que la demo funcione: títulos exactos, fechas, autores, contenido, IDs de tickets, channels, etc.

Antes de la demo: cargá cada artefacto en su fuente correspondiente y dejá que Krakenmind indexe.

---

## La empresa ficticia: Cloudara

**Cloudara S.A.** — proveedor multiservicio de tecnología con sede en Montevideo, ~85 empleados.

Líneas de servicio:
- **Cloud Ops** — infraestructura gestionada (AWS, on-prem, hybrid)
- **Custom Dev** — desarrollo a medida (web, mobile, integraciones)
- **Managed IT** — service desk + soporte para clientes corporativos
- **Security** — compliance, pentesting, monitoreo

### Clientes principales (los que aparecen en los casos)

| Cliente | Sector | Servicios contratados | Codename interno |
|---|---|---|---|
| **Banco Austral** | Banca | Cloud Ops + Security + Custom Dev | `bau` |
| **Ministerio del Sur** | Gobierno | Managed IT + Custom Dev | `min` |
| **Mercado Norte** | Retail | Cloud Ops + Custom Dev | `mno` |
| **Salud Plus** | Salud | Managed IT + Cloud Ops | `slp` |
| **Fletes UY** | Logística | Custom Dev + Managed IT | `fuy` |
| **Energía Litoral** | Utilities | Cloud Ops + Security | `enl` |

### Equipo (personas que aparecen en los casos)

| Nombre | Rol | Email | Aparece en |
|---|---|---|---|
| Lucía Castro | CEO | lucia@cloudara.uy | case06, case08, case10 |
| Rodrigo Acosta | CTO | rodrigo@cloudara.uy | case04, case05, case06 |
| Esteban Romero | CFO | esteban@cloudara.uy | case07 |
| Andrea Pérez | Legal Counsel | andrea@cloudara.uy | case08, case10 |
| Mariano Silva | SRE Lead | mariano@cloudara.uy | case04, case07 |
| Camila Núñez | Backend Engineer | camila@cloudara.uy | case02, case03 |
| Tomás Vidal | Frontend Engineer | tomas@cloudara.uy | case02 |
| Pablo Lima | Service Desk L1 | pablo@cloudara.uy | case01 |
| Lucía Mendoza | Service Desk Lead | lucia.m@cloudara.uy | case01 |
| Gabriel Ferré | Account Executive | gabriel@cloudara.uy | case10 |
| Valentina Otero | People Ops | valentina@cloudara.uy | case09 |
| Diego Marín | Network Admin | diego@cloudara.uy | case01 |

### Infraestructura referenciada en casos

- **Datacenters**: `UY-1` (Montevideo), `UY-2` (Pando), `BR-1` (São Paulo, AWS region)
- **Servidores con codename animal**: `Carpincho01..05`, `Yaguar01..03`, `Mulita-DB-01`, `Tero-Bastion`, `Hornero-API`
- **Linear teams**: `OPS` (cloud ops), `SD` (service desk), `DEV` (dev), `SEC` (security), `FIN` (finance), `LEG` (legal)
- **Notion workspaces**: `Cloudara HQ`, sub-páginas por cliente (`Banco Austral`, `Mercado Norte`, etc.)
- **Slack channels**: `#general`, `#sd-tier1`, `#ops-alerts`, `#dev-backend`, `#cliente-bau`, `#cliente-mno`, `#leadership`, `#legal`

---

## Los 10 casos

| # | Caso | Persona | Fuentes que une |
|---|---|---|---|
| **01** | [Servidor Carpincho01 inalcanzable](./case01-service-desk-carpincho01/) | Service Desk | Linear · Notion · Gmail · Slack |
| **02** | [Bug que ya se había resuelto](./case02-bug-deja-vu/) | Developer | Linear · Slack · Notion · Drive |
| **03** | [¿Cómo deployo a producción?](./case03-developer-onboarding/) | Developer (nuevo) | Notion · Linear · Drive |
| **04** | [Capacidad cloud UY-1 comprometida](./case04-capacidad-cloud/) | SRE / CTO | Linear · Notion · Slack · Gmail |
| **05** | [¿Por qué bajó la velocity?](./case05-velocity-cto/) | CTO | Linear · Notion · Gmail |
| **06** | [Estado de Banco Austral](./case06-cuenta-clave-ceo/) | CEO | Gmail · Notion · Linear · Drive |
| **07** | [Costos cloud anómalos este mes](./case07-costos-cloud-cfo/) | CFO / SRE | Drive · Slack · Notion · Linear |
| **08** | [¿Tenemos un breach de SLA?](./case08-sla-breach-legal/) | Legal | Drive · Linear · Gmail · Notion |
| **09** | [Onboarding de empleada nueva](./case09-hr-onboarding/) | People Ops | Notion · Linear · Gmail |
| **10** | [Renovación de Mercado Norte](./case10-renovacion-sales/) | Sales / CEO | Drive · Notion · Gmail · Linear |

---

## Cómo se ven los archivos de seed

Cada subcarpeta de fuente (`linear/`, `notion/`, `gmail/`, `google-drive/`, `slack/`) tiene un `.md` con secciones que describen **artefactos discretos** a crear:

```
case01-service-desk-carpincho01/linear/tickets.md

## Ticket 1
- Tipo: Bug
- Team: Service Desk (SD)
- Title: Cliente reporta caída de Carpincho01
- ID: SD-2147
- Status: In Progress
- Assignee: Pablo Lima
- Reporter: Lucía Mendoza
- Created: 2026-04-23 12:38
- Description (copiar tal cual):
  > Cliente Banco Austral reporta...
```

La persona que prepara la demo lee cada `.md` y crea **manualmente** ese artefacto en la fuente real (Linear, Notion, Gmail, etc.). Cuando todos los artefactos están creados y Krakenmind indexó, los prompts del README de cada caso deberían producir las respuestas esperadas uniendo evidencia de múltiples fuentes.

---

## Tip para la demo en vivo

Los 10 casos están graduados — empezar por el **case01** (más concreto, más fácil de seguir) y subir hasta **case08** (Legal, requiere razonamiento más complejo). Si el tiempo es ajustado, mostrar 3 casos: **01** (service desk), **04** (SRE) y **06** (CEO) cubre las tres audiencias arquetipo (operaciones, ingeniería, ejecutivo).
