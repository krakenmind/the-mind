'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   Badge / Pill — etiquetas editoriales. Pequeñas, hairline o filled.
   ----------------------------------------------------------------------------- */

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] font-medium leading-none',
  {
    variants: {
      variant: {
        outline: 'border border-rule text-ink-muted bg-transparent',
        filled: 'bg-ink text-paper border border-ink',
        soft: 'bg-paper-dim text-ink border border-rule-soft',
        abyss: 'bg-abyss text-paper border border-abyss',
        signal: 'bg-signal text-paper border border-signal',
        ghost: 'border-none text-ink-muted bg-transparent',
      },
      size: {
        sm: 'h-5 px-2 rounded-sm',
        md: 'h-6 px-2.5 rounded-sm',
      },
    },
    defaultVariants: { variant: 'outline', size: 'md' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {children}
    </span>
  )
}

/* -----------------------------------------------------------------------------
   Pill — versión rounded-full para chips interactivos / filtros.
   ----------------------------------------------------------------------------- */
const pillVariants = cva(
  'inline-flex items-center gap-2 font-sans text-sm leading-none transition-colors',
  {
    variants: {
      variant: {
        outline: 'border border-rule text-ink hover:border-ink-muted bg-paper',
        filled: 'bg-ink text-paper border border-ink',
        active: 'border border-abyss text-abyss bg-paper',
        soft: 'bg-paper-dim text-ink border border-paper-deep',
      },
      size: {
        sm: 'h-7 px-3 rounded-full text-xs',
        md: 'h-9 px-4 rounded-full',
        lg: 'h-11 px-5 rounded-full',
      },
    },
    defaultVariants: { variant: 'outline', size: 'md' },
  }
)

export interface PillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof pillVariants> {
  asChild?: boolean
}

export const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ className, variant, size, children, ...props }, ref) => (
    <button ref={ref} className={cn(pillVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  )
)
Pill.displayName = 'Pill'
