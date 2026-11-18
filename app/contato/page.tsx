import type { Metadata } from "next";
import { company } from "@/lib/content/company";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contato",
  description: `Fale com a ${company.tradeName} pelo formulário, WhatsApp ou e-mail e conte qual é o desafio do seu negócio.`,
  alternates: {
    canonical: "/contato",
  },
};

function buildWhatsAppLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default function Contato() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Fale com a {company.tradeName}
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Conte um pouco sobre o seu projeto ou necessidade. Respondemos
            pelo formulário, WhatsApp ou e-mail.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-6 md:col-span-2">
            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                Outros canais
              </h2>

              <a
                href={buildWhatsAppLink(company.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-cyan-400"
              >
                WhatsApp: {company.whatsapp}
              </a>

              <a
                href={`mailto:${company.email}`}
                className="text-sm text-zinc-600 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-cyan-400"
              >
                {company.email}
              </a>

              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {company.city}/{company.state}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
