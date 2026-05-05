# Caso 1 — Service Desk: cliente no puede entrar a Carpincho01

**Persona**: Service Desk (Pablo Lima / Lucía Mendoza)
**Tiempo de demo**: ~3-5 minutos

## El prompt
> "Un usuario de Banco Austral me dice que no puede ingresar al servidor Carpincho01, ¿qué hago?"

## Lo que pasa "detrás"

Anoche (madrugada del 23-abr) Diego Marín, el Network Admin, ejecutó un cambio de red programado en UY-1: re-segmentación de la VLAN de servidores cliente. Carpincho01 quedó con IP nueva (`10.40.12.34`) en lugar de la vieja (`10.40.11.18`). Diego dejó constancia: ticket OPS-892 cerrado con comentario detallando todas las IPs nuevas, doc de Notion "Inventario Servidores Cloudara — UY-1" actualizado.

El cliente Banco Austral no recibió la notificación de actualización de VPN (o no la propagó internamente — eso es una historia para otro día). A las 12:34 hs Roberto Sosa, sysadmin del cliente, intenta conectar y muere el handshake. A las 12:36 manda mail a soporte. A las 12:38 Pablo Lima abre SD-2147.

Pablo es L1, no estuvo en el cambio, y mira el ticket sin contexto. Le pregunta a Krakenmind. La respuesta tiene que cruzar SD-2147 ↔ OPS-892 ↔ Notion ↔ Gmail para reconstruir que el problema no es del servidor sino de la VPN del cliente apuntando a la IP vieja.

## Fuentes y evidencia

- **Linear** — `SD-2147` (queja del cliente, abierto por Pablo, con heads-up matutino de Lucía Mendoza del 2026-04-23 09:15 sobre el cambio) y `OPS-892` (cambio de red ejecutado por Diego anoche, cerrado, con comment de Diego del 2026-04-23 02:14 listando todas las IPs nuevas).
- **Notion** — "Inventario Servidores Cloudara — UY-1", última edición de Diego con la IP **nueva** de Carpincho01.
- **Gmail** — thread del usuario `roberto.sosa@bancoaustral.uy` quejándose a `soporte@cloudara.uy` a las 12:36.

## Respuesta esperada

> El problema no es que Carpincho01 esté caído. Anoche Diego Marín ejecutó un cambio de red programado en UY-1 (ticket **OPS-892**, cerrado a las 02:30 UYT del 23-abr) y Carpincho01 cambió de IP: pasó de `10.40.11.18` a `10.40.12.34`. La doc de Notion "Inventario Servidores Cloudara — UY-1" ya tiene la IP nueva, y Diego dejó constancia del cambio como comentario en OPS-892 a las 02:14 listando todas las IPs nuevas.
>
> El cliente Banco Austral está entrando con la IP vieja (eso surge del email de Roberto Sosa a las 12:36 y del SD-2147). Acción: contestar a Roberto que actualice el endpoint en su VPN a `10.40.12.34`, citarle el OPS-892 como evidencia del cambio, y dejar nota en SD-2147 cerrando con la causa raíz. Confirmar después con Diego si el aviso al cliente salió por el canal habitual; si no salió, es un gap de comunicación a documentar.

## Por qué es valioso

Krakenmind convierte un ticket de service desk de 30+ minutos de investigación (preguntar a OPS, buscar la doc, revisar el ticket de change, validar con Diego) en una respuesta de 30 segundos con citas. El L1 resuelve sin escalar, el cliente queda atendido, y queda trazabilidad cruzada entre Linear, Notion y Gmail.
