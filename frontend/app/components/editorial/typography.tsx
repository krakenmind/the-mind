'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   Heading — Fraunces display. Una palabra italic teal por heading (regla
   editorial Krakenmind). Para forzar italic en una palabra usar `<em>`.
   ----------------------------------------------------------------------------- */
const headingVariants = cva('font-display text-ink', {
  variants: {
    level: {
      hero: 'text-[clamp(3rem,10vw,8.5rem)] font-medium leading-[0.88] tracking-[-0.04em]',
      display: 'text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.03em]',
      h1: 'text-4xl md:text-5xl font-medium leading-[1.05] tracking-[-0.025em]',
      h2: 'text-3xl md:text-4xl font-medium leading-[1.1] tracking-[-0.02em]',
      h3: 'text-2xl font-medium leading-[1.15] tracking-[-0.015em]',
      h4: 'text-xl font-medium leading-[1.2] tracking-[-0.01em]',
      h5: 'text-lg font-medium leading-[1.25]',
      h6: 'text-base font-medium leading-[1.3]',
    },
  },
  defaultVariants: { level: 'h2' },
})

type HeadingLevel = 'hero' | 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const HEADING_TAG: Record<HeadingLevel, keyof React.JSX.IntrinsicElements> = {
  hero: 'h1',
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
}

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Sobrescribe el tag HTML (por defecto deriva de `level`). */
  as?: keyof React.JSX.IntrinsicElements
}

export function Heading({ className, level = 'h2', as, children, ...props }: HeadingProps) {
  const Tag = (as ?? HEADING_TAG[level ?? 'h2']) as React.ElementType
  return (
    <Tag className={cn(headingVariants({ level }), className)} {...props}>
      {children}
    </Tag>
  )
}

/* -----------------------------------------------------------------------------
   Text — Geist sans para body. `tone` mapea a las variantes de gris/teal de la
   paleta Krakenmind.
   ----------------------------------------------------------------------------- */
const textVariants = cva('font-sans', {
  variants: {
    size: {
      xs: 'text-xs leading-[1.5]',
      sm: 'text-sm leading-[1.55]',
      base: 'text-[16.5px] leading-[1.6]',
      lg: 'text-lg leading-[1.55]',
      xl: 'text-xl leading-[1.45]',
      '2xl': 'text-2xl leading-[1.35]',
    },
    tone: {
      ink: 'text-ink',
      muted: 'text-ink-muted',
      dim: 'text-ink-dim',
      abyss: 'text-abyss',
      paper: 'text-paper',
      signal: 'text-signal',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
  },
  defaultVariants: { size: 'base', tone: 'ink', weight: 'regular' },
})

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements
}

export function Text({
  className,
  size,
  tone,
  weight,
  as = 'p',
  children,
  ...props
}: TextProps) {
  const Tag = as as React.ElementType
  return (
    <Tag className={cn(textVariants({ size, tone, weight }), className)} {...props}>
      {children}
    </Tag>
  )
}

/* -----------------------------------------------------------------------------
   Eyebrow — pequeño label en mono uppercase trackeado. Marca editorial.
   ----------------------------------------------------------------------------- */
const eyebrowVariants = cva(
  'font-mono uppercase tracking-[0.18em] text-[11px] font-medium inline-block',
  {
    variants: {
      tone: {
        muted: 'text-ink-muted',
        dim: 'text-ink-dim',
        abyss: 'text-abyss',
        ink: 'text-ink',
      },
    },
    defaultVariants: { tone: 'muted' },
  }
)

export interface EyebrowProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof eyebrowVariants> {}

export function Eyebrow({ className, tone, children, ...props }: EyebrowProps) {
  return (
    <span className={cn(eyebrowVariants({ tone }), className)} {...props}>
      {children}
    </span>
  )
}

/* -----------------------------------------------------------------------------
   SectionMark — § con número, marca de sección Krakenmind.
   ----------------------------------------------------------------------------- */
export interface SectionMarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Número como string sin pad ('00', '01', etc.) */
  number?: string
  label?: React.ReactNode
}

export function SectionMark({ number, label, className, ...props }: SectionMarkProps) {
  return (
    <span
      className={cn(
        'inline-flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted',
        className
      )}
      {...props}
    >
      <span className="font-display text-abyss text-[14px] leading-none">§</span>
      {number && <span className="text-abyss font-medium">{number}</span>}
      {label && (
        <>
          <span aria-hidden="true">·</span>
          <span>{label}</span>
        </>
      )}
    </span>
  )
}

/* -----------------------------------------------------------------------------
   Mono — bloque pequeño de mono para metadata, file-paths, ids, etc.
   ----------------------------------------------------------------------------- */
export interface MonoProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'muted' | 'ink' | 'abyss'
}

export function Mono({ className, tone = 'muted', children, ...props }: MonoProps) {
  return (
    <span
      className={cn(
        'font-mono text-[12.5px] leading-[1.5]',
        tone === 'muted' && 'text-ink-muted',
        tone === 'ink' && 'text-ink',
        tone === 'abyss' && 'text-abyss',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
