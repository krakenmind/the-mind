import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Composer de clases — combina clsx (lógica condicional) con tailwind-merge
 * (resuelve conflictos entre utilidades de Tailwind, p.ej. `px-2 px-4` → `px-4`).
 * Usado por el sistema editorial; es la API estándar para construir variants.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
