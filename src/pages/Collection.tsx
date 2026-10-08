import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCollectionBySlug, collections } from "@/data/collections";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

export default function Collection() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const collection = slug ? getCollectionBySlug(slug) : undefined;
  const [quickView, setQuickView] = useState<Product | null>(null);

  if (!collection) {
    return (
      <div className="container-meridian flex flex-col items-center gap-4 py-32 text-center">
        <p className="font-display text-3xl">Collection not found</p>
        <button onClick={() => navigate("/shop")} className="link-underline text-sm">
          Return to Shop
        </button>
      </div>
    );
  }

  const collectionProducts = collection.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const other = collections.filter((c) => c.id !== collection.id);

  return (
    <div>
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-ink">
        <img src={collection.heroImage} alt={collection.title} className="h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="container-meridian absolute inset-x-0 bottom-14 text-paper">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.3em]"
          >
            {collection.season}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 max-w-2xl text-5xl leading-[1.02] sm:text-7xl"
          >
            {collection.title}
          </motion.h1>
        </div>
      </section>

      <section className="container-meridian grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">Introduction</p>
          <p className="text-2xl leading-snug sm:text-3xl">{collection.description}</p>
        </div>
        <div className="img-hover-zoom overflow-hidden bg-paper-dim lg:col-span-6 lg:col-start-7">
          <img src={collection.introImage} alt="" className="aspect-[4/3] w-full object-cover" />
        </div>
      </section>

      <section className="container-meridian pb-20 sm:pb-28">
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {collectionProducts.slice(0, 2).map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={i === 1 ? "sm:mt-16" : ""}
            >
              <ProductCard product={p} onQuickView={setQuickView} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-4 sm:gap-x-6">
          {collectionProducts.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      <section className="relative flex h-[60vh] min-h-[380px] items-center justify-center overflow-hidden bg-charcoal text-center text-paper">
        <img
          src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-50"
        />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6">
          <h2 className="max-w-xl text-4xl sm:text-5xl">Explore the Full Collection</h2>
          <Link to="/shop">
            <Button size="lg" className="bg-paper text-ink hover:bg-white">
              Shop All Products
            </Button>
          </Link>
        </div>
      </section>

      {other.length > 0 && (
        <section className="container-meridian py-20 sm:py-28">
          <p className="eyebrow mb-4">More to Explore</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {other.map((c) => (
              <Link key={c.id} to={`/collection/${c.slug}`} className="img-hover-zoom group relative block aspect-[16/10] overflow-hidden bg-paper-dim">
                <img src={c.heroImage} alt={c.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
                <div className="absolute bottom-6 left-6 text-paper">
                  <p className="text-xs uppercase tracking-[0.2em]">{c.season}</p>
                  <p className="font-display text-2xl">{c.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </div>
  );
}
