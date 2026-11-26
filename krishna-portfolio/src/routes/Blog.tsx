import Section from '../components/ui/Section'
import BlogList from '../features/blog/BlogList'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Blog() {
  usePageTitle('Blog')
  return (
    <Section h1 eyebrow="Blog" title="Blog and knowledge centre">
      <p className="mb-8 max-w-2xl text-muted">Short educational notes on application, API, AI and privacy security. Search, filter by category, or open an article.</p>
      <BlogList />
    </Section>
  )
}
