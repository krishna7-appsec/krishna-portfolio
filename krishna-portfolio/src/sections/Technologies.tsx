import Card from '../components/ui/Card'
import PlaceholderText from '../components/ui/PlaceholderText'
import Section from '../components/ui/Section'
import { toolGroups, toolsPlaceholder } from '../data/tools'

export default function Technologies() {
  return (
    <Section id="tools" eyebrow="Tools" title="Tools and technologies">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {toolGroups.map((g) => (
          <Card key={g.group} hover>
            <h3 className="font-display text-base font-bold">{g.group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((i) => <li key={i} className="rounded-lg border border-accent/30 bg-accent/5 px-3 py-1.5 text-sm">{i}</li>)}
            </ul>
          </Card>
        ))}
        <Card><p className="text-sm text-muted"><PlaceholderText text={toolsPlaceholder} /></p></Card>
      </div>
    </Section>
  )
}
