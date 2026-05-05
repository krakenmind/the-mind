# Notion — Docs para case01

## Página: "Inventario Servidores Cloudara — UY-1"

- **Path**: Cloudara HQ / Cloud Ops / Inventario / UY-1
- **Owner**: Diego Marín
- **Last edited**: 2026-04-23 02:28 UYT por Diego Marín
- **Tags**: `inventario`, `uy-1`, `network`

### Contenido (copiar tal cual)

> # Inventario Servidores — Datacenter UY-1 (Montevideo)
>
> _Última actualización: 2026-04-23 02:28 UYT — Diego Marín_
>
> > **Nota del 23-abr-2026**: ejecutada re-segmentación de VLAN según OPS-892.
> > IPs de servidores cliente actualizadas. Si algo no conecta, validar primero
> > la IP nueva contra esta tabla antes de escalar.
>
> ## Servidores cliente (línea Cloud Ops)
>
> | Servidor      | IP nueva       | IP anterior    | Cliente        | Rol           | Estado |
> |---------------|----------------|----------------|----------------|---------------|--------|
> | Carpincho01   | 10.40.12.34    | 10.40.11.18    | Banco Austral  | App backend   | OK     |
> | Carpincho02   | 10.40.12.35    | 10.40.11.19    | Banco Austral  | App frontend  | OK     |
> | Carpincho03   | 10.40.12.36    | 10.40.11.20    | Mercado Norte  | App backend   | OK     |
> | Carpincho04   | 10.40.12.37    | 10.40.11.21    | Mercado Norte  | Cache Redis   | OK     |
> | Carpincho05   | 10.40.12.38    | 10.40.11.22    | Salud Plus     | App backend   | OK     |
> | Yaguar01      | 10.40.13.10    | 10.40.11.40    | Ministerio Sur | App gov       | OK     |
> | Yaguar02      | 10.40.13.11    | 10.40.11.41    | Ministerio Sur | Workers       | OK     |
> | Mulita-DB-01  | 10.40.20.5     | 10.40.20.5     | (compartido)   | Postgres 15   | OK     |
> | Tero-Bastion  | 10.40.99.2     | 10.40.99.2     | (interno)      | SSH bastion   | OK     |
>
> ## Notas operativas
>
> - El acceso desde clientes pasa siempre por la VPN site-to-site. Si el cliente
>   tiene un endpoint hard-coded con la IP vieja, le va a fallar el handshake.
> - El AE responsable (Gabriel Ferré) envió aviso preventivo a todos los clientes
>   afectados el 2026-04-20. Si el cliente dice "no me llegó", validar con Gabriel.
> - La VLAN nueva por servicio: `12.x` Cloud Ops, `13.x` Custom Dev, `14.x` Managed IT.
>
> ## Histórico de cambios
>
> - 2026-04-23 — re-segmentación VLAN por línea de servicio (OPS-892, Diego).
> - 2026-02-11 — alta de Carpincho05 para Salud Plus (OPS-851, Diego).
> - 2025-12-03 — alta de Yaguar02 para Ministerio Sur (OPS-812, Mariano).
