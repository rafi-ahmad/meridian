import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Search as SearchIcon } from "lucide-react";
import { useUI } from "@/context/UIContext";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

const popularSearches = ["Cashmere Knit", "Wool Coat", "Leather Bag", "Wide-Leg Trouser"];

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    if (!isSearchOpen) setQuery("");
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeSearch]);

  const results = useMemo(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.includes(q) ||
        p.tags.some((t) => t.includes(q))
    );
  }, [query]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    []
  );

  const handleSelect = (term: string) => {
    setRecent((prev) => [term, ...prev.filter((r) => r !== term)].slice(0, 5));
    setQuery(term);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex flex-col bg-paper"
          role="dialog"
          aria-label="Search"
        >
          <div className="container-meridian flex items-center gap-4 border-b border-line py-6">
            <SearchIcon size={22} strokeWidth={1.3} className="text-charcoal/50" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for products, collections..."
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-charcoal/30 sm:text-4xl"
            />
            <button onClick={closeSearch} aria-label="Close search" className="shrink-0">
              <X size={24} strokeWidth={1.3} />
            </button>
          </div>

          <div className="container-meridian flex-1 overflow-y-auto py-10">
            {query.trim().length < 2 ? (
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="eyebrow mb-4">Popular Searches</h3>
                  <ul className="flex flex-col gap-3">
                    {popularSearches.map((term) => (
                      <li key={term}>
                        <button
                          onClick={() => handleSelect(term)}
                          className="link-underline text-lg"
                        >
                          {term}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                {recent.length > 0 && (
                  <div>
                    <h3 className="eyebrow mb-4">Recent Searches</h3>
                    <ul className="flex flex-col gap-3">
                      {recent.map((term) => (
                        <li key={term}>
                          <button
                            onClick={() => handleSelect(term)}
                            className="link-underline text-lg"
                          >
                            {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <h3 className="eyebrow mb-4">Categories</h3>
                  <ul className="flex flex-wrap gap-2">
                    {categories.map((c) => (
                      <li key={c}>
                        <Link
                          to={`/shop?category=${c}`}
                          onClick={closeSearch}
                          className="border border-line px-4 py-2 text-xs uppercase tracking-[0.08em] hover:border-ink"
                        >
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="flex flex-col items-center gap-3 py-20 text-center">
                <p className="font-display text-2xl">No results for “{query}”</p>
                <p className="text-charcoal/60">Try checking your spelling or use a more general term.</p>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-charcoal/50">
                  {results.length} result{results.length !== 1 && "s"}
                </p>
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.slug}`}
                      onClick={closeSearch}
                      className="group"
                    >
                      <div className="img-hover-zoom aspect-[3/4] bg-paper-dim">
                        <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
                      </div>
                      <p className="mt-3 text-sm font-medium">{p.name}</p>
                      <p className="text-sm text-charcoal/60">{formatPrice(p.price)}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
