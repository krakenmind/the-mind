'use client'

import React from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { KrakenLoader } from '@/app/components/editorial/kraken-loader'

export interface InlineLoaderProps {
  /** Optional label shown next to the loader */
  label?: string
  /** Loader size. Default: 18 */
  size?: number
  /** Alignment. Default: 'center' */
  align?: 'start' | 'center'
  /** Extra styles on the wrapping Flex */
  style?: React.CSSProperties
}

/**
 * InlineLoader — KrakenLoader (3 stamps pulsing) + optional label for
 * "loading more…" / inline list indicators and small empty-state placeholders.
 */
export function InlineLoader({
  label,
  size = 18,
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
          }}
        >
          {label}
        </Text>
      ) : null}
    </Flex>
  )
}
