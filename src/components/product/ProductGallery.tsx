import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row lg:sticky lg:top-28 lg:self-start">
      <div className="flex shrink-0 gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img + i}
            onClick={() => setActive(i)}
            className={cn(
              "h-20 w-16 shrink-0 overflow-hidden border transition-colors sm:h-24 sm:w-20",
              active === i ? "border-ink" : "border-transparent opacity-60 hover:opacity-100"
            )}
            aria-label={`View image ${i + 1}`}
          >
            <img src={img} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>

      <div
        className="relative flex-1 overflow-hidden bg-paper-dim"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${name} — view ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              "aspect-[3/4] w-full object-cover transition-transform duration-500",
              zoom && "scale-[1.08]"
            )}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
