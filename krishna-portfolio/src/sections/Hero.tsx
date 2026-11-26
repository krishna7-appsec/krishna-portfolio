import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { useHeroIntro } from '../animations/useHeroIntro'
import Button from '../components/ui/Button'
import Container from '../components/ui/Container'
import { personal } from '../data/personal'
import { resume } from '../data/site'
import HeroVisual from './hero/HeroVisual'

export default function Hero() {
  const root = useRef<HTMLElement | null>(null)
  useHeroIntro(root)
  return (
    <section ref={root} className="relative overflow-hidden border-b border-line">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-2">
        <div>
          <p data-hero="eyebrow" className="font-mono text-sm text-accent">{personal.title}</p>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-6xl">
            <span data-hero="line" className="block">{personal.headline[0]}</span>
            <span data-hero="line" className="block text-accent">{personal.headline[1]}</span>
          </h1>
          <p data-hero="meta" className="mt-4 font-mono text-sm text-muted">{personal.specialties.join(' | ')}</p>
          <p data-hero="meta" className="mt-6 max-w-xl text-muted">{personal.summary}</p>
          <div data-hero="meta" className="mt-8 flex flex-wrap gap-3">
            <Button href="#projects">
              Explore My Work <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            {resume.available ? (
              <Button href={resume.path} download variant="secondary">Download Resume</Button>
            ) : (
              <Button href="#resume" variant="secondary">Resume (coming soon)</Button>
            )}
          </div>
        </div>
        <div data-hero="visual" className="relative mx-auto aspect-square w-full max-w-sm lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
