import type { ReactNode } from 'react'
import Card from '../../../components/ui/Card'
import type { SimResult, Tone } from '../../../lib/simulations'

const TONE: Record<Tone, string> = {
  ok: 'border-accent/50 text-accent',
  bad: 'border-red-400/60 text-red-400',
  warn: 'border-yellow-400/60 text-yellow-300',
  neutral: 'border-line text-muted',
}

export function SimCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <Card className="flex h-full flex-col">
      <span className="w-fit rounded-full border border-azure/40 px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-azure">
        Educational simulation
      </span>
      <h3 className="mt-3 font-display text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <div className="mt-4 flex-1">{children}</div>
    </Card>
  )
}

export function ResultBox({ result }: { result: SimResult | null }) {
  return (
    <div role="status" className={`mt-4 min-h-20 rounded-lg border bg-ink p-3 text-sm ${result ? TONE[result.tone] : 'border-line text-muted'}`}>
      {result ? (
        <>
          <p className="font-semibold">{result.title}</p>
          <p className="mt-1 whitespace-pre-wrap font-mono text-xs text-fg/80">{result.detail}</p>
        </>
      ) : (
        <p>Run the demo to see the result.</p>
      )}
    </div>
  )
}

export const checkboxClass = 'mt-3 flex items-center gap-2 text-sm text-muted'
export const inputClass = 'mt-1 w-full rounded-lg border border-white/15 bg-surface px-3 py-2 font-mono text-sm text-fg placeholder:text-muted/60'
