const items = Array.from({ length: 16 }, () => "Sale!");

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-black py-2.5">
      <div className="announcement-track flex w-max items-center">
        {[...items, ...items].map((text, i) => (
          <span
            key={i}
            className="px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
