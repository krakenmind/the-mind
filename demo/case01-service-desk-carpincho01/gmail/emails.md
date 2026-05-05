# Gmail — Threads para case01

## Email 1: queja inicial del cliente

- **From**: Roberto Sosa <roberto.sosa@bancoaustral.uy>
- **To**: soporte@cloudara.uy
- **CC**: lucia.m@cloudara.uy
- **Subject**: Carpincho01 inalcanzable desde 12:34
- **Date**: 2026-04-23 12:36 UYT

### Contenido (copiar tal cual)

> Hola equipo,
>
> Desde las 12:34 hs no puedo conectar a Carpincho01 vía la VPN. El SSH muere
> en el handshake (timeout, sin prompt de credenciales). Carpincho02 y
> Carpincho03 responden bien, así que descarto que sea mi VPN.
>
> Estoy en producción intentando aplicar un hotfix, esto me bloquea.
> ¿Pueden mirar urgente?
>
> Endpoint que estoy usando:
>   ssh deploy@10.40.11.18
>
> Saludos,
> Roberto Sosa
> SysAdmin · Banco Austral
> +598 99 432 118

---

## Email 2: respuesta sugerida (NO enviada todavía — el SD la va a redactar después de hablar con Krakenmind)

- **From**: soporte@cloudara.uy (Pablo Lima)
- **To**: Roberto Sosa <roberto.sosa@bancoaustral.uy>
- **CC**: lucia.m@cloudara.uy, gabriel@cloudara.uy
- **Subject**: Re: Carpincho01 inalcanzable desde 12:34
- **Status**: DRAFT (a enviar tras la demo)

### Contenido (copiar tal cual)

> Hola Roberto,
>
> Carpincho01 está OK, lo que pasó es que anoche ejecutamos un cambio de red
> programado en UY-1 (ticket OPS-892, ventana 01:00-03:00 UYT del 23-abr) y la
> IP del servidor cambió:
>
>   IP anterior: 10.40.11.18
>   IP nueva:    10.40.12.34
>
> Probá conectar a `deploy@10.40.12.34` y debería funcionar. Si tu VPN tiene
> la IP hardcodeada en algún archivo de config, también hay que actualizarla
> ahí. Te paso el inventario completo de IPs nuevas en archivo aparte.
>
> Para futuro: la notificación de este cambio se envió desde nuestro AE
> (Gabriel Ferré) el 2026-04-20. Vamos a revisar de nuestro lado por qué
> no llegó al canal correcto.
>
> Avisame cuando puedas reconectar.
>
> Saludos,
> Pablo
> Service Desk · Cloudara
