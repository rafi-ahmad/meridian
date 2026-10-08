import { Link } from "react-router-dom";
import { getNewProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function NewArrivals({ onQuickView }: { onQuickView: (p: import("@/types").Product) => void }) {
  const items = getNewProducts();

  return (
    <section className="container-meridian py-24 sm:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <SectionHeading eyebrow="Just In" title="New Arrivals" className="max-w-md" />
        <Link
          to="/shop?filter=new"
          className="link-underline text-xs uppercase tracking-[0.1em] font-medium"
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
        {items.map((product, i) => (
          <ProductCard key={product.id} product={product} onQuickView={onQuickView} priority={i < 2} />
        ))}
      </div>
    </section>
  );
}
