import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { CartLine } from "@/types";
import { getProductById } from "@/data/products";

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (line: CartLine) => void;
  removeLine: (productId: string, color: string, size: string) => void;
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void;
  subtotal: number;
  itemCount: number;
  lastAdded: CartLine | null;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartLine | null>(null);

  const addToCart = (line: CartLine) => {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === line.productId && l.color === line.color && l.size === line.size
      );
      if (existing) {
        return prev.map((l) =>
          l === existing ? { ...l, quantity: l.quantity + line.quantity } : l
        );
      }
      return [...prev, line];
    });
    setLastAdded(line);
    setIsOpen(true);
  };

  const removeLine = (productId: string, color: string, size: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.color === color && l.size === size))
    );
  };

  const updateQuantity = (productId: string, color: string, size: string, quantity: number) => {
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId && l.color === color && l.size === size
          ? { ...l, quantity: Math.max(1, quantity) }
          : l
      )
    );
  };

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, line) => {
        const product = getProductById(line.productId);
        return sum + (product?.price ?? 0) * line.quantity;
      }, 0),
    [lines]
  );

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);

  return (
    <CartContext.Provider
      value={{
        lines,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        addToCart,
        removeLine,
        updateQuantity,
        subtotal,
        itemCount,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
