import type { Metadata } from "next";
import { serviceCategories } from "@/lib/content/services";
import ServiceCategoryGrid from "@/components/sections/ServiceCategoryGrid";

export const metadata: Metadata = {
  title: "Soluções de T.I. sob Medida",
  description:
    "Desenvolvimento sob medida, fiscal e documentos eletrônicos, ERP e integrações, infraestrutura, marketing digital e e-commerce — soluções completas de T.I. para o seu negócio.",
  alternates: {
    canonical: "/solucoes",
  },
};

export default function Solucoes() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Soluções de T.I. para o seu negócio
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Da fiscal à infraestrutura, atuamos onde a tecnologia gera valor
            real para a sua empresa.
          </p>
        </div>
        <ServiceCategoryGrid categories={serviceCategories} />
      </section>
    </div>
  );
}
