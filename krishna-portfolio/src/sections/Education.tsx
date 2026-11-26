import Card from '../components/ui/Card'
import PlaceholderText from '../components/ui/PlaceholderText'
import Section from '../components/ui/Section'
import { certifications, certificationsPlaceholder, education } from '../data/education'

export default function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Education and certifications">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <p className="font-mono text-xs text-accent">{education.year}</p>
          <h3 className="mt-1 font-display text-xl font-bold">{education.degree}</h3>
          <p className="mt-1 text-sm text-muted">{education.institution}</p>
        </Card>
        <Card>
          <h3 className="font-display text-xl font-bold">Certifications</h3>
          {certifications.length > 0 ? (
            <ul className="mt-3 space-y-1 text-sm text-muted">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          ) : (
            <p className="mt-3 text-sm text-muted"><PlaceholderText text={certificationsPlaceholder} /></p>
          )}
        </Card>
      </div>
    </Section>
  )
}
