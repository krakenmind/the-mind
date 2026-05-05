'use client'

import * as React from 'react'
import { cn } from '@/lib/utils/cn'

/* -----------------------------------------------------------------------------
   Section — bloque con border-top de regla editorial y padding vertical Krakenmind.
   Usa `bordered={false}` para suprimir la regla inicial (primera sección).
   ----------------------------------------------------------------------------- */
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  bordered?: boolean
  padded?: boolean
  as?: keyof React.JSX.IntrinsicElements
}

export function Section({
  className,
  bordered = true,
  padded = true,
  as = 'section',
  children,
  ...props
}: SectionProps) {
  const Tag = as as React.ElementType
  return (
    <Tag
      className={cn(
        bordered && 'border-t border-rule',
        padded && 'py-20 md:py-28',
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">{children}</div>
    </Tag>
  )
}

/* -----------------------------------------------------------------------------
   Hairline — divider 1px en color rule.
   ----------------------------------------------------------------------------- */
export interface HairlineProps extends React.HTMLAttributes<HTMLHRElement> {
  soft?: boolean
  vertical?: boolean
}

export function Hairline({ className, soft, vertical, ...props }: HairlineProps) {
  if (vertical) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          'inline-block self-stretch w-px',
          soft ? 'bg-rule-soft' : 'bg-rule',
          className
        )}
      />
    )
  }
  return (
    <hr
      className={cn(
        'border-0 h-px w-full',
        soft ? 'bg-rule-soft' : 'bg-rule',
        className
      )}
      {...(props as React.HTMLAttributes<HTMLHRElement>)}
    />
  )
}

/* -----------------------------------------------------------------------------
   Stamp — cuadradito teal (o terracota signal) usado como bullet editorial.
   ----------------------------------------------------------------------------- */
export interface StampProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md'
  variant?: 'abyss' | 'signal' | 'ink'
}

export function Stamp({ className, size = 'md', variant = 'abyss', ...props }: StampProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-block',
        size === 'sm' ? 'w-[4px] h-[4px]' : 'w-[6px] h-[6px]',
        variant === 'abyss' && 'bg-abyss',
        variant === 'signal' && 'bg-signal rounded-full',
        variant === 'ink' && 'bg-ink',
        className
      )}
      {...props}
    />
  )
}

/* -----------------------------------------------------------------------------
   GridCells — grilla con líneas de separación tipo spreadsheet (gap-px sobre
   fondo color-rule). Patrón recurrente en landing.
   ----------------------------------------------------------------------------- */
export interface GridCellsProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4
  mdCols?: 1 | 2 | 3 | 4
}

export function GridCells({
  className,
  cols = 1,
  mdCols,
  children,
  ...props
}: GridCellsProps) {
  const colsClass: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }
  const mdClass: Record<number, string> = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }
  return (
    <div
      className={cn(
        'grid gap-px border border-rule bg-rule',
        colsClass[cols],
        mdCols && mdClass[mdCols],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* -----------------------------------------------------------------------------
   GridCell — celda interior para GridCells, con padding y hover sutil.
   ----------------------------------------------------------------------------- */
export interface GridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function GridCell({
  className,
  hoverable = true,
  children,
  ...props
}: GridCellProps) {
  return (
    <div
      className={cn(
        'bg-paper p-8 transition-colors',
        hoverable && 'hover:bg-paper-dim',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
