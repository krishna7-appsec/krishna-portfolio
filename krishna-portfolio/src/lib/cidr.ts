export interface CidrResult {
  ok: true
  prefix: number
  network: string
  mask: string
  wildcard: string
  broadcast: string
  total: number
  usable: number
  firstHost: string
  lastHost: string
  note?: string
}
export interface CidrError { ok: false; error: string }

const PATTERN = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\/(\d{1,2})$/

export const toDotted = (n: number): string => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.')

/** IPv4 CIDR calculator. Works on unsigned 32-bit integers; accepts any address inside the network. */
export function calculateCidr(input: string): CidrResult | CidrError {
  const m = PATTERN.exec(input.trim())
  if (!m) return { ok: false, error: 'Enter an IPv4 network like 192.168.1.0/26.' }
  const octets = m.slice(1, 5)
  if (octets.some((o) => Number(o) > 255)) return { ok: false, error: 'Each octet must be between 0 and 255.' }
  if (octets.some((o) => o.length > 1 && o.startsWith('0'))) {
    return { ok: false, error: 'Remove leading zeros (write 10, not 010); some tools read them as octal.' }
  }
  const prefix = Number(m[5])
  if (prefix > 32) return { ok: false, error: 'The prefix length must be between 0 and 32.' }

  const ip = octets.reduce((acc, o) => acc * 256 + Number(o), 0)
  const mask = prefix === 0 ? 0 : (0xffffffff << (32 - prefix)) >>> 0
  const wildcard = ~mask >>> 0
  const network = (ip & mask) >>> 0
  const broadcast = (network | wildcard) >>> 0
  const total = 2 ** (32 - prefix)

  let usable = total - 2
  let first = network + 1
  let last = broadcast - 1
  let note: string | undefined
  if (prefix === 31) {
    usable = 2
    first = network
    last = broadcast
    note = 'A /31 is a point-to-point link (RFC 3021): both addresses are usable.'
  } else if (prefix === 32) {
    usable = 1
    first = network
    last = network
    note = 'A /32 is a single host address.'
  }

  return {
    ok: true,
    prefix,
    network: toDotted(network),
    mask: toDotted(mask),
    wildcard: toDotted(wildcard),
    broadcast: toDotted(broadcast),
    total,
    usable,
    firstHost: toDotted(first),
    lastHost: toDotted(last),
    note,
  }
}
