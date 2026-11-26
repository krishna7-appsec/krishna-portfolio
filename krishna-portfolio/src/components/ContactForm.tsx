import { useState, type FormEvent } from 'react'
import Button from './ui/Button'
import { social } from '../data/social'
import { LIMITS, buildMailto, validateContact, type ContactErrors } from '../lib/contact'

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent' }
  | { kind: 'mailto' }
  | { kind: 'failed' }

const rawEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined
/** Only an https endpoint is accepted; otherwise the form falls back to the visitor's email app. */
const endpoint = rawEndpoint && rawEndpoint.startsWith('https://') ? rawEndpoint : undefined
const email = social.find((s) => s.id === 'email')?.handle ?? ''

const field = 'mt-1 w-full rounded-lg border border-white/15 bg-surface px-3 py-2 text-sm text-fg placeholder:text-muted/60'

export default function ContactForm() {
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('website')) return // honeypot: bots fill hidden fields
    const result = validateContact({
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      subject: String(data.get('subject') ?? ''),
      message: String(data.get('message') ?? ''),
    })
    setErrors(result.errors)
    if (!result.ok) {
      const first = Object.keys(result.errors)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    if (!endpoint) {
      window.location.href = buildMailto(email, result.value)
      setStatus({ kind: 'mailto' })
      return
    }
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(result.value),
      })
      if (res.ok) {
        setStatus({ kind: 'sent' })
        form.reset()
      } else setStatus({ kind: 'failed' })
    } catch {
      setStatus({ kind: 'failed' })
    }
  }

  const err = (k: keyof ContactErrors) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-xs text-red-400">{errors[k]}</p>
    ) : null
  const a11y = (k: keyof ContactErrors) => ({
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="cf-name" className="text-sm font-medium">Name</label>
        <input id="cf-name" name="name" type="text" autoComplete="name" maxLength={LIMITS.name} className={field} {...a11y('name')} />
        {err('name')}
      </div>
      <div>
        <label htmlFor="cf-email" className="text-sm font-medium">Email</label>
        <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} className={field} {...a11y('email')} />
        {err('email')}
      </div>
      <div>
        <label htmlFor="cf-subject" className="text-sm font-medium">Subject</label>
        <input id="cf-subject" name="subject" type="text" maxLength={LIMITS.subject} className={field} {...a11y('subject')} />
        {err('subject')}
      </div>
      <div>
        <label htmlFor="cf-message" className="text-sm font-medium">Message</label>
        <textarea id="cf-message" name="message" rows={5} maxLength={LIMITS.message} className={field} {...a11y('message')} />
        {err('message')}
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="cf-website">Leave this field empty</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Button type="submit" disabled={status.kind === 'sending'}>
        {status.kind === 'sending' ? 'Sending…' : endpoint ? 'Send message' : 'Compose email'}
      </Button>
      <p role="status" className="text-sm text-muted">
        {status.kind === 'idle' && !endpoint && 'No form service is configured yet, so this opens your email app with the message filled in.'}
        {status.kind === 'mailto' && 'Your email app should have opened. If it did not, write to the address on this page.'}
        {status.kind === 'sent' && 'Message sent.'}
        {status.kind === 'failed' && 'The message could not be sent. Please email the address on this page instead.'}
      </p>
    </form>
  )
}
