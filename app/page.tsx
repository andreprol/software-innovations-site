import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/content/company";
import { serviceCategories } from "@/lib/content/services";
import { portfolioItems } from "@/lib/content/portfolio";
import ServiceCategoryGrid from "@/components/sections/ServiceCategoryGrid";
import PortfolioGrid from "@/components/sections/PortfolioGrid";
import HeroScene from "@/components/three/HeroSceneLoader";

export const metadata: Metadata = {
  title: `${company.tradeName} — Desenvolvimento de Software sob Medida no Rio de Janeiro`,
  description: `${company.mission} Software sob medida, fiscal, ERP, infraestrutura e e-commerce — há ${company.yearsInMarket} anos em ${company.city}/${company.state}.`,
  alternates: {
    canonical: "/",
  },
};

function buildWhatsAppLink(whatsapp: string): string {
  const digits = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 py-16 text-center lg:flex-row lg:gap-16 lg:py-24 lg:text-left">
        <div className="flex flex-1 flex-col items-center gap-6 lg:items-start">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Há {company.yearsInMarket} anos transformando desafios de negócio
            em software sob medida
          </h1>
          <p className="max-w-xl text-lg text-zinc-600 dark:text-zinc-400">
            {company.objective}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink(company.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-opacity hover:opacity-90"
            >
              Falar no WhatsApp
            </a>
            <Link
              href="/contato"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-purple-400 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-cyan-600"
            >
              Fale Conosco
            </Link>
          </div>
        </div>

        <div className="w-full flex-1">
          <HeroScene />
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Soluções de T.I. para o seu negócio
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Da fiscal à infraestrutura, atuamos onde a tecnologia gera valor
            real para a sua empresa.
          </p>
        </div>
        <ServiceCategoryGrid categories={serviceCategories} limit={6} />
        <div className="text-center">
          <Link
            href="/solucoes"
            className="text-sm font-semibold text-purple-600 hover:underline dark:text-cyan-400"
          >
            Ver todas as soluções →
          </Link>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Projetos que já entregamos
          </h2>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Alguns exemplos reais de sistemas e produtos desenvolvidos pela
            nossa equipe.
          </p>
        </div>
        <PortfolioGrid items={portfolioItems} limit={3} />
        <div className="text-center">
          <Link
            href="/portfolio"
            className="text-sm font-semibold text-purple-600 hover:underline dark:text-cyan-400"
          >
            Ver portfólio completo →
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-4">
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <span className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
            Dados tratados em conformidade com a LGPD
          </span>
          <span className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
            Atendemos empresas privadas e estamos preparados para atender
            órgãos públicos
          </span>
          <span className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
            {company.yearsInMarket} anos de mercado
          </span>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-zinc-200 bg-gradient-to-br from-purple-600/10 via-fuchsia-500/10 to-cyan-400/10 px-6 py-12 text-center dark:border-zinc-800">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Pronto para tirar seu projeto do papel?
          </h2>
          <p className="max-w-xl text-zinc-600 dark:text-zinc-400">
            Conte pra gente qual é o desafio do seu negócio e descubra como a
            {` ${company.tradeName} `}
            pode ajudar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={buildWhatsAppLink(company.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-opacity hover:opacity-90"
            >
              Falar no WhatsApp
            </a>
            <Link
              href="/contato"
              className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition-colors hover:border-purple-400 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-cyan-600"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
