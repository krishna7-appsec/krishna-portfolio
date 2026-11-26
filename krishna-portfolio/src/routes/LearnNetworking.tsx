import { Link } from 'react-router-dom'
import Section from '../components/ui/Section'
import NetworkingCourse from '../features/learn/networking/NetworkingCourse'
import { usePageTitle } from '../hooks/usePageTitle'

export default function LearnNetworking() {
  usePageTitle('Networking Fundamentals')
  return (
    <Section h1 eyebrow="Learn" title="Networking Fundamentals">
      <p className="mb-6 max-w-2xl text-muted">
        Fifteen topics, each with an explanation, a real-world example, a diagram, commands, a key takeaway and a knowledge check. Try the
        interactive <Link to="/labs#osi" className="text-azure hover:underline">OSI explorer</Link> and <Link to="/labs#cidr" className="text-azure hover:underline">CIDR calculator</Link> in the Labs.
      </p>
      <NetworkingCourse />
    </Section>
  )
}
