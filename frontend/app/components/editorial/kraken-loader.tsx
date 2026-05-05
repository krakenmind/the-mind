'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   KrakenLoader — loader emblemático Krakenmind con motion compuesta.

   Cuatro motions independientes con períodos distintos para que la suma
   se sienta orgánica (no robótica):

     1. swim    — translateY ±2px + rotate ±2.5° + scale 1↔1.04 (período P_swim)
     2. breath  — opacity 0.78 ↔ 1 (período P_breath, decoupled de swim)
     3. sonar A — ring abyss expande 0.5x→1.7x + fade (período P_sonar)
     4. sonar B — segundo ring igual pero con delay = P_sonar/2 (siempre hay
        uno expandiéndose: continuidad visual)

   Inline-aligned con texto vía vertical-align: middle. Aspect ratio
   648/511 ≈ 1.27 preservado.

   Variantes:
     - 'pulse'     (default): swimming gentle, sonar lento
     - 'thinking':            swimming muy lento, ring sutil — agente razonando
     - 'listening':           swimming rápido + agitado, ring intenso — stream activo
     - 'still':               sin animación (placeholder)
   ----------------------------------------------------------------------------- */

export type KrakenLoaderVariant = 'pulse' | 'thinking' | 'listening' | 'still'

const MARK_ASPECT = 648 / 511

interface Timing {
  swim: string
  breath: string
  sonar: string
  ringOpacity: number
  breathFrom: number
  breathTo: number
  swimYpx: number
  swimDeg: number
  swimScaleMax: number
}

const TIMINGS: Record<KrakenLoaderVariant, Timing> = {
  pulse: {
    swim: '4.4s',
    breath: '2.6s',
    sonar: '2.4s',
    ringOpacity: 0.32,
    breathFrom: 0.82,
    breathTo: 1,
    swimYpx: 2,
    swimDeg: 2.5,
    swimScaleMax: 1.05,
  },
  thinking: {
    swim: '6.2s',
    breath: '3.6s',
    sonar: '3.4s',
    ringOpacity: 0.22,
    breathFrom: 0.72,
    breathTo: 0.96,
    swimYpx: 1.5,
    swimDeg: 1.8,
    swimScaleMax: 1.03,
  },
  listening: {
    swim: '2.6s',
    breath: '1.4s',
    sonar: '1.5s',
    ringOpacity: 0.45,
    breathFrom: 0.86,
    breathTo: 1,
    swimYpx: 3,
    swimDeg: 3.2,
    swimScaleMax: 1.07,
  },
  still: {
    swim: '0s',
    breath: '0s',
    sonar: '0s',
    ringOpacity: 0,
    breathFrom: 1,
    breathTo: 1,
    swimYpx: 0,
    swimDeg: 0,
    swimScaleMax: 1,
  },
}

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
  /** Mostrar los rings expansivos. Default true (false en variant 'still'). */
  showRing?: boolean
}

const KEYFRAMES_STYLE = `
  @keyframes kraken-swim {
    0%   { transform: translateY(0)             rotate(calc(var(--kl-deg) * -1deg)) scale(1); }
    25%  { transform: translateY(calc(var(--kl-y) * -1px)) rotate(0deg) scale(var(--kl-smax)); }
    50%  { transform: translateY(0)             rotate(calc(var(--kl-deg) *  1deg)) scale(1); }
    75%  { transform: translateY(calc(var(--kl-y) *  1px)) rotate(0deg) scale(calc(2 - var(--kl-smax))); }
    100% { transform: translateY(0)             rotate(calc(var(--kl-deg) * -1deg)) scale(1); }
  }
  @keyframes kraken-breath {
    0%, 100% { opacity: var(--kl-from); }
    50%      { opacity: var(--kl-to); }
  }
  @keyframes kraken-sonar {
    0%   { opacity: var(--kl-ring); transform: translate(-50%, -50%) scale(0.5); }
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
  // Caja square con padding para que swim (rot+y) no recorte el mark.
  const box = Math.max(size, markWidth) + 8 + t.swimYpx * 2
  const ringSize = Math.round(box * 0.72)

  // Half-period delay for second sonar ring → continuidad visual.
  const sonarHalf = isStill ? '0s' : `-${parseFloat(t.sonar) / 2}s`

  const cssVars = {
    '--kl-from': t.breathFrom,
    '--kl-to': t.breathTo,
    '--kl-ring': t.ringOpacity,
    '--kl-y': t.swimYpx,
    '--kl-deg': t.swimDeg,
    '--kl-smax': t.swimScaleMax,
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
        <>
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
              transform: 'translate(-50%, -50%) scale(0.5)',
              animation: `kraken-sonar ${t.sonar} ease-out infinite`,
              pointerEvents: 'none',
            }}
          />
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
              transform: 'translate(-50%, -50%) scale(0.5)',
              animation: `kraken-sonar ${t.sonar} ease-out infinite`,
              animationDelay: sonarHalf,
              pointerEvents: 'none',
            }}
          />
        </>
      )}

      {/* Wrapper que aplica swim (translateY + rotate + scale).
          Inner aplica breath (opacity decoupled). Doble nodo permite que
          ambos animations corran con períodos diferentes sin pelear por
          la propiedad transform. */}
      <span
        style={{
          display: 'inline-block',
          willChange: 'transform',
          animation: isStill ? 'none' : `kraken-swim ${t.swim} ease-in-out infinite`,
        }}
      >
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
            animation: isStill ? 'none' : `kraken-breath ${t.breath} ease-in-out infinite`,
            willChange: 'opacity',
          }}
        />
      </span>
    </span>
  )
}

/* -----------------------------------------------------------------------------
   KrakenSpinner — minimal: sólo el mark con motion completa, sin sonar.
   Útil en contextos donde el ring ruidea con elementos vecinos.
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
