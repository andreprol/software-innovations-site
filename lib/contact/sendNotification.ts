import { Resend } from 'resend'
import type { ContactPayload } from '@/lib/contact/types'

export type SendResult = { ok: true } | { ok: false; error: string }

const FROM_EMAIL = 'contato@softwareinovations.com.br'

export async function sendContactNotification(data: ContactPayload): Promise<SendResult> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    // CONTACT_TO_EMAIL ausente não deve derrubar a função (nunca lançar) — se não
    // configurado, o próprio Resend retorna um erro na resposta (tratado abaixo),
    // em vez de bloquear aqui com uma string vazia que o tipo do SDK não aceita como undefined.
    const to = process.env.CONTACT_TO_EMAIL ?? ''

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
