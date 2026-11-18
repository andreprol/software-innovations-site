import type { Metadata } from "next";
import { company } from "@/lib/content/company";
import { serviceCategories } from "@/lib/content/services";
import { portfolioItems } from "@/lib/content/portfolio";
import PortfolioGrid from "@/components/sections/PortfolioGrid";

export const metadata: Metadata = {
  title: "Portfólio de Projetos",
  description: `Conheça projetos reais de sistemas, integrações e produtos que a ${company.tradeName} já entregou para empresas de diversos segmentos.`,
  alternates: {
    canonical: "/portfolio",
  },
};

export default function Portfolio() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Projetos que já entregamos
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Alguns exemplos reais de sistemas e produtos desenvolvidos pela
            nossa equipe.
          </p>
        </div>

        {serviceCategories.map((category) => {
          const categoryItems = portfolioItems.filter(
            (item) => item.categorySlug === category.slug,
          );

          if (categoryItems.length === 0) {
            return null;
          }

          return (
            <div key={category.slug} className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
                {category.title}
              </h2>
              <PortfolioGrid items={categoryItems} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
