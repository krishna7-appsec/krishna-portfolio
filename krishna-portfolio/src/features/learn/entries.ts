import { networkTopics } from '../../data/learning/networking'
import { owaspApi } from '../../data/learning/owaspApi'
import { owaspWeb } from '../../data/learning/owaspWeb'
import type { SearchEntry } from './search'

/** Hash formats used for deep links: #net-<id>, #web-<id>, #api-<id> (lower case). */
export const learnEntries: readonly SearchEntry[] = [
  ...networkTopics.map((t): SearchEntry => ({
    kind: 'networking',
    id: t.id,
    title: t.title,
    text: [t.explanation, t.example, t.takeaway, t.command].join(' '),
    to: `/learn/networking#net-${t.id}`,
  })),
  ...owaspWeb.map((o): SearchEntry => ({
    kind: 'owasp-web',
    id: o.id,
    title: `${o.id} ${o.name}`,
    text: [o.overview, o.attackScenario, o.rootCause, o.testing, o.remediation, o.tools].join(' '),
    to: `/learn/owasp#web-${o.id.toLowerCase()}`,
  })),
  ...owaspApi.map((o): SearchEntry => ({
    kind: 'owasp-api',
    id: o.id,
    title: `${o.id} ${o.name}`,
    text: [o.overview, o.prevention].join(' '),
    to: `/learn/owasp#api-${o.id.toLowerCase()}`,
  })),
]
