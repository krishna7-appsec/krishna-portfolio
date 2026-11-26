import { describe, expect, it } from 'vitest'
import { shouldRender3D } from './capabilities'

const ok = { reducedMotion: false, isWide: true, hasWebGL: true, saveData: false }

describe('shouldRender3D', () => {
  it('renders 3D when supported and welcome', () => {
    expect(shouldRender3D(ok)).toBe(true)
  })
  it('falls back for reduced motion', () => {
    expect(shouldRender3D({ ...ok, reducedMotion: true })).toBe(false)
  })
  it('falls back on narrow (phone) screens', () => {
    expect(shouldRender3D({ ...ok, isWide: false })).toBe(false)
  })
  it('falls back without WebGL', () => {
    expect(shouldRender3D({ ...ok, hasWebGL: false })).toBe(false)
  })
  it('falls back when the visitor asked to save data', () => {
    expect(shouldRender3D({ ...ok, saveData: true })).toBe(false)
  })
})
