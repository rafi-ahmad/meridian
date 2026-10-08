import { useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { FeaturedCollection } from "@/components/sections/FeaturedCollection";
import { EditorialSection } from "@/components/sections/EditorialSection";
import { NewArrivals } from "@/components/sections/NewArrivals";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { PromoCampaign } from "@/components/sections/PromoCampaign";
import { BrandStory } from "@/components/sections/BrandStory";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { LookbookSection } from "@/components/sections/LookbookSection";
import { Newsletter, InstagramGallery } from "@/components/sections/NewsletterInstagram";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import type { Product } from "@/types";

export default function Home() {
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <>
      <Hero />
      <NewArrivals onQuickView={setQuickView} />
      <FeaturedCollection />
      <EditorialSection />
      <CategoryShowcase />
      <PromoCampaign />
      <BrandStory />
      <FeaturedProducts onQuickView={setQuickView} />
      <LookbookSection />
      <Newsletter />
      <InstagramGallery />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
