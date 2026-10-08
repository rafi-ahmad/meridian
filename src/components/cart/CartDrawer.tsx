import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/data/site-config";
import { Button } from "@/components/ui/Button";

export function CartDrawer() {
  const { isOpen, closeCart, lines, removeLine, updateQuantity, subtotal } = useCart();
  const threshold = siteConfig.store.freeShippingThreshold;
  const progress = Math.min(100, (subtotal / threshold) * 100);
  const remaining = Math.max(0, threshold - subtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-black/40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="text-sm uppercase tracking-[0.12em]">
                Your Bag {lines.length > 0 && `(${lines.length})`}
              </h2>
              <button onClick={closeCart} aria-label="Close cart">
                <X size={20} strokeWidth={1.4} />
              </button>
            </div>

            {lines.length > 0 && (
              <div className="border-b border-line px-6 py-4">
                <div className="mb-2 h-[2px] w-full bg-line">
                  <div
                    className="h-full bg-ink transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-charcoal/60">
                  {remaining > 0
                    ? `Add ${formatPrice(remaining)} more for free shipping`
                    : "You've unlocked free shipping!"}
                </p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {lines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-charcoal/30" />
                  <p className="text-charcoal/60">Your bag is empty.</p>
                  <Button variant="outline" size="sm" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="flex flex-col divide-y divide-line">
                  {lines.map((line) => {
                    const product = getProductById(line.productId);
                    if (!product) return null;
                    const color = product.colors.find((c) => c.name === line.color);
                    return (
                      <li key={`${line.productId}-${line.color}-${line.size}`} className="flex gap-4 py-5">
                        <Link
                          to={`/product/${product.slug}`}
                          onClick={closeCart}
                          className="h-28 w-22 shrink-0 overflow-hidden bg-paper-dim"
                        >
                          <img
                            src={color?.image ?? product.images[0]}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </Link>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <Link to={`/product/${product.slug}`} onClick={closeCart} className="text-sm font-medium">
                                {product.name}
                              </Link>
                              <span className="text-sm">{formatPrice(product.price * line.quantity)}</span>
                            </div>
                            <p className="mt-1 text-xs text-charcoal/50">
                              {line.color} / {line.size}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-line">
                              <button
                                className="flex h-8 w-8 items-center justify-center"
                                onClick={() =>
                                  updateQuantity(line.productId, line.color, line.size, line.quantity - 1)
                                }
                                aria-label="Decrease quantity"
                              >
                                <Minus size={13} />
                              </button>
                              <span className="w-6 text-center text-sm">{line.quantity}</span>
                              <button
                                className="flex h-8 w-8 items-center justify-center"
                                onClick={() =>
                                  updateQuantity(line.productId, line.color, line.size, line.quantity + 1)
                                }
                                aria-label="Increase quantity"
                              >
                                <Plus size={13} />
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
              )}
            </div>

            {lines.length > 0 && (
              <div className="border-t border-line px-6 py-6">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-charcoal/60">Subtotal</span>
                  <span className="text-base font-medium">{formatPrice(subtotal)}</span>
                </div>
                <p className="mb-4 text-xs text-charcoal/50">
                  Shipping and taxes calculated at checkout.
                </p>
                <Link to="/cart" onClick={closeCart}>
                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
