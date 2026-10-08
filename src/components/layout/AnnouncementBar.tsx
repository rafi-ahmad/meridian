import { siteConfig } from "@/data/site-config";

export function AnnouncementBar() {
  const messages = siteConfig.announcement.messages;
  const loop = [...messages, ...messages];

  return (
    <div className="relative overflow-hidden bg-ink py-2.5 text-paper">
      <div className="scrollbar-none flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 gap-16 whitespace-nowrap pr-16">
          {loop.map((msg, i) => (
            <span key={i} className="text-[11px] tracking-[0.15em] uppercase">
              {msg}
            </span>
          ))}
        </div>
        <div aria-hidden className="animate-marquee flex shrink-0 gap-16 whitespace-nowrap pr-16">
          {loop.map((msg, i) => (
            <span key={`b-${i}`} className="text-[11px] tracking-[0.15em] uppercase">
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
