import { Resend } from 'resend'
import type { ContactPayload } from '@/lib/contact/types'

export type SendResult = { ok: true } | { ok: false; error: string }

const FROM_EMAIL = 'contato@softwareinovations.com.br'

export async function sendContactNotification(data: ContactPayload): Promise<SendResult> {
  try {
    // Guarda local e determinística: sem CONTACT_TO_EMAIL não há pra onde mandar o
    // lead, então nem chama o Resend. Depender só da API externa rejeitar um `to`
    // vazio seria confiar numa suposição não verificada sobre terceiro pro cenário de
    // maior risco da task (um lead real sumindo em silêncio).
    const to = process.env.CONTACT_TO_EMAIL?.trim()
    if (!to) {
      return { ok: false, error: 'CONTACT_TO_EMAIL não configurado' }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    const text = [
      `Nome: ${data.name}`,
      `E-mail: ${data.email}`,
      `Telefone: ${data.phone ?? 'não informado'}`,
      '',
      'Mensagem:',
      data.message,
    ].join('\n')

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: `Novo contato pelo site: ${data.name}`,
      text,
    })

    if (error) {
      return { ok: false, error: error.message ?? 'Erro desconhecido ao enviar e-mail' }
    }

    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro desconhecido ao enviar e-mail'
    return { ok: false, error: message }
  }
}
