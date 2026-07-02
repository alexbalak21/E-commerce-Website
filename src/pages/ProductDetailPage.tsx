import { useState } from "react";
import { Minus, Plus, SlidersHorizontal, ChevronDown, MoreHorizontal, CheckCircle } from "lucide-react";
import type { Product } from "../types";
import { StarRating, Badge, Button, SectionTitle, ProductCard } from "../ui";
import { products } from "../data/products";

// ─── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ category }: { category: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-black/50 py-4">
      {["Home", "Shop", "Men", category].map((crumb, i, arr) => (
        <span key={crumb} className="flex items-center gap-2">
          <a href="#" className={i === arr.length - 1 ? "text-black font-medium" : "hover:text-black transition-colors"}>
            {crumb}
          </a>
          {i < arr.length - 1 && <span className="text-black/30">›</span>}
        </span>
      ))}
    </nav>
  );
}

// ─── Image Gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex gap-4">
      {/* Thumbnails */}
      <div className="flex flex-col gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-20 h-20 rounded-xl overflow-hidden bg-[#F0EEED] flex items-center justify-center border-2 transition-colors ${
              selected === i ? "border-black" : "border-transparent"
            }`}
          >
            <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-contain p-1" />
          </button>
        ))}
      </div>
      {/* Main image */}
      <div className="flex-1 bg-[#F0EEED] rounded-2xl flex items-center justify-center min-h-[420px]">
        <img src={images[selected]} alt={name} className="max-h-[420px] w-full object-contain p-6" />
      </div>
    </div>
  );
}

// ─── Color Selector ────────────────────────────────────────────────────────────
function ColorSelector({ colors }: { colors: string[] }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-black/60">Select Colors</span>
      <div className="flex items-center gap-3">
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{ backgroundColor: color }}
            className={`w-9 h-9 rounded-full transition-all ${
              selected === i ? "ring-2 ring-offset-2 ring-black" : ""
            }`}
            aria-label={`Color ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Size Selector ─────────────────────────────────────────────────────────────
function SizeSelector({ sizes }: { sizes: string[] }) {
  const [selected, setSelected] = useState(2); // default Large
  return (
    <div className="flex flex-col gap-3">
      <span className="text-sm font-medium text-black/60">Choose Size</span>
      <div className="flex items-center gap-3 flex-wrap">
        {sizes.map((size, i) => (
          <button
            key={size}
            onClick={() => setSelected(i)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              selected === i
                ? "bg-black text-white"
                : "bg-[#F0F0F0] text-black hover:bg-black/10"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Quantity + Add to Cart ────────────────────────────────────────────────────
function AddToCart() {
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 bg-[#F0F0F0] rounded-full px-5 py-3">
        <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-black hover:opacity-60 transition-opacity">
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-sm font-semibold w-4 text-center">{qty}</span>
        <button onClick={() => setQty(qty + 1)} className="text-black hover:opacity-60 transition-opacity">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <Button size="lg" className="flex-1">
        Add to Cart
      </Button>
    </div>
  );
}

// ─── Tab Selector ─────────────────────────────────────────────────────────────
type Tab = "Product Details" | "Rating & Reviews" | "FAQs";
function TabSelector({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: Tab[] = ["Product Details", "Rating & Reviews", "FAQs"];
  return (
    <div className="border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-8 py-4 text-sm transition-all relative ${
              active === tab
                ? "text-black font-medium"
                : "text-black/40 hover:text-black/70"
            }`}
          >
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────
function ReviewsSection({ product }: { product: Product }) {
  const [shown, setShown] = useState(6);
  const visible = product.reviews.slice(0, shown);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black">
          All Reviews <span className="text-black/40 font-medium text-base">({product.reviews.length})</span>
        </h3>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-black/20 flex items-center justify-center hover:border-black transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-black/20 text-sm hover:border-black transition-colors">
            Latest <ChevronDown className="w-3.5 h-3.5" />
          </button>
          <Button size="sm">Write a Review</Button>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {visible.map((review) => (
          <div key={review.id} className="border border-black/10 rounded-2xl p-6 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <StarRating rating={review.rating} showLabel={false} />
              <button className="text-black/30 hover:text-black transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm">{review.user}</span>
              <CheckCircle className="w-4 h-4 text-[#01AB31] fill-[#01AB31]" />
            </div>
            <p className="text-sm text-black/60 leading-relaxed">"{review.comment}"</p>
            <p className="text-xs text-black/40">Posted on {review.date}</p>
          </div>
        ))}
      </div>

      {/* Load more */}
      {shown < product.reviews.length && (
        <div className="flex justify-center mt-10">
          <Button variant="outline" onClick={() => setShown(shown + 6)}>
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── You Might Also Like ──────────────────────────────────────────────────────
function YouMightAlsoLike({ currentId }: { currentId: string }) {
  const suggestions = products.filter((p) => p.id !== currentId).slice(0, 4);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex flex-col items-center gap-10">
        <SectionTitle title="You Might Also Like" />
        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {suggestions.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
interface ProductDetailPageProps {
  product: Product;
}

export default function ProductDetailPage({ product }: ProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Rating & Reviews");

  const discountPct = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Breadcrumb category={product.category} />

        {/* Top section: gallery + info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
          {/* Left: gallery */}
          <ImageGallery
            images={product.images ?? [product.image]}
            name={product.name}
          />

          {/* Right: info */}
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
            </div>

            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-black/30 line-through">${product.oldPrice}</span>
              )}
              {discountPct && <Badge label={`-${discountPct}%`} />}
            </div>

            <p className="text-sm text-black/60 leading-relaxed">{product.description}</p>

            <div className="border-t border-black/10" />

            {product.colors && product.colors.length > 0 && (
              <ColorSelector colors={product.colors} />
            )}

            <div className="border-t border-black/10" />

            {product.sizes && product.sizes.length > 0 && (
              <SizeSelector sizes={product.sizes} />
            )}

            <div className="border-t border-black/10" />

            <AddToCart />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <TabSelector active={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      {activeTab === "Product Details" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-sm text-black/60 leading-relaxed max-w-2xl">{product.description}</p>
        </div>
      )}
      {activeTab === "Rating & Reviews" && <ReviewsSection product={product} />}
      {activeTab === "FAQs" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <p className="text-sm text-black/60">No FAQs available yet.</p>
        </div>
      )}

      <div className="border-t border-black/10" />

      {/* You might also like */}
      <YouMightAlsoLike currentId={product.id} />
    </div>
  );
}
