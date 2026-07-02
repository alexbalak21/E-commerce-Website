import { useState, useMemo } from "react";
import { ChevronRight, ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";
import type { Product } from "../types";
import { ProductCard, Button } from "../ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

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
const SIZES = ["XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "3X-Large", "4X-Large"];
const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];
const SORT_OPTIONS = ["Most Popular", "Newest", "Price: Low to High", "Price: High to Low"];
const ITEMS_PER_PAGE = 9;

// ─── Filter Section wrapper ────────────────────────────────────────────────────

function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-black/10 py-5">
      <button
        className="w-full flex items-center justify-between mb-4"
        onClick={() => setOpen(!open)}
      >
        <span className="font-bold text-base">{title}</span>
        {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>
      {open && children}
    </div>
  );
}

// ─── Filters Sidebar ──────────────────────────────────────────────────────────

interface FiltersProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  selectedColors: string[];
  onColorToggle: (hex: string) => void;
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
  selectedStyles: string[];
  onStyleToggle: (style: string) => void;
  onApply: () => void;
  onClose?: () => void;
}

function FiltersSidebar({
  priceRange,
  onPriceChange,
  selectedColors,
  onColorToggle,
  selectedSizes,
  onSizeToggle,
  selectedStyles,
  onStyleToggle,
  onApply,
  onClose,
}: FiltersProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/10 p-5 flex flex-col gap-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <span className="font-bold text-lg">Filters</span>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-black/40" />
          {onClose && (
            <button onClick={onClose} className="ml-1">
              <X className="w-4 h-4 text-black/40 hover:text-black transition-colors" />
            </button>
          )}
        </div>
      </div>

      {/* Category list */}
      <div className="border-t border-black/10">
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
        <div className="flex flex-col gap-3">
          <div className="relative h-1 bg-black/10 rounded-full mx-1">
            <div
              className="absolute h-1 bg-black rounded-full"
              style={{
                left: `${((priceRange[0] - 50) / 450) * 100}%`,
                right: `${100 - ((priceRange[1] - 50) / 450) * 100}%`,
              }}
            />
            {/* Min thumb */}
            <input
              type="range"
              min={50}
              max={500}
              value={priceRange[0]}
              onChange={(e) =>
                onPriceChange([Math.min(Number(e.target.value), priceRange[1] - 10), priceRange[1]])
              }
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1"
            />
            {/* Max thumb */}
            <input
              type="range"
              min={50}
              max={500}
              value={priceRange[1]}
              onChange={(e) =>
                onPriceChange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 10)])
              }
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1"
            />
            {/* Thumbs visual */}
            <div
              className="absolute w-4 h-4 bg-black rounded-full -translate-y-1/2 top-1/2 -translate-x-1/2 cursor-pointer"
              style={{ left: `${((priceRange[0] - 50) / 450) * 100}%` }}
            />
            <div
              className="absolute w-4 h-4 bg-black rounded-full -translate-y-1/2 top-1/2 translate-x-1/2 cursor-pointer"
              style={{ right: `${100 - ((priceRange[1] - 50) / 450) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-sm font-medium mt-2">
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
                onClick={() => onColorToggle(hex)}
                title={label}
                style={{ backgroundColor: hex }}
                className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center ${
                  active ? "border-black scale-110" : "border-transparent"
                } ${hex === "#FFFFFF" ? "border border-black/20" : ""}`}
              >
                {active && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke={hex === "#FFFFFF" ? "#000" : "#fff"} strokeWidth="2">
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
          {SIZES.map((size) => {
            const active = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onSizeToggle(size)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  active ? "bg-black text-white" : "bg-[#F0F0F0] text-black hover:bg-black/10"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </FilterSection>

      {/* Dress Style */}
      <FilterSection title="Dress Style">
        {DRESS_STYLES.map((style) => (
          <button
            key={style}
            onClick={() => onStyleToggle(style)}
            className={`w-full flex items-center justify-between py-3 text-sm transition-colors ${
              selectedStyles.includes(style) ? "text-black font-semibold" : "text-black/60 hover:text-black"
            }`}
          >
            {style}
            <ChevronRight className="w-4 h-4" />
          </button>
        ))}
      </FilterSection>

      {/* Apply */}
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
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const visible: (number | "...")[] = [];

  if (total <= 5) {
    visible.push(...pages);
  } else {
    visible.push(1, 2, 3);
    if (current > 4) visible.push("...");
    if (current > 3 && current < total - 1) visible.push(current);
    visible.push("...", total - 1, total);
  }

  return (
    <div className="flex items-center justify-between pt-8 border-t border-black/10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(1, current - 1))}
        className="flex items-center gap-1.5"
      >
        ← Previous
      </Button>

      <div className="flex items-center gap-1">
        {visible.map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-2 text-black/40 text-sm">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`w-9 h-9 rounded-full text-sm font-medium transition-all ${
                current === p
                  ? "bg-black text-white"
                  : "text-black/60 hover:bg-black/5"
              }`}
            >
              {p}
            </button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.min(total, current + 1))}
        className="flex items-center gap-1.5"
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
  onProductClick?: (product: Product) => void;
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
  const [appliedFilters, setAppliedFilters] = useState({ priceRange, selectedColors, selectedSizes, selectedStyles });

  // Sort & pagination
  const [sort, setSort] = useState("Most Popular");
  const [sortOpen, setSortOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Mobile filter drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleColor = (hex: string) =>
    setSelectedColors((prev) => prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex]);
  const toggleSize = (size: string) =>
    setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]);
  const toggleStyle = (style: string) =>
    setSelectedStyles((prev) => prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]);

  const handleApply = () => {
    setAppliedFilters({ priceRange, selectedColors, selectedSizes, selectedStyles });
    setPage(1);
    setDrawerOpen(false);
  };

  // Filter + sort products
  const filtered = useMemo(() => {
    let result = [...allProducts].filter(
      (p) => p.price >= appliedFilters.priceRange[0] && p.price <= appliedFilters.priceRange[1]
    );
    if (sort === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    else if (sort === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    else if (sort === "Newest") result.reverse();
    return result;
  }, [allProducts, appliedFilters, sort]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const filterProps: FiltersProps = {
    priceRange,
    onPriceChange: setPriceRange,
    selectedColors,
    onColorToggle: toggleColor,
    selectedSizes,
    onSizeToggle: toggleSize,
    selectedStyles,
    onStyleToggle: toggleStyle,
    onApply: handleApply,
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-black/50 py-4">
          <a href="#" className="hover:text-black transition-colors">Home</a>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-medium">{categoryName}</span>
        </nav>

        <div className="flex gap-6 pb-16">
          {/* ── Desktop Sidebar ── */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FiltersSidebar {...filterProps} />
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black">{categoryName}</h1>
                <p className="text-sm text-black/40 mt-0.5">
                  Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–
                  {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} Products
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 text-sm hover:border-black transition-colors"
                  onClick={() => setDrawerOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>

                {/* Sort dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center gap-1.5 text-sm text-black/60"
                    onClick={() => setSortOpen(!sortOpen)}
                  >
                    Sort by: <span className="font-semibold text-black">{sort}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-8 bg-white border border-black/10 rounded-xl shadow-lg z-20 min-w-[180px] overflow-hidden">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => { setSort(opt); setSortOpen(false); setPage(1); }}
                          className={`w-full text-left px-4 py-2.5 text-sm hover:bg-black/5 transition-colors ${
                            sort === opt ? "font-semibold" : "text-black/60"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product grid */}
            {paginated.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                {paginated.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-black/40">
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
      </div>

      {/* ── Mobile Filter Drawer ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto p-4">
            <FiltersSidebar
              {...filterProps}
              onApply={handleApply}
              onClose={() => setDrawerOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
