# Slack — Mensajes para case01

## #ops-alerts

**Diego Marín · 2026-04-23 02:14 UYT**

> :rotating_light: cambios de red completados en UY-1 (OPS-892).
>
> Servidores cliente con IP nueva:
> - carpincho01 IP cambiada de 10.40.11.18 a 10.40.12.34
> - carpincho02 IP cambiada de 10.40.11.19 a 10.40.12.35
> - carpincho03 IP cambiada de 10.40.11.20 a 10.40.12.36
> - carpincho04 IP cambiada de 10.40.11.21 a 10.40.12.37
> - carpincho05 IP cambiada de 10.40.11.22 a 10.40.12.38
> - yaguar01 IP cambiada de 10.40.11.40 a 10.40.13.10
> - yaguar02 IP cambiada de 10.40.11.41 a 10.40.13.11
>
> Inventario en Notion actualizado. Si algún cliente reporta SSH caído mañana,
> es 99% que tiene la IP vieja en su VPN. Cualquier cosa me escriben.

**Mariano Silva · 2026-04-23 02:16 UYT**
> 👍 gracias Diego. @lucia.m heads up para SD por si reportan algo mañana.

**Lucía Mendoza · 2026-04-23 02:18 UYT**
> recibido, lo paso al daily de SD.

---

## #sd-tier1

**Lucía Mendoza · 2026-04-23 09:15 UYT**

> Buenas, heads up del cambio de anoche en UY-1 (OPS-892, Diego):
> cambiaron las IPs de Carpincho01-05 y Yaguar01-02. Si algún cliente reporta
> que no conecta a alguno de esos servidores, primero validar la IP nueva en
> Notion (Inventario UY-1) antes de escalar a OPS.

**Pablo Lima · 2026-04-23 09:17 UYT**
> 👍 anotado.

_(nota: este mensaje matutino quedó en el feed pero Pablo, cuando entra
SD-2147 a las 12:38, está en hora pico de tickets y no lo recordó. Por
eso pregunta a Krakenmind.)_
