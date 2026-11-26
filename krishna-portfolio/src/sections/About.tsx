import Card from '../components/ui/Card'
import PlaceholderText from '../components/ui/PlaceholderText'
import Section from '../components/ui/Section'
import { about, pillars } from '../data/about'

export default function About() {
  return (
    <Section id="about" eyebrow="About" title={about.heading}>
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 text-muted lg:col-span-2">
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <p><PlaceholderText text={about.personalNote} /></p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
          {pillars.map((p) => (
            <li key={p.title} data-reveal>
              <Card hover className="h-full">
                <h3 className="font-display text-base font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted">{p.text}</p>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
