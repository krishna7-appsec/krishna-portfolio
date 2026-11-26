import { Link } from 'react-router-dom'
import Card from '../components/ui/Card'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import { privacyQuiz } from '../data/learning/privacy'
import CidrCalculator from '../features/labs/cidr-calculator/CidrCalculator'
import OsiExplorer from '../features/labs/osi-explorer/OsiExplorer'
import PacketFlow from '../features/labs/packet-flow/PacketFlow'
import PrivacyGuide from '../features/labs/privacy/PrivacyGuide'
import PrivacyQuiz from '../features/labs/privacy/PrivacyQuiz'
import IdorDemo from '../features/labs/simulations/IdorDemo'
import PasswordDemo from '../features/labs/simulations/PasswordDemo'
import PromptInjectionDemo from '../features/labs/simulations/PromptInjectionDemo'
import SqlInjectionDemo from '../features/labs/simulations/SqlInjectionDemo'
import { usePageTitle } from '../hooks/usePageTitle'

const JUMP = [['osi', 'OSI explorer'], ['packet-flow', 'Packet flow'], ['cidr', 'CIDR calculator'], ['simulations', 'Attack simulations'], ['privacy', 'Privacy']] as const

export default function Labs() {
  usePageTitle('Interactive Labs')
  return (
    <>
      <Container className="pt-16 sm:pt-24">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">Labs</p>
        <h1 className="font-display text-3xl font-bold sm:text-5xl">Interactive cybersecurity labs</h1>
        <Card className="mt-6 border-azure/40">
          <p className="text-sm text-muted">
            <strong className="text-fg">Educational demonstrations.</strong> Everything here runs in your browser against made-up data. No real
            system, credential or client engagement is involved, and nothing you type is sent anywhere.
          </p>
        </Card>
        <nav aria-label="Labs on this page" className="mt-6">
          <ul className="flex flex-wrap gap-2">
            {JUMP.map(([id, label]) => (
              <li key={id}>
                <Link to={`#${id}`} className="block rounded-full border border-line px-3 py-1 text-xs text-muted hover:border-accent/50 hover:text-accent">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Section id="osi" eyebrow="Networking" title="OSI model explorer"><OsiExplorer /></Section>
      <Section id="packet-flow" eyebrow="Networking" title="Packet flow" className="border-t border-line"><PacketFlow /></Section>
      <Section id="cidr" eyebrow="Networking" title="CIDR calculator" className="border-t border-line"><div className="max-w-2xl"><CidrCalculator /></div></Section>
      <Section id="simulations" eyebrow="Application security" title="Attack simulations" className="border-t border-line">
        <div className="grid gap-4 md:grid-cols-2">
          <IdorDemo />
          <PasswordDemo />
          <SqlInjectionDemo />
          <PromptInjectionDemo />
        </div>
      </Section>
      <Section id="privacy" eyebrow="Privacy" title="Privacy and safe AI use" className="border-t border-line">
        <PrivacyGuide />
        <h3 className="mb-4 mt-12 font-display text-xl font-bold">Privacy quiz</h3>
        <div className="max-w-2xl"><PrivacyQuiz questions={privacyQuiz} /></div>
      </Section>
    </>
  )
}
