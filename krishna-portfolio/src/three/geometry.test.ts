import { describe, expect, it } from 'vitest'
import { fibonacciSphere, mulberry32, nearbyPairs, pairsToSegments, seededPoints } from './geometry'

const dist = (p: Float32Array, i: number, j: number) => Math.hypot(p[i * 3] - p[j * 3], p[i * 3 + 1] - p[j * 3 + 1], p[i * 3 + 2] - p[j * 3 + 2])

describe('mulberry32', () => {
  it('is deterministic and stays in [0, 1)', () => {
    const a = mulberry32(42), b = mulberry32(42)
    for (let i = 0; i < 100; i++) {
      const x = a()
      expect(x).toBe(b())
      expect(x >= 0 && x < 1).toBe(true)
    }
  })
  it('differs between seeds', () => {
    expect(mulberry32(1)()).not.toBe(mulberry32(2)())
  })
})

describe('fibonacciSphere', () => {
  it('returns three numbers per point', () => {
    expect(fibonacciSphere(70, 1.4).length).toBe(210)
    expect(fibonacciSphere(0, 1).length).toBe(0)
  })
  it('places every point on the sphere surface', () => {
    const p = fibonacciSphere(200, 2)
    for (let i = 0; i < 200; i++) expect(Math.abs(Math.hypot(p[i * 3], p[i * 3 + 1], p[i * 3 + 2]) - 2) < 1e-4).toBe(true)
  })
  it('spans the poles and is deterministic', () => {
    const p = fibonacciSphere(50, 1)
    expect(Math.abs(p[1] - 1) < 1e-6).toBe(true)
    expect(Math.abs(p[49 * 3 + 1] + 1) < 1e-6).toBe(true)
    expect(Array.from(fibonacciSphere(50, 1))).toEqual(Array.from(p))
  })
  it('handles a single point', () => {
    const p = fibonacciSphere(1, 3)
    expect(Math.abs(Math.hypot(p[0], p[1], p[2]) - 3) < 1e-4).toBe(true)
  })
})

describe('nearbyPairs', () => {
  const pts = fibonacciSphere(60, 1)
  it('returns unique ordered pairs within the distance', () => {
    const pairs = nearbyPairs(pts, 0.5)
    expect(pairs.length > 0).toBe(true)
    expect(new Set(pairs.map(([i, j]) => `${i}-${j}`)).size).toBe(pairs.length)
    for (const [i, j] of pairs) {
      expect(i < j).toBe(true)
      expect(dist(pts, i, j) <= 0.5 + 1e-6).toBe(true)
    }
  })
  it('matches a brute-force count', () => {
    let count = 0
    for (let i = 0; i < 60; i++) for (let j = i + 1; j < 60; j++) if (dist(pts, i, j) <= 0.5) count++
    expect(nearbyPairs(pts, 0.5).length).toBe(count)
  })
  it('respects the pair cap', () => {
    expect(nearbyPairs(pts, 2, 10)).toHaveLength(10)
  })
})

describe('pairsToSegments', () => {
  it('writes both endpoints of each pair', () => {
    const p = new Float32Array([0, 0, 0, 1, 2, 3, 4, 5, 6])
    expect(Array.from(pairsToSegments(p, [[0, 1], [1, 2]]))).toEqual([0, 0, 0, 1, 2, 3, 1, 2, 3, 4, 5, 6])
  })
})

describe('seededPoints', () => {
  it('is reproducible, bounded, and seed-dependent', () => {
    const a = seededPoints(100, 9, 7)
    expect(Array.from(a)).toEqual(Array.from(seededPoints(100, 9, 7)))
    expect(Array.from(a)).not.toEqual(Array.from(seededPoints(100, 9, 8)))
    expect(a.length).toBe(300)
    for (const v of a) expect(Math.abs(v) <= 4.5).toBe(true)
  })
})
