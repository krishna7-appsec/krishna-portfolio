import type { ToolGroup } from '../types'
import { placeholder } from '../lib/placeholder'

/** Only technologies confirmed by the owner. Add more here. */
export const toolGroups: readonly ToolGroup[] = [
  { group: 'Static analysis', items: ['Checkmarx'] },
  { group: 'Languages and platforms', items: ['C#', '.NET', 'JavaScript', 'HTML', 'CSS'] },
  { group: 'APIs and tokens', items: ['REST APIs', 'JWT'] },
]
export const toolsPlaceholder = placeholder('Add other tools and technologies you have used')
