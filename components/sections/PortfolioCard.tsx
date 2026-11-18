import type { PortfolioItem } from "@/lib/content/portfolio";

export default function PortfolioCard({ item }: { item: PortfolioItem }) {
  const content = (
    <>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {item.name}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {item.description}
      </p>
      {item.url && (
        <span className="mt-4 inline-block text-sm font-medium text-purple-600 dark:text-cyan-400">
          Ver projeto →
        </span>
      )}
    </>
  );

  if (item.url) {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl border border-zinc-200 bg-white p-6 transition-colors hover:border-purple-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-cyan-700"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
      {content}
    </div>
  );
}
