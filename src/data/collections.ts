import type { Collection, LookbookLook } from "@/types";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "autumn-winter-2026",
    title: "Autumn / Winter 2026",
    season: "AW26",
    description:
      "A study in restraint — considered outerwear, sculpted knitwear and fluid tailoring built for the transition into colder months. Every piece is designed to layer, move and last well beyond a single season.",
    heroImage:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1800&auto=format&fit=crop",
    introImage:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1400&auto=format&fit=crop",
    productIds: ["p1", "p3", "p5", "p6"],
  },
  {
    id: "c2",
    slug: "studio-edit",
    title: "The Studio Edit",
    season: "Capsule",
    description:
      "Sharp tailoring reimagined for everyday wear. The Studio Edit pairs structured jackets with fluid trousers for a wardrobe built around versatility.",
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1800&auto=format&fit=crop",
    introImage:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1400&auto=format&fit=crop",
    productIds: ["p2", "p5"],
  },
];

export const lookbookLooks: LookbookLook[] = [
  {
    id: "l1",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1600&auto=format&fit=crop",
    title: "Look 01 — The Essential Layer",
    hotspots: [
      { x: 42, y: 38, productId: "p1" },
      { x: 60, y: 72, productId: "p5" },
    ],
  },
  {
    id: "l2",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
    title: "Look 02 — Sculpted Form",
    hotspots: [{ x: 50, y: 55, productId: "p3" }],
  },
  {
    id: "l3",
    image:
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?q=80&w=1600&auto=format&fit=crop",
    title: "Look 03 — Considered Layers",
    hotspots: [{ x: 45, y: 48, productId: "p6" }],
  },
  {
    id: "l4",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    title: "Look 04 — Studio Line",
    hotspots: [
      { x: 40, y: 40, productId: "p2" },
      { x: 55, y: 75, productId: "p5" },
    ],
  },
  {
    id: "l5",
    image:
      "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=1600&auto=format&fit=crop",
    title: "Look 05 — Off Duty",
    hotspots: [{ x: 48, y: 50, productId: "p8" }],
  },
  {
    id: "l6",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1600&auto=format&fit=crop",
    title: "Look 06 — Evening Line",
    hotspots: [{ x: 50, y: 50, productId: "p3" }],
  },
];

export const getCollectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);
