import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Heart, Truck, RotateCcw, Star } from "lucide-react";
import { getProductBySlug, getRelatedProducts, products } from "@/data/products";
import { formatPrice, cn } from "@/lib/utils";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ColorSelector, SizeSelector } from "@/components/product/Selectors";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import type { Product as ProductType } from "@/types";

const RECENTLY_VIEWED_KEY = "meridian_recently_viewed";

export default function Product() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart } = useCart();
  const { toggle, has } = useWishlist();
  const [quickView, setQuickView] = useState<ProductType | null>(null);
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [sizeError, setSizeError] = useState(false);

  const [color, setColor] = useState(product?.colors[0]?.name ?? "");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!product) return;
    setColor(product.colors[0]?.name ?? "");
    setSize("");
    setQuantity(1);
    setSizeError(false);
    window.scrollTo(0, 0);

    let stored: string[] = [];
    try {
      stored = JSON.parse(sessionStorage.getItem(RECENTLY_VIEWED_KEY) ?? "[]");
    } catch {
      stored = [];
    }
    const next = [product.id, ...stored.filter((id) => id !== product.id)].slice(0, 4);
    sessionStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next));
    setRecentIds(next.filter((id) => id !== product.id));
  }, [product]);

  if (!product) {
    return (
      <div className="container-meridian flex flex-col items-center gap-4 py-32 text-center">
        <p className="font-display text-3xl">Product not found</p>
        <button onClick={() => navigate("/shop")} className="link-underline text-sm">
          Return to Shop
        </button>
      </div>
    );
  }

  const onSale = product.compareAtPrice && product.compareAtPrice > product.price;
  const related = getRelatedProducts(product);
  const recentlyViewed = recentIds.map((id) => products.find((p) => p.id === id)).filter(Boolean) as ProductType[];
  const wished = has(product.id);

  const handleAddToCart = (buyNow = false) => {
    if (!size) {
      setSizeError(true);
      return;
    }
    addToCart({ productId: product.id, color, size, quantity });
    if (buyNow) navigate("/cart");
  };

  return (
    <div className="container-meridian py-8 sm:py-12">
      <nav className="mb-8 flex gap-2 text-xs text-charcoal/50">
        <Link to="/" className="hover:text-ink">Home</Link> /
        <Link to="/shop" className="hover:text-ink">Shop</Link> /
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} name={product.name} />

        <div className="flex flex-col gap-6 lg:max-w-lg">
          <div>
            <p className="eyebrow mb-3">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className={cn("text-xl", onSale && "text-sale")}>{formatPrice(product.price)}</span>
              {onSale && (
                <span className="text-charcoal/40 line-through">{formatPrice(product.compareAtPrice!)}</span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-charcoal/60">
              <div className="flex text-ink">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={i < Math.round(product.rating) ? "fill-ink" : ""}
                    strokeWidth={1.2}
                  />
                ))}
              </div>
              <span className="text-xs">({product.reviewCount} reviews)</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-charcoal/70">{product.description}</p>

          <ColorSelector colors={product.colors} selected={color} onSelect={setColor} />

          <SizeSelector
            sizes={product.sizes}
            selected={size}
            onSelect={(s) => {
              setSize(s);
              setSizeError(false);
            }}
            onOpenGuide={() => alert("Size guide coming soon.")}
          />
          {sizeError && <p className="-mt-3 text-xs text-sale">Please select a size to continue.</p>}

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-line">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-12 w-12 items-center justify-center text-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-12 w-12 items-center justify-center text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button
              onClick={() => toggle(product.id)}
              aria-pressed={wished}
              className="flex h-12 flex-1 items-center justify-center gap-2 border border-line text-xs uppercase tracking-[0.1em] transition-colors hover:border-ink"
            >
              <Heart size={15} className={cn(wished && "fill-ink")} />
              {wished ? "Saved" : "Add to Wishlist"}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" onClick={() => handleAddToCart(false)}>
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" onClick={() => handleAddToCart(true)}>
              Buy It Now
            </Button>
          </div>

          <div className="flex flex-col gap-3 border-y border-line py-5 text-xs text-charcoal/60">
            <div className="flex items-center gap-2">
              <Truck size={15} strokeWidth={1.4} />
              <span>{product.shipping}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={15} strokeWidth={1.4} />
              <span>{product.returns}</span>
            </div>
          </div>

          <Accordion>
            <AccordionItem title="Product Details" defaultOpen>
              <ul className="flex flex-col gap-1.5">
                {product.details.map((d) => (
                  <li key={d}>— {d}</li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Materials & Care">
              <ul className="flex flex-col gap-1.5">
                {product.materials.map((m) => (
                  <li key={m}>— {m}</li>
                ))}
              </ul>
            </AccordionItem>
            <AccordionItem title="Shipping & Returns">
              <p className="mb-2">{product.shipping}</p>
              <p>{product.returns}</p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-16 sm:mt-32">
          <h2 className="mb-10 text-3xl sm:text-4xl">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section className="mt-24 border-t border-line pt-16 sm:mt-32">
          <h2 className="mb-10 text-3xl sm:text-4xl">Recently Viewed</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
            {recentlyViewed.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
            ))}
          </div>
        </section>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
