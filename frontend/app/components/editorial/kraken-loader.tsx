'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   KrakenLoader — loader editorial Krakenmind.
   3 stamps cuadrados (4px) en color abyss, pulsando con stagger.
   Variantes:
     - 'pulse'    (default, infinito): para indicadores de carga
     - 'thinking' (más lento, suave): para "agente pensando"
     - 'listening' (rápido, intermitente): para input por voz / streaming activo
     - 'still'    (sin animación, opacidad fija): placeholder estático
   ----------------------------------------------------------------------------- */

export type KrakenLoaderVariant = 'pulse' | 'thinking' | 'listening' | 'still'

export interface KrakenLoaderProps {
  size?: number
  variant?: KrakenLoaderVariant
  /** Color de los stamps. Default: abyss */
  color?: string
  className?: string
  /** Etiqueta accesible. Default: 'Cargando' */
  ariaLabel?: string
  /** Renderizado horizontal (default) o vertical */
  direction?: 'row' | 'column'
}

const TIMINGS: Record<
  KrakenLoaderVariant,
  { duration: string; gapMs: number; opacityFrom: number; opacityTo: number }
> = {
  pulse: { duration: '1.1s', gapMs: 180, opacityFrom: 0.25, opacityTo: 1 },
  thinking: { duration: '1.6s', gapMs: 240, opacityFrom: 0.2, opacityTo: 0.9 },
  listening: { duration: '0.7s', gapMs: 100, opacityFrom: 0.4, opacityTo: 1 },
  still: { duration: '0s', gapMs: 0, opacityFrom: 0.7, opacityTo: 0.7 },
}

/** Custom keyframes injected once per component module */
const KEYFRAMES_STYLE = `
  @keyframes kraken-loader-pulse {
    0%, 80%, 100% { opacity: var(--ko-from); transform: scaleY(1); }
    40%           { opacity: var(--ko-to);   transform: scaleY(1.4); }
  }
`

let stylesInjected = false
function ensureStyles() {
  if (typeof document === 'undefined' || stylesInjected) return
  const id = 'kraken-loader-styles'
  if (document.getElementById(id)) {
    stylesInjected = true
    return
  }
  const el = document.createElement('style')
  el.id = id
  el.textContent = KEYFRAMES_STYLE
  document.head.appendChild(el)
  stylesInjected = true
}

export function KrakenLoader({
  size = 32,
  variant = 'pulse',
  color = 'var(--color-abyss)',
  className,
  ariaLabel = 'Cargando',
  direction = 'row',
}: KrakenLoaderProps) {
  React.useEffect(() => {
    ensureStyles()
  }, [])

  const t = TIMINGS[variant]
  // Stamp size scales with overall size; gap proportional.
  const stampSize = Math.max(3, Math.round(size / 7))
  const gap = Math.max(2, Math.round(size / 9))
  const animation =
    variant === 'still' ? 'none' : `kraken-loader-pulse ${t.duration} ease-in-out infinite both`

  const cssVars = {
    '--ko-from': t.opacityFrom,
    '--ko-to': t.opacityTo,
  } as React.CSSProperties

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn('inline-flex items-center', className)}
      style={{
        flexDirection: direction,
        gap,
        width: direction === 'row' ? size : stampSize,
        height: direction === 'row' ? stampSize * 1.4 : size,
        ...cssVars,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: 'inline-block',
            width: stampSize,
            height: stampSize,
            backgroundColor: color,
            opacity: t.opacityFrom,
            animation,
            animationDelay: `${i * t.gapMs}ms`,
          }}
        />
      ))}
    </span>
  )
}

/* -----------------------------------------------------------------------------
   KrakenSpinner — variante orbital (1 stamp girando alrededor de un eje invisible).
   Útil cuando el espacio es chico o cuando se necesita "movimiento" tipo spinner
   sin renderizar un círculo lleno.
   ----------------------------------------------------------------------------- */
export function KrakenSpinner({
  size = 18,
  color = 'var(--color-abyss)',
  className,
  ariaLabel = 'Cargando',
}: {
  size?: number
  color?: string
  className?: string
  ariaLabel?: string
}) {
  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn('inline-block relative', className)}
      style={{ width: size, height: size }}
    >
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          border: `1.5px solid ${color}`,
          borderRadius: 0,
          opacity: 0.18,
        }}
      />
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Math.max(3, Math.round(size / 5)),
          height: Math.max(3, Math.round(size / 5)),
          backgroundColor: color,
          animation: 'spin 0.9s linear infinite',
          transformOrigin: `${size / 2}px ${size / 2}px`,
        }}
      />
    </span>
  )
}
