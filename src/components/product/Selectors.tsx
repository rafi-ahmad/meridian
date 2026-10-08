import { cn } from "@/lib/utils";
import type { ProductColor } from "@/types";

export function ColorSelector({
  colors,
  selected,
  onSelect,
}: {
  colors: ProductColor[];
  selected: string;
  onSelect: (name: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs uppercase tracking-[0.1em] text-charcoal/60">
        Color — <span className="text-ink">{selected}</span>
      </p>
      <div className="flex gap-2.5">
        {colors.map((c) => (
          <button
            key={c.name}
            onClick={() => onSelect(c.name)}
            aria-label={c.name}
            aria-pressed={selected === c.name}
            className={cn(
              "h-9 w-9 rounded-full ring-1 ring-offset-2 ring-transparent transition-all",
              selected === c.name ? "ring-ink" : "hover:ring-charcoal/30"
            )}
            style={{ backgroundColor: c.hex }}
          />
        ))}
      </div>
    </div>
  );
}

export function SizeSelector({
  sizes,
  selected,
  onSelect,
  onOpenGuide,
}: {
  sizes: string[];
  selected: string;
  onSelect: (size: string) => void;
  onOpenGuide?: () => void;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.1em] text-charcoal/60">Size</p>
        {onOpenGuide && (
          <button
            onClick={onOpenGuide}
            className="link-underline text-xs uppercase tracking-[0.08em] text-charcoal/60"
          >
            Size Guide
          </button>
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {sizes.map((s) => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            aria-pressed={selected === s}
            className={cn(
              "border py-3 text-xs uppercase tracking-[0.05em] transition-colors",
              selected === s
                ? "border-ink bg-ink text-paper"
                : "border-line hover:border-ink"
            )}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
