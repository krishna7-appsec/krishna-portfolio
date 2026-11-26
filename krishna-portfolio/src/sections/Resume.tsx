import { Download } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Section from '../components/ui/Section'
import { resume } from '../data/site'

export default function Resume() {
  return (
    <Section id="resume" eyebrow="Resume" title="Explore My Professional Journey.">
      <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-muted">
          {resume.available
            ? 'Download my resume as a PDF.'
            : 'My resume PDF has not been added yet. The download will appear here once it is available.'}
        </p>
        {resume.available ? (
          <Button href={resume.path} download>
            <Download className="h-4 w-4" aria-hidden="true" /> Download Resume
          </Button>
        ) : (
          <Button disabled>Resume coming soon</Button>
        )}
      </Card>
    </Section>
  )
}
