import type { ServiceCategory } from "@/lib/content/services";

export default function ServiceCategoryCard({
  category,
}: {
  category: ServiceCategory;
}) {
  if (category.highlight) {
    return (
      <div className="relative overflow-hidden rounded-3xl border-2 border-purple-500/60 bg-gradient-to-br from-purple-600/10 via-fuchsia-500/10 to-cyan-400/10 p-8 shadow-lg shadow-purple-500/10 sm:col-span-2 lg:col-span-2 dark:border-fuchsia-400/60">
        <span className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          Carro-chefe
        </span>
        <h3 className="mt-4 text-2xl font-bold text-zinc-900 sm:text-3xl dark:text-zinc-50">
          {category.title}
        </h3>
        <p className="mt-3 text-base text-zinc-700 dark:text-zinc-300">
          {category.description}
        </p>
        <ul className="mt-5 flex flex-col gap-2">
          {category.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-purple-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-cyan-700">
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {category.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {category.description}
      </p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {category.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
