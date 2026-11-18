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
export async function POST(request: Request): Promise<Response> {
  const body = await request.json()
  const result = validateContactPayload(body)

  if (!result.ok) {
    return Response.json({ errors: result.errors }, { status: 400 })
  }

  const sendResult = await sendContactNotification(result.data)

  if (!sendResult.ok) {
    return Response.json({ error: sendResult.error }, { status: 502 })
  }

  return Response.json({ ok: true }, { status: 200 })
}
