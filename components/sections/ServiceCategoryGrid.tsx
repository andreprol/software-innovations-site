import type { ServiceCategory } from "@/lib/content/services";
import ServiceCategoryCard from "./ServiceCategoryCard";

export default function ServiceCategoryGrid({
  categories,
  limit,
}: {
  categories: ServiceCategory[];
  limit?: number;
}) {
  const visibleCategories =
    typeof limit === "number" ? categories.slice(0, limit) : categories;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {visibleCategories.map((category) => (
        <ServiceCategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
