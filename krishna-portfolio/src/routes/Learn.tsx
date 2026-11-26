import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { illustrations } from '../data/learning/illustrations'
import { networkTopics } from '../data/learning/networking'
import { owaspApi } from '../data/learning/owaspApi'
import { owaspWeb } from '../data/learning/owaspWeb'
import LearnSearch from '../features/learn/LearnSearch'
import { usePageTitle } from '../hooks/usePageTitle'

const TRACKS = [
  { to: '/learn/networking', title: 'Networking Fundamentals', text: `${networkTopics.length} topics from the OSI model to troubleshooting, each with a knowledge check.` },
  { to: '/learn/owasp', title: 'OWASP References', text: `OWASP Top 10:2025 (${owaspWeb.length} categories) and the API Security Top 10:2023 (${owaspApi.length} categories).` },
] as const

export default function Learn() {
  usePageTitle('Learn')
  return (
    <>
      <Section h1 eyebrow="Learn hub" title="Cybersecurity learning">
        <div className="mb-10 max-w-2xl"><LearnSearch /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          {TRACKS.map((t) => (
            <Link key={t.to} to={t.to} className="block rounded-xl">
              <Card hover className="h-full">
                <h2 className="font-display text-xl font-bold">{t.title}</h2>
                <p className="mt-2 text-sm text-muted">{t.text}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
      <Section id="illustrations" eyebrow="Illustrations" title="Security illustrations" className="border-t border-line">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {illustrations.map((img) => (
            <li key={img.id}>
              <figure className="overflow-hidden rounded-xl border border-line bg-surface/70">
                <img src={img.src} alt={img.alt} width={320} height={190} loading="lazy" decoding="async" className="h-auto w-full" />
                <figcaption className="p-4">
                  <span className="block font-display text-base font-bold">{img.title}</span>
                  <span className="mt-1 block text-sm text-muted">{img.caption}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
