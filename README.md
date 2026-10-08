# MERIDIAN — Premium Fashion E-Commerce Theme

**Modern fashion, precisely curated.**

Meridian is a production-quality, editorial-style fashion e-commerce theme built with React,
TypeScript, Vite and Tailwind CSS. It's designed as a reusable frontend "SaaS theme" — the kind
of premium, image-driven commerce experience you'd expect from a high-end DTC fashion brand —
with data, branding and styling separated from the UI so it can be re-skinned for different
stores.

---

## 1. Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool / dev server)
- **Tailwind CSS v4** (via `@tailwindcss/vite`, theme tokens defined in `src/index.css`)
- **Framer Motion** for animation
- **React Router v7** for routing
- **Lucide React** for icons

---

## 2. Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview

# 5. Lint the project
npm run lint
```

The dev server runs at `http://localhost:5173` by default.

---

## 3. Project Structure

```
src/
  components/
    ui/            → Button, IconButton, Accordion, SectionHeading (design system primitives)
    layout/         → Header, MegaMenu, MobileMenu, Footer, AnnouncementBar, RootLayout
    sections/       → Homepage sections (Hero, EditorialSection, BrandStory, etc.)
    product/        → ProductCard, ProductGallery, ColorSelector/SizeSelector, QuickViewModal
    cart/           → CartDrawer
    search/         → SearchOverlay (fullscreen search experience)
  pages/            → Route-level pages (Home, Shop, Product, Collection, Lookbook, Cart, About, Journal, NotFound)
    account/        → Login, Register, ForgotPassword, AccountShell (sidebar), Dashboard, Orders, OrderDetail, Wishlist, ProfileSettings
  data/             → Mock CMS-style content: products.ts, collections.ts, navigation.ts, orders.ts, site-config.ts
  context/          → CartContext, WishlistContext, UIContext (search/mobile menu), AuthContext (mock)
  types/            → Shared TypeScript interfaces (Product, Collection, NavItem, CartLine, Order...)
  lib/              → utils.ts (className merge, price formatting, debounce)
  App.tsx           → Route tree
  main.tsx          → Provider composition + router root
  index.css         → Design system: color tokens, typography, base styles, utilities
```

Every page is reachable from the navigation and every interactive control (cart, wishlist,
search, filters, quick view, account forms) is wired up to real (client-side) state — there are
no dead links or "coming soon" placeholders.

---

## 4. How to Replace the Products

All product content lives in **`src/data/products.ts`** as a typed array (`Product[]`, see
`src/types/index.ts`). To add or edit a product:

```ts
{
  id: "p9",
  slug: "your-product-slug",       // used in the URL: /product/your-product-slug
  name: "Your Product Name",
  price: 320,
  compareAtPrice: 380,             // optional — omit for no sale badge
  category: "outerwear",           // outerwear | knitwear | dresses | bags | trousers | shirts | accessories
  gender: "women",                 // women | men | unisex
  images: ["https://...", "..."],  // first two images are used for the hover-swap on product cards
  colors: [{ name: "Camel", hex: "#b79571", image: "https://..." }],
  sizes: ["XS", "S", "M", "L"],
  description: "...",
  materials: ["100% Wool"],
  details: ["Notched lapel", "Made in Portugal"],
  shipping: "...",
  returns: "...",
  tags: ["outerwear", "wool"],
  featured: true,
  isNew: true,
  collection: "autumn-winter-2026", // optional — links the product into a Collection page
  rating: 4.8,
  reviewCount: 126,
}
```

In production, swap `products.ts` for a fetch to your commerce backend (Shopify, Commerce Layer,
a headless CMS, or a custom API) — the rest of the UI reads exclusively from the `Product` type,
so nothing else needs to change as long as the shape matches.

Collections live in `src/data/collections.ts`, lookbook looks (with shoppable hotspots) in the
same file, navigation in `src/data/navigation.ts`, and mock past orders (for the account area) in
`src/data/orders.ts`.

