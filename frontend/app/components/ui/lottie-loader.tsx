'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { KrakenLoader, type KrakenLoaderVariant } from '@/app/components/editorial/kraken-loader'

/**
 * Krakenmind rebrand: este archivo se llamaba "LottieLoader" y reproducía
 * archivos `.lottie` (Loader.lottie / Listening.lottie / Thinking.lottie /
 * Still.lottie) que no son parte del branding Krakenmind. Ahora delega al
 * `KrakenLoader` editorial — 3 stamps pulsando con stagger en color abyss.
 *
 * La API se mantiene 1:1 para no romper consumidores (auth-guard, file-preview,
 * share-sidebar, OAuth callbacks, chat sidebar).
 */

export type LottieVariant = KrakenLoaderVariant

interface LottieLoaderProps {
  variant?: LottieVariant
  size?: number
  loop?: boolean
  autoplay?: boolean
  style?: React.CSSProperties
  showLabel?: boolean
  label?: string
}

export function LottieLoader({
  variant = 'pulse',
  size = 32,
  // `loop` y `autoplay` se mantienen en la firma para compat pero el editorial
  // loader siempre cicla cuando variant ≠ 'still'.
  loop: _loop = true,
  autoplay: _autoplay = true,
  style,
  showLabel = false,
  label = 'Cargando…',
}: LottieLoaderProps) {
  // Compat: callers viejos pasan 'loader' como variant — mapeamos a 'pulse'.
  const mappedVariant: KrakenLoaderVariant =
    (variant as unknown as string) === 'loader' ? 'pulse' : variant

  const loader = (
    <span style={{ display: 'inline-flex', ...style }}>
      <KrakenLoader size={size} variant={mappedVariant} />
    </span>
  )

  if (!showLabel) return loader

  return (
    <Flex direction="column" align="center" gap="2">
      {loader}
      <Text
        size="2"
        weight="medium"
        style={{
          color: 'var(--color-ink-muted)',
          fontFamily: 'var(--font-mono), Geist Mono, monospace',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: 11,
        }}
      >
        {label}
      </Text>
    </Flex>
  )
}
