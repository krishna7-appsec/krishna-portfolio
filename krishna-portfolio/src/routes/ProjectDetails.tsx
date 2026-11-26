import type { ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import PlaceholderText from '../components/ui/PlaceholderText'
import { caseStudies } from '../data/caseStudies'
import { usePageTitle } from '../hooks/usePageTitle'
import NotFound from './NotFound'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="font-display text-xl font-bold">{title}</h2>
      <div className="mt-3 text-muted">{children}</div>
    </section>
  )
}

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li key={i} className="rounded-full border border-line bg-white/5 px-3 py-1 text-sm">{i}</li>
      ))}
    </ul>
  )
}

function Bullets({ items, ordered = false }: { items: readonly string[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={`space-y-2 pl-5 ${ordered ? 'list-decimal' : 'list-disc'} marker:text-accent`}>
      {items.map((i) => <li key={i}>{i}</li>)}
    </Tag>
  )
}

const TOC = [
  ['overview', 'Overview'], ['objectives', 'Security objectives'], ['context', 'Technology context'],
  ['methodology', 'Assessment methodology'], ['areas', 'Security areas evaluated'], ['categories', 'Vulnerability categories'],
  ['approach', 'Technical approach'], ['risk', 'Risk analysis'], ['remediation', 'Remediation recommendations'],
  ['outcomes', 'Key learning outcomes'], ['contribution', 'My contribution'],
] as const

export default function ProjectDetails() {
  const { slug } = useParams()
  const index = caseStudies.findIndex((c) => c.slug === slug)
  const study = index >= 0 ? caseStudies[index] : undefined
  usePageTitle(study ? study.title : 'Case study not found')
  if (!study) return <NotFound />
  const prev = caseStudies[index - 1]
  const next = caseStudies[index + 1]

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <Link to="/#projects" className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All case studies
        </Link>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">Case study {String(index + 1).padStart(2, '0')}</p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-5xl">{study.title}</h1>

        <Card className="mt-6 border-azure/40">
          <p className="text-sm text-muted">
            <strong className="text-fg">Case-study template.</strong> This page describes the approach and the findings typical of this kind
            of assessment. It is educational and is not a record of a specific client engagement.
          </p>
        </Card>

        <nav aria-label="On this page" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {TOC.map(([id, label]) => (
              <li key={id}>
                <Link to={`#${id}`} className="block rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent/50 hover:text-accent">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-10">
          <Block id="overview" title="Project overview"><p>{study.overview}</p></Block>
          <Block id="objectives" title="Security objectives"><Bullets items={study.objectives} /></Block>
          <Block id="context" title="Application and technology context"><p>{study.technologyContext}</p></Block>
          <Block id="methodology" title="Assessment methodology"><Bullets ordered items={study.methodology} /></Block>
          <Block id="areas" title="Security areas evaluated"><Chips items={study.areasEvaluated} /></Block>
          <Block id="categories" title="Vulnerability categories"><Chips items={study.vulnerabilityCategories} /></Block>
          <Block id="approach" title="Technical approach"><p>{study.technicalApproach}</p></Block>
          <Block id="risk" title="Risk analysis"><p>{study.riskAnalysis}</p></Block>
          <Block id="remediation" title="Remediation recommendations"><Bullets items={study.remediation} /></Block>
          <Block id="outcomes" title="Key learning outcomes"><Bullets items={study.learningOutcomes} /></Block>
          <Block id="contribution" title="My contribution"><p><PlaceholderText text={study.yourContribution} /></p></Block>
        </div>

        <nav aria-label="Case studies" className="mt-16 flex flex-wrap justify-between gap-4 border-t border-line pt-8 text-sm">
          {prev ? (
            <Link to={`/projects/${prev.slug}`} className="inline-flex items-center gap-1 text-muted hover:text-accent">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {prev.title}
            </Link>
          ) : <span />}
          {next && (
            <Link to={`/projects/${next.slug}`} className="inline-flex items-center gap-1 text-muted hover:text-accent">
              {next.title} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </nav>
      </Container>
    </article>
  )
}
