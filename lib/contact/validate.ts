import type { ContactPayload } from '@/lib/contact/types'

export type ValidationResult =
  | { ok: true; data: ContactPayload }
  | { ok: false; errors: Partial<Record<keyof ContactPayload, string>> }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactPayload(input: unknown): ValidationResult {
  if (typeof input !== 'object' || input === null) {
    return {
      ok: false,
      errors: {
        name: 'Nome é obrigatório',
        email: 'E-mail é obrigatório',
        message: 'Mensagem é obrigatória',
        consent: 'Consentimento é obrigatório',
      },
    }
  }

  const raw = input as Record<string, unknown>
  const errors: Partial<Record<keyof ContactPayload, string>> = {}

  const name = typeof raw.name === 'string' ? raw.name.trim() : ''
  if (!name) errors.name = 'Nome é obrigatório'

  const email = typeof raw.email === 'string' ? raw.email.trim() : ''
  if (!email || !EMAIL_RE.test(email)) errors.email = 'E-mail inválido'

  const message = typeof raw.message === 'string' ? raw.message.trim() : ''
  if (!message) errors.message = 'Mensagem é obrigatória'

  let phone: string | undefined
  if (raw.phone !== undefined && raw.phone !== null) {
    if (typeof raw.phone !== 'string') {
      errors.phone = 'Telefone inválido'
    } else {
      phone = raw.phone.trim()
    }
  }

  // LGPD: consentimento precisa ser exatamente true (não basta truthy).
  if (raw.consent !== true) {
    errors.consent = 'É necessário consentir com o tratamento dos dados (LGPD)'
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  const data: ContactPayload = { name, email, message, consent: true }
  if (phone !== undefined) data.phone = phone
  return { ok: true, data }
}
