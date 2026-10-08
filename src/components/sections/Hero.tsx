import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative flex h-[92vh] min-h-[560px] w-full items-end overflow-hidden bg-ink">
      <motion.img
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2000&auto=format&fit=crop"
        alt="Model wearing the Meridian Autumn Winter 2026 collection"
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0 h-full w-full object-cover object-[center_20%] opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/10" />

      <div className="container-meridian relative z-10 flex w-full flex-col gap-8 pb-16 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="text-[11px] uppercase tracking-[0.3em] text-paper/70"
        >
          Autumn / Winter 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease }}
          className="max-w-3xl text-[13vw] leading-[0.94] text-paper sm:text-6xl lg:text-[6.4rem]"
        >
          The New Standard of Everyday Luxury
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
          className="max-w-md text-sm leading-relaxed text-paper/80 sm:text-base"
        >
          Contemporary silhouettes, refined materials and timeless pieces designed for the modern
          wardrobe.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0, ease }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/shop">
            <Button size="lg" className="bg-paper text-ink hover:bg-white">
              Shop Collection
            </Button>
          </Link>
          <Link to="/lookbook">
            <Button
              size="lg"
              variant="outline"
              className="border-paper/50 text-paper hover:border-paper hover:bg-paper/10"
            >
              Explore Lookbook
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-6 right-6 hidden text-[10px] uppercase tracking-[0.2em] text-paper/60 sm:block"
      >
        Scroll to Explore
      </motion.div>
    </section>
  );
}
