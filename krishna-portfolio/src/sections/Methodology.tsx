import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { methodology } from '../data/methodology'

export default function Methodology() {
  return (
    <Section id="methodology" eyebrow="Methodology" title="Security workflow">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {methodology.map((s, i) => (
          <li key={s.id} data-reveal>
            <Card className="h-full">
              <span className="font-mono text-2xl font-bold text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 font-display text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  )
}
