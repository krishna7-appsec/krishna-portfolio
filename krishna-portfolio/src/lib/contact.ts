export interface ContactInput { name: string; email: string; subject: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactInput, string>>
export interface ContactResult { ok: boolean; errors: ContactErrors; value: ContactInput }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export const LIMITS = { name: 100, email: 254, subject: 150, messageMin: 10, message: 2000 } as const

/** Trims, strips line breaks from single-line fields, and validates. */
export function validateContact(raw: ContactInput): ContactResult {
  const value: ContactInput = {
    name: oneLine(raw.name),
    email: oneLine(raw.email),
    subject: oneLine(raw.subject),
    message: raw.message.trim(),
  }
  const errors: ContactErrors = {}
  if (!value.name) errors.name = 'Enter your name.'
  else if (value.name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`
  if (!value.email) errors.email = 'Enter your email address.'
  else if (value.email.length > LIMITS.email || !EMAIL.test(value.email)) errors.email = 'Enter a valid email address.'
  if (!value.subject) errors.subject = 'Enter a subject.'
  else if (value.subject.length > LIMITS.subject) errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`
  if (value.message.length < LIMITS.messageMin) errors.message = `Message must be at least ${LIMITS.messageMin} characters.`
  else if (value.message.length > LIMITS.message) errors.message = `Message must be ${LIMITS.message} characters or fewer.`
  return { ok: Object.keys(errors).length === 0, errors, value }
}

export function buildMailto(to: string, v: ContactInput): string {
  const body = `${v.message}\n\n${v.name} (${v.email})`
  return `mailto:${to}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`
}
