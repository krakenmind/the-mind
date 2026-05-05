'use client'

type Props = {
  size?: number
  className?: string
}

type TentacleConfig = {
  baseDeg: number
  tipDeg: number
  length: number
  baseWidth: number
  curlSign: 1 | -1
}

const CX = 120
const CY = 120
const CORE_R = 14

const TENTACLES: TentacleConfig[] = [
  { baseDeg: 0, tipDeg: 45, length: 110, baseWidth: 9, curlSign: 1 },
  { baseDeg: 60, tipDeg: 95, length: 72, baseWidth: 8, curlSign: 1 },
  { baseDeg: 125, tipDeg: 170, length: 102, baseWidth: 9, curlSign: 1 },
  { baseDeg: 190, tipDeg: 230, length: 86, baseWidth: 8, curlSign: 1 },
  { baseDeg: 245, tipDeg: 295, length: 108, baseWidth: 10, curlSign: 1 },
  { baseDeg: 320, tipDeg: 345, length: 78, baseWidth: 8, curlSign: 1 },
]

const buildTentaclePath = (t: TentacleConfig): string => {
  const baseRad = (t.baseDeg * Math.PI) / 180
  const tipRad = (t.tipDeg * Math.PI) / 180
  const baseX = CX + CORE_R * Math.cos(baseRad)
  const baseY = CY + CORE_R * Math.sin(baseRad)
  const tipX = CX + t.length * Math.cos(tipRad)
  const tipY = CY + t.length * Math.sin(tipRad)
  const tbx = -Math.sin(baseRad)
  const tby = Math.cos(baseRad)
  const bL = { x: baseX + tbx * t.baseWidth, y: baseY + tby * t.baseWidth }
  const bR = { x: baseX - tbx * t.baseWidth, y: baseY - tby * t.baseWidth }
  const dx = tipX - baseX
  const dy = tipY - baseY
  const spineLen = Math.sqrt(dx * dx + dy * dy)
  const perpX = -dy / spineLen
  const perpY = dx / spineLen
  const curlMag = spineLen * 0.32
  const curlX = (baseX + tipX) / 2 + perpX * curlMag * t.curlSign
  const curlY = (baseY + tipY) / 2 + perpY * curlMag * t.curlSign
  const outerSign = -t.curlSign
  const oC1x = baseX + (curlX - baseX) * 0.7 + perpX * t.baseWidth * 1.8 * outerSign
  const oC1y = baseY + (curlY - baseY) * 0.7 + perpY * t.baseWidth * 1.8 * outerSign
  const oC2x = tipX + (curlX - tipX) * 0.2 + perpX * t.baseWidth * 0.4 * outerSign
  const oC2y = tipY + (curlY - tipY) * 0.2 + perpY * t.baseWidth * 0.4 * outerSign
  const iC1x = tipX + (curlX - tipX) * 0.2 + perpX * t.baseWidth * 0.1 * t.curlSign
  const iC1y = tipY + (curlY - tipY) * 0.2 + perpY * t.baseWidth * 0.1 * t.curlSign
  const iC2x = baseX + (curlX - baseX) * 0.7 + perpX * t.baseWidth * 0.6 * t.curlSign
  const iC2y = baseY + (curlY - baseY) * 0.7 + perpY * t.baseWidth * 0.6 * t.curlSign
  const n = (v: number) => v.toFixed(1)
  return `M ${n(bL.x)} ${n(bL.y)} C ${n(oC1x)} ${n(oC1y)}, ${n(oC2x)} ${n(oC2y)}, ${n(tipX)} ${n(tipY)} C ${n(iC1x)} ${n(iC1y)}, ${n(iC2x)} ${n(iC2y)}, ${n(bR.x)} ${n(bR.y)} Z`
}

type Cup = { cx: number; cy: number; r: number }

const buildSuctionCups = (t: TentacleConfig): Cup[] => {
  const baseRad = (t.baseDeg * Math.PI) / 180
  const tipRad = (t.tipDeg * Math.PI) / 180
  const baseX = CX + CORE_R * Math.cos(baseRad)
  const baseY = CY + CORE_R * Math.sin(baseRad)
  const tipX = CX + t.length * Math.cos(tipRad)
  const tipY = CY + t.length * Math.sin(tipRad)
  const dx = tipX - baseX
  const dy = tipY - baseY
  const spineLen = Math.sqrt(dx * dx + dy * dy)
  const perpX = -dy / spineLen
  const perpY = dx / spineLen
  const curlMag = spineLen * 0.32
  const midX = (baseX + tipX) / 2 + perpX * curlMag * t.curlSign
  const midY = (baseY + tipY) / 2 + perpY * curlMag * t.curlSign
  const cupCount = Math.max(3, Math.round(t.length / 18))
  const cups: Cup[] = []
  for (let i = 0; i < cupCount; i++) {
    const u = (i + 1) / (cupCount + 1)
    const qx = (1 - u) * (1 - u) * baseX + 2 * (1 - u) * u * midX + u * u * tipX
    const qy = (1 - u) * (1 - u) * baseY + 2 * (1 - u) * u * midY + u * u * tipY
    const offset = t.baseWidth * 0.45 * (1 - u * 0.75)
    const cx = qx + perpX * offset * t.curlSign
    const cy = qy + perpY * offset * t.curlSign
    const r = Math.max(0.6, t.baseWidth * 0.16 * (1 - u * 0.7))
    cups.push({ cx, cy, r })
  }
  return cups
}

const circleSubpath = (cx: number, cy: number, r: number) =>
  `M ${cx.toFixed(1)} ${cy.toFixed(1)} m -${r.toFixed(2)} 0 a ${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(r * 2).toFixed(2)} 0 a ${r.toFixed(2)} ${r.toFixed(2)} 0 1 0 ${(-r * 2).toFixed(2)} 0 Z`

export default function KrakenWatermark({ size = 680, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {TENTACLES.map((t, i) => {
        const armPath = buildTentaclePath(t)
        const cupPaths = buildSuctionCups(t)
          .map((c) => circleSubpath(c.cx, c.cy, c.r))
          .join(' ')
        return (
          <path
            key={`arm-${i}`}
            d={`${armPath} ${cupPaths}`}
            fillRule="evenodd"
            style={{ fill: 'var(--color-ink)' }}
          />
        )
      })}
      <circle cx={CX} cy={CY} r={CORE_R} style={{ fill: 'var(--color-ink)' }} />
    </svg>
  )
}
