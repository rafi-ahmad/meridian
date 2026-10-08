import { useState } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=600&auto=format&fit=crop",
];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="bg-ink py-24 text-paper sm:py-32">
      <div className="container-meridian flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-4 text-paper/60"
        >
          Stay Connected
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mb-4 max-w-lg text-4xl sm:text-5xl"
        >
          Join the Meridian list.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8 max-w-sm text-paper/70"
        >
          Be first to know about new arrivals, limited capsules and private sale access.
        </motion.p>

        {submitted ? (
          <p className="text-sm">You're on the list — welcome to Meridian.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSubmitted(true);
            }}
            className="flex w-full max-w-md items-center border-b border-paper/40 pb-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-transparent text-sm outline-none placeholder:text-paper/40"
            />
            <button type="submit" className="shrink-0 text-xs uppercase tracking-[0.12em]">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function InstagramGallery() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-meridian mb-10 flex items-end justify-between">
        <div>
          <p className="eyebrow mb-4">Follow Along</p>
          <h2 className="text-3xl sm:text-4xl">@meridian on Instagram</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 sm:gap-2 md:grid-cols-6">
        {galleryImages.map((img, i) => (
          <a
            key={i}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="img-hover-zoom aspect-square overflow-hidden bg-paper-dim"
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </a>
        ))}
      </div>
    </section>
  );
}
