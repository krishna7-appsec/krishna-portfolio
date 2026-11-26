import type { ReactNode } from 'react'
import { usePageTitle } from '../../hooks/usePageTitle'
import Card from './Card'
import Section from './Section'

/** Honest stand-in for a routed page whose content has not been migrated yet. */
export default function PhasePending({ title, phase, children }: { title: string; phase: number; children?: ReactNode }) {
  usePageTitle(title)
  return (
    <Section h1 title={title} eyebrow={`Arrives in Phase ${phase}`}>
      <Card>
        <p className="text-muted">
          This route is wired up and navigable, but its content has not been migrated yet. It is planned for Phase {phase} of the
          rebuild.
        </p>
        {children}
      </Card>
    </Section>
  )
}
