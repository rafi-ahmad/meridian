import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import type { Product } from "@/types";
import { cn } from "@/lib/utils";

const categories = ["outerwear", "knitwear", "dresses", "bags", "trousers", "shirts"] as const;
const genders = ["women", "men", "unisex"] as const;
type SortKey = "featured" | "price-asc" | "price-desc" | "newest";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const activeCategory = searchParams.get("category");
  const activeGender = searchParams.get("gender");
  const activeFilter = searchParams.get("filter");

  const filtered = useMemo(() => {
    let list = [...products];
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (activeGender) list = list.filter((p) => p.gender === activeGender || p.gender === "unisex");
    if (activeFilter === "new") list = list.filter((p) => p.isNew);
    if (activeFilter === "featured") list = list.filter((p) => p.featured);
    if (activeFilter === "best-sellers") list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        list.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [activeCategory, activeGender, activeFilter, sort]);

  const visible = filtered.slice(0, visibleCount);

  const toggleParam = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (next.get(key) === value) next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
    setVisibleCount(8);
  };

  const clearFilters = () => {
    setSearchParams({});
    setVisibleCount(8);
  };

  const heading =
    activeGender === "women"
      ? "Women"
      : activeGender === "men"
      ? "Men"
      : activeFilter === "new"
      ? "New Arrivals"
      : activeFilter === "featured"
      ? "Editor's Picks"
      : "Shop All";

  return (
    <div className="container-meridian py-10 sm:py-14">
      <div className="mb-10 flex flex-col gap-2">
        <p className="eyebrow">{filtered.length} Products</p>
        <h1 className="text-4xl sm:text-5xl">{heading}</h1>
      </div>

      <div className="mb-8 flex items-center justify-between border-y border-line py-4">
        <button
          onClick={() => setFiltersOpen((o) => !o)}
          className="flex items-center gap-2 text-xs uppercase tracking-[0.1em]"
        >
          <SlidersHorizontal size={15} strokeWidth={1.5} />
          Filter
          {(activeCategory || activeGender || activeFilter) && (
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-paper">
              {[activeCategory, activeGender, activeFilter].filter(Boolean).length}
            </span>
          )}
        </button>

        <div className="relative">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="appearance-none bg-transparent pr-6 text-xs uppercase tracking-[0.1em] outline-none"
            aria-label="Sort products"
          >
            <option value="featured">Sort: Featured</option>
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-0 top-1" />
        </div>
      </div>

      {filtersOpen && (
        <div className="mb-10 flex flex-wrap items-start gap-x-10 gap-y-6 border-b border-line pb-8">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.1em] text-charcoal/50">Gender</p>
            <div className="flex flex-wrap gap-2">
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => toggleParam("gender", g)}
                  className={cn(
                    "border px-4 py-2 text-xs uppercase tracking-[0.06em] capitalize",
                    activeGender === g ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                  )}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.1em] text-charcoal/50">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => toggleParam("category", c)}
                  className={cn(
                    "border px-4 py-2 text-xs uppercase tracking-[0.06em] capitalize",
                    activeCategory === c ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          {(activeCategory || activeGender || activeFilter) && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 self-end text-xs uppercase tracking-[0.1em] text-charcoal/50"
            >
              <X size={13} /> Clear All
            </button>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <p className="font-display text-2xl">No products match these filters</p>
          <button onClick={clearFilters} className="link-underline text-sm">
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
            {visible.map((product, i) => (
              <ProductCard key={product.id} product={product} onQuickView={setQuickView} priority={i < 4} />
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div className="mt-14 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => c + 8)}
                className="border border-ink px-8 py-3.5 text-xs uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper"
              >
                Load More ({filtered.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
