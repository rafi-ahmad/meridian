import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";
import { IconButton } from "@/components/ui/IconButton";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useUI } from "@/context/UIContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { itemCount, openCart } = useCart();
  const { ids } = useWishlist();
  const { openSearch, openMobileMenu } = useUI();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname]);

  const handleEnter = (label: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setActiveMenu(label);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  const activeItem = mainNav.find((n) => n.label === activeMenu);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-paper/95 backdrop-blur transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_0_rgba(0,0,0,0.08)]"
      )}
      onMouseLeave={handleLeave}
    >
      <div className="container-meridian relative flex h-[76px] items-center justify-between">
        <button
          onClick={openMobileMenu}
          aria-label="Open menu"
          className="flex h-10 w-10 items-center justify-center lg:hidden"
        >
          <Menu size={22} strokeWidth={1.4} />
        </button>

        <Link
          to="/"
          className="font-display text-2xl tracking-[0.14em] sm:text-[26px] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {siteConfig.brand.logoText}
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {mainNav.map((item) => (
            <div key={item.label} onMouseEnter={() => handleEnter(item.label)}>
              <Link
                to={item.href}
                className={cn(
                  "text-[12.5px] uppercase tracking-[0.1em] transition-colors hover:text-olive",
                  activeMenu === item.label && "text-olive"
                )}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <IconButton label="Search" onClick={openSearch} className="hidden sm:inline-flex">
            <Search size={19} strokeWidth={1.4} />
          </IconButton>
          <Link to="/account" aria-label="Account">
            <IconButton label="Account" className="hidden sm:inline-flex" tabIndex={-1}>
              <User size={19} strokeWidth={1.4} />
            </IconButton>
          </Link>
          <Link to="/account/wishlist" aria-label="Wishlist">
            <IconButton label="Wishlist" className="hidden sm:inline-flex" tabIndex={-1}>
              <Heart size={19} strokeWidth={1.4} />
              {ids.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-paper">
                  {ids.length}
                </span>
              )}
            </IconButton>
          </Link>
          <IconButton label="Open search" onClick={openSearch} className="sm:hidden">
            <Search size={20} strokeWidth={1.4} />
          </IconButton>
          <IconButton label="Open cart" onClick={openCart}>
            <ShoppingBag size={19} strokeWidth={1.4} />
            {itemCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-paper">
                {itemCount}
              </span>
            )}
          </IconButton>
        </div>
      </div>

      {activeItem && <MegaMenu item={activeItem} onNavigate={() => setActiveMenu(null)} />}
    </header>
  );
}
