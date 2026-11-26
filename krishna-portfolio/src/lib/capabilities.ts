export interface Render3DInput {
  reducedMotion: boolean
  /** true on tablet/desktop widths (min-width 768px). Phones get the lightweight static visual. */
  isWide: boolean
  hasWebGL: boolean
  saveData: boolean
}

/** The 3D hero runs only when it is both supported and welcome. Everything else gets the static fallback. */
export function shouldRender3D({ reducedMotion, isWide, hasWebGL, saveData }: Render3DInput): boolean {
  return !reducedMotion && isWide && hasWebGL && !saveData
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export function prefersSaveData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return connection?.saveData === true
}
