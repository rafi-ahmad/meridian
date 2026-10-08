import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function EditorialSection() {
  return (
    <section className="container-meridian py-24 sm:py-32">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="img-hover-zoom relative col-span-7 aspect-[4/5] overflow-hidden bg-paper-dim"
        >
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop"
            alt="Editorial fashion campaign image"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div className="relative col-span-5 col-start-8 -mt-16 lg:mt-24">
          <SectionHeading
            eyebrow="The Editorial"
            title="Design Built on Restraint"
            description="Every Meridian piece begins with a single question: does it earn its place in the wardrobe? We remove what isn't essential — leaving considered silhouettes, honest materials, and details that reveal themselves slowly."
          />
          <Link
            to="/about"
            className="link-underline mt-6 inline-block text-xs uppercase tracking-[0.1em] font-medium"
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  );
}
