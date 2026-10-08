import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Music2, MapPin } from "lucide-react";
import { footerNav } from "@/data/navigation";
import { siteConfig } from "@/data/site-config";

export function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <footer className="border-t border-line bg-ivory">
      <div className="container-meridian grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Link to="/" className="font-display text-2xl tracking-[0.14em]">
            {siteConfig.brand.logoText}
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-charcoal/60">
            {siteConfig.brand.tagline}
          </p>
          <div className="mt-6 flex items-center gap-2 text-sm text-charcoal/60">
            <MapPin size={15} strokeWidth={1.4} />
            <span>Shipping worldwide from our Lisbon atelier</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-5">
          <FooterCol title="Shop" links={footerNav.shop} />
          <FooterCol title="Customer Care" links={footerNav.care} />
          <FooterCol title="Company" links={footerNav.company} />
        </div>

        <div className="lg:col-span-3">
          <h4 className="mb-3 text-sm font-medium">Join the Meridian list.</h4>
          <p className="mb-4 text-sm text-charcoal/60">
            New arrivals, editorial stories and early access — no more than twice a month.
          </p>
          {submitted ? (
            <p className="text-sm text-olive">You're on the list. Welcome to Meridian.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex border-b border-ink pb-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-transparent text-sm outline-none placeholder:text-charcoal/40"
              />
              <button type="submit" className="text-xs uppercase tracking-[0.1em]">
                Join
              </button>
            </form>
          )}

          <div className="mt-8 flex gap-4">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-charcoal/60 hover:text-ink"
            >
              <Camera size={18} strokeWidth={1.4} />
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="text-charcoal/60 hover:text-ink"
            >
              <Music2 size={18} strokeWidth={1.4} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-meridian flex flex-col-reverse items-center justify-between gap-4 border-t border-line py-6 text-xs text-charcoal/50 sm:flex-row">
        <span>© {new Date().getFullYear()} Meridian. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/journal" className="hover:text-ink">
            Privacy Policy
          </Link>
          <Link to="/journal" className="hover:text-ink">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-4 text-xs uppercase tracking-[0.1em] text-charcoal/50">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.href} className="link-underline text-sm text-charcoal/75 hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
