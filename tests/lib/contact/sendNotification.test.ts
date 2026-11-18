// tests/lib/contact/sendNotification.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

const sendMock = vi.fn()
vi.mock('resend', () => ({
  // function (not arrow) implementation: Resend is a real ES class in production and
  // must be invoked with `new` — an arrow-function mockImplementation cannot be
  // constructed via `new` (Vitest throws "is not a constructor"), so `new Resend()`
  // in the real code would always fail this test if the mock used an arrow function.
  Resend: vi.fn().mockImplementation(function () {
    return { emails: { send: sendMock } }
  })
}))

import { sendContactNotification } from '@/lib/contact/sendNotification'

const payload = { name: 'Fulano', email: 'fulano@example.com', message: 'Olá', consent: true as const }

describe('sendContactNotification', () => {
  const originalContactToEmail = process.env.CONTACT_TO_EMAIL

  // async + block body: a sync `beforeEach(() => sendMock.mockReset())` here triggers a
  // Vitest 5.1.1 false positive where the 3rd test's caught rejection (mockRejectedValue)
  // is still reported as an uncaught error, even though sendContactNotification's
  // try/catch handles it correctly (confirmed by isolating it to a minimal repro with
  // no app code involved at all — it reproduces with a bare `vi.fn()` too). Making the
  // hook async avoids the false positive; behavior (reset before every test) is unchanged.
  beforeEach(async () => {
    sendMock.mockReset()
    // sendContactNotification agora guarda explicitamente contra CONTACT_TO_EMAIL
    // ausente/vazio (sem chamar o Resend) — os testes que exercitam o caminho de
    // sucesso/erro do Resend precisam configurar a env var pra passar dessa guarda.
    process.env.CONTACT_TO_EMAIL = 'destino@example.com'
  })

  afterEach(() => {
    if (originalContactToEmail === undefined) {
      delete process.env.CONTACT_TO_EMAIL
    } else {
      process.env.CONTACT_TO_EMAIL = originalContactToEmail
    }
  })

  it('returns ok:true when Resend succeeds', async () => {
    sendMock.mockResolvedValue({ data: { id: 'abc' }, error: null })
    const result = await sendContactNotification(payload)
    expect(result.ok).toBe(true)
  })

  it('returns ok:false when Resend returns an error, without throwing', async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: 'domain not verified' } })
    const result = await sendContactNotification(payload)
    expect(result.ok).toBe(false)
  })

  it('returns ok:false when the Resend call rejects (network failure)', async () => {
    sendMock.mockRejectedValue(new Error('network down'))
    const result = await sendContactNotification(payload)
    expect(result.ok).toBe(false)
  })

  it('returns ok:false without calling Resend when CONTACT_TO_EMAIL is missing/empty', async () => {
    delete process.env.CONTACT_TO_EMAIL
    const result = await sendContactNotification(payload)
    expect(result.ok).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('returns ok:false without calling Resend when CONTACT_TO_EMAIL is blank', async () => {
    process.env.CONTACT_TO_EMAIL = '   '
    const result = await sendContactNotification(payload)
    expect(result.ok).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })
})
