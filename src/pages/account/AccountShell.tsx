import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Heart, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const links = [
  { label: "Dashboard", to: "/account/dashboard", icon: LayoutDashboard },
  { label: "Orders", to: "/account/orders", icon: Package },
  { label: "Wishlist", to: "/account/wishlist", icon: Heart },
  { label: "Profile Settings", to: "/account/settings", icon: Settings },
];

export default function AccountShell() {
  const { customerName, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container-meridian grid grid-cols-1 gap-10 py-12 sm:py-16 lg:grid-cols-12">
      <aside className="lg:col-span-3">
        <p className="mb-1 text-xs uppercase tracking-[0.1em] text-charcoal/50">Welcome back</p>
        <h2 className="mb-8 text-2xl capitalize">{customerName || "Guest"}</h2>
        <nav className="flex flex-col gap-1">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-3 text-sm transition-colors",
                  isActive ? "bg-ink text-paper" : "text-charcoal/70 hover:bg-paper-dim"
                )
              }
            >
              <Icon size={16} strokeWidth={1.5} />
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              logout();
              navigate("/account");
            }}
            className="mt-4 flex items-center gap-3 border-t border-line px-3 pt-4 text-sm text-charcoal/60 hover:text-ink"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Sign Out
          </button>
        </nav>
      </aside>

      <div className="lg:col-span-9">
        <Outlet />
      </div>
    </div>
  );
}
