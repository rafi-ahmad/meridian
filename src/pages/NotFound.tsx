import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";

export default function NotFound() {
  const suggestions = getFeaturedProducts().slice(0, 4);

  return (
    <div className="container-meridian flex flex-col items-center py-24 text-center sm:py-32">
      <p className="font-display text-[8rem] leading-none text-charcoal/15 sm:text-[11rem]">404</p>
      <h1 className="-mt-6 text-3xl sm:text-4xl">This page has wandered off</h1>
      <p className="mt-3 max-w-sm text-charcoal/60">
        The page you're looking for doesn't exist or may have been moved. Let's get you back to
        something beautiful.
      </p>
      <Link to="/" className="mt-8">
        <Button size="lg">Return Home</Button>
      </Link>

      {suggestions.length > 0 && (
        <div className="mt-24 w-full text-left">
          <p className="eyebrow mb-8 text-center">You Might Like</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4">
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
