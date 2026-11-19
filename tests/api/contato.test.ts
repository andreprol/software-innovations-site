import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/contact/sendNotification', () => ({
  sendContactNotification: vi.fn().mockResolvedValue({ ok: true })
}))

import { sendContactNotification } from '@/lib/contact/sendNotification'
import { POST } from '@/app/api/contato/route'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contato', { method: 'POST', body: JSON.stringify(body) })
}

const validPayload = { name: 'Fulano', email: 'f@example.com', message: 'Oi', consent: true }

describe('POST /api/contato', () => {
  it('returns 400 for an invalid payload', async () => {
    const res = await POST(makeRequest({ name: '', email: '', message: '', consent: false }))
    expect(res.status).toBe(400)
  })

  it('returns 200 for a valid payload', async () => {
    const res = await POST(makeRequest(validPayload))
    expect(res.status).toBe(200)
  })

  it('returns a generic message on 502, never the raw internal send error', async () => {
    const internalError = 'CONTACT_TO_EMAIL não configurado'
    vi.mocked(sendContactNotification).mockResolvedValueOnce({ ok: false, error: internalError })

    const res = await POST(makeRequest(validPayload))
    const data = await res.json()

    expect(res.status).toBe(502)
    expect(typeof data.error).toBe('string')
    expect(data.error).not.toBe(internalError)
    expect(data.error).not.toContain(internalError)
  })

  it('returns 400 (not a 500) for malformed JSON in the request body', async () => {
    const req = new Request('http://localhost/api/contato', {
      method: 'POST',
      body: '{ isto nao e json valido',
    })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(typeof data.error).toBe('string')
  })
})
