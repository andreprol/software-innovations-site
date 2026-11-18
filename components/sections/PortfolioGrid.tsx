import type { PortfolioItem } from "@/lib/content/portfolio";
import PortfolioCard from "./PortfolioCard";

export default function PortfolioGrid({
  items,
  limit,
}: {
  items: PortfolioItem[];
  limit?: number;
}) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visibleItems.map((item) => (
        <PortfolioCard key={item.name} item={item} />
      ))}
    </div>
  );
}
