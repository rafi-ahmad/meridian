import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Login from "@/pages/account/Login";

export default function AccountIndex() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/account/dashboard" replace />;
  return <Login />;
}
