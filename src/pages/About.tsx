import { motion } from "framer-motion";
import { BrandStory } from "@/components/sections/BrandStory";

export default function About() {
  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1800&auto=format&fit=crop"
          alt="The Meridian atelier"
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="container-meridian relative z-10 pb-14 text-paper">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-5xl leading-[1.02] sm:text-7xl"
          >
            Modern fashion, precisely curated.
          </motion.h1>
        </div>
      </section>

      <BrandStory />

      <section className="container-meridian grid grid-cols-1 gap-8 border-t border-line py-20 sm:grid-cols-3 sm:py-28">
        {[
          {
            title: "Craft",
            body: "Every piece is developed with mills and ateliers chosen for technical skill, not scale — many family-run for generations.",
          },
          {
            title: "Considered Pace",
            body: "We release two core collections a year and a small number of capsules, rather than chasing constant novelty.",
          },
          {
            title: "Longevity",
            body: "Meridian pieces are designed to be repaired, re-worn and passed on — built to outlast trend cycles.",
          },
        ].map((item) => (
          <div key={item.title}>
            <h3 className="mb-3 text-2xl">{item.title}</h3>
            <p className="text-sm leading-relaxed text-charcoal/70">{item.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
