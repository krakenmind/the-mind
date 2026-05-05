'use client'

import React from 'react'
import { KrakenMark, KrakenWatermark } from '@/app/components/ui'

export interface AuthHeroProps {
  /** When false, the hero is hidden (narrow / stacked auth shell). */
  splitLayout: boolean
}

/**
 * AuthHero — panel editorial Krakenmind para auth pages.
 * Reemplaza el hero "explainable enterprise search" por:
 *   - Fondo paper-deep (cálido)
 *   - Wordmark "krakenmind" + KrakenMark
 *   - Tagline display Fraunces con palabra italic en abyss teal
 *   - Watermark Kraken giratorio (decorativo, en esquina)
 *   - Marca editorial de sección (§)
 */
export default function AuthHero({ splitLayout }: AuthHeroProps) {
  if (!splitLayout) return null

  return (
    <div
      className="relative overflow-hidden"
      style={{
        flex: '0 0 57%',
        height: '100vh',
        backgroundColor: 'var(--color-paper-deep)',
      }}
    >
      {/* Watermark — Kraken rotating slowly, decorative */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          right: '-180px',
          bottom: '-180px',
          opacity: 0.12,
          animation: 'spin 140s linear infinite',
        }}
      >
        <KrakenWatermark size={680} />
      </div>

      {/* Top: wordmark + section mark */}
      <div className="absolute top-0 left-0 right-0 px-12 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <KrakenMark size={28} variant="ink" />
          <span className="font-display text-[20px] tracking-[-0.02em] text-ink lowercase">
            krakenmind
          </span>
        </div>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted">
          § Acceso
        </span>
      </div>

      {/* Center: editorial tagline */}
      <div className="absolute inset-0 flex flex-col justify-center px-12 max-w-[640px]">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-muted mb-6">
          Inteligencia · Operación · Memoria
        </span>
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-medium leading-[0.98] tracking-[-0.025em] text-ink">
          La capa operativa que vuelve <em className="text-abyss italic">confiables</em> a los agentes dentro de tu empresa.
        </h1>
        <p className="font-sans text-[16.5px] leading-[1.55] text-ink-muted mt-6 max-w-[480px]">
          Memoria corporativa, búsqueda explicable y agentes que actúan con
          contexto. Una sola plataforma, conectada a tu stack.
        </p>

        {/* hairline + small editorial detail */}
        <div className="mt-10 flex items-center gap-3">
          <span className="inline-block w-[6px] h-[6px] bg-abyss" aria-hidden="true" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-muted">
            sesión segura
          </span>
        </div>
      </div>

      {/* Bottom: footer mark */}
      <div className="absolute bottom-8 left-12 right-12 flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">
          krakenmind.sh · 2026
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-dim">
          inteligencia, en tu operación.
        </span>
      </div>
    </div>
  )
}