---

## 5. How to Customize Branding

Central store configuration lives in **`src/data/site-config.ts`**:

```ts
export const siteConfig = {
  brand: {
    name: "Meridian",
    tagline: "Modern fashion, precisely curated.",
    logoText: "MERIDIAN",
  },
  store: {
    currency: "USD",
    freeShippingThreshold: 200,
  },
  social: { instagram: "...", pinterest: "...", tiktok: "..." },
  announcement: { messages: ["...", "..."] },
};
```

Change `logoText`, `tagline`, social links and the announcement bar messages here — they're
consumed throughout the Header, Footer and AnnouncementBar without any further edits.

For a true multi-tenant SaaS setup, this object is the natural place to fetch a tenant's config
from an API at boot (by subdomain or store ID) instead of importing a static file.

---

## 6. How to Customize Colors & Fonts

The full design system is defined with Tailwind v4's `@theme` block at the top of
**`src/index.css`**:

```css
@theme {
  --color-paper: #f7f5f1;   /* background */
  --color-ink: #161614;     /* primary text / buttons */
  --color-charcoal: #232320;
  --color-olive: #6b6a52;   /* accent */
  --color-sale: #a8402f;    /* sale price / errors */

  --font-display: "Fraunces", serif;  /* headings */
  --font-sans: "Inter", sans-serif;   /* body */
}
```

Because these are real CSS custom properties, editing a value here updates every Tailwind
utility that references it (`bg-paper`, `text-ink`, `font-display`, etc.) sitewide — no need to
touch component files. To swap typefaces, update the Google Fonts `@import` at the top of the
file and the two `--font-*` variables.

---

## 7. Connecting a Real Backend / API Later

The theme is intentionally decoupled from any specific commerce backend:

- **Products & Collections** — replace the static arrays in `src/data/` with calls to your
  commerce API (e.g. inside a small `useEffect`/React Query hook), keeping the same TypeScript
  shapes so the UI components don't need to change.
- **Cart** — `src/context/CartContext.tsx` currently holds cart state in memory. To persist
  carts server-side, swap the internal `useState` calls for calls to your cart API (create cart,
  add line, update line) and keep the same context interface so consuming components are
  unaffected.
- **Auth / Account** — `src/context/AuthContext.tsx` is a mock (no real backend, no password
  check). Replace `login`/`register`/`logout` with real calls to your auth provider (e.g. a
  headless commerce platform, Auth0, Clerk, or a custom API), and consider persisting the
  session in an httpOnly cookie rather than component state.
- **Checkout** — the "Proceed to Checkout" button in `src/pages/Cart.tsx` currently shows a
  placeholder alert. Point it at your checkout flow (a hosted checkout page, Stripe Checkout,
  or your own multi-step flow).

---

## 8. Accessibility & Performance Notes

- Semantic HTML, labelled icon buttons, visible focus states (`:focus-visible` outline),
  keyboard-operable menus and modals.
- `prefers-reduced-motion` is respected globally (animations collapse to near-instant).
- Images use `loading="lazy"` except above-the-fold hero/first-row images.
- No unnecessary dependencies — animation is Framer Motion only, no extra UI kit.
- The production bundle is ~150 KB gzipped for JS and ~8 KB gzipped for CSS.

---

## 9. What's Included

**Pages:** Home, Shop (filters, sort, load-more), Product Detail, Collection (editorial),
Lookbook (shoppable hotspots), Cart, Login, Register, Forgot Password, Account Dashboard,
Orders, Order Detail, Wishlist, Profile Settings, About, Journal (FAQ), 404.

**Systems:** Cart drawer + full cart page, wishlist, fullscreen search with live filtering,
quick view modal, mega menu navigation with imagery, mobile full-screen menu, free-shipping
progress bar, empty states (cart, wishlist, search, 404), announcement bar marquee, newsletter
signup with success state.

Enjoy building on Meridian.
