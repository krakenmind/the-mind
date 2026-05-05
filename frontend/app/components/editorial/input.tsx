'use client'

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   Input (Editorial)
   Estilo: hairline border-rule, focus border-ink (no fill). Forma rectangular.
   Sin sombra, sin radius pesado — es una "regla" editorial, no un widget.
   ----------------------------------------------------------------------------- */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex h-11 w-full bg-transparent px-4 py-2 font-sans text-[15px] leading-[1.4] text-ink',
          'border-b transition-colors duration-150',
          'placeholder:text-ink-dim placeholder:font-normal',
          'focus:outline-none focus:border-abyss',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          invalid ? 'border-signal text-signal' : 'border-rule hover:border-ink-muted',
          className
        )}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

/* -----------------------------------------------------------------------------
   TextArea — multilinea con mismo lenguaje hairline.
   ----------------------------------------------------------------------------- */
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, invalid, rows = 4, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(
          'flex w-full bg-transparent px-4 py-3 font-sans text-[15px] leading-[1.55] text-ink resize-y',
          'border transition-colors duration-150',
          'placeholder:text-ink-dim',
          'focus:outline-none focus:border-abyss',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          invalid ? 'border-signal text-signal' : 'border-rule hover:border-ink-muted',
          className
        )}
        {...props}
      />
    )
  }
)
TextArea.displayName = 'TextArea'

/* -----------------------------------------------------------------------------
   Label — Radix UI primitive (a11y) con estilo eyebrow.
   ----------------------------------------------------------------------------- */
export interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  required?: boolean
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, required, children, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      'inline-flex items-baseline gap-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted font-medium mb-2',
      className
    )}
    {...props}
  >
    {children}
    {required && <span aria-hidden="true" className="text-signal">*</span>}
  </LabelPrimitive.Root>
))
Label.displayName = 'Label'

/* -----------------------------------------------------------------------------
   Field — wrapper opinionado: Label + control + helper/error.
   ----------------------------------------------------------------------------- */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode
  htmlFor?: string
  required?: boolean
  hint?: React.ReactNode
  error?: React.ReactNode
}

export function Field({
  className,
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
  ...props
}: FieldProps) {
  return (
    <div className={cn('flex flex-col', className)} {...props}>
      {label && (
        <Label htmlFor={htmlFor} required={required}>
          {label}
        </Label>
      )}
      {children}
      {(error || hint) && (
        <p
          className={cn(
            'mt-2 font-sans text-xs leading-[1.5]',
            error ? 'text-signal' : 'text-ink-dim'
          )}
        >
          {error || hint}
        </p>
      )}
    </div>
  )
}
