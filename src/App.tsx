import { Routes, Route } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import Product from "@/pages/Product";
import Collection from "@/pages/Collection";
import Lookbook from "@/pages/Lookbook";
import Cart from "@/pages/Cart";
import About from "@/pages/About";
import Journal from "@/pages/Journal";
import NotFound from "@/pages/NotFound";
import AccountIndex from "@/pages/account/AccountIndex";
import Register from "@/pages/account/Register";
import ForgotPassword from "@/pages/account/ForgotPassword";
import AccountShell from "@/pages/account/AccountShell";
import ProtectedRoute from "@/pages/account/ProtectedRoute";
import Dashboard from "@/pages/account/Dashboard";
import Orders from "@/pages/account/Orders";
import OrderDetail from "@/pages/account/OrderDetail";
import Wishlist from "@/pages/account/Wishlist";
import ProfileSettings from "@/pages/account/ProfileSettings";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="collection/:slug" element={<Collection />} />
        <Route path="lookbook" element={<Lookbook />} />
        <Route path="cart" element={<Cart />} />
        <Route path="about" element={<About />} />
        <Route path="journal" element={<Journal />} />

        <Route path="account" element={<AccountIndex />} />
        <Route path="account/register" element={<Register />} />
        <Route path="account/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AccountShell />}>
            <Route path="account/dashboard" element={<Dashboard />} />
            <Route path="account/orders" element={<Orders />} />
            <Route path="account/orders/:id" element={<OrderDetail />} />
            <Route path="account/wishlist" element={<Wishlist />} />
            <Route path="account/settings" element={<ProfileSettings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
