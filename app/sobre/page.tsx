import { company } from "@/lib/content/company";

export default function Sobre() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16">
        <div className="flex flex-col gap-3 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Sobre a {company.tradeName}
          </h1>
          <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
            Há {company.yearsInMarket} anos no mercado, sediados em{" "}
            {company.city}/{company.state}, desenvolvendo soluções de T.I. para
            empresas privadas e órgãos públicos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Missão
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">{company.mission}</p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              Objetivo
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {company.objective}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Nossos valores
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {company.values.map((value) => (
              <li
                key={value}
                className="rounded-xl border border-zinc-200 px-5 py-4 font-medium text-zinc-800 dark:border-zinc-800 dark:text-zinc-200"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
            Atuação no setor privado e público
          </h2>
          <p className="max-w-3xl text-zinc-600 dark:text-zinc-400">
            Atendemos empresas privadas de todos os portes e também órgãos
            públicos, como secretarias, autarquias e instituições públicas,
            levando soluções de T.I. para a gestão pública.
          </p>
        </div>
      </section>
    </div>
  );
}
