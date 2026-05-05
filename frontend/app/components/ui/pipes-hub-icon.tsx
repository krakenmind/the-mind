'use client'

import React from 'react'
import KrakenMark from './kraken-mark'

interface PipesHubIconProps {
  size?: number
  /**
   * Krakenmind rebrand: el `color` previo se interpreta como variante.
   * - colores claros / contraste → variante 'ink' (default)
   * - tonos teal / abyss → variante 'abyss'
   * Mantenido para compatibilidad con consumidores existentes (chat sidebar,
   * onboarding, surveys, auth) sin tener que migrarlos uno por uno.
   */
  color?: string
  style?: React.CSSProperties
  className?: string
}

function pickVariant(color?: string): 'ink' | 'abyss' {
  if (!color) return 'ink'
  const c = color.toLowerCase()
  if (c.includes('accent') || c.includes('emerald') || c.includes('abyss') || c.includes('jade'))
    return 'abyss'
  return 'ink'
}

export function PipesHubIcon({ size = 80, color, style, className }: PipesHubIconProps) {
  return (
    <span
      style={{ display: 'inline-flex', flexShrink: 0, ...style }}
      className={className}
      aria-hidden="true"
    >
      <KrakenMark size={size} variant={pickVariant(color)} />
    </span>
  )
}
