import { describe, expect, it } from 'vitest'
import { searchEntries, type SearchEntry } from './search'

const entries: SearchEntry[] = [
  { kind: 'networking', id: 'a', title: 'Subnetting and CIDR', text: 'Prefix length splits a network.', to: '/learn/networking#net-a' },
  { kind: 'networking', id: 'b', title: 'DNS and DHCP', text: 'DNS turns names into IP addresses; subnet info comes from DHCP.', to: '/learn/networking#net-b' },
  { kind: 'owasp-web', id: 'A05', title: 'A05 Injection', text: 'Untrusted input becomes code.', to: '/learn/owasp#web-a05' },
]

describe('searchEntries', () => {
  it('returns nothing for an empty or blank query', () => {
    expect(searchEntries(entries, '')).toEqual([])
    expect(searchEntries(entries, '   ')).toEqual([])
  })
  it('is case-insensitive', () => {
    expect(searchEntries(entries, 'INJECTION').map((e) => e.id)).toEqual(['A05'])
  })
  it('requires every term to match', () => {
    expect(searchEntries(entries, 'dns subnet').map((e) => e.id)).toEqual(['b'])
    expect(searchEntries(entries, 'dns injection')).toEqual([])
  })
  it('ranks title matches above text matches', () => {
    expect(searchEntries(entries, 'subnet').map((e) => e.id)).toEqual(['a', 'b'])
  })
  it('respects the limit', () => {
    expect(searchEntries(entries, 'n', 1)).toHaveLength(1)
  })
})
