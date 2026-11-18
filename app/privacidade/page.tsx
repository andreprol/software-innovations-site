import type { Metadata } from "next";
import { company } from "@/lib/content/company";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${company.tradeName} coleta, usa e protege os dados pessoais enviados pelo formulário de contato do site.`,
  alternates: {
    canonical: "/privacidade",
  },
};

export default function Privacidade() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Política de Privacidade
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Como a {company.tradeName} trata os dados pessoais enviados pelo
            nosso site.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Quais dados coletamos
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Pelo formulário de contato, coletamos os seguintes dados, que
              você preenche voluntariamente:
            </p>
            <ul className="flex list-disc flex-col gap-1 pl-5 text-zinc-600 dark:text-zinc-400">
              <li>Nome;</li>
              <li>E-mail;</li>
              <li>Telefone (opcional);</li>
              <li>Mensagem com a descrição do seu projeto ou necessidade.</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Para que usamos os dados
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Usamos esses dados exclusivamente para responder à sua solicitação
              de contato, incluindo a entrega da mensagem à nossa equipe.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Compartilhamento e operadores
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Os dados do formulário são processados pelo provedor de e-mail
              Resend, exclusivamente para entregar sua mensagem até nós. Não
              compartilhamos seus dados com terceiros para qualquer outra
              finalidade, como marketing ou venda.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Armazenamento
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Mantemos os dados do seu contato apenas pelo tempo necessário para
              responder sua mensagem.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Controlador dos dados
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              O controlador dos seus dados pessoais é a {company.legalName},
              inscrita no CNPJ {company.cnpj}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Seus direitos e contato
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Para tirar dúvidas sobre o tratamento dos seus dados, solicitar
              acesso, correção ou exclusão, escreva para{" "}
              <a
                href={`mailto:${company.email}`}
                className="font-medium text-purple-600 underline hover:text-purple-700 dark:text-cyan-400 dark:hover:text-cyan-300"
              >
                {company.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
