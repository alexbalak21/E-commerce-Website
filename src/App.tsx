import { useState } from "react";
import { products } from "./data/products";
import type { Product } from "./types";
import { AnnouncementBar, Navbar, Footer } from "./components/layout";
import {
  HeroSection,
  BrandsBanner,
  ProductsSection,
  StyleBrowser,
  CustomerReviews,
  NewsletterBanner,
} from "./components/sections";
import CategoryPage from "./pages/CategoryPage";

// Page type
type Page =
  | { type: "home" }
  | { type: "category"; name: string }
  | { type: "product"; product: Product };

const newArrivals = products.filter((p) => p.isNew);
const topSelling = products.filter((p) => p.isTopSelling);

export default function App() {
  const [page, setPage] = useState<Page>({ type: "home" });

  const goHome = () => setPage({ type: "home" });
  const goCategory = (name: string) => setPage({ type: "category", name });
  const goProduct = (product: Product) => setPage({ type: "product", product });

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <AnnouncementBar />
      <Navbar onLogoClick={goHome} onCategoryClick={goCategory} />

      <main>
        {page.type === "home" && (
          <>
            <HeroSection />
            <BrandsBanner />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="border-t border-black/10" />
            </div>
            <ProductsSection
              title="New Arrivals"
              products={newArrivals}
              onProductClick={goProduct}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="border-t border-black/10" />
            </div>
            <ProductsSection
              title="Top Selling"
              products={topSelling}
              onProductClick={goProduct}
            />
            <StyleBrowser onStyleClick={goCategory} />
            <CustomerReviews />
            <NewsletterBanner />
          </>
        )}

        {page.type === "category" && (
          <CategoryPage
            categoryName={page.name}
            products={products}
            onProductClick={goProduct}
          />
        )}

        {page.type === "product" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <button
              onClick={goHome}
              className="text-sm text-black/50 hover:text-black mb-6 inline-flex items-center gap-1 transition-colors"
            >
              ← Back to Home
            </button>
            <p className="text-black/40">Product Detail Page coming soon for: <strong>{page.product.name}</strong></p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
