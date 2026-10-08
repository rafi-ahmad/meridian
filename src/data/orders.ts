import type { Order } from "@/types";

export const orders: Order[] = [
  {
    id: "MRD-10482",
    date: "2026-09-02",
    status: "Delivered",
    total: 480,
    items: [{ productId: "p1", quantity: 1, size: "M", color: "Camel" }],
  },
  {
    id: "MRD-10391",
    date: "2026-08-14",
    status: "Shipped",
    total: 545,
    items: [
      { productId: "p3", quantity: 1, size: "S", color: "Ecru" },
      { productId: "p5", quantity: 1, size: "M", color: "Black" },
    ],
  },
  {
    id: "MRD-10205",
    date: "2026-07-22",
    status: "Delivered",
    total: 285,
    items: [{ productId: "p8", quantity: 1, size: "L", color: "Oatmeal" }],
  },
];

export const getOrderById = (id: string) => orders.find((o) => o.id === id);
