export interface ProductColor {
  name: string;
  hex: string;
  image: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  category: "outerwear" | "knitwear" | "dresses" | "bags" | "trousers" | "shirts" | "accessories";
  gender: "women" | "men" | "unisex";
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  description: string;
  materials: string[];
  details: string[];
  shipping: string;
  returns: string;
  tags: string[];
  featured: boolean;
  isNew: boolean;
  collection?: string;
  rating: number;
  reviewCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  season: string;
  description: string;
  heroImage: string;
  introImage: string;
  productIds: string[];
}

export interface LookbookLook {
  id: string;
  image: string;
  title: string;
  hotspots: {
    x: number;
    y: number;
    productId: string;
  }[];
}

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  featured?: boolean;
  image?: string;
  imageCaption?: string;
  children?: NavChild[];
}

export interface CartLine {
  productId: string;
  color: string;
  size: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: { productId: string; quantity: number; size: string; color: string }[];
}
