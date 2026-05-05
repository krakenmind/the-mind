'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   Button (Editorial)
   - Primary: filled ink, hover abyss
   - Secondary: bordered rule, hover ink border + paper-dim bg
   - Ghost: transparente, hover paper-dim
   - Link: sólo texto subrayado, hover abyss
   Forma: rounded-full (pill), height 44px (size md). Match exacto a landing.
   ----------------------------------------------------------------------------- */

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-sans text-sm font-medium tracking-[0.01em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-abyss focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:opacity-50 disabled:cursor-not-allowed select-none whitespace-nowrap',
  {
    variants: {
      variant: {
        primary: 'bg-ink text-paper border border-ink hover:bg-abyss hover:border-abyss',
        secondary:
          'bg-transparent text-ink border border-rule hover:bg-paper-dim hover:border-ink',
        ghost: 'bg-transparent text-ink border border-transparent hover:bg-paper-dim',
        signal:
          'bg-signal text-paper border border-signal hover:bg-[#a0411f] hover:border-[#a0411f]',
        link: 'bg-transparent text-ink border-none underline decoration-rule underline-offset-4 hover:text-abyss hover:decoration-abyss px-0 h-auto',
      },
      size: {
        sm: 'h-9 px-4 text-[13px] rounded-full',
        md: 'h-11 px-6 text-sm rounded-full',
        lg: 'h-12 px-7 text-[15px] rounded-full',
        icon: 'h-10 w-10 rounded-full p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <Spinner /> : children}
      </button>
    )
  }
)
Button.displayName = 'Button'

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-[spin_0.9s_linear_infinite]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeOpacity="0.25"
      />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { buttonVariants }
