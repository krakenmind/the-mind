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

> _(Nota: SD-2147 se abre a las 12:38, pero antes de abrirse hubo un
> heads-up de la lead de SD a primera hora — quedó como nota previa al
> ticket en el board del equipo. Pablo lo vio a la mañana pero estaba en
> hora pico cuando entró este caso y no lo recordó.)_

- **Lucía Mendoza · 2026-04-23 09:15** _(daily heads-up al equipo SD)_
  > Heads up del cambio de anoche en UY-1 (OPS-892, Diego): cambiaron las
  > IPs de Carpincho01-05 y Yaguar01-02. Si algún cliente reporta que no
  > conecta a alguno de esos servidores, primero validar la IP nueva en
  > Notion (Inventario UY-1) antes de escalar a OPS. Lo paso al daily de
  > SD también.

- **Pablo Lima · 2026-04-23 09:17**
  > 👍 anotado.

- **Pablo Lima · 2026-04-23 12:42**
  > Reproduje el error desde mi VPN admin. No responde a ping tampoco.
  > Voy a chequear con OPS si tocaron algo anoche, hubo ventana de change.

- **Lucía Mendoza · 2026-04-23 12:55**
  > Pablo, fijate con Diego, me suena que hubo re-segmentación de VLAN
  > en UY-1 anoche. Mirá OPS-892, te lo dejé en el daily a la mañana.

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
  > 🚨 Cambios de red completados en UY-1 (OPS-892). Cambio ejecutado sin
  > incidentes, todas las IPs nuevas responden.
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
  > Voy a actualizar el inventario en Notion ahora. Si algún cliente
  > reporta SSH caído mañana, es 99% que tiene la IP vieja en su VPN.
  > Cualquier cosa me escriben.

- **Mariano Silva · 2026-04-23 02:16**
  > 👍 gracias Diego. @lucia.mendoza heads up para SD por si reportan
  > algo mañana.

- **Lucía Mendoza · 2026-04-23 02:18**
  > Recibido, lo paso al daily de SD.

- **Diego Marín · 2026-04-23 02:30**
  > Notion actualizado, ticket cerrado. Si algún cliente reporta caída de SSH,
  > es porque tiene la IP vieja en su lado (VPN, archivos `~/.ssh/config`, etc).

- **Mariano Silva · 2026-04-23 02:34**
  > 👍 cierro change. Ojo SD esta semana, posible que algún cliente no haya
  > propagado el aviso.
