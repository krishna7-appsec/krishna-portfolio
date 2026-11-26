import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { caseStudies } from '../data/caseStudies'

export default function Projects() {
  return (
    <Section id="projects" eyebrow="Security projects" title="Security case studies">
      <p className="mb-8 max-w-2xl text-muted">
        Five areas of application security work, each written up as a case-study template covering method, risk and remediation. They are
        educational templates, not records of client engagements.
      </p>
      <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((c, i) => (
          <li key={c.id} data-reveal>
            <Link to={`/projects/${c.slug}`} className="block h-full rounded-xl">
              <Card hover className="h-full">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-2 font-display text-lg font-bold">{c.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {c.areasEvaluated.slice(0, 3).map((s) => (
                    <li key={s} className="rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted">{s}</li>
                  ))}
                </ul>
                <p className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                  Read the case study <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </p>
              </Card>
            </Link>
          </li>
        ))}
      </ol>
    </Section>
  )
}
