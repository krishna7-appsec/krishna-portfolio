import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { skills } from '../data/skills'

export default function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technical skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((c) => (
          <Card key={c.id} hover reveal>
            <h3 className="font-display text-lg font-bold">{c.title}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {c.items.map((i) => (
                <li key={i} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted">{i}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  )
}
