import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, User, Heart } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { useUI } from "@/context/UIContext";

export function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUI();

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] flex flex-col bg-paper lg:hidden"
        >
          <div className="flex h-[76px] items-center justify-between px-5">
            <span className="font-display text-xl tracking-[0.14em]">
              {siteConfig.brand.logoText}
            </span>
            <button onClick={closeMobileMenu} aria-label="Close menu" className="h-10 w-10">
              <X size={22} strokeWidth={1.4} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.label} className="border-b border-line py-4">
                  <Link
                    to={item.href}
                    onClick={closeMobileMenu}
                    className="font-display text-3xl"
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          to={c.href}
                          onClick={closeMobileMenu}
                          className="text-sm text-charcoal/60"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-6 border-t border-line px-5 py-6">
            <Link to="/account" onClick={closeMobileMenu} className="flex items-center gap-2 text-sm">
              <User size={18} strokeWidth={1.4} /> Account
            </Link>
            <Link
              to="/account/wishlist"
              onClick={closeMobileMenu}
              className="flex items-center gap-2 text-sm"
            >
              <Heart size={18} strokeWidth={1.4} /> Wishlist
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
