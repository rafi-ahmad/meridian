import { motion } from "framer-motion";

const stats = [
  { value: "2014", label: "Founded in Lisbon" },
  { value: "38", label: "Countries Shipped To" },
  { value: "92%", label: "Materials Responsibly Sourced" },
];

export function BrandStory() {
  return (
    <section className="container-meridian grid grid-cols-1 gap-16 py-24 sm:py-32 lg:grid-cols-2 lg:gap-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col justify-center"
      >
        <p className="eyebrow mb-4">Our Story</p>
        <h2 className="mb-6 text-4xl leading-[1.08] sm:text-5xl">
          Precisely curated, made to last.
        </h2>
        <p className="mb-6 max-w-md text-charcoal/70 leading-relaxed">
          Meridian began as a single tailoring atelier in Lisbon, built on the belief that
          fashion doesn't need to be disposable to be desirable. Today we work with a small
          group of family-run mills and factories across Portugal, Italy and Scotland — each
          chosen for craft, not scale.
        </p>
        <p className="max-w-md text-charcoal/70 leading-relaxed">
          Every collection is planned in smaller runs, released seasonally, and designed to
          outlast the trends that inspired it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="img-hover-zoom relative aspect-[4/5] overflow-hidden bg-paper-dim"
      >
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200&auto=format&fit=crop"
          alt="Meridian atelier"
          className="h-full w-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 divide-x divide-paper/20 bg-ink/85 backdrop-blur">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-5 text-center text-paper">
              <p className="font-display text-2xl">{s.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-paper/70">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
