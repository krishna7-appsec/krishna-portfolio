import type { EducationInfo } from '../types'
import { placeholder } from '../lib/placeholder'

export const education: EducationInfo = {
  degree: 'Bachelor of Technology (B.Tech)',
  institution: 'Jawaharlal Nehru Technological University Kakinada (JNTUK)',
  year: '2022',
}
/** No certifications are shown until the owner confirms them. */
export const certifications: readonly string[] = []
export const certificationsPlaceholder = placeholder('Add the certifications you hold')
