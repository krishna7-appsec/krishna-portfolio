import { describe, expect, it } from 'vitest'
import { calculateCidr, toDotted } from './cidr'

function ok(input: string) {
  const r = calculateCidr(input)
  if (!r.ok) throw new Error(`expected success for ${input}: ${r.error}`)
  return r
}

/** Independent reference using BigInt and shifts, to cross-check the main implementation. */
function reference(octets: [number, number, number, number], prefix: number) {
  const ip = (BigInt(octets[0]) << 24n) | (BigInt(octets[1]) << 16n) | (BigInt(octets[2]) << 8n) | BigInt(octets[3])
  const hostBits = BigInt(32 - prefix)
  const size = 1n << hostBits
  const network = (ip >> hostBits) << hostBits
  return { network: Number(network), broadcast: Number(network + size - 1n), total: Number(size) }
}

describe('toDotted', () => {
  it('formats boundary values', () => {
    expect(toDotted(0)).toBe('0.0.0.0')
    expect(toDotted(4294967295)).toBe('255.255.255.255')
    expect(toDotted(3232235777)).toBe('192.168.1.1')
  })
})

describe('calculateCidr known answers', () => {
  it('/24', () => {
    const r = ok('192.168.1.0/24')
    expect([r.network, r.mask, r.wildcard, r.broadcast]).toEqual(['192.168.1.0', '255.255.255.0', '0.0.0.255', '192.168.1.255'])
    expect([r.total, r.usable, r.firstHost, r.lastHost]).toEqual([256, 254, '192.168.1.1', '192.168.1.254'])
  })
  it('/26 matches the course example (192.168.1.0 to .63)', () => {
    const r = ok('192.168.1.0/26')
    expect([r.mask, r.wildcard, r.broadcast]).toEqual(['255.255.255.192', '0.0.0.63', '192.168.1.63'])
    expect([r.total, r.usable, r.firstHost, r.lastHost]).toEqual([64, 62, '192.168.1.1', '192.168.1.62'])
  })
  it('/22', () => {
    const r = ok('10.0.0.0/22')
    expect([r.mask, r.broadcast, r.total, r.usable]).toEqual(['255.255.252.0', '10.0.3.255', 1024, 1022])
  })
  it('derives the network when the address is inside it', () => {
    const r = ok('192.168.1.77/26')
    expect([r.network, r.broadcast]).toEqual(['192.168.1.64', '192.168.1.127'])
    const s = ok('172.16.5.130/30')
    expect([s.network, s.broadcast, s.usable, s.firstHost, s.lastHost]).toEqual(['172.16.5.128', '172.16.5.131', 2, '172.16.5.129', '172.16.5.130'])
  })
  it('/0 covers the whole IPv4 space', () => {
    const r = ok('0.0.0.0/0')
    expect([r.mask, r.broadcast, r.total, r.usable]).toEqual(['0.0.0.0', '255.255.255.255', 4294967296, 4294967294])
  })
  it('/31 is a point-to-point link with two usable addresses', () => {
    const r = ok('10.0.0.0/31')
    expect([r.usable, r.firstHost, r.lastHost]).toEqual([2, '10.0.0.0', '10.0.0.1'])
    expect(r.note === undefined).toBe(false)
  })
  it('/32 is a single host', () => {
    const r = ok('255.255.255.255/32')
    expect([r.network, r.broadcast, r.total, r.usable, r.firstHost, r.lastHost]).toEqual(['255.255.255.255', '255.255.255.255', 1, 1, '255.255.255.255', '255.255.255.255'])
  })
  it('ignores surrounding whitespace', () => {
    expect(ok('  10.1.2.3/8  ').network).toBe('10.0.0.0')
  })
})

describe('calculateCidr cross-check against an independent BigInt implementation', () => {
  it('agrees for every prefix on several addresses', () => {
    const samples: [number, number, number, number][] = [[0, 0, 0, 0], [10, 20, 30, 40], [172, 16, 5, 130], [192, 168, 255, 254], [255, 255, 255, 255], [1, 2, 3, 4]]
    for (const s of samples) {
      for (let p = 0; p <= 32; p++) {
        const r = ok(`${s.join('.')}/${p}`)
        const ref = reference(s, p)
        expect([r.network, r.broadcast, r.total]).toEqual([toDotted(ref.network), toDotted(ref.broadcast), ref.total])
      }
    }
  })
})

describe('calculateCidr validation', () => {
  it('rejects malformed input', () => {
    for (const bad of ['', 'abc', '10.0.0', '10.0.0.0', '10.0.0.0/', '10.0.0.0/8/8', '10.0.0.0.0/8', '-1.0.0.0/8', '10.0.0.0/-1']) {
      expect(calculateCidr(bad).ok).toBe(false)
    }
  })
  it('rejects out-of-range octets and prefixes', () => {
    expect(calculateCidr('256.0.0.0/8').ok).toBe(false)
    expect(calculateCidr('10.0.0.300/8').ok).toBe(false)
    expect(calculateCidr('10.0.0.0/33').ok).toBe(false)
  })
  it('rejects leading zeros, which some tools read as octal', () => {
    expect(calculateCidr('010.0.0.0/8').ok).toBe(false)
    expect(calculateCidr('10.00.0.0/8').ok).toBe(false)
    expect(ok('10.0.0.0/8').network).toBe('10.0.0.0')
  })
})
