'use client'

import React from 'react'

export interface FormPanelProps {
  children: React.ReactNode
  /** When true, form sits in the right column beside AuthHero (viewport ≥ md). */
  splitLayout: boolean
}

/**
 * FormPanel — panel derecho que contiene el formulario, centrado vertical.
 * Fondo paper Krakenmind. La hairline izquierda separa visualmente del hero.
 */
export default function FormPanel({ children, splitLayout }: FormPanelProps) {
  return (
    <div
      className="relative"
      style={{
        flex: splitLayout ? '0 0 43%' : 1,
        height: '100dvh',
        maxHeight: '100dvh',
        overflowY: 'auto',
        width: splitLayout ? undefined : '100%',
        backgroundColor: 'var(--color-paper)',
        borderLeft: splitLayout ? '1px solid var(--color-rule)' : undefined,
      }}
    >
      <div
        style={{
          minHeight: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: splitLayout ? '40px' : '24px 20px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '420px' }}>{children}</div>
      </div>
    </div>
  )
}
