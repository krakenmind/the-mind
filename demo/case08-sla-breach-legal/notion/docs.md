# Notion — Docs para case08

## Página 1: "PMT-2026-03 Mercado Norte checkout — Postmortem"

- **Path**: Cloudara HQ / Cloud Ops / Postmortems / 2026
- **Owner**: Mariano Silva
- **Last edited**: 2026-03-17 10:25 UYT por Mariano Silva
- **Tags**: `postmortem`, `cliente:mno`, `checkout-web`, `sev2`

### Contenido (copiar tal cual)

> # Postmortem PMT-2026-03 — Degradación Checkout-Web Mercado Norte
>
> **Severidad**: SEV-2
> **Ventana del incidente**: 2026-03-08 09:42 → 2026-03-16 18:10 UYT (8 días)
> **Servicio afectado**: Checkout-Web (cliente Mercado Norte, UY-1)
> **Owner**: Mariano Silva (SRE Lead)
> **Linear**: OPS-1432
>
> ## Resumen ejecutivo
>
> Degradación intermitente del servicio Checkout-Web durante 8 días. La causa
> raíz fue saturación del pool de conexiones HTTP del módulo de pagos tras un
> upgrade del SDK del PSP el 2026-03-07. El parche definitivo (ampliar pool y
> agregar circuit breaker) se aplicó el 2026-03-16 18:00.
>
> ## Cronología y métricas (Prometheus, UY-1, namespace `mno-checkout`)
>
> | Métrica                                                | Valor       |
> |--------------------------------------------------------|-------------|
> | Minutos totales del mes (marzo 2026)                   | 44.640      |
> | Minutos con degradación parcial (5xx 5-50%, latencia) | 7.183       |
> | **Minutos en downtime contractual (5xx >50% por >1min)** | **263 (4h 23m)** |
> | Cantidad de ventanas de downtime contractual           | 11 episodios|
>
> ## Cálculo de disponibilidad — dos lecturas
>
> ### Lectura 1: dashboard genérico (NO contractual)
>
> El dashboard de Grafana "uptime-clientes" calcula disponibilidad como
> `(min sin error 5xx ni latencia >2s) / total_min`. Bajo esa definición laxa,
> marzo dio: `(44640 - 263 - 7183) / 44640 = 83.4%` — pero ese número es absurdo
> porque incluye latencia momentánea y se descarta. La métrica que usa el equipo
> de **Customer Success** y el reporte mensual al cliente es:
>
> > `(min_totales - min_downtime_contractual - min_degradacion_parcial) / min_totales`
> > = `(44640 - 263 - 7183) / 44640 ≈ 92%` — también descartada.
>
> El reporte que finalmente se envió al cliente (ver "Reportes mensuales de
> uptime — clientes" para marzo) usa una **versión intermedia**: cuenta como
> "downtime efectivo" los episodios donde 5xx > 5% por >1min — eso da:
>
> > `(44640 - 259) / 44640` — donde 259 son los minutos con 5xx>5%/min
> > continuos durante marzo. **Resultado reportado: 99.42%.**
>
> Este es el número que usa Pedro Reyes (counsel de Mercado Norte) para
> reclamar penalty del 15%.
>
> ### Lectura 2: definición contractual estricta (Sección 4.2 MSA)
>
> El contrato MSA Mercado Norte 2024-2026 (Sección 4.2) define downtime como
> **>50% de requests 5xx durante >1 minuto continuo**. Bajo esa definición:
>
> > `(44640 - 263) / 44640 = 99.4111...` — corregido más abajo
>
> _Corrección 2026-03-17_: el 263 inicial incluía minutos donde 5xx estuvo entre
> 30-50%. Tras filtrar estricto >50%, el total real es **75 minutos = 1h 15m**.
> Sin embargo, el equipo legal y SRE acordó usar el cálculo más conservador
> para Cloudara (que **incluye** el threshold de "1min continuo"), que totaliza
> **263 min (4h 23m)**. Esa es la cifra defendible y la que vamos a usar.
>
> > **Disponibilidad contractual estricta = (44640 - 263) / 44640 = 99.41% / 99.83%**
>
> _Aclaración numérica final (Mariano)_: el cálculo correcto bajo la definición
> contractual y filtrando ventanas >1min con >50% 5xx es **99.83%**. El
> 99.41% del cálculo intermedio mezclaba ventanas <1min de duración. Para
> defensa contractual usamos **99.83%**.
>
> ## Tier de penalty aplicable según cada lectura
>
> - **Bajo 99.42% (lectura cliente)**: tier `<99.5%` → 15% del fee = USD 2.775
> - **Bajo 99.83% (lectura contractual estricta)**: tier `<99.9 ≥99.5` → 5% del fee = USD 925
>
> ## Causa raíz
>
> El SDK del PSP v3.4.0 (deploy el 07-mar) cambió el comportamiento de keep-alive:
> conexiones que antes se reciclaban tras 30s ahora persisten 15min. Con el
> pool de 50 conexiones, eso saturaba bajo carga normal y devolvía 5xx en
> oleadas. No hubo caída total del servicio, sí oleadas de error.
>
> ## Acciones tomadas
>
> 1. Pool ampliado 50 → 200 conexiones (deploy 16-mar 17:42).
> 2. Circuit breaker agregado en el cliente HTTP del PSP (deploy 16-mar 17:55).
> 3. Alerta nueva en Prometheus: `pool_saturation > 80%` por >2min → page.
> 4. Pendiente: revisar SDK changelog antes de upgrades del PSP (DEV).
>
> ## Lecciones aprendidas
>
> - Los upgrades del SDK del PSP no estaban en la lista de "cambios sensibles"
>   del comité de change. Sumarlos.
> - El dashboard genérico de uptime confunde degradación con downtime y no se
>   alinea con la definición contractual. **Acción para Andrea/Mariano**:
>   armar dashboard "uptime contractual" por cliente, basado estrictamente en
>   la definición de cada MSA.

---

## Página 2: "Reportes mensuales de uptime — clientes"

- **Path**: Cloudara HQ / Customer Success / Reportes / Uptime
- **Owner**: Mariano Silva
- **Last edited**: 2026-04-02 14:10 UYT por Mariano Silva
- **Tags**: `reporting`, `customer-success`, `sla`

### Contenido (copiar tal cual — sólo la sección de marzo Mercado Norte)

> # Reportes mensuales de uptime — clientes
>
> _Esta página agrega los reportes de uptime que se envían a clientes. La
> métrica usada es la del dashboard "uptime-clientes" (ver nota al final)._
>
> ## Marzo 2026
>
> ### Mercado Norte — servicio Checkout-Web
>
> | Indicador                          | Valor      |
> |------------------------------------|------------|
> | Disponibilidad reportada           | **99.42%** |
> | Downtime efectivo (definición dashboard) | 4h 19m |
> | Episodios SEV-2 / SEV-1            | 1 / 0      |
> | Tickets relacionados               | OPS-1432   |
> | Postmortem                         | PMT-2026-03|
>
> _Reporte enviado al cliente (Lautaro Bermúdez, IT Director MNO) el 2026-04-02
> por Mariano. Adjunto al mail: PMT-2026-03._
>
> ### Salud Plus — servicio Cloud Backup
>
> | Disponibilidad reportada           | 99.99%     |
>
> ### Banco Austral — servicio Core API
>
> | Disponibilidad reportada           | 99.97%     |
>
> ---
>
> > **NOTA IMPORTANTE (Mariano, 2026-03-17)**: este dashboard usa una
> > definición de "downtime" más amplia que la contractual de cada cliente.
> > Para evaluar penalty bajo MSA hay que recalcular con la Sección 4.2
> > del contrato específico. Ver doc "Definiciones contractuales — qué
> > cuenta como downtime".

---

## Página 3: "Definiciones contractuales — qué cuenta como downtime"

- **Path**: Cloudara HQ / Legal / Operativo / SLA y métricas
- **Owner**: Andrea Pérez
- **Last edited**: 2026-03-18 11:20 UYT por Andrea Pérez
- **Tags**: `legal`, `sla`, `definiciones`, `contratos`

### Contenido (copiar tal cual)

> # Definiciones contractuales — qué cuenta como downtime
>
> _Doc viva mantenida por Legal con SRE Lead. Última revisión: 2026-03-18 (Andrea + Mariano)._
>
> ## Por qué existe este documento
>
> Los dashboards internos de uptime usan definiciones **más amplias** que las
> de cada contrato (a veces incluyen latencia, errores 4xx, degradaciones
> parciales). Para evaluar si hubo breach de SLA y cuál es el penalty
> aplicable, hay que usar la definición contractual del cliente puntual.
>
> ## Definiciones por cliente
>
> ### Mercado Norte (MSA 2024-2026, Sección 4.2)
>
> > **Downtime** = ventana temporal continua de duración igual o superior a
> > **1 minuto** durante la cual **más del 50% de las requests HTTP** al
> > servicio Checkout-Web hayan resultado en respuesta **5xx**.
>
> Implicancias:
>
> - 5xx esporádicos (<50%) **no** cuentan como downtime, aunque degraden la UX.
> - Latencia alta sin error 5xx **no** cuenta como downtime.
> - Errores 4xx (cliente, autenticación) **no** cuentan como downtime.
> - Una ventana de 30 segundos con 100% 5xx **no** cuenta (falla el threshold de duración).
>
> Cálculo recomendado: query en Prometheus
> `sum_over_time((http_5xx_ratio > 0.5) [1m]) / total_minutos_mes`
>
> ### Banco Austral (MSA 2025-2027, Anexo II)
>
> > **Downtime** = imposibilidad de procesar transacciones por más de **2 minutos
> > continuos**, medida sobre transacciones reales (no sintéticas).
>
> ### Salud Plus (MSA 2024-2025, Sección 5)
>
> > **Downtime** = error en la respuesta del servicio o latencia >10s, medida
> > sobre healthcheck cada 30s.
>
> _(definiciones de los demás clientes en sub-páginas)_
>
> ## Tabla de tier de penalties (referencia rápida MNO)
>
> | Disponibilidad | Tier MSA | Penalty (% fee mensual) |
> |----------------|----------|--------------------------|
> | ≥ 99.9%        | OK       | 0%                       |
> | < 99.9 ≥ 99.5% | Tier 1   | 5%                       |
> | < 99.5 ≥ 99.0% | Tier 2   | 15%                      |
> | < 99.0%        | Tier 3   | 30%                      |
>
> ## Casos prácticos resueltos
>
> - **Marzo 2026 — Mercado Norte**: dashboard reportó 99.42%; recálculo bajo
>   definición contractual estricta → **99.83%**. Tier 1 (5%). Ver postmortem
>   PMT-2026-03 y ticket OPS-1432.
