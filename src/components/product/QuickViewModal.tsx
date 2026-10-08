import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ColorSelector, SizeSelector } from "@/components/product/Selectors";

export function QuickViewModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const [color, setColor] = useState(product?.colors[0]?.name ?? "");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (product) {
      setColor(product.colors[0]?.name ?? "");
      setSize("");
    }
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-black/40"
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label={`Quick view — ${product.name}`}
            className="fixed inset-x-4 top-1/2 z-[80] mx-auto grid max-h-[88vh] max-w-3xl -translate-y-1/2 grid-cols-1 overflow-y-auto bg-paper shadow-2xl sm:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-paper/90"
            >
              <X size={18} />
            </button>
            <div className="aspect-[3/4] bg-paper-dim">
              <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col gap-5 p-6 sm:p-8">
              <div>
                <h3 className="font-display text-2xl">{product.name}</h3>
                <p className="mt-1 text-base">{formatPrice(product.price)}</p>
              </div>
              <p className="text-sm leading-relaxed text-charcoal/70">{product.description}</p>
              <ColorSelector colors={product.colors} selected={color} onSelect={setColor} />
              <SizeSelector sizes={product.sizes} selected={size} onSelect={setSize} />
              <div className="mt-2 flex flex-col gap-3">
                <Button
                  disabled={!size}
                  onClick={() => {
                    addToCart({ productId: product.id, color, size, quantity: 1 });
                    onClose();
                  }}
                >
                  Add to Cart
                </Button>
                <Link
                  to={`/product/${product.slug}`}
                  onClick={onClose}
                  className="link-underline text-center text-xs uppercase tracking-[0.1em] text-charcoal/60"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
