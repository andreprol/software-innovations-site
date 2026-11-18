export function shouldUseFallback(opts: {
  hasWebGL: boolean
  prefersReducedMotion: boolean
}): boolean {
  return !opts.hasWebGL || opts.prefersReducedMotion
}
