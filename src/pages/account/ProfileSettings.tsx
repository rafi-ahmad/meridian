import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function ProfileSettings() {
  const { customerName, customerEmail } = useAuth();
  const [name, setName] = useState(customerName);
  const [email, setEmail] = useState(customerEmail);
  const [saved, setSaved] = useState(false);

  return (
    <div>
      <h1 className="mb-8 text-3xl sm:text-4xl">Profile Settings</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }}
        className="flex max-w-md flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-[0.08em] text-charcoal/60">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-line px-4 py-3 text-sm outline-none focus:border-ink capitalize"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-[0.08em] text-charcoal/60">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-[0.08em] text-charcoal/60">
            New Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="border border-line px-4 py-3 text-sm outline-none focus:border-ink"
          />
        </div>
        <Button type="submit" size="lg" className="mt-2 w-fit">
          Save Changes
        </Button>
        {saved && <p className="text-sm text-olive">Your profile has been updated.</p>}
      </form>
    </div>
  );
}
