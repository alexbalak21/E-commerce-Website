const brands = [
  { name: "VERSACE", style: "font-serif tracking-widest" },
  { name: "ZARA", style: "font-black italic tracking-tight" },
  { name: "GUCCI", style: "font-serif tracking-widest" },
  { name: "PRADA", style: "font-black tracking-widest" },
  { name: "Calvin Klein", style: "font-light tracking-wider" },
];

export default function BrandsBanner() {
  return (
    <div className="bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-y-4 py-7">
          {brands.map(({ name, style }) => (
            <span
              key={name}
              className={`text-white text-xl md:text-2xl ${style} opacity-90 hover:opacity-100 transition-opacity cursor-default`}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
