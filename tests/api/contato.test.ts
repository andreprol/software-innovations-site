import { describe, it, expect, vi } from 'vitest'

vi.mock('@/lib/contact/sendNotification', () => ({
  sendContactNotification: vi.fn().mockResolvedValue({ ok: true })
}))

import { POST } from '@/app/api/contato/route'

function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contato', { method: 'POST', body: JSON.stringify(body) })
}

describe('POST /api/contato', () => {
  it('returns 400 for an invalid payload', async () => {
    const res = await POST(makeRequest({ name: '', email: '', message: '', consent: false }))
    expect(res.status).toBe(400)
  })

  it('returns 200 for a valid payload', async () => {
    const res = await POST(makeRequest({ name: 'Fulano', email: 'f@example.com', message: 'Oi', consent: true }))
    expect(res.status).toBe(200)
  })
})
