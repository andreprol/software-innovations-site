// tests/lib/webgl/shouldUseFallback.test.ts
import { describe, it, expect } from 'vitest'
import { shouldUseFallback } from '@/lib/webgl/shouldUseFallback'

describe('shouldUseFallback', () => {
  it('uses fallback when WebGL is unavailable', () => {
    expect(shouldUseFallback({ hasWebGL: false, prefersReducedMotion: false })).toBe(true)
  })

  it('uses fallback when the user prefers reduced motion', () => {
    expect(shouldUseFallback({ hasWebGL: true, prefersReducedMotion: true })).toBe(true)
  })

  it('uses the 3D scene when WebGL is available and motion is fine', () => {
    expect(shouldUseFallback({ hasWebGL: true, prefersReducedMotion: false })).toBe(false)
  })
})
