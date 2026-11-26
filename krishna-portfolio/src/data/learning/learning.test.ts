import { describe, expect, it } from 'vitest'
import { networkTopics } from './networking'
import { owaspApi } from './owaspApi'
import { owaspWeb } from './owaspWeb'

describe('networking course', () => {
  it('has all 15 topics with unique ids', () => {
    expect(networkTopics).toHaveLength(15)
    expect(new Set(networkTopics.map((t) => t.id)).size).toBe(15)
  })
  it('has complete content and a valid quiz for every topic', () => {
    for (const t of networkTopics) {
      for (const field of [t.title, t.explanation, t.example, t.diagram, t.command, t.takeaway, t.quiz.question]) expect(field.length > 0).toBe(true)
      expect(t.quiz.options.length >= 2).toBe(true)
      expect(t.quiz.answerIndex >= 0 && t.quiz.answerIndex < t.quiz.options.length).toBe(true)
    }
  })
  it('keeps the original topic order', () => {
    expect(networkTopics[0].title).toBe('Introduction to computer networking')
    expect(networkTopics[14].title).toBe('Basic network troubleshooting')
  })
})

describe('OWASP Top 10:2025 (verified against owasp.org)', () => {
  it('has A01 to A10 in order with the official names', () => {
    expect(owaspWeb.map((o) => `${o.id} ${o.name}`)).toEqual([
      'A01 Broken Access Control',
      'A02 Security Misconfiguration',
      'A03 Software Supply Chain Failures',
      'A04 Cryptographic Failures',
      'A05 Injection',
      'A06 Insecure Design',
      'A07 Authentication Failures',
      'A08 Software or Data Integrity Failures',
      'A09 Security Logging & Alerting Failures',
      'A10 Mishandling of Exceptional Conditions',
    ])
  })
  it('has complete content for every entry', () => {
    for (const o of owaspWeb) {
      for (const field of [o.overview, o.attackScenario, o.rootCause, o.testing, o.remediation, o.tools, o.exercise]) expect(field.length > 0).toBe(true)
    }
  })
  it('keeps the safe code examples on A01 and A05', () => {
    expect(owaspWeb[0].code === undefined).toBe(false)
    expect(owaspWeb[4].code === undefined).toBe(false)
  })
})

describe('OWASP API Security Top 10:2023 (verified against owasp.org)', () => {
  it('has API1 to API10 in order with the official names', () => {
    expect(owaspApi.map((o) => `${o.id} ${o.name}`)).toEqual([
      'API1 Broken Object Level Authorization',
      'API2 Broken Authentication',
      'API3 Broken Object Property Level Authorization',
      'API4 Unrestricted Resource Consumption',
      'API5 Broken Function Level Authorization',
      'API6 Unrestricted Access to Sensitive Business Flows',
      'API7 Server Side Request Forgery',
      'API8 Security Misconfiguration',
      'API9 Improper Inventory Management',
      'API10 Unsafe Consumption of APIs',
    ])
  })
  it('has overview and prevention for every entry', () => {
    for (const o of owaspApi) {
      expect(o.overview.length > 0).toBe(true)
      expect(o.prevention.length > 0).toBe(true)
    }
  })
})
