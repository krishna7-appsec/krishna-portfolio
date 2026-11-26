import { describe, expect, it } from 'vitest'
import { buildMailto, validateContact } from './contact'

const good = { name: 'Asha', email: 'asha@example.com', subject: 'Hello', message: 'I would like to talk about AppSec.' }

describe('validateContact', () => {
  it('accepts a valid message', () => {
    const r = validateContact(good)
    expect(r.ok).toBe(true)
    expect(r.errors).toEqual({})
  })
  it('flags every empty or short field', () => {
    const r = validateContact({ name: ' ', email: '', subject: '', message: 'short' })
    expect(r.ok).toBe(false)
    expect(Object.keys(r.errors)).toEqual(['name', 'email', 'subject', 'message'])
  })
  it('rejects malformed email addresses', () => {
    for (const email of ['a', 'a@b', 'a b@c.com', '@c.com']) expect(validateContact({ ...good, email }).ok).toBe(false)
  })
  it('enforces length limits', () => {
    expect(validateContact({ ...good, name: 'x'.repeat(101) }).ok).toBe(false)
    expect(validateContact({ ...good, subject: 'x'.repeat(151) }).ok).toBe(false)
    expect(validateContact({ ...good, message: 'x'.repeat(2001) }).ok).toBe(false)
  })
  it('strips line breaks from single-line fields', () => {
    const r = validateContact({ ...good, subject: 'Hi\r\nBcc: evil@example.com', name: 'A\nB' })
    expect(r.value.subject).toBe('Hi Bcc: evil@example.com')
    expect(r.value.name).toBe('A B')
  })
})

describe('buildMailto', () => {
  it('url-encodes subject and body', () => {
    const url = buildMailto('me@example.com', { ...good, subject: 'A & B', message: 'Line1\nLine2 = ok' })
    expect(url.startsWith('mailto:me@example.com?subject=A%20%26%20B&body=')).toBe(true)
    expect(url).toMatch(/Line1%0ALine2%20%3D%20ok/)
  })
})
