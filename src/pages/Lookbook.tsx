import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ArrowRight } from "lucide-react";
import { lookbookLooks } from "@/data/collections";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function Lookbook() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { addToCart, openCart } = useCart();

  return (
    <div>
      <section className="container-meridian flex flex-col items-center gap-4 py-16 text-center sm:py-24">
        <p className="eyebrow">Autumn / Winter 2026</p>
        <h1 className="max-w-2xl text-5xl leading-[1.02] sm:text-7xl">The Lookbook</h1>
        <p className="max-w-md text-charcoal/70">
          An editorial study in layering, silhouette and considered materials. Tap any look to
          shop the pieces.
        </p>
      </section>

      <div className="flex flex-col gap-8 pb-24 sm:gap-12">
        {lookbookLooks.map((look, index) => (
          <motion.section
            key={look.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="container-meridian"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-dim sm:aspect-[16/9]">
              <img src={look.image} alt={look.title} className="h-full w-full object-cover" />

              {look.hotspots.map((spot) => {
                const product = getProductById(spot.productId);
                if (!product) return null;
                const spotId = `${look.id}-${spot.productId}`;
                const isActive = activeHotspot === spotId;

                return (
                  <div
                    key={spotId}
                    className="absolute"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <button
                      onClick={() => setActiveHotspot(isActive ? null : spotId)}
                      aria-label={`Shop ${product.name}`}
                      className="relative flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 shadow-lg backdrop-blur transition-transform hover:scale-110"
                    >
                      <span className="absolute h-full w-full animate-ping rounded-full bg-paper/60" />
                      {isActive ? <X size={15} /> : <Plus size={15} />}
                    </button>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 top-full z-10 mt-2 w-56 -translate-x-1/2 bg-paper p-4 text-left shadow-xl"
                        >
                          <div className="flex gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-16 w-12 shrink-0 object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium leading-snug">{product.name}</p>
                              <p className="text-sm text-charcoal/60">{formatPrice(product.price)}</p>
                            </div>
                          </div>
                          <div className="mt-3 flex gap-2">
                            <button
                              onClick={() => {
                                addToCart({
                                  productId: product.id,
                                  color: product.colors[0].name,
                                  size: product.sizes[Math.min(1, product.sizes.length - 1)],
                                  quantity: 1,
                                });
                                openCart();
                                setActiveHotspot(null);
                              }}
                              className="flex-1 bg-ink py-2 text-[10px] uppercase tracking-[0.08em] text-paper"
                            >
                              Quick Add
                            </button>
                            <Link
                              to={`/product/${product.slug}`}
                              className="flex-1 border border-line py-2 text-center text-[10px] uppercase tracking-[0.08em]"
                            >
                              View
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 font-display text-xl">
              {String(index + 1).padStart(2, "0")} — {look.title.split("—")[1]?.trim() ?? look.title}
            </p>
          </motion.section>
        ))}
      </div>

      <section className="border-t border-line py-20 text-center">
        <Link
          to="/shop"
          className="group inline-flex items-center gap-2 text-sm uppercase tracking-[0.1em] font-medium"
        >
          Shop the Full Collection
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </section>
    </div>
  );
}
