/** Accent colour and icon for each category's generated cover. Unknown categories fall back to a default. */
export const CATEGORY_STYLE: Record<string, { color: string; icon: string }> = {
  'Penetration Testing': { color: '#00F5A0', icon: '🎯' },
  'API Security': { color: '#00B8FF', icon: '🔌' },
  'Application Security': { color: '#00F5A0', icon: '🧩' },
  'AI Security': { color: '#A78BFA', icon: '🤖' },
  Privacy: { color: '#F5C451', icon: '🔒' },
  'Threat Landscape': { color: '#FF2D55', icon: '🛰️' },
}
export const DEFAULT_STYLE = { color: '#00B8FF', icon: '🛡️' }
