import { Link } from "react-router-dom";
import { orders } from "@/data/orders";
import { formatPrice, cn } from "@/lib/utils";

const statusColor: Record<string, string> = {
  Delivered: "text-olive",
  Shipped: "text-charcoal",
  Processing: "text-charcoal/60",
};

export default function Orders() {
  return (
    <div>
      <h1 className="mb-8 text-3xl sm:text-4xl">Order History</h1>

      {orders.length === 0 ? (
        <p className="text-charcoal/60">You haven't placed any orders yet.</p>
      ) : (
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {orders.map((order) => (
            <li key={order.id} className="flex flex-col justify-between gap-3 py-5 sm:flex-row sm:items-center">
              <div>
                <p className="font-medium">{order.id}</p>
                <p className="text-sm text-charcoal/60">
                  {new Date(order.date).toLocaleDateString("en-US", { dateStyle: "long" })} ·{" "}
                  {order.items.reduce((n, i) => n + i.quantity, 0)} item(s)
                </p>
              </div>
              <div className="flex items-center gap-6">
                <span className={cn("text-sm uppercase tracking-[0.06em]", statusColor[order.status])}>
                  {order.status}
                </span>
                <span className="text-sm">{formatPrice(order.total)}</span>
                <Link to={`/account/orders/${order.id}`} className="link-underline text-sm">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
