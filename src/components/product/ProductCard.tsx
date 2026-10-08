import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export function ProductCard({ product, onQuickView, priority }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const { toggle, has } = useWishlist();
  const { addToCart } = useCart();
  const wished = has(product.id);
  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      color: product.colors[0].name,
      size: product.sizes[Math.min(1, product.sizes.length - 1)],
      quantity: 1,
    });
  };

  return (
    <div
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="img-hover-zoom relative aspect-[3/4] bg-paper-dim">
          <img
            src={product.images[0]}
            alt={product.name}
            loading={priority ? "eager" : "lazy"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
              hovered && product.images[1] ? "opacity-0" : "opacity-100"
            )}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt=""
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                hovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-paper">
                New
              </span>
            )}
            {onSale && (
              <span className="bg-sale px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-paper">
                Sale
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-paper/90 backdrop-blur transition-colors hover:bg-paper"
          >
            <Heart size={16} strokeWidth={1.5} className={cn(wished && "fill-ink")} />
          </button>

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex translate-y-2 gap-2 p-3 opacity-0 transition-all duration-300",
              "sm:group-hover:translate-y-0 sm:group-hover:opacity-100"
            )}
          >
            <button
              onClick={handleQuickAdd}
              className="flex flex-1 items-center justify-center gap-2 bg-ink py-3 text-[11px] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-charcoal"
            >
              <ShoppingBag size={14} strokeWidth={1.5} />
              Quick Add
            </button>
            {onQuickView && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(product);
                }}
                aria-label="Quick view"
                className="flex h-11 w-11 items-center justify-center bg-paper/95 backdrop-blur transition-colors hover:bg-paper"
              >
                <Eye size={16} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </Link>

      <Link to={`/product/${product.slug}`} className="mt-3.5 flex flex-col gap-1">
        <h3 className="text-[13.5px] font-medium leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2 text-[13px]">
          <span className={cn(onSale && "text-sale")}>{formatPrice(product.price)}</span>
          {onSale && (
            <span className="text-charcoal/40 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
}
