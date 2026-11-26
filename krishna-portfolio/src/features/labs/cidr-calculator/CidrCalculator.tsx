import { useId, useMemo, useState, type ChangeEvent } from 'react'
import Card from '../../../components/ui/Card'
import { calculateCidr } from '../../../lib/cidr'

export default function CidrCalculator() {
  const [input, setInput] = useState('192.168.1.0/26')
  const id = useId()
  const result = useMemo(() => calculateCidr(input), [input])

  const rows = result.ok
    ? ([
        ['Network address', result.network],
        ['Subnet mask', result.mask],
        ['Wildcard mask', result.wildcard],
        ['Broadcast address', result.broadcast],
        ['Total addresses', result.total.toLocaleString('en-US')],
        ['Usable hosts', result.usable.toLocaleString('en-US')],
        ['Host range', `${result.firstHost} to ${result.lastHost}`],
      ] as const)
    : []

  return (
    <Card>
      <label htmlFor={id} className="text-sm font-medium">IPv4 network in CIDR notation</label>
      <input
        id={id}
        type="text"
        spellCheck={false}
        autoComplete="off"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
        aria-invalid={!result.ok}
        aria-describedby={`${id}-out`}
        className="mt-1 w-full rounded-lg border border-white/15 bg-surface px-3 py-2 font-mono text-sm text-fg"
      />
      <div id={`${id}-out`} aria-live="polite" className="mt-4">
        {result.ok ? (
          <>
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-widest text-muted">{k}</dt>
                  <dd className="mt-0.5 font-mono text-fg">{v}</dd>
                </div>
              ))}
            </dl>
            {result.note && <p className="mt-4 text-sm text-muted">{result.note}</p>}
          </>
        ) : (
          <p className="text-sm text-red-400">{result.error}</p>
        )}
      </div>
    </Card>
  )
}
