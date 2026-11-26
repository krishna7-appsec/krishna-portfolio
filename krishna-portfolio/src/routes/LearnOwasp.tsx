import Container from '../components/ui/Container'
import OwaspHub from '../features/learn/owasp/OwaspHub'
import { usePageTitle } from '../hooks/usePageTitle'

export default function LearnOwasp() {
  usePageTitle('OWASP References')
  return (
    <>
      <Container className="pt-16 sm:pt-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">Learn</p>
        <h1 className="font-display text-3xl font-bold sm:text-5xl">OWASP references</h1>
      </Container>
      <OwaspHub />
    </>
  )
}
