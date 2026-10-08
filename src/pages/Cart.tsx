import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";

export default function Cart() {
  const { lines, removeLine, updateQuantity, subtotal } = useCart();
  const threshold = siteConfig.store.freeShippingThreshold;
  const progress = Math.min(100, (subtotal / threshold) * 100);
  const remaining = Math.max(0, threshold - subtotal);
  const estimatedShipping = subtotal >= threshold || subtotal === 0 ? 0 : 12;
  const estimatedTax = Math.round(subtotal * 0.0825);
  const total = subtotal + estimatedShipping + estimatedTax;

  if (lines.length === 0) {
    return (
      <div className="container-meridian flex flex-col items-center gap-6 py-32 text-center">
        <ShoppingBag size={48} strokeWidth={1} className="text-charcoal/30" />
        <h1 className="text-3xl">Your bag is empty</h1>
        <p className="max-w-sm text-charcoal/60">
          Looks like you haven't added anything yet. Explore the new arrivals to find your next
          favorite piece.
        </p>
        <Link to="/shop">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-meridian py-10 sm:py-14">
      <h1 className="mb-2 text-4xl sm:text-5xl">Your Bag</h1>
      <p className="mb-10 text-charcoal/60">{lines.length} item{lines.length !== 1 && "s"}</p>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <div className="mb-8 border-b border-line pb-6">
            <div className="mb-2 h-[2px] w-full bg-line">
              <div className="h-full bg-ink transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-charcoal/60">
              {remaining > 0
                ? `Add ${formatPrice(remaining)} more for free shipping`
                : "You've unlocked free shipping!"}
            </p>
          </div>

          <ul className="flex flex-col divide-y divide-line">
            {lines.map((line) => {
              const product = getProductById(line.productId);
              if (!product) return null;
              const color = product.colors.find((c) => c.name === line.color);
              return (
                <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-5 py-6">
                  <Link to={`/product/${product.slug}`} className="h-36 w-28 shrink-0 overflow-hidden bg-paper-dim">
                    <img src={color?.image ?? product.images[0]} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${product.slug}`} className="text-base font-medium">
                          {product.name}
                        </Link>
                        <p className="mt-1 text-sm text-charcoal/50">
                          {line.color} / {line.size}
                        </p>
                      </div>
                      <span className="text-base">{formatPrice(product.price * line.quantity)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button
                          className="flex h-9 w-9 items-center justify-center"
                          onClick={() => updateQuantity(line.productId, line.color, line.size, line.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button
                          className="flex h-9 w-9 items-center justify-center"
                          onClick={() => updateQuantity(line.productId, line.color, line.size, line.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeLine(line.productId, line.color, line.size)}
                        className="link-underline text-xs uppercase tracking-[0.08em] text-charcoal/50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <Link to="/shop" className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em]">
            <ArrowLeft size={14} /> Continue Shopping
          </Link>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-paper-dim p-6">
            <h2 className="mb-5 text-sm uppercase tracking-[0.1em]">Order Summary</h2>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-charcoal/60">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Shipping</span>
                <span>{estimatedShipping === 0 ? "Free" : formatPrice(estimatedShipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-charcoal/60">Estimated Tax</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-between border-t border-line pt-5 text-base font-medium">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button
              size="lg"
              className="mt-6 w-full"
              onClick={() => alert("This is a demo theme — checkout is not connected to a payment provider.")}
            >
              Proceed to Checkout
            </Button>
            <p className="mt-4 text-center text-xs text-charcoal/50">
              Taxes and shipping calculated at checkout. Free returns within 30 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
