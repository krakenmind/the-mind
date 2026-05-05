# Notion — Docs para case07

Workspace: **Cloudara HQ** · Section: Engineering / Operations / Runbooks

---

## Doc: "Load tests — proceso operativo"

- **Path**: Cloudara HQ / Engineering / Operations / Runbooks / Load tests
- **Owner**: Mariano Silva
- **Last edited**: 2026-02-08 12:30 UYT
- **Tags**: `runbook`, `load-test`, `aws`, `cost-control`

### Contenido (copiar tal cual)

> # Load tests — proceso operativo
>
> **Owner**: SRE (Mariano Silva)
> **Audiencia**: cualquier dev/SRE que ejecute un load test contra prod
> simulada en region cloud propia.
>
> ## 1. Cuándo aplica
>
> - Validaciones de capacity para releases de cliente.
> - Pruebas de stress previas a eventos comerciales (Black Friday, cierre
>   de mes bancario, etc).
> - Test de cambios de arquitectura que requieran simular tráfico ≥ 2x
>   el promedio actual.
>
> ## 2. Antes de empezar (checklist)
>
> - [ ] Crear ticket en Linear (team OPS) con: cliente, motivo, tamaño
>       del cluster, presupuesto estimado.
> - [ ] Aprobación del SRE Lead (Mariano) si el costo estimado supera $1k.
> - [ ] Crear bookmark en AWS Cost Explorer filtrado por la región y el
>       tag del proyecto.
>
> ## 3. Durante la ejecución
>
> - [ ] Monitoreo activo de `#ops-alerts` por si algún alerta del
>       load test impacta a un cliente real.
> - [ ] Tag obligatorio `loadtest=true` y `owner=<usuario>` en cada
>       instancia EC2 levantada.
> - [ ] Documentar en el ticket cada vez que se cambia el perfil de carga.
>
> ## 4. Al terminar (checklist de cierre — CRÍTICO)
>
> - [ ] **Apagar todas las instancias de test** — owner del ticket.
>       Comando: `aws ec2 terminate-instances --instance-ids <ids>`.
> - [ ] Verificar en AWS Console que las instancias estén en estado
>       `terminated` (no `stopped`).
> - [ ] Adjuntar al ticket el output del `terminate-instances` o screenshot
>       del estado.
> - [ ] Actualizar el reporte del cliente con resultados.
> - [ ] Cerrar el ticket en Linear.
>
> ## 5. Costos esperados (referencia)
>
> | Tipo de instancia | Costo on-demand BR-1 (USD/día) |
> |---|---|
> | m5.large | ~$15 |
> | m5.xlarge | ~$30 |
> | m5.2xlarge | ~$65 |
> | **m5.4xlarge** | **~$135** |
>
> ## 6. Errores comunes (mantener actualizado)
>
> - Dejar instancias en estado `stopped` en lugar de `terminated`. EBS
>   sigue cobrando aunque la instancia no facture compute.
> - Olvidar el tag `loadtest=true` — dificulta el cleanup posterior.
> - Cerrar el ticket sin apagar las instancias. Si pasa esto, abrir un
>   `OPS-` follow-up en cuanto se detecta y notificar a finance.

---

## Doc: "FinOps — Política de control de gasto cloud" (referencia interna)

- **Path**: Cloudara HQ / Finance / FinOps / Política
- **Owner**: Esteban Romero
- **Last edited**: 2026-01-15 11:20 UYT
- **Tags**: `finops`, `policy`, `aws`

### Contenido (resumen para la demo)

> # FinOps — Política de control de gasto cloud
>
> **Budget mensual AWS**: $40k (umbral verde), $45k (amarillo), $50k (rojo).
> **Marzo 2026**: $35.2k (verde).
> **Abril 2026**: $48.7k (rojo). _Investigación en curso._
>
> ## Reglas de aprobación
>
> - Recursos nuevos persistentes: aprobación SRE Lead + CFO.
> - Recursos efímeros (load tests, sandboxes): aprobación SRE Lead.
> - Cualquier recurso con costo > $5k/mes: aprobación CFO + comunicación
>   al CTO.
>
> ## Alertas configuradas (al 2026-04-30)
>
> - Total cuenta AWS > $45k/mes proyectado: SI (notifica a Esteban + Mariano).
> - Por región (BR-1, UY-bridge): **NO** — gap a cubrir.
> - Por tag de proyecto: NO — gap a cubrir.
>
> _Notar: en el spike de abril 2026, la alerta de total cuenta saltó
> el 28-abr. Demasiado tarde para evitar el delta. La alerta granular
> por región habría disparado el 9-abr aproximadamente._
