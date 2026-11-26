import { describe, expect, it } from 'vitest'
import { osiLayers } from './osi'
import { packetNodes } from './packetFlow'
import { developerTips, dpdp, privacyQuiz, safeAiRules } from './privacy'

describe('labs data', () => {
  it('has the seven OSI layers from 7 down to 1', () => {
    expect(osiLayers.map((l) => `${l.number} ${l.name}`)).toEqual([
      '7 Application', '6 Presentation', '5 Session', '4 Transport', '3 Network', '2 Data Link', '1 Physical',
    ])
    for (const l of osiLayers) for (const f of [l.unit, l.protocols, l.devices, l.attacks]) expect(f.length > 0).toBe(true)
  })
  it('has the five packet-flow devices in order with unique ids', () => {
    expect(packetNodes.map((n) => n.name)).toEqual(['Client', 'Switch', 'Router', 'Firewall', 'Server'])
    expect(new Set(packetNodes.map((n) => n.id)).size).toBe(5)
  })
  it('has the privacy rules, tips, DPDP note and a valid five-question quiz', () => {
    expect(safeAiRules).toHaveLength(10)
    expect(developerTips).toHaveLength(4)
    expect(dpdp.title).toBe('India: DPDP Act, 2023')
    expect(privacyQuiz).toHaveLength(5)
    for (const q of privacyQuiz) {
      expect(q.options.length >= 2).toBe(true)
      expect(q.answerIndex >= 0 && q.answerIndex < q.options.length).toBe(true)
    }
  })
})
