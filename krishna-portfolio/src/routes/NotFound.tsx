import Button from '../components/ui/Button'
import Section from '../components/ui/Section'
import { usePageTitle } from '../hooks/usePageTitle'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <Section h1 eyebrow="404" title="Page not found">
      <p className="mb-6 text-muted">That address does not exist on this site.</p>
      <Button to="/">Back to home</Button>
    </Section>
  )
}
