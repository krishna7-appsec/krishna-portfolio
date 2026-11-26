import { useState } from 'react'
import Card from '../components/ui/Card'
import PlaceholderText from '../components/ui/PlaceholderText'
import Section from '../components/ui/Section'
import { experience } from '../data/experience'

const PREVIEW = 6

function FocusList({ items }: { items: readonly string[] }) {
  const [all, setAll] = useState(false)
  const shown = all ? items : items.slice(0, PREVIEW)
  return (
    <>
      <ul className="mt-4 flex flex-wrap gap-2">
        {shown.map((i) => (
          <li key={i} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted">{i}</li>
        ))}
      </ul>
      {items.length > PREVIEW && (
        <button type="button" aria-expanded={all} onClick={() => setAll((v) => !v)} className="mt-3 text-xs text-azure hover:underline">
          {all ? 'Show fewer' : `Show all ${items.length}`}
        </button>
      )}
    </>
  )
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="HCL Technologies · August 2022 – Present">
      <div className="relative ml-3">
        <span data-timeline-line className="absolute -left-px top-0 h-full w-px origin-top bg-accent" aria-hidden="true" />
      <ol className="space-y-8 border-l border-line pl-8">
        {experience.map((p) => (
          <li key={p.id} data-reveal className="relative">
            <span className="absolute -left-[2.55rem] top-6 h-3 w-3 rounded-full bg-accent ring-4 ring-ink" aria-hidden="true" />
            <Card hover>
              <p className="font-mono text-xs text-accent">{p.start} – {p.end}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{p.role}</h3>
              <p className="text-sm text-muted">{p.employer}</p>
              <FocusList items={p.focus} />
              <p className="mt-4 text-sm text-muted"><PlaceholderText text={p.details} /></p>
            </Card>
          </li>
        ))}
      </ol>
      </div>
    </Section>
  )
}
