# Linear — Tickets para case01

## SD-2147 — Cliente Banco Austral reporta caída de Carpincho01

- **Team**: Service Desk (SD)
- **Type**: Bug · **Priority**: Urgent
- **Status**: In Progress
- **Assignee**: Pablo Lima · **Reporter**: Lucía Mendoza
- **Cliente**: Banco Austral
- **Labels**: `cliente:bau`, `infra`, `vpn`
- **Created**: 2026-04-23 12:38 UYT

### Description (copiar tal cual)

> Cliente Banco Austral (usuario: Roberto Sosa, roberto.sosa@bancoaustral.uy) reporta
> que desde las 12:34 hs no puede establecer SSH al servidor Carpincho01 (10.40.11.18).
> La conexión muere en el handshake TLS, no llega ni a pedir credenciales.
>
> Otros servidores del mismo segmento (Carpincho02, Carpincho03) responden bien
> según el cliente. El cliente accede vía la VPN site-to-site contratada.
>
> Email original adjunto en el thread (soporte@cloudara.uy, 12:36 UYT).
>
> Pendiente: cruzar con OPS por si hubo cambios anoche.

### Comments

- **Pablo Lima · 2026-04-23 12:42**
  > Reproduje el error desde mi VPN admin. No responde a ping tampoco.
  > Voy a chequear con OPS si tocaron algo anoche, hubo ventana de change.

- **Lucía Mendoza · 2026-04-23 12:55**
  > Pablo, fijate con Diego, me suena que hubo re-segmentación de VLAN
  > en UY-1 anoche. Buscá en #ops-alerts.

---

## OPS-892 — Re-segmentación VLAN servidores cliente UY-1

- **Team**: Operations (OPS)
- **Type**: Change · **Priority**: Medium
- **Status**: Done
- **Assignee**: Diego Marín · **Reporter**: Mariano Silva
- **Labels**: `change-mgmt`, `network`, `uy-1`, `vlan`
- **Created**: 2026-04-18 10:02 UYT
- **Completed**: 2026-04-23 02:30 UYT
- **Change window**: 2026-04-23 01:00 — 03:00 UYT (aprobada en comité del 18-abr)

### Description (copiar tal cual)

> Re-segmentación de VLAN de servidores cliente en UY-1 para separar el tráfico
> por línea de servicio (Cloud Ops vs Custom Dev vs Managed IT). Esto implica
> re-direccionamiento IP de los siguientes servidores:
>
> - Carpincho01: 10.40.11.18 → **10.40.12.34**
> - Carpincho02: 10.40.11.19 → **10.40.12.35**
> - Carpincho03: 10.40.11.20 → **10.40.12.36**
> - Carpincho04: 10.40.11.21 → **10.40.12.37**
> - Carpincho05: 10.40.11.22 → **10.40.12.38**
> - Yaguar01: 10.40.11.40 → **10.40.13.10**
> - Yaguar02: 10.40.11.41 → **10.40.13.11**
>
> Notificación a clientes afectados: enviada por AE el 2026-04-20 (ver Gabriel Ferré).
> Update de doc Notion: a cargo de Diego, post-ejecución.

### Comments

- **Diego Marín · 2026-04-23 02:14**
  > Cambio ejecutado sin incidentes. Todas las IPs nuevas responden.
  > Avisé en #ops-alerts. Voy a actualizar el inventario en Notion ahora.

- **Diego Marín · 2026-04-23 02:30**
  > Notion actualizado, ticket cerrado. Si algún cliente reporta caída de SSH,
  > es porque tiene la IP vieja en su lado (VPN, archivos `~/.ssh/config`, etc).

- **Mariano Silva · 2026-04-23 02:34**
  > 👍 cierro change. Ojo SD esta semana, posible que algún cliente no haya
  > propagado el aviso.
