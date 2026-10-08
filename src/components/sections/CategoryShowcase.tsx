import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const categories = [
  {
    label: "Outerwear",
    href: "/shop?category=outerwear",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1000&auto=format&fit=crop",
  },
  {
    label: "Knitwear",
    href: "/shop?category=knitwear",
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1000&auto=format&fit=crop",
  },
  {
    label: "Bags & Accessories",
    href: "/shop?category=bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    label: "Tailoring",
    href: "/shop?category=trousers",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
  },
];

export function CategoryShowcase() {
  return (
    <section className="bg-paper-dim py-24 sm:py-32">
      <div className="container-meridian">
        <SectionHeading eyebrow="Shop By Category" title="Find Your Silhouette" className="mb-12" />
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <Link to={cat.href} className="group block">
                <div className="img-hover-zoom relative aspect-[3/4] overflow-hidden bg-paper">
                  <img src={cat.image} alt={cat.label} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
                </div>
                <p className="mt-4 text-sm font-medium uppercase tracking-[0.06em]">{cat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
