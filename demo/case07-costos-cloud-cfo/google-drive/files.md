# Google Drive — Archivos para case07

## Archivo: "AWS Billing — Abril 2026.pdf"

- **Path**: My Drive / Cloudara / Finance / AWS / 2026 / 04
- **Owner**: esteban@cloudara.uy
- **Last modified**: 2026-05-01 06:14 UYT (auto-import desde AWS)
- **Tipo**: PDF generado por AWS billing (~3 páginas)
- **Compartido con**: Esteban Romero, Mariano Silva, Lucía Castro

### Contenido (resumen para la demo)

> # AWS Bill — Cloudara S.A. — Periodo 2026-04-01 → 2026-04-30
>
> **Total invoice**: **USD 48,712.40**
> **Periodo anterior (marzo 2026)**: USD 35,184.20
> **Delta**: **+ USD 13,528.20 (+38.4%)**
>
> ## Breakdown por servicio (top 5)
>
> | Servicio | Abril 2026 | Marzo 2026 | Δ |
> |---|---|---|---|
> | EC2 — Compute | **USD 31,210.18** | USD 18,402.55 | **+ USD 12,807.63 (+69.6%)** |
> | EBS — Storage | USD 4,884.10 | USD 4,716.20 | + USD 167.90 |
> | RDS | USD 4,108.42 | USD 4,103.10 | + USD 5.32 |
> | Data transfer | USD 3,892.66 | USD 3,510.40 | + USD 382.26 |
> | S3 | USD 2,002.55 | USD 1,948.30 | + USD 54.25 |
> | Otros | USD 2,614.49 | USD 2,503.65 | + USD 110.84 |
>
> ## Breakdown por región
>
> | Región | Abril 2026 | Marzo 2026 | Δ |
> |---|---|---|---|
> | sa-east-1 (BR-1) | **USD 28,941.20** | USD 15,201.30 | **+ USD 13,739.90 (+90.4%)** |
> | us-east-1 | USD 11,402.40 | USD 11,318.60 | + USD 83.80 |
> | us-west-2 | USD 8,368.80 | USD 8,664.30 | – USD 295.50 |
>
> _El delta total se explica casi exclusivamente por **EC2 en BR-1**._
>
> ## Detalle EC2 BR-1
>
> Top contribuyentes (instance type × horas):
>
> | Instance type | Horas abril 2026 | Horas marzo 2026 | Δ |
> |---|---|---|---|
> | m5.4xlarge | **2,496 hs** | 0 hs | **+2,496 hs (~$13.5k)** |
> | m5.xlarge | 4,512 hs | 4,488 hs | + 24 hs |
> | t3.medium | 1,890 hs | 1,860 hs | + 30 hs |
>
> _4 instancias × 26 días × 24 hs = **2,496 horas** — coincide con
> 4 m5.4xlarge corriendo desde el 5-abr hasta fin de mes._

---

## Archivo: "AWS Cost Explorer Apr 2026 breakdown.csv"

- **Path**: My Drive / Cloudara / Finance / AWS / 2026 / 04
- **Owner**: esteban@cloudara.uy
- **Last modified**: 2026-05-01 06:18 UYT (export desde Cost Explorer)
- **Tipo**: CSV (~120 filas reales — para la demo, mostrar las relevantes)
- **Compartido con**: Esteban Romero, Mariano Silva

### Contenido (extracto relevante para la demo, copiar tal cual)

```csv
date,region,service,instance_type,instance_id,tag_owner,tag_loadtest,usage_hours,cost_usd
2026-04-05,sa-east-1,EC2,m5.4xlarge,i-09c4a1ef,tomas@cloudara.uy,true,15,84.45
2026-04-05,sa-east-1,EC2,m5.4xlarge,i-09c4b288,tomas@cloudara.uy,true,15,84.45
2026-04-05,sa-east-1,EC2,m5.4xlarge,i-09c4c310,tomas@cloudara.uy,true,15,84.45
2026-04-05,sa-east-1,EC2,m5.4xlarge,i-09c4d472,tomas@cloudara.uy,true,15,84.45
2026-04-06,sa-east-1,EC2,m5.4xlarge,i-09c4a1ef,tomas@cloudara.uy,true,24,135.12
2026-04-06,sa-east-1,EC2,m5.4xlarge,i-09c4b288,tomas@cloudara.uy,true,24,135.12
2026-04-06,sa-east-1,EC2,m5.4xlarge,i-09c4c310,tomas@cloudara.uy,true,24,135.12
2026-04-06,sa-east-1,EC2,m5.4xlarge,i-09c4d472,tomas@cloudara.uy,true,24,135.12
2026-04-07,sa-east-1,EC2,m5.4xlarge,i-09c4a1ef,tomas@cloudara.uy,true,24,135.12
... (filas similares cada día hasta 2026-04-30) ...
2026-04-30,sa-east-1,EC2,m5.4xlarge,i-09c4d472,tomas@cloudara.uy,true,24,135.12
```

### Resumen consolidado

| Instance ID | Tag owner | Tag loadtest | Primer día | Último día | Días | Costo total USD |
|---|---|---|---|---|---|---|
| i-09c4a1ef | tomas@cloudara.uy | true | 2026-04-05 | 2026-04-30 | 26 | 3,381.75 |
| i-09c4b288 | tomas@cloudara.uy | true | 2026-04-05 | 2026-04-30 | 26 | 3,381.75 |
| i-09c4c310 | tomas@cloudara.uy | true | 2026-04-05 | 2026-04-30 | 26 | 3,381.75 |
| i-09c4d472 | tomas@cloudara.uy | true | 2026-04-05 | 2026-04-30 | 26 | 3,381.75 |
| **Total** | | | | | | **13,527.00** |

> **Hallazgo clave**: las 4 instancias tienen `tag_loadtest=true` y
> `tag_owner=tomas@cloudara.uy`, lo que las trazabiliza directo al
> ticket `OPS-1488` y permite confirmar la causa raíz sin ambigüedad.
> El runbook exige el tag — esa parte sí se cumplió. Lo que no se cumplió
> fue el apagado al cierre.
