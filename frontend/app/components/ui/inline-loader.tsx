'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { KrakenLoader } from '@/app/components/editorial/kraken-loader'

export interface InlineLoaderProps {
  /** Optional label shown next to the loader */
  label?: string
  /** Mark height in px. Default: 16 (matches body text x-height) */
  size?: number
  /** Alignment. Default: 'center' */
  align?: 'start' | 'center'
  /** Extra styles on the wrapping Flex */
  style?: React.CSSProperties
}

/**
 * InlineLoader — KrakenLoader (kraken mark con breathing + sonar) + etiqueta
 * para "loading more…" / list indicators / empty-state placeholders.
 * Inline-aligned con texto vía verticalAlign: middle del KrakenLoader.
 */
export function InlineLoader({
  label,
  size = 16,
  align = 'center',
  style,
}: InlineLoaderProps) {
  return (
    <Flex
      align="center"
      justify={align}
      gap="2"
      style={{
        padding: 'var(--space-3)',
        color: 'var(--color-ink-muted)',
        ...style,
      }}
    >
      <KrakenLoader size={size} variant="pulse" />
      {label ? (
        <Text
          size="2"
          style={{
            color: 'var(--color-ink-muted)',
            fontFamily: 'var(--font-geist), Geist, system-ui, sans-serif',
            lineHeight: 1.2,
          }}
        >
          {label}
        </Text>
      ) : null}
    </Flex>
  )
}
