import { useState, useMemo } from "react";
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";
import type { Product } from "../types";
import { ProductCard, Button } from "../ui";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const COLORS = [
  { hex: "#22C55E", label: "Green" },
  { hex: "#EF4444", label: "Red" },
  { hex: "#EAB308", label: "Yellow" },
  { hex: "#F97316", label: "Orange" },
  { hex: "#06B6D4", label: "Cyan" },
  { hex: "#3B82F6", label: "Blue" },
  { hex: "#A855F7", label: "Purple" },
  { hex: "#EC4899", label: "Pink" },
  { hex: "#FFFFFF", label: "White" },
  { hex: "#000000", label: "Black" },
];
const SIZES = [
  "XX-Small","X-Small","Small","Medium",
  "Large","X-Large","XX-Large","3X-Large","4X-Large",
];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const SORT_OPTIONS = [
  "Most Popular",
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
];
const PER_PAGE = 9;

// ─── FilterSection wrapper ────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-black/10 py-5">
      <button
        className="w-full flex items-center justify-between mb-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-base">{title}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-black/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-black/50" />
        )}
      </button>
      {open && children}
    </div>
  );
}

// ─── Sidebar content ──────────────────────────────────────────────────────────

interface SidebarProps {
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
  selectedColors: string[];
  toggleColor: (hex: string) => void;
  selectedSizes: string[];
  toggleSize: (s: string) => void;
  selectedStyles: string[];
  toggleStyle: (s: string) => void;
  onApply: () => void;
  onClose?: () => void;
}

