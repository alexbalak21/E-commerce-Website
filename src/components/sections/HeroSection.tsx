import { Button } from "../../ui";

const stats = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

export default function HeroSection() {
  return (
    <section className="bg-[#F2F0F1] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center min-h-[560px] relative">
        {/* Text side */}
        <div className="flex-1 pt-16 pb-10 md:py-20 z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-[0.95] tracking-tight mb-6">
            Find Clothes<br />
            That Matches<br />
            Your Style
          </h1>
          <p className="text-sm text-black/60 max-w-xs leading-relaxed mb-8">
            Browse through our diverse range of meticulously crafted garments, designed
            to bring out your individuality and cater to your sense of style.
          </p>
          <Button size="lg">Shop Now</Button>

          {/* Stats */}
          <div className="mt-12 flex items-center gap-0 divide-x divide-black/20">
            {stats.map(({ value, label }) => (
              <div key={label} className="px-6 first:pl-0">
                <p className="text-2xl md:text-3xl font-black">{value}</p>
                <p className="text-xs text-black/60 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image side */}
        <div className="flex-1 flex justify-center items-end self-end relative md:absolute md:right-0 md:top-0 md:h-full md:w-[52%]">
          {/* Decorative sparkles */}
          <span className="absolute top-8 right-8 text-4xl select-none pointer-events-none">✦</span>
          <span className="absolute top-1/2 left-0 text-2xl select-none pointer-events-none">✦</span>
          <img
            src="/assets/hero.png"
            alt="Models showcasing Shop.co clothing"
            className="h-[480px] md:h-full object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
