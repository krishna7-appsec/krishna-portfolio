import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Card from '../../../components/ui/Card'
import { packetNodes } from '../../../data/learning/packetFlow'
import { useReducedMotion } from '../../../hooks/useReducedMotion'

const X0 = 50
const GAP = 120
const END = X0 + GAP * (packetNodes.length - 1)
const OUT = `M${X0} 70H${END}`
const BACK = `M${END} 92H${X0}`

export default function PacketFlow() {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<string | null>(null)
  const node = packetNodes.find((n) => n.id === selected)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (reduced) svg.pauseAnimations()
    else svg.unpauseAnimations()
  }, [reduced])

  return (
    <Card>
      <p className="mb-3 text-sm text-muted">Select a device to see what it does. Green packets travel out, red packets return.</p>
      <svg ref={svgRef} viewBox="0 0 580 150" role="group" aria-label="Packet flow between five network devices" className="w-full">
        <path d={`${OUT}M${X0} 92H${END}`} stroke="#00B8FF" strokeOpacity="0.3" strokeDasharray="4 6" fill="none" />
        {packetNodes.map((n, i) => {
          const x = X0 + GAP * i
          return (
            <g
              key={n.id}
              role="button"
              tabIndex={0}
              aria-label={n.name}
              aria-pressed={selected === n.id}
              className="cursor-pointer"
              onClick={() => setSelected(n.id)}
              onKeyDown={(e: ReactKeyboardEvent<SVGGElement>) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelected(n.id)
                }
              }}
            >
              <circle cx={x} cy={81} r={27} fill="#080B10" stroke={selected === n.id ? '#00F5A0' : '#00B8FF'} strokeWidth={2} />
              <text x={x} y={89} textAnchor="middle" fontSize={22}>{n.icon}</text>
              <text x={x} y={130} textAnchor="middle" fill="#929CAA" fontSize={12} fontFamily="monospace">{n.name}</text>
            </g>
          )
        })}
        <circle r={6} fill="#00F5A0"><animateMotion dur="4s" repeatCount="indefinite" path={OUT} /></circle>
        <circle r={6} fill="#FF2D55"><animateMotion dur="4s" begin="2s" repeatCount="indefinite" path={BACK} /></circle>
      </svg>
      <p role="status" className="mt-3 min-h-12 rounded-lg border border-line bg-ink p-3 text-sm">
        {node ? (
          <>
            <strong className="text-fg">{node.name}.</strong> <span className="text-muted">{node.description}</span>
          </>
        ) : (
          <span className="text-muted">Select a device above.</span>
        )}
      </p>
    </Card>
  )
}
