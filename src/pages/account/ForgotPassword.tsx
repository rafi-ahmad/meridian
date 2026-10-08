import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container-meridian flex justify-center py-20 sm:py-28">
      <div className="w-full max-w-sm text-center">
        <h1 className="mb-2 text-4xl">Reset Password</h1>
        {submitted ? (
          <p className="mt-6 text-charcoal/70">
            If an account exists for <strong>{email}</strong>, you'll receive password reset
            instructions shortly.
          </p>
        ) : (
          <>
            <p className="mb-10 text-charcoal/60">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="flex flex-col gap-5 text-left"
            >
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
              <Button size="lg" type="submit" className="mt-2">
                Send Reset Link
              </Button>
            </form>
          </>
        )}
        <p className="mt-8 text-sm text-charcoal/60">
          <Link to="/account" className="link-underline text-ink">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
