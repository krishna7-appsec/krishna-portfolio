import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Card from '../../../components/ui/Card'
import Section from '../../../components/ui/Section'
import { OWASP_API_EDITION, OWASP_API_URL, owaspApi } from '../../../data/learning/owaspApi'
import { OWASP_WEB_EDITION, OWASP_WEB_URL, owaspWeb } from '../../../data/learning/owaspWeb'

const VERIFIED_ON = '24 November 2026'

function parseHash(hash: string): { kind: 'web' | 'api'; id: string } | null {
  const m = /^#(web|api)-([a-z0-9]+)$/.exec(hash)
  return m ? { kind: m[1] as 'web' | 'api', id: m[2] } : null
}

function Chips({ labels, selected, onSelect, name }: { labels: readonly string[]; selected: number; onSelect: (i: number) => void; name: string }) {
  return (
    <div role="group" aria-label={name} className="flex flex-wrap gap-2">
      {labels.map((label, i) => (
        <button
          key={label}
          type="button"
          aria-pressed={i === selected}
          onClick={() => onSelect(i)}
          className={`rounded-full border px-3 py-1.5 text-xs transition-colors sm:text-sm ${
            i === selected ? 'border-accent bg-accent/10 text-accent' : 'border-white/15 text-muted hover:border-accent/50 hover:text-fg'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p>
      <strong className="text-fg">{label}.</strong> {children}
    </p>
  )
}

function Source({ edition, url }: { edition: string; url: string }) {
  return (
    <p className="mt-4 text-xs text-muted">
      Edition: {edition}, checked against{' '}
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-azure hover:underline">owasp.org</a> on {VERIFIED_ON}.
    </p>
  )
}

export default function OwaspHub() {
  const { hash } = useLocation()
  const [web, setWeb] = useState(0)
  const [api, setApi] = useState(0)

  useEffect(() => {
    const target = parseHash(hash)
    if (!target) return
    if (target.kind === 'web') {
      const i = owaspWeb.findIndex((o) => o.id.toLowerCase() === target.id)
      if (i >= 0) setWeb(i)
    } else {
      const i = owaspApi.findIndex((o) => o.id.toLowerCase() === target.id)
      if (i >= 0) setApi(i)
    }
  }, [hash])

  const w = owaspWeb[web]
  const a = owaspApi[api]

  return (
    <>
      <Section id="web" eyebrow="Web applications" title={OWASP_WEB_EDITION}>
        <p className="mb-6 max-w-2xl text-muted">The web application list. Select a category to see its details. This is a different list from the API Security Top 10 below.</p>
        <Chips name="OWASP Top 10:2025 categories" labels={owaspWeb.map((o) => `${o.id} ${o.name}`)} selected={web} onSelect={setWeb} />
        <Card className="mt-6" >
          <div aria-live="polite" className="space-y-3 text-muted">
            <h3 className="font-display text-xl font-bold text-fg">{w.id} {w.name}</h3>
            <p>{w.overview}</p>
            <Field label="Attack scenario">{w.attackScenario}</Field>
            <Field label="Root cause">{w.rootCause}</Field>
            <Field label="Detect and test">{w.testing}</Field>
            <Field label="Fix">{w.remediation}</Field>
            <Field label="Tools">{w.tools}</Field>
            <Field label="Exercise">{w.exercise} Use authorized, deliberately vulnerable labs only.</Field>
            {w.code && <pre className="overflow-x-auto rounded-lg border border-line bg-ink p-3 font-mono text-sm text-accent"><code>{w.code}</code></pre>}
          </div>
        </Card>
        <Source edition={OWASP_WEB_EDITION} url={OWASP_WEB_URL} />
      </Section>

      <Section id="api" eyebrow="APIs" title={OWASP_API_EDITION} className="border-t border-line">
        <p className="mb-6 max-w-2xl text-muted">The API list covers risks specific to APIs. Select a category to see its details.</p>
        <Chips name="OWASP API Security Top 10:2023 categories" labels={owaspApi.map((o) => `${o.id} ${o.name}`)} selected={api} onSelect={setApi} />
        <Card className="mt-6">
          <div aria-live="polite" className="space-y-3 text-muted">
            <h3 className="font-display text-xl font-bold text-fg">{a.id}:2023 {a.name}</h3>
            <p>{a.overview}</p>
            <Field label="Prevent">{a.prevention}</Field>
            <Field label="Practise">OWASP crAPI or VAmPI, run locally.</Field>
          </div>
        </Card>
        <Source edition={OWASP_API_EDITION} url={OWASP_API_URL} />
      </Section>
    </>
  )
}
