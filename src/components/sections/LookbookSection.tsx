import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { lookbookLooks } from "@/data/collections";

export function LookbookSection() {
  const looks = lookbookLooks.slice(0, 3);

  return (
    <section className="container-meridian py-24 sm:py-32">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-4">The Lookbook</p>
          <h2 className="max-w-md text-4xl sm:text-5xl leading-[1.05]">Styled for the Season</h2>
        </div>
        <Link to="/lookbook" className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-medium">
          Full Lookbook
          <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        {looks.map((look, i) => (
          <motion.div
            key={look.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link to="/lookbook" className="img-hover-zoom relative block aspect-[3/4] overflow-hidden bg-paper-dim">
              <img src={look.image} alt={look.title} className="h-full w-full object-cover" />
              <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.1em] text-paper mix-blend-difference">
                {look.title}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
