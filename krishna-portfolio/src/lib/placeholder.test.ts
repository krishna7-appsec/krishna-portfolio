import { describe, expect, it } from 'vitest'
import { collectPlaceholders, containsPlaceholder, isPlaceholder, placeholder, placeholderLabel } from './placeholder'

describe('placeholder helpers', () => {
  it('wraps and detects a placeholder', () => {
    const p = placeholder('Certifications')
    expect(p).toBe('[[EDIT: Certifications]]')
    expect(isPlaceholder(p)).toBe(true)
    expect(placeholderLabel(p)).toBe('Certifications')
  })
  it('does not flag normal text', () => {
    expect(isPlaceholder('Application Security Analyst')).toBe(false)
    expect(placeholderLabel('x')).toBe(null)
  })
  it('distinguishes embedded placeholders from whole-string ones', () => {
    const mixed = `Intro ${placeholder('x')} end`
    expect(containsPlaceholder(mixed)).toBe(true)
    expect(isPlaceholder(mixed)).toBe(false)
  })
  it('collects nested placeholders with paths', () => {
    const found = collectPlaceholders({ a: placeholder('A'), b: ['ok', { c: placeholder('C') }] })
    expect(found).toEqual([{ path: 'a', label: 'A' }, { path: 'b[1].c', label: 'C' }])
  })
})