function Sidebar({
  priceRange,
  setPriceRange,
  selectedColors,
  toggleColor,
  selectedSizes,
  toggleSize,
  selectedStyles,
  toggleStyle,
  onApply,
  onClose,
}: SidebarProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/10 p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <span className="font-bold text-lg">Filters</span>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-black/40" />
          {onClose && (
            <button onClick={onClose}>
              <X className="w-4 h-4 text-black/40 hover:text-black transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Category links */}
      <div className="border-t border-black/10 mt-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className="w-full flex items-center justify-between py-3 text-sm text-black/60 hover:text-black transition-colors"
          >
            {cat}
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Price */}
      <FilterSection title="Price">
        <div className="flex flex-col gap-4 px-1">
          {/* Track */}
          <div className="relative h-1 bg-black/10 rounded-full mt-3">
            <div
              className="absolute h-1 bg-black rounded-full"
              style={{
                left: `${((priceRange[0] - 50) / 450) * 100}%`,
                right: `${100 - ((priceRange[1] - 50) / 450) * 100}%`,
              }}
            />
            {/* Min thumb */}
            <div
              className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 -translate-x-1/2 shadow"
              style={{ left: `${((priceRange[0] - 50) / 450) * 100}%` }}
            />
            {/* Max thumb */}
            <div
              className="absolute w-4 h-4 bg-black rounded-full top-1/2 -translate-y-1/2 translate-x-1/2 shadow"
              style={{ right: `${100 - ((priceRange[1] - 50) / 450) * 100}%` }}
            />
            {/* Invisible range inputs stacked */}
            <input
              type="range" min={50} max={500} value={priceRange[0]}
              onChange={(e) =>
                setPriceRange([Math.min(+e.target.value, priceRange[1] - 10), priceRange[1]])
              }
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
            <input
              type="range" min={50} max={500} value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Math.max(+e.target.value, priceRange[0] + 10)])
              }
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between text-sm font-medium">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Colors */}
      <FilterSection title="Colors">
        <div className="flex flex-wrap gap-3">
          {COLORS.map(({ hex, label }) => {
            const active = selectedColors.includes(hex);
            return (
              <button
                key={hex}
                title={label}
                onClick={() => toggleColor(hex)}
                style={{ backgroundColor: hex }}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all
                  ${active ? "ring-2 ring-offset-2 ring-black scale-110" : ""}
                  ${hex === "#FFFFFF" ? "border border-black/20" : ""}
                `}
              >
                {active && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none"
                    stroke={hex === "#FFFFFF" ? "#000" : "#fff"} strokeWidth="2.5">
                    <polyline points="1,6 4,10 11,2" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Size */}
      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                ${selectedSizes.includes(size)
                  ? "bg-black text-white"
                  : "bg-[#F0F0F0] text-black hover:bg-black/10"
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Dress Style */}
      <FilterSection title="Dress Style">
        {DRESS_STYLES.map((style) => (
          <button
            key={style}
            onClick={() => toggleStyle(style)}
            className={`w-full flex items-center justify-between py-3 text-sm transition-colors
              ${selectedStyles.includes(style)
                ? "text-black font-semibold"
                : "text-black/60 hover:text-black"
              }`}
          >
            {style}
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </FilterSection>

      <Button className="w-full mt-2" onClick={onApply}>
        Apply Filter
      </Button>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  const items: (number | "...")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) items.push(i);
  } else {
    items.push(1, 2, 3, "...", total - 1, total);
  }

  return (
    <div className="flex items-center justify-between pt-8 border-t border-black/10 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(1, current - 1))}
        className="flex items-center gap-1"
      >
        ← Previous
      </Button>

      <div className="flex items-center gap-1">
        {items.map((item, i) =>
          item === "..." ? (
            <span key={`d${i}`} className="px-2 text-black/40 text-sm">...</span>
          ) : (
            <button
              key={item}
              onClick={() => onChange(item as number)}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-all
                ${current === item ? "bg-black text-white" : "text-black/60 hover:bg-black/5"}`}
            >
              {item}
            </button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.min(total, current + 1))}
        className="flex items-center gap-1"
      >
        Next →
      </Button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface CategoryPageProps {
  categoryName: string;
  products: Product[];
  onProductClick?: (p: Product) => void;
}

export default function CategoryPage({
  categoryName,
  products: allProducts,
  onProductClick,
}: CategoryPageProps) {
  // Filter state
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>(["#3B82F6"]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["Large"]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [applied, setApplied] = useState({ priceRange, selectedColors, selectedSizes, selectedStyles });

  // Sort + page
  const [sort, setSort] = useState("Most Popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleColor = (hex: string) =>
    setSelectedColors((p) => p.includes(hex) ? p.filter((c) => c !== hex) : [...p, hex]);
  const toggleSize = (s: string) =>
    setSelectedSizes((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);
  const toggleStyle = (s: string) =>
    setSelectedStyles((p) => p.includes(s) ? p.filter((x) => x !== s) : [...p, s]);

  const handleApply = () => {
    setApplied({ priceRange, selectedColors, selectedSizes, selectedStyles });
    setPage(1);
    setDrawerOpen(false);
  };

  const filtered = useMemo(() => {
    let r = allProducts.filter(
      (p) => p.price >= applied.priceRange[0] && p.price <= applied.priceRange[1]
    );
    if (sort === "Price: Low to High") r = [...r].sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") r = [...r].sort((a, b) => b.price - a.price);
    else if (sort === "Newest") r = [...r].reverse();
    return r;
  }, [allProducts, applied, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const sidebarProps: SidebarProps = {
    priceRange, setPriceRange,
    selectedColors, toggleColor,
    selectedSizes, toggleSize,
    selectedStyles, toggleStyle,
    onApply: handleApply,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-black/50 py-4">
        <a href="#" className="hover:text-black transition-colors">Home</a>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-black font-medium">{categoryName}</span>
      </nav>

      <div className="flex gap-6 pb-16">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-[260px] shrink-0">
          <Sidebar {...sidebarProps} />
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black">{categoryName}</h1>
              <p className="text-sm text-black/40 mt-0.5">
                Showing {filtered.length === 0 ? 0 : (page - 1) * PER_PAGE + 1}–
                {Math.min(page * PER_PAGE, filtered.length)} of {filtered.length} Products
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile filter toggle */}
              <button
                className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm hover:border-black transition-colors"
                onClick={() => setDrawerOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              {/* Sort */}
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-sm text-black/60"
                  onClick={() => setSortOpen(!sortOpen)}
                >
                  Sort by:&nbsp;
                  <span className="font-semibold text-black">{sort}</span>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 top-9 bg-white border border-black/10 rounded-xl shadow-lg z-30 min-w-[200px] overflow-hidden">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => { setSort(opt); setSortOpen(false); setPage(1); }}
                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-black/5 transition-colors
                          ${sort === opt ? "font-semibold text-black" : "text-black/60"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Grid */}
          {paginated.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} onProductClick={onProductClick} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-black/30">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm mt-1">Try adjusting your filters</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} onChange={setPage} />
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto p-4">
            <Sidebar {...sidebarProps} onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
