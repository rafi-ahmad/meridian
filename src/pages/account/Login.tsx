import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setError("Please enter a valid email and password.");
      return;
    }
    login(email);
    navigate("/account/dashboard");
  };

  return (
    <div className="container-meridian flex justify-center py-20 sm:py-28">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-4xl">Sign In</h1>
        <p className="mb-10 text-center text-charcoal/60">
          Access your orders, wishlist and saved details.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs uppercase tracking-[0.08em] text-charcoal/60">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-line px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs uppercase tracking-[0.08em] text-charcoal/60">
                Password
              </label>
              <Link to="/account/forgot-password" className="link-underline text-xs text-charcoal/60">
                Forgot?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-line px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </div>
          {error && <p className="text-xs text-sale">{error}</p>}
          <Button size="lg" type="submit" className="mt-2">
            Sign In
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-charcoal/60">
          New to Meridian?{" "}
          <Link to="/account/register" className="link-underline text-ink">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
