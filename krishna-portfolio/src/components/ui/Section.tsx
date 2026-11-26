import type { ReactNode } from 'react'
import Container from './Container'

interface SectionProps {
  id?: string
  title?: string
  eyebrow?: string
  /** Render the title as the page's h1 (use once per route). */
  h1?: boolean
  className?: string
  children: ReactNode
}

export default function Section({ id, title, eyebrow, h1 = false, className = '', children }: SectionProps) {
  const Heading = h1 ? 'h1' : 'h2'
  const titleId = id ? `${id}-title` : undefined
  return (
    <section id={id} aria-labelledby={title ? titleId : undefined} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {title && (
          <header data-reveal className="mb-10 max-w-2xl">
            {eyebrow && <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">{eyebrow}</p>}
            <Heading id={titleId} className="font-display text-3xl font-bold sm:text-4xl">{title}</Heading>
          </header>
        )}
        {children}
      </Container>
    </section>
  )
}
