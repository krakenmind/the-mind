/**
 * Editorial Primitives — Krakenmind Design System
 *
 * Sistema de primitivos editoriales construido con Tailwind v4 sobre los tokens
 * Krakenmind (paper / ink / abyss / signal). Para Dialog/DropdownMenu/etc. usa
 * los primitivos headless de @radix-ui/react-* — accesibles y comportamiento
 * correcto. La presentación es 100% editorial.
 *
 * @example
 *   import { Heading, Text, Eyebrow, Button } from '@/app/components/editorial'
 */

export { Heading, Text, Eyebrow, SectionMark, Mono } from './typography'
export type {
  HeadingProps,
  TextProps,
  EyebrowProps,
  SectionMarkProps,
  MonoProps,
} from './typography'

export { Section, Hairline, Stamp, GridCells, GridCell } from './layout'
export type {
  SectionProps,
  HairlineProps,
  StampProps,
  GridCellsProps,
  GridCellProps,
} from './layout'

export { Button, buttonVariants } from './button'
export type { ButtonProps } from './button'

export { Input, TextArea, Label, Field } from './input'
export type { InputProps, TextAreaProps, LabelProps, FieldProps } from './input'

export { Badge, Pill } from './badge'
export type { BadgeProps, PillProps } from './badge'

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './dialog'

export { default as KrakenMark } from '../ui/kraken-mark'
export { default as KrakenWatermark } from '../ui/kraken-watermark'

export { KrakenLoader, KrakenSpinner } from './kraken-loader'
export type { KrakenLoaderProps, KrakenLoaderVariant } from './kraken-loader'
