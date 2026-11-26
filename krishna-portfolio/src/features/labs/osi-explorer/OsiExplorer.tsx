import { useState } from 'react'
import Card from '../../../components/ui/Card'
import { osiLayers } from '../../../data/learning/osi'

export default function OsiExplorer() {
  const [selected, setSelected] = useState(0)
  const layer = osiLayers[selected]

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div role="group" aria-label="OSI layers" className="space-y-2">
        {osiLayers.map((l, i) => (
          <button
            key={l.number}
            type="button"
            aria-pressed={i === selected}
            onClick={() => setSelected(i)}
            className={`flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
              i === selected ? 'border-accent bg-accent/10 text-accent' : 'border-white/15 text-fg hover:border-accent/50'
            }`}
          >
            <span className="font-mono text-lg font-bold">{l.number}</span>
            <span className="font-semibold">{l.name}</span>
            <span className="ml-auto hidden text-xs text-muted sm:inline">{l.unit}</span>
          </button>
        ))}
      </div>
      <Card>
        <div aria-live="polite">
          <h3 className="font-display text-xl font-bold">Layer {layer.number}: {layer.name}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            {([['Unit of data', layer.unit], ['Protocols', layer.protocols], ['Devices', layer.devices], ['Typical attacks', layer.attacks]] as const).map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs uppercase tracking-widest text-muted">{k}</dt>
                <dd className="mt-0.5 text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Card>
    </div>
  )
}
