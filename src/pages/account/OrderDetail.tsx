import { Link, useParams } from "react-router-dom";
import { getOrderById } from "@/data/orders";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export default function OrderDetail() {
  const { id } = useParams();
  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <div>
        <p className="mb-4">Order not found.</p>
        <Link to="/account/orders" className="link-underline text-sm">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/account/orders" className="link-underline mb-6 inline-block text-sm text-charcoal/60">
        ← Back to Orders
      </Link>
      <h1 className="mb-1 text-3xl sm:text-4xl">Order {order.id}</h1>
      <p className="mb-8 text-charcoal/60">
        Placed on {new Date(order.date).toLocaleDateString("en-US", { dateStyle: "long" })} ·{" "}
        <span className="uppercase tracking-[0.06em]">{order.status}</span>
      </p>

      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {order.items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return (
            <li key={`${item.productId}-${item.size}`} className="flex gap-4 py-5">
              <img src={product.images[0]} alt={product.name} className="h-24 w-18 object-cover" />
              <div className="flex flex-1 justify-between">
                <div>
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-charcoal/60">
                    {item.color} / {item.size} · Qty {item.quantity}
                  </p>
                </div>
                <span>{formatPrice(product.price * item.quantity)}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-6 flex justify-end">
        <div className="w-full max-w-xs">
          <div className="flex justify-between border-t border-line pt-4 text-base font-medium">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
