/**
 * Educational simulations ported from the original site. Everything is computed locally against
 * made-up data. No request is made and no real system, credential or client is involved.
 */
export type Tone = 'ok' | 'bad' | 'warn' | 'neutral'
export interface SimResult { tone: Tone; title: string; detail: string }

export const DEMO_SECRET = 'DEMO-7731'

/** IDOR / BOLA: you are user 1001 and request other users' records. */
export function simulateIdor(id: string, fixEnabled: boolean): SimResult {
  if (id === '1001') return { tone: 'ok', title: '200 OK: your own record', detail: '{"id":1001,"name":"You"}' }
  if (fixEnabled) {
    return { tone: 'ok', title: '403 Forbidden: protected', detail: 'The server checked ownership and refused the request. This is the fix.' }
  }
  return {
    tone: 'bad',
    title: '200 OK: vulnerable',
    detail: `{"id":${id},"name":"Someone else","balance":"₹•••••"}\nYou just read another user’s data because the server never checked who owns record ${id}.`,
  }
}

export interface PasswordScore { label: 'Waiting' | 'Weak' | 'Medium' | 'Strong'; percent: number; tone: Tone; message: string }

export function scorePassword(value: string): PasswordScore {
  if (!value) return { label: 'Waiting', percent: 0, tone: 'neutral', message: 'Type a password to check it.' }
  let s = 0
  if (value.length >= 8) s++
  if (value.length >= 12) s++
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) s++
  if (/\d/.test(value)) s++
  if (/[^\w]/.test(value)) s++
  if (/^(password|123456|qwerty|admin|letmein)/i.test(value)) s = 0
  if (s <= 2) return { label: 'Weak', percent: 30, tone: 'bad', message: 'Too short or guessable.' }
  if (s < 4) return { label: 'Medium', percent: 65, tone: 'warn', message: 'Add length and symbols.' }
  return { label: 'Strong', percent: 100, tone: 'ok', message: 'Long and varied. Use a password manager.' }
}

const SQLI_PATTERN = /'\s*or\s*'?1'?\s*=\s*'?1|'\s*or\s+1\s*=\s*1|--/i

/** SQL injection against a toy login. `parameterized` shows the fixed version. */
export function simulateSqlLogin(username: string, parameterized: boolean): { query: string; result: SimResult } {
  const injected = SQLI_PATTERN.test(username)
  if (parameterized) {
    return {
      query: "SELECT * FROM users WHERE name = ? AND pass = ?   -- parameters: [username, password]",
      result: injected
        ? { tone: 'ok', title: 'Blocked', detail: 'The input is treated as data, not code, so the quote cannot change the query.' }
        : { tone: 'neutral', title: 'Login failed', detail: 'Wrong password.' },
    }
  }
  const query = `SELECT * FROM users WHERE name='${username}' AND pass='••••'`
  return {
    query,
    result: injected
      ? { tone: 'bad', title: 'Bypassed', detail: 'Logged in as ADMIN. The quote broke out of the string and changed the query logic.' }
      : { tone: 'neutral', title: 'Login failed', detail: 'Wrong password.' },
  }
}

const INJECTION_PATTERN = /ignore.*(instruction|rule|previous)|reveal|system prompt|you are now/i

/** Prompt injection against a toy assistant that guards a secret. */
export function simulatePromptInjection(input: string): SimResult {
  if (INJECTION_PATTERN.test(input)) {
    return { tone: 'bad', title: 'AI tricked', detail: `“Okay! The secret is ${DEMO_SECRET}.” The model obeyed the attacker instead of its rules.` }
  }
  return { tone: 'ok', title: 'Safe', detail: '“I can’t share that, but I’m happy to help with something else.”' }
}
