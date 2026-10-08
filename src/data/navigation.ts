import type { NavItem } from "@/types";

export const mainNav: NavItem[] = [
  {
    label: "New",
    href: "/shop?filter=new",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    imageCaption: "The Autumn Edit",
    children: [
      { label: "New Arrivals", href: "/shop?filter=new" },
      { label: "Best Sellers", href: "/shop?filter=best-sellers" },
      { label: "Back in Stock", href: "/shop?filter=restock" },
      { label: "Editor's Picks", href: "/shop?filter=featured" },
    ],
  },
  {
    label: "Women",
    href: "/shop?gender=women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    imageCaption: "Tailored for her",
    children: [
      { label: "Outerwear", href: "/shop?gender=women&category=outerwear" },
      { label: "Knitwear", href: "/shop?gender=women&category=knitwear" },
      { label: "Dresses", href: "/shop?gender=women&category=dresses" },
      { label: "Trousers", href: "/shop?gender=women&category=trousers" },
      { label: "Bags", href: "/shop?gender=women&category=bags" },
    ],
  },
  {
    label: "Men",
    href: "/shop?gender=men",
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1000&auto=format&fit=crop",
    imageCaption: "Considered essentials",
    children: [
      { label: "Outerwear", href: "/shop?gender=men&category=outerwear" },
      { label: "Shirts", href: "/shop?gender=men&category=shirts" },
      { label: "Knitwear", href: "/shop?gender=men&category=knitwear" },
      { label: "Trousers", href: "/shop?gender=men&category=trousers" },
    ],
  },
  {
    label: "Collections",
    href: "/collection/autumn-winter-2026",
    children: [
      { label: "Autumn / Winter 2026", href: "/collection/autumn-winter-2026" },
      { label: "The Studio Edit", href: "/collection/studio-edit" },
      { label: "Archive", href: "/shop" },
    ],
  },
  { label: "Lookbook", href: "/lookbook" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  shop: [
    { label: "New Arrivals", href: "/shop?filter=new" },
    { label: "Women", href: "/shop?gender=women" },
    { label: "Men", href: "/shop?gender=men" },
    { label: "Collections", href: "/collection/autumn-winter-2026" },
    { label: "Lookbook", href: "/lookbook" },
  ],
  care: [
    { label: "Shipping", href: "/journal" },
    { label: "Returns & Exchanges", href: "/journal" },
    { label: "Size Guide", href: "/journal" },
    { label: "FAQ", href: "/journal" },
    { label: "Contact Us", href: "/journal" },
  ],
  company: [
    { label: "About Meridian", href: "/about" },
    { label: "Journal", href: "/journal" },
    { label: "Sustainability", href: "/journal" },
    { label: "Careers", href: "/journal" },
  ],
};
