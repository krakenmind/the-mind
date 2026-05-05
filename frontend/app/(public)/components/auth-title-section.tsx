'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { KrakenMark } from '@/app/components/ui'

export interface AuthTitleSectionProps {
  /** Main heading. Defaults to "Welcome to Krakenmind". */
  title?: string
  /** Subtitle below the heading. */
  subtitle?: string
  /** Bottom margin below the full section. Defaults to "28px". */
  marginBottom?: string
}

/**
 * AuthTitleSection — bloque editorial logo + título + subtítulo para auth.
 * Reemplaza el lottie loader + Radix Text por:
 *   - KrakenMark (PNG)
 *   - Heading display Fraunces
 *   - Subtitle Geist sans tone muted
 */
export default function AuthTitleSection({
  title,
  subtitle,
  marginBottom = '28px',
}: AuthTitleSectionProps) {
  const { t } = useTranslation()
  const resolvedTitle = title ?? t('auth.titleSection.defaultTitle')
  const resolvedSubtitle =
    subtitle !== undefined ? subtitle : t('auth.titleSection.defaultSubtitle')

  return (
    <div style={{ marginBottom }}>
      <div className="mb-5 flex items-center gap-2.5">
        <KrakenMark size={32} variant="ink" />
        <span className="font-display text-[19px] tracking-[-0.02em] text-ink lowercase">
          krakenmind
        </span>
      </div>

      <h2 className="font-display text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink">
        {resolvedTitle}
      </h2>
      {resolvedSubtitle ? (
        <p className="font-sans text-[14.5px] leading-[1.5] text-ink-muted mt-1.5">
          {resolvedSubtitle}
        </p>
      ) : null}
    </div>
  )
}
