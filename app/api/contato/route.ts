import { validateContactPayload } from '@/lib/contact/validate'
import { sendContactNotification } from '@/lib/contact/sendNotification'

// Rota de efeito colateral real (envia e-mail) — nunca deve ser cacheada/otimizada
// estaticamente. Com `cacheComponents` (Next 16) o route segment config antigo
// (`export const dynamic = 'force-dynamic'`) é proibido pelo build (erro no
// Turbopack: "Route segment config 'dynamic' is not compatible with
// nextConfig.cacheComponents") — o novo modelo é opt-IN: nada é cacheado a menos
// que a rota explicitamente use a diretiva `"use cache"`, que este handler não usa.
// Como ele só exporta POST (nunca GET) e lê corpo da requisição via
// `request.json()`, não há nada aqui que o Next possa pré-renderizar/cachear;
// confirmado no output de `next build` (ver task-5-report.md).

// Mensagem genérica para o cliente em caso de falha no envio — o erro real
// (ex.: "CONTACT_TO_EMAIL não configurado", ou a mensagem bruta do SDK do
// Resend) nunca deve chegar a um visitante não autenticado do site: pode
// expor detalhes de configuração interna/terceiro. O erro real é só logado
// no servidor (console.error) antes de responder.
const GENERIC_SEND_ERROR_MESSAGE = 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.'

// JSON malformado no corpo (ex.: cliente bugado, request manual incompleta) não deve
// virar 500 não tratado — `request.json()` lança nesse caso, então respondemos 400 com
// erro claro, no mesmo formato de erro de validação, em vez de deixar a exceção subir.
const INVALID_JSON_ERROR_MESSAGE = 'Corpo da requisição inválido (JSON malformado)'

export async function POST(request: Request): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: INVALID_JSON_ERROR_MESSAGE }, { status: 400 })
  }

  const result = validateContactPayload(body)

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 })
  }

  const sendResult = await sendContactNotification(result.data)

  if (!sendResult.ok) {
    console.error('[api/contato] falha ao enviar notificação de contato:', sendResult.error)
    return Response.json({ error: GENERIC_SEND_ERROR_MESSAGE }, { status: 502 })
  }

  return Response.json({ ok: true }, { status: 200 })
}
