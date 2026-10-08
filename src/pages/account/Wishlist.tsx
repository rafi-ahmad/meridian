import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import type { Product } from "@/types";
import { Button } from "@/components/ui/Button";

export default function Wishlist() {
  const { ids } = useWishlist();
  const [quickView, setQuickView] = useState<Product | null>(null);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div>
      <h1 className="mb-8 text-3xl sm:text-4xl">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-4 border border-line py-20 text-center">
          <Heart size={36} strokeWidth={1} className="text-charcoal/30" />
          <p className="text-charcoal/60">You haven't saved anything yet.</p>
          <Link to="/shop">
            <Button variant="outline" size="sm">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={setQuickView} />
          ))}
        </div>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
