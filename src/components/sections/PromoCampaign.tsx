import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function PromoCampaign() {
  return (
    <section className="relative h-[70vh] min-h-[440px] w-full overflow-hidden bg-charcoal">
      <img
        src="https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1800&auto=format&fit=crop"
        alt="Studio Edit campaign"
        className="h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center text-paper">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.3em]"
        >
          Limited Capsule
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-4xl leading-tight sm:text-6xl"
        >
          The Studio Edit — Tailoring, Reconsidered
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link to="/collection/studio-edit">
            <Button size="lg" className="bg-paper text-ink hover:bg-white">
              Shop the Capsule
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
