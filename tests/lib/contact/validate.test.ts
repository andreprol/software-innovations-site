// tests/lib/contact/validate.test.ts
import { describe, it, expect } from 'vitest'
import { validateContactPayload } from '@/lib/contact/validate'

const valid = { name: 'Fulano', email: 'fulano@example.com', message: 'Olá', consent: true }

describe('validateContactPayload', () => {
  it('accepts a fully valid payload', () => {
    const result = validateContactPayload(valid)
    expect(result.ok).toBe(true)
  })

  it('rejects an empty name', () => {
    const result = validateContactPayload({ ...valid, name: '' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.name).toBeDefined()
  })

  it('rejects an invalid email (no @)', () => {
    const result = validateContactPayload({ ...valid, email: 'nao-e-email' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.email).toBeDefined()
  })

  it('rejects an empty message', () => {
    const result = validateContactPayload({ ...valid, message: '' })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.message).toBeDefined()
  })

  it('rejects consent === false (LGPD)', () => {
    const result = validateContactPayload({ ...valid, consent: false })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.consent).toBeDefined()
  })

  it('rejects a non-object input without throwing', () => {
    const result = validateContactPayload(null)
    expect(result.ok).toBe(false)
  })
})
