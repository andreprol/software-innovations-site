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

  it('rejects a name longer than 120 characters', () => {
    const result = validateContactPayload({ ...valid, name: 'a'.repeat(121) })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.name).toBeDefined()
  })

  it('accepts a name at exactly the 120 character limit', () => {
    const result = validateContactPayload({ ...valid, name: 'a'.repeat(120) })
    expect(result.ok).toBe(true)
  })

  it('rejects an email longer than 254 characters', () => {
    const longLocalPart = 'a'.repeat(250)
    const result = validateContactPayload({ ...valid, email: `${longLocalPart}@example.com` })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.email).toBeDefined()
  })

  it('rejects a phone longer than 30 characters', () => {
    const result = validateContactPayload({ ...valid, phone: '1'.repeat(31) })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.phone).toBeDefined()
  })

  it('accepts a phone at exactly the 30 character limit', () => {
    const result = validateContactPayload({ ...valid, phone: '1'.repeat(30) })
    expect(result.ok).toBe(true)
  })

  it('rejects a message longer than 5000 characters', () => {
    const result = validateContactPayload({ ...valid, message: 'a'.repeat(5001) })
    expect(result.ok).toBe(false)
    if (!result.ok) expect(result.errors.message).toBeDefined()
  })

  it('accepts a message at exactly the 5000 character limit', () => {
    const result = validateContactPayload({ ...valid, message: 'a'.repeat(5000) })
    expect(result.ok).toBe(true)
  })
})
