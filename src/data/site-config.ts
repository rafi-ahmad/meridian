/**
 * Central store configuration.
 * In a true multi-tenant SaaS deployment this object would be fetched
 * per-tenant (by subdomain / store ID) from an API or CMS at boot time.
 * Everything the UI needs to re-skin itself for a different brand lives here.
 */
export const siteConfig = {
  brand: {
    name: "Meridian",
    tagline: "Modern fashion, precisely curated.",
    logoText: "MERIDIAN",
  },
  theme: {
    fontDisplay: "Fraunces",
    fontSans: "Inter",
    colors: {
      paper: "#f7f5f1",
      ink: "#161614",
      accent: "#6b6a52",
    },
  },
  store: {
    currency: "USD",
    currencySymbol: "$",
    freeShippingThreshold: 200,
    domain: "meridian.co",
  },
  social: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    tiktok: "https://tiktok.com",
  },
  announcement: {
    messages: [
      "COMPLIMENTARY SHIPPING ON ALL ORDERS OVER $200",
      "NEW SEASON — AUTUMN / WINTER 2026 NOW LIVE",
      "SIGN UP FOR EARLY ACCESS TO NEW ARRIVALS",
    ],
  },
};
