import { describe, expect, it } from 'vitest'
import { collectPlaceholders, isPlaceholder } from '../lib/placeholder'
import { education, certifications, certificationsPlaceholder } from './education'
import { experience } from './experience'
import { methodology } from './methodology'
import { caseStudies } from './caseStudies'
import { toolGroups } from './tools'
import { NAV_ITEMS } from './navigation'
import { personal } from './personal'
import { resume } from './site'
import { skills } from './skills'
import { social } from './social'

describe('professional data', () => {
  it('has the confirmed identity', () => {
    expect(personal.title).toBe('Application Security Analyst')
    expect(personal.headline[0]).toBe('Securing Applications.')
    expect(personal.headline[1]).toBe('Building Digital Trust.')
    expect(personal.employer).toBe('HCL Technologies')
  })
  it('has the two confirmed experience phases in order', () => {
    expect(experience).toHaveLength(2)
    expect([experience[0].start, experience[0].end]).toEqual(['August 2022', 'May 2024'])
    expect([experience[1].start, experience[1].end]).toEqual(['June 2024', 'Present'])
  })
  it('keeps unconfirmed responsibilities as placeholders', () => {
    expect(collectPlaceholders(experience)).toHaveLength(2)
  })
  it('has six skill categories and no proficiency scores', () => {
    expect(skills).toHaveLength(6)
    const json = JSON.stringify(skills)
    expect(json).not.toMatch(/%|level|proficiency/i)
  })
  it('uses only https or mailto social links', () => {
    for (const s of social) expect(s.href).toMatch(/^(https:\/\/|mailto:)/)
  })
  it('has navigation paths that start with a slash', () => {
    for (const n of NAV_ITEMS) expect(n.to.startsWith('/')).toBe(true)
    for (const n of NAV_ITEMS.filter((i) => i.kind === 'anchor')) expect(n.to).toMatch(/^\/#[a-z-]+$/)
  })
  it('does not claim a resume file exists yet', () => {
    expect(resume.available).toBe(false)
  })
  it('lists education and does not invent certifications', () => {
    expect([education.degree, education.year]).toEqual(['Bachelor of Technology (B.Tech)', '2022'])
    expect(certifications).toHaveLength(0)
    expect(isPlaceholder(certificationsPlaceholder)).toBe(true)
  })
  it('has the eight methodology steps in order', () => {
    expect(methodology).toHaveLength(8)
    expect(methodology[0].title).toBe('Understand the Application')
    expect(methodology[7].title).toBe('Verify Security Improvements')
  })
  it('lists only confirmed tools', () => {
    expect(toolGroups.flatMap((g) => g.items)).toEqual(['Checkmarx', 'C#', '.NET', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'JWT'])
  })
  it('has the five case-study templates, all marked illustrative', () => {
    expect(caseStudies.map((c) => c.title)).toEqual([
      'Web Application Security Assessment',
      'Application Security and SAST',
      '.NET Application Security Review',
      'REST API Security Assessment',
      'LLM Security and Prompt Injection Research',
    ])
    for (const c of caseStudies) expect(c.illustrative).toBe(true)
    expect(new Set(caseStudies.map((c) => c.slug)).size).toBe(5)
  })
  it('gives every case study complete content and a contribution placeholder', () => {
    for (const c of caseStudies) {
      expect(c.objectives.length >= 3).toBe(true)
      expect(c.methodology.length >= 6).toBe(true)
      expect(c.remediation.length >= 5).toBe(true)
      expect(c.learningOutcomes.length >= 3).toBe(true)
      expect(isPlaceholder(c.yourContribution)).toBe(true)
    }
    expect(collectPlaceholders(caseStudies)).toHaveLength(5)
  })
  it('contains no invented metrics or client claims in case studies', () => {
    const text = JSON.stringify(caseStudies)
    expect(text).not.toMatch(/\d+\s?%|\bclients\b|client name|company name/i)
  })
})
