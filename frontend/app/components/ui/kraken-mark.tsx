'use client'

type Props = {
  className?: string
  size?: number
  variant?: 'ink' | 'abyss'
}

const SRC = {
  ink: '/kraken-mark.png',
  abyss: '/kraken-mark-abyss.png',
}

const ASPECT = 648 / 511

export default function KrakenMark({
  className = '',
  size = 28,
  variant = 'ink',
}: Props) {
  const width = Math.round(size * ASPECT)
  return (
    <img
      src={SRC[variant]}
      alt=""
      aria-hidden="true"
      width={width}
      height={size}
      style={{ width, height: size }}
      className={className}
    />
  )
}
