import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/types";

export function FeaturedProducts({ onQuickView }: { onQuickView: (p: Product) => void }) {
  const items = getFeaturedProducts().slice(0, 4);

  return (
    <section className="bg-paper-dim py-24 sm:py-32">
      <div className="container-meridian">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow="Editor's Picks" title="Featured Pieces" className="max-w-md" />
          <Link to="/shop?filter=featured" className="link-underline text-xs uppercase tracking-[0.1em] font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>
      </div>
    </section>
  );
}
