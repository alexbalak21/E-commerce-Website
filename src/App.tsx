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
import ProductDetailPage from "./pages/ProductDetailPage";

const newArrivals = products.filter((p) => p.isNew);
const topSelling = products.filter((p) => p.isTopSelling);

export default function App() {
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <AnnouncementBar />
      <Navbar onLogoClick={() => setCurrentProduct(null)} />

      <main>
        {currentProduct ? (
          <ProductDetailPage product={currentProduct} />
        ) : (
          <>
            <HeroSection />
            <BrandsBanner />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="border-t border-black/10" />
            </div>

            <ProductsSection
              title="New Arrivals"
              products={newArrivals}
              onProductClick={setCurrentProduct}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="border-t border-black/10" />
            </div>

            <ProductsSection
              title="Top Selling"
              products={topSelling}
              onProductClick={setCurrentProduct}
            />

            <StyleBrowser />
            <CustomerReviews />
            <NewsletterBanner />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
