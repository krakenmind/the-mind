# Linear — Tickets para case09

## PEOPLE-87 — Onboarding Federica Vázquez 2026-05-05

- **Team**: People Ops (PEOPLE)
- **Type**: Task · **Priority**: High
- **Status**: In Progress
- **Assignee**: Valentina Otero · **Reporter**: Valentina Otero
- **Labels**: `onboarding`, `dev-team`, `senior`
- **Created**: 2026-04-28 14:20 UYT
- **Target start date**: 2026-05-05

### Description (copiar tal cual)

> Onboarding de Federica Vázquez como Senior Backend Engineer (team DEV).
> Manager: Camila Núñez (a confirmar como buddy también si tiene capacidad).
> Start date: lunes 2026-05-05.
>
> Checklist de referencia: Notion / "Onboarding — Engineer (Backend)".
>
> Sub-tareas creadas (linkear):
> - [x] Solicitar laptop (Done — Service Desk)
> - [~] Provisión cuentas IT (parent: ver OPS-1599, DEV-1078, SD-2199, SEC-211)
> - [ ] Buddy assignment (Pending — yo lo gestiono esta semana)
> - [x] Welcome packet enviado por mail
>
> Notas:
> - Federica viene de Globant, ya manejó tooling similar.
> - Va a estar asignada al sprint de Banco Austral (repo `bau-backend`) desde
>   la semana 2. Eso requiere bg check completado.

### Comments

- **Valentina Otero · 2026-05-02 11:40**
  > Confirmadas las cuentas IT con Mariano (AWS) y los chicos de DEV (GitHub).
  > Falta cerrar el bg check (SEC-211) y elegir buddy. Voy a ver el doc de
  > capacidad este finde.

- **Camila Núñez · 2026-05-02 16:05**
  > Valen dale, yo arranco como manager de Federica. Si necesitás buddy
  > extra avisame, este Q tengo banda más liviana.

---

## OPS-1599 — Crear acceso AWS read-only para fvazquez

- **Team**: Operations (OPS)
- **Type**: Task · **Priority**: Medium
- **Status**: Done
- **Assignee**: Mariano Silva · **Reporter**: Valentina Otero
- **Parent**: PEOPLE-87
- **Labels**: `onboarding`, `aws`, `iam`
- **Created**: 2026-04-29 09:10 UYT
- **Completed**: 2026-05-02 10:42 UYT

### Description (copiar tal cual)

> Crear usuario IAM `fvazquez` en cuenta AWS principal (cloudara-prod) con
> rol `dev-readonly`. MFA obligatorio. Enviar credenciales temporales por
> mail cifrado.

### Comments

- **Mariano Silva · 2026-05-02 10:42**
  > Hecho. fvazquez con rol dev-readonly + MFA. Credenciales temporales
  > enviadas por correo cifrado a la dirección personal de Federica
  > (Valentina las pasó). Cierro.

---

## DEV-1078 — Invitar a Federica al GitHub org cloudara

- **Team**: Development (DEV)
- **Type**: Task · **Priority**: Medium
- **Status**: Done
- **Assignee**: Camila Núñez · **Reporter**: Valentina Otero
- **Parent**: PEOPLE-87
- **Labels**: `onboarding`, `github`
- **Created**: 2026-04-29 09:12 UYT
- **Completed**: 2026-05-02 09:30 UYT

### Description (copiar tal cual)

> Invitar a `fvazquez@cloudara.uy` al GitHub org `cloudara` con rol Member
> y al equipo `backend-engineers`. NO darle acceso al repo `bau-backend`
> hasta que SEC-211 esté Done (bg check de cliente Banco Austral).

### Comments

- **Camila Núñez · 2026-05-02 09:30**
  > Invitada al org. Está en `backend-engineers` con acceso a los repos
  > internos. `bau-backend` queda pendiente del bg check (SEC-211).

---

## SD-2199 — Configurar laptop M3 + VPN para Federica Vázquez

- **Team**: Service Desk (SD)
- **Type**: Task · **Priority**: Medium
- **Status**: Done
- **Assignee**: Lucía Mendoza · **Reporter**: Valentina Otero
- **Parent**: PEOPLE-87
- **Labels**: `onboarding`, `hardware`, `vpn`
- **Created**: 2026-04-29 09:15 UYT
- **Completed**: 2026-05-03 17:50 UYT

### Description (copiar tal cual)

> - Imagen corporativa en MacBook Pro M3 (asset CLD-LAP-0214).
> - Cuenta `fvazquez@cloudara.uy` en Google Workspace, Slack, VPN.
> - SSH key generada en la laptop, public key cargada en Tero-Bastion.
> - Entrega presencial el 5-may 9hs en oficina de Pocitos.

### Comments

- **Lucía Mendoza · 2026-05-03 17:50**
  > Laptop CLD-LAP-0214 lista. Google Workspace + Slack OK, VPN OK,
  > ssh key cargada en Tero-Bastion. Entrega coordinada para lunes 9hs.
  > Cierro.

---

## SEC-211 — Bg check Federica Vázquez

- **Team**: Security (SEC)
- **Type**: Task · **Priority**: High
- **Status**: In Progress
- **Assignee**: _(unassigned)_ · **Reporter**: Valentina Otero
- **Parent**: PEOPLE-87
- **Labels**: `onboarding`, `bg-check`, `cliente:bau`, `bloqueante`
- **Created**: 2026-04-29 09:18 UYT
- **Updated**: 2026-04-30 16:02 UYT
- **Due date**: 2026-05-04

### Description (copiar tal cual)

> Background check estándar para empleado nuevo con acceso a repositorios
> de cliente Banco Austral. Incluye:
>
> - Verificación de antecedentes penales (Min. del Interior)
> - Verificación de identidad (cédula + selfie)
> - Verificación de empleo previo (Globant)
> - Firma de NDA reforzado para cliente bancario
>
> **Bloqueante** para acceso al repo `bau-backend` (ver DEV-1078).
>
> Ventana esperada: 3-5 días hábiles. Federica entregó documentación el
> 30-abr. Pendiente: gestionar respuesta del Min. del Interior y subir el
> NDA firmado al expediente.

### Comments

- **Valentina Otero · 2026-04-30 16:02**
  > Federica subió la documentación al portal de SEC. Falta tomar el ticket
  > alguien del equipo SEC. Ping en #leadership la semana pasada pero quedó
  > sin asignar. @aquí es importante porque el lunes arranca y bloquea su
  > acceso al sprint de Banco Austral.

- **Valentina Otero · 2026-05-03 19:14**
  > Sigue sin assignee. Voy a pingearlo el lunes temprano si no hay novedad.
