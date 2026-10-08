import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email.includes("@") || password.length < 4) {
      setError("Please fill out all fields correctly.");
      return;
    }
    register(name, email);
    navigate("/account/dashboard");
  };

  return (
    <div className="container-meridian flex justify-center py-20 sm:py-28">
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-4xl">Create Account</h1>
        <p className="mb-10 text-center text-charcoal/60">
          Join Meridian for faster checkout and order tracking.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs uppercase tracking-[0.08em] text-charcoal/60">
              Full Name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border border-line px-4 py-3 text-sm outline-none focus:border-ink"
            />
          </div>
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
            <label htmlFor="password" className="text-xs uppercase tracking-[0.08em] text-charcoal/60">
              Password
            </label>
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
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-charcoal/60">
          Already have an account?{" "}
          <Link to="/account" className="link-underline text-ink">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
