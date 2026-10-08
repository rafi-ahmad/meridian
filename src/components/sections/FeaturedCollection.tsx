import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/collections";

export function FeaturedCollection() {
  const collection = collections[0];

  return (
    <section className="relative">
      <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
        <img
          src={collection.heroImage}
          alt={collection.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="container-meridian absolute inset-x-0 bottom-12 flex flex-col items-start gap-5 text-paper sm:bottom-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[11px] uppercase tracking-[0.3em]"
          >
            {collection.season} Collection
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-lg text-5xl leading-[1.02] sm:text-6xl"
          >
            {collection.title}
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              to={`/collection/${collection.slug}`}
              className="group inline-flex items-center gap-2 border-b border-paper pb-1 text-sm uppercase tracking-[0.1em]"
            >
              Discover the Collection
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
