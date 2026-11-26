import { useId, useMemo, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import { learnEntries } from './entries'
import { searchEntries, type EntryKind } from './search'

const KIND_LABEL: Record<EntryKind, string> = {
  networking: 'Networking',
  'owasp-web': 'OWASP Web Top 10',
  'owasp-api': 'OWASP API Top 10',
}

export default function LearnSearch() {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const results = useMemo(() => searchEntries(learnEntries, query), [query])
  const active = query.trim().length > 0

  return (
    <div>
      <label htmlFor={inputId} className="sr-only">Search the learning content</label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        placeholder="Search networking and OWASP topics, e.g. subnet, injection, JWT"
        className="w-full rounded-lg border border-white/15 bg-surface px-4 py-3 text-sm text-fg placeholder:text-muted/60"
      />
      <p role="status" className="mt-2 min-h-5 text-sm text-muted">
        {active ? `${results.length} result${results.length === 1 ? '' : 's'}` : ''}
      </p>
      {results.length > 0 && (
        <ul className="mt-2 divide-y divide-line rounded-xl border border-line bg-surface/70">
          {results.map((r) => (
            <li key={r.to}>
              <Link to={r.to} className="flex flex-col gap-1 px-4 py-3 hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-fg">{r.title}</span>
                <span className="font-mono text-xs text-accent">{KIND_LABEL[r.kind]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
