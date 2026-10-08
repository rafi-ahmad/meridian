import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { NavItem } from "@/types";

export function MegaMenu({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  if (!item.children) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 top-full w-full border-t border-line bg-ivory shadow-[0_24px_48px_-24px_rgba(0,0,0,0.15)]"
      >
        <div className="container-meridian grid grid-cols-12 gap-8 py-10">
          <div className="col-span-3 flex flex-col gap-3">
            {item.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={onNavigate}
                className="link-underline w-fit text-[14px] text-charcoal/80 hover:text-ink"
              >
                {child.label}
              </Link>
            ))}
            <Link
              to={item.href}
              onClick={onNavigate}
              className="mt-4 w-fit text-[12px] uppercase tracking-[0.1em] font-medium text-ink"
            >
              Shop All {item.label} →
            </Link>
          </div>
          {item.image && (
            <Link
              to={item.href}
              onClick={onNavigate}
              className="img-hover-zoom relative col-span-4 col-start-9 block aspect-[4/3] overflow-hidden bg-paper-dim"
            >
              <img src={item.image} alt="" className="h-full w-full object-cover" />
              {item.imageCaption && (
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.1em] text-paper mix-blend-difference">
                  {item.imageCaption}
                </span>
              )}
            </Link>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
