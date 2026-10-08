import { Link } from "react-router-dom";
import { Package, Heart, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { orders } from "@/data/orders";
import { formatPrice } from "@/lib/utils";

export default function Dashboard() {
  const { customerEmail } = useAuth();
  const { ids } = useWishlist();
  const recentOrder = orders[0];

  return (
    <div>
      <h1 className="mb-8 text-3xl sm:text-4xl">Account Overview</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Link to="/account/orders" className="border border-line p-6 transition-colors hover:border-ink">
          <Package size={20} strokeWidth={1.4} className="mb-3" />
          <p className="text-2xl">{orders.length}</p>
          <p className="text-sm text-charcoal/60">Orders Placed</p>
        </Link>
        <Link to="/account/wishlist" className="border border-line p-6 transition-colors hover:border-ink">
          <Heart size={20} strokeWidth={1.4} className="mb-3" />
          <p className="text-2xl">{ids.length}</p>
          <p className="text-sm text-charcoal/60">Wishlist Items</p>
        </Link>
        <div className="border border-line p-6">
          <MapPin size={20} strokeWidth={1.4} className="mb-3" />
          <p className="text-sm leading-relaxed text-charcoal/70">{customerEmail}</p>
          <p className="text-sm text-charcoal/60">Account Email</p>
        </div>
      </div>

      {recentOrder && (
        <div className="mt-12">
          <h2 className="mb-4 text-sm uppercase tracking-[0.1em] text-charcoal/60">
            Most Recent Order
          </h2>
          <div className="flex flex-col justify-between gap-3 border border-line p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-medium">{recentOrder.id}</p>
              <p className="text-sm text-charcoal/60">
                Placed on {new Date(recentOrder.date).toLocaleDateString("en-US", { dateStyle: "long" })}
              </p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm uppercase tracking-[0.06em]">{recentOrder.status}</span>
              <span>{formatPrice(recentOrder.total)}</span>
              <Link to={`/account/orders/${recentOrder.id}`} className="link-underline text-sm">
                View
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
