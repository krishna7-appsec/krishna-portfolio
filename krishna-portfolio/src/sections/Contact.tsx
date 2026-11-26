import ContactForm from '../components/ContactForm'
import Section from '../components/ui/Section'
import { social } from '../data/social'

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let’s Talk Application Security.">
      <div className="grid gap-10 lg:grid-cols-2">
        <ul className="space-y-4 text-sm">
          {social.map((s) => (
            <li key={s.id}>
              <span className="block text-xs uppercase tracking-widest text-muted">{s.label}</span>
              <a
                href={s.href}
                className="text-fg hover:text-accent"
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {s.handle}
              </a>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
    </Section>
  )
}
