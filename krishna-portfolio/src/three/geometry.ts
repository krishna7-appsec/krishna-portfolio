/** Pure geometry helpers for the hero scene, kept free of three.js so they can be unit tested. */

/** Deterministic pseudo-random generator (mulberry32). Same seed, same sequence. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** `count` points spread evenly over a sphere (Fibonacci lattice). Returns [x, y, z, x, y, z, ...]. */
export function fibonacciSphere(count: number, radius: number): Float32Array {
  const out = new Float32Array(count * 3)
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? 0 : 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    out[i * 3] = Math.cos(theta) * r * radius
    out[i * 3 + 1] = y * radius
    out[i * 3 + 2] = Math.sin(theta) * r * radius
  }
  return out
}

/** Index pairs (i < j) of points closer than `maxDist`, capped at `maxPairs` to bound the line count. */
export function nearbyPairs(points: Float32Array, maxDist: number, maxPairs = Infinity): [number, number][] {
  const n = points.length / 3
  const limit = maxDist * maxDist
  const pairs: [number, number][] = []
  for (let i = 0; i < n && pairs.length < maxPairs; i++) {
    for (let j = i + 1; j < n && pairs.length < maxPairs; j++) {
      const dx = points[i * 3] - points[j * 3]
      const dy = points[i * 3 + 1] - points[j * 3 + 1]
      const dz = points[i * 3 + 2] - points[j * 3 + 2]
      if (dx * dx + dy * dy + dz * dz <= limit) pairs.push([i, j])
    }
  }
  return pairs
}

/** Flat line-segment positions (two points per pair) for a LineSegments geometry. */
export function pairsToSegments(points: Float32Array, pairs: readonly [number, number][]): Float32Array {
  const out = new Float32Array(pairs.length * 6)
  pairs.forEach(([a, b], k) => {
    out.set(points.subarray(a * 3, a * 3 + 3), k * 6)
    out.set(points.subarray(b * 3, b * 3 + 3), k * 6 + 3)
  })
  return out
}

/** Random points inside a cube of side `spread` centred on the origin, reproducible by seed. */
export function seededPoints(count: number, spread: number, seed: number): Float32Array {
  const rand = mulberry32(seed)
  const out = new Float32Array(count * 3)
  for (let i = 0; i < out.length; i++) out[i] = (rand() - 0.5) * spread
  return out
}
