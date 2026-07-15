import { Truck, Shirt } from "lucide-react";

function LatinCross({
  size = 16,
  className,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <line
        x1="12"
        y1="3"
        x2="12"
        y2="21"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <line
        x1="7.5"
        y1="8"
        x2="16.5"
        y2="8"
        stroke="white"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const items = [
  {
    icon: Truck,
    iconSize: 16,
    text: "Free shipping on orders over $50",
  },
  {
    icon: LatinCross,
    iconSize: 16,
    text: "100% of profits supports churches",
  },
  {
    icon: Shirt,
    iconSize: 16,
    text: "Premium materials",
  },
];

export function InfoBar() {
  return (
    <section className="bg-black">
      <div className="mx-auto grid max-w-7xl md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={item.text}
            className={`flex items-center gap-3 px-6 py-5 md:justify-center md:py-6 ${
              i < items.length - 1 ? "md:border-r md:border-white/15" : ""
            }`}
          >
            <item.icon size={item.iconSize} strokeWidth={1.25} className="shrink-0 text-white/80" />
            <p className="text-sm font-normal text-white/85">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
