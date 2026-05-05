# Google Drive — Archivos para case10

## Archivo 1: "Master Service Agreement — Mercado Norte 2024-2026.pdf"

- **Path**: Cloudara HQ / Legal / Contratos clientes / Mercado Norte
- **Owner**: Andrea Pérez
- **Last modified**: 2024-07-15 (firma original)
- **Tipo**: PDF firmado

### Contenido (resumen — secciones relevantes para renovación)

> _(Mismo contrato que case08 — ver case08/google-drive/files.md para extracto
> completo de Secciones 4 y 7 sobre SLA y penalidades.)_
>
> **Datos clave para renovación**:
>
> - **Vigencia**: 15-jul-2024 → **15-jul-2026** (vence en 2.5 meses al momento del prompt).
> - **Cláusula de renovación**: opción de renovación bianual con preaviso de 30
>   días. Si Mercado Norte no notifica antes del 15-jun-2026, la renovación
>   se entiende automática por 2 años más a precio actual.
> - **Servicio principal**: Checkout-Web (fee mensual USD 18.500 → USD 222.000 anuales).
> - **Cláusula de salida** (Sección 11): cualquiera de las partes puede no
>   renovar dando aviso 30 días antes del vencimiento. No hay penalty por
>   no-renovación.
> - **Cláusula de migración** (Sección 13): Cloudara debe colaborar en una
>   migración ordenada por hasta 60 días post-vencimiento con cargo a tarifa.
>
> _Nota Andrea (2026-04-15)_: Pedro Reyes (legal MNO) ya nos avisó verbalmente
> que van a notificar formalmente la decisión de renovar/no-renovar antes del
> 15-jun. Tenemos hasta el 31-may para presentar propuesta final.

---

## Archivo 2: "Análisis márgenes Mercado Norte 2024-2025.pdf"

- **Path**: Cloudara HQ / Finanzas / Análisis cuentas / Mercado Norte
- **Owner**: Esteban Romero
- **Last modified**: 2026-01-31 (cierre fiscal 2025)
- **Tipo**: PDF (análisis financiero)

### Contenido (extracto literal)

> # Análisis de márgenes — Cuenta Mercado Norte
> _Período: julio 2024 — diciembre 2025 (18 meses de operación bajo MSA actual)_
> _Preparado por: Esteban Romero, CFO_
>
> ## Resumen ejecutivo
>
> | Indicador                     | Valor          |
> |-------------------------------|----------------|
> | Revenue total 18 meses        | USD 333.000    |
> | Revenue anualizado            | USD 222.000    |
> | Costo directo (infra + equipo)| USD 137.640    |
> | Margen bruto                  | USD 84.360     |
> | **Margen %**                  | **38%**        |
> | Margen mínimo aceptable (política Cloudara para clientes top-tier) | **28%** |
>
> ## Composición de costos directos (anual)
>
> | Componente                                      | USD     | % del costo |
> |-------------------------------------------------|---------|-------------|
> | Infra UY-1 (servidores Carpincho03/04, storage) | 32.400  | 23.5%       |
> | Infra BR-1 (replicación checkout)               | 18.900  | 13.7%       |
> | FTE asignado (~0.5 SRE + ~0.3 backend)          | 78.300  | 56.9%       |
> | Soporte 24x7 (alocación SD)                     | 7.200   | 5.2%        |
> | Licencias y herramientas                        | 840     | 0.7%        |
> | **Total costo directo anual**                   | 137.640 | 100%        |
>
> ## Sensibilidad de margen ante distintos escenarios de renovación
>
> | Escenario                       | Revenue anual | Margen %    | Comentario              |
> |---------------------------------|---------------|-------------|-------------------------|
> | Flat (USD 222k)                 | 222.000       | **~28-30%** | Margen en el piso aceptable. Protege cuenta. |
> | Lift +5% (USD 233k)             | 233.100       | ~33%        | Acceptable. Riesgo de churn medio. |
> | Lift +10% + SLA premium (USD 244k) | 244.200    | ~36%        | Bueno financieramente. Riesgo de churn alto. |
> | No renovación (churn)           | 0             | -100%       | Pérdida total + costo de migración. |
>
> ## Comentarios para la negociación
>
> - El costo directo subió ~6% YoY en 2025 (mayor uso de infra BR-1 por
>   replicación tras incidente de capacidad en UY-1 de septiembre 2025).
>   Si renovamos Flat, el margen erosiona a ~28% en 2027.
> - Política Cloudara: no aceptar cuentas con margen <28% sostenido. Si Flat
>   nos lleva a 27% o menos en 2027, hay que disparar review.
> - Reforzar Service Desk (queja explícita del cliente, ver QBR Q1 2026)
>   tiene un costo estimado de USD 8-12k/año adicional. Eso debe contemplarse
>   en cualquier oferta Flat.
>
> _Recomendación financiera_: tier Flat es viable pero ajustado. Tier Lift+5%
> es el equilibrio óptimo entre retención y margen. Tier Lift+10% solo si el
> cliente acepta SLA premium (que justifique el delta).
