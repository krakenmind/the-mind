# Google Drive — Archivos para case08

## Archivo 1: "Master Service Agreement — Mercado Norte 2024-2026.pdf"

- **Path**: Cloudara HQ / Legal / Contratos clientes / Mercado Norte
- **Owner**: Andrea Pérez
- **Last modified**: 2024-07-15 (firma original) — sin cambios desde entonces
- **Tipo**: PDF firmado
- **Tags**: `contrato`, `cliente:mno`, `vigente`

### Contenido (extracto literal — secciones relevantes)

> **MASTER SERVICE AGREEMENT**
> Entre **Cloudara S.A.** (en adelante, "el Proveedor"), RUT 218765430012, con domicilio en Av. 18 de Julio 1234, Montevideo, Uruguay; y **Mercado Norte S.A.** (en adelante, "el Cliente"), RUT 215678901234, con domicilio en Rambla República de México 5678, Montevideo, Uruguay.
>
> **Vigencia**: desde el 15 de julio de 2024 hasta el 15 de julio de 2026, con opción de renovación bianual.
>
> ---
>
> ## SECCIÓN 4 — NIVELES DE SERVICIO (SLA)
>
> 4.1. El Proveedor se compromete a mantener el servicio identificado como **"Checkout-Web"** con una disponibilidad mensual igual o superior al **99.9%**, medida sobre la base de cada mes calendario.
>
> 4.2. **Definición de "Downtime"**. A los efectos del presente Acuerdo, se considerará "Downtime" exclusivamente toda ventana temporal continua de duración igual o superior a un (1) minuto durante la cual más del cincuenta por ciento (50%) de las peticiones HTTP recibidas por el servicio Checkout-Web hayan resultado en respuesta de tipo 5xx (errores de servidor) según el código de estado HTTP devuelto al Cliente final.
>
> 4.3. **No constituyen Downtime** a los efectos de la Sección 4.2, sin que la siguiente enumeración sea taxativa: (i) ventanas de mantenimiento programadas y notificadas con al menos 72 horas de anticipación; (ii) degradación de performance que no implique error 5xx mayoritario; (iii) fallas atribuibles a infraestructura, integraciones o sistemas operados por el Cliente o por terceros bajo control del Cliente; (iv) eventos de fuerza mayor según se definen en la Sección 12.
>
> 4.4. La disponibilidad mensual se calculará como: `(Tiempo total del mes - Downtime) / Tiempo total del mes`, expresado como porcentaje con dos decimales.
>
> ---
>
> ## SECCIÓN 7 — PENALIDADES POR INCUMPLIMIENTO DE SLA
>
> 7.1. En caso de que la disponibilidad mensual del servicio Checkout-Web (Sección 4) resulte inferior al compromiso establecido, el Proveedor acreditará al Cliente un crédito sobre el fee mensual del servicio afectado, conforme al siguiente esquema escalonado:
>
> | Disponibilidad mensual medida | Crédito sobre fee mensual |
> |-------------------------------|---------------------------|
> | ≥ 99.9%                       | 0% (sin crédito)          |
> | < 99.9% y ≥ 99.5%             | **5%**                    |
> | < 99.5% y ≥ 99.0%             | **15%**                   |
> | < 99.0%                       | 30%                       |
>
> 7.2. El crédito se aplicará como descuento sobre la siguiente factura emitida por el Proveedor al Cliente. En ningún caso el crédito acumulado mensual podrá exceder el cien por ciento (100%) del fee del servicio afectado.
>
> 7.3. Para que proceda el crédito, el Cliente deberá notificar el incumplimiento por escrito dentro de los treinta (30) días corridos siguientes al cierre del mes calendario en cuestión, con detalle de las ventanas de Downtime alegadas. El Proveedor podrá oponer su propia medición, en cuyo caso prevalecerá la metodología definida en la Sección 4.2.
>
> ---
>
> _Firmado en Montevideo el 15 de julio de 2024._
> _Por Cloudara S.A.: Lucía Castro, CEO._
> _Por Mercado Norte S.A.: Lautaro Bermúdez, IT Director (con poder suficiente)._

---

## Archivo 2: "Mercado Norte — fee mensual abril 2026.pdf"

- **Path**: Cloudara HQ / Finanzas / Facturación / Mercado Norte / 2026
- **Owner**: Esteban Romero
- **Last modified**: 2026-04-01
- **Tipo**: PDF (factura proforma)

### Contenido (extracto literal)

> **CLOUDARA S.A.**
> Factura proforma — abril 2026
> Cliente: Mercado Norte S.A. — RUT 215678901234
>
> | Concepto                                    | Monto (USD) |
> |---------------------------------------------|-------------|
> | Servicio Checkout-Web (fee mensual base)    | 18.500      |
> | Soporte 24x7 (incluido)                     | 0           |
> | Storage adicional (200 GB)                  | 0 (incluido)|
> | **Total a facturar**                        | **18.500**  |
>
> _Nota interna (Esteban Romero, 2026-04-01): el fee de USD 18.500/mes está vigente desde enero 2025 (ajuste por CPI). Aplica a marzo, abril y los meses subsiguientes hasta la renovación de julio. Cualquier credit por SLA debe descontarse contra este fee._
