/**
 * Genera un UUID v4-style.
 *
 * - En contextos seguros (HTTPS o localhost) usa `crypto.randomUUID()`,
 *   que es criptográficamente aleatorio.
 * - En contextos inseguros (HTTP plano — p.ej. cuando el frontend se sirve
 *   desde `http://demo.krakenmind.sh`) `crypto.randomUUID` no existe; cae a
 *   un fallback Math.random-based.
 *
 * El fallback NO es criptográficamente seguro y no debe usarse para tokens
 * de seguridad. Sí sirve para IDs efímeros del cliente (mensajes pendientes,
 * filas de upload, etc.) donde sólo necesitamos unicidad razonable.
 */
export function randomUUID(): string {
  if (
    typeof globalThis !== 'undefined' &&
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID === 'function'
  ) {
    return globalThis.crypto.randomUUID()
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
