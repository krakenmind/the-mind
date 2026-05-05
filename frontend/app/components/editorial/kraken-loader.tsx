'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   KrakenLoader — loader emblemático Krakenmind.
   Anima el kraken mark (PNG oficial) con dos efectos combinados:
     1. Breathing — escala 1 → 1.06 + opacity 0.78 → 1 (respiración suave)
     2. Sonar ring — círculo abyss que se expande + fade detrás del mark
   Inline-aligned con texto vía vertical-align: middle. Aspect ratio del
   mark (648/511 ≈ 1.27) preservado.

   Variantes:
     - 'pulse'    (default): breathing + sonar ring lento
     - 'thinking': breathing más lento, ring más sutil
     - 'listening': breathing rápido, ring intenso
     - 'still':    sin animación, opacity fija
   ----------------------------------------------------------------------------- */

export type KrakenLoaderVariant = 'pulse' | 'thinking' | 'listening' | 'still'

const MARK_ASPECT = 648 / 511

interface Timing {
  breath: string
  ring: string
  ringOpacity: number
  breathFrom: number
  breathTo: number
}

const TIMINGS: Record<KrakenLoaderVariant, Timing> = {
  pulse: { breath: '1.6s', ring: '2.2s', ringOpacity: 0.32, breathFrom: 0.78, breathTo: 1 },
  thinking: { breath: '2.4s', ring: '3.2s', ringOpacity: 0.22, breathFrom: 0.72, breathTo: 0.95 },
  listening: { breath: '0.95s', ring: '1.4s', ringOpacity: 0.45, breathFrom: 0.85, breathTo: 1 },
  still: { breath: '0s', ring: '0s', ringOpacity: 0, breathFrom: 1, breathTo: 1 },
}

/* Variantes de marca:
     - 'ink': mark oscuro (sobre fondo paper)
     - 'abyss': mark teal (sobre fondo paper-deep o ink)
*/
type KrakenMarkVariant = 'ink' | 'abyss'

const MARK_SRC: Record<KrakenMarkVariant, string> = {
  ink: '/kraken-mark.png',
  abyss: '/kraken-mark-abyss.png',
}

export interface KrakenLoaderProps {
  /** Altura del mark en px. Default 22 (alineado con texto 14-16px). */
  size?: number
  variant?: KrakenLoaderVariant
  /** Color de la marca (qué PNG usa). Default 'ink'. */
  mark?: KrakenMarkVariant
  /** Color del sonar ring. Default abyss. */
  ringColor?: string
  className?: string
  ariaLabel?: string
  /** Mostrar el ring expansivo. Default true (false en variant 'still'). */
  showRing?: boolean
}

const KEYFRAMES_STYLE = `
  @keyframes kraken-breathe {
    0%, 100% { opacity: var(--kl-from); transform: scale(1); }
    50%      { opacity: var(--kl-to);   transform: scale(1.06); }
  }
  @keyframes kraken-sonar {
    0%   { opacity: var(--kl-ring); transform: translate(-50%, -50%) scale(0.55); }
    70%  { opacity: 0;              transform: translate(-50%, -50%) scale(1.65); }
    100% { opacity: 0;              transform: translate(-50%, -50%) scale(1.65); }
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
  size = 22,
  variant = 'pulse',
  mark = 'ink',
  ringColor = 'var(--color-abyss)',
  className,
  ariaLabel = 'Cargando',
  showRing,
}: KrakenLoaderProps) {
  React.useEffect(() => {
    ensureStyles()
  }, [])

  const t = TIMINGS[variant]
  const isStill = variant === 'still'
  const ringEnabled = (showRing ?? true) && !isStill

  const markWidth = Math.round(size * MARK_ASPECT)
  // Box square — mark centered. Side = larger of width/height + small padding.
  const box = Math.max(size, markWidth) + 6
  const ringSize = Math.round(box * 0.78)

  const cssVars = {
    '--kl-from': t.breathFrom,
    '--kl-to': t.breathTo,
    '--kl-ring': t.ringOpacity,
  } as React.CSSProperties

  return (
    <span
      role="status"
      aria-label={ariaLabel}
      className={cn('inline-flex items-center justify-center align-middle relative', className)}
      style={{
        width: box,
        height: box,
        verticalAlign: 'middle',
        ...cssVars,
      }}
    >
      {ringEnabled && (
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: ringSize,
            height: ringSize,
            borderRadius: '9999px',
            border: `1px solid ${ringColor}`,
            opacity: 0,
            transform: 'translate(-50%, -50%) scale(0.55)',
            animation: `kraken-sonar ${t.ring} ease-out infinite`,
            pointerEvents: 'none',
          }}
        />
      )}

      <img
        src={MARK_SRC[mark]}
        alt=""
        aria-hidden="true"
        width={markWidth}
        height={size}
        style={{
          width: markWidth,
          height: size,
          display: 'block',
          opacity: isStill ? t.breathFrom : undefined,
          animation: isStill ? 'none' : `kraken-breathe ${t.breath} ease-in-out infinite`,
          willChange: 'transform, opacity',
        }}
      />
    </span>
  )
}

/* -----------------------------------------------------------------------------
   KrakenSpinner — variante minimal: sólo el mark con breathing, sin ring.
   Útil cuando hay otros elementos visuales cerca y el ring resulta ruidoso.
   ----------------------------------------------------------------------------- */
export function KrakenSpinner({
  size = 18,
  mark = 'ink',
  className,
  ariaLabel = 'Cargando',
}: {
  size?: number
  mark?: KrakenMarkVariant
  className?: string
  ariaLabel?: string
}) {
  return (
    <KrakenLoader
      size={size}
      mark={mark}
      variant="pulse"
      showRing={false}
      ariaLabel={ariaLabel}
      className={className}
    />
  )
}
