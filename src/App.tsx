import { products } from "./data/products";
import { AnnouncementBar, Navbar, Footer } from "./components/layout";
import {
  HeroSection,
  BrandsBanner,
  ProductsSection,
  StyleBrowser,
  CustomerReviews,
  NewsletterBanner,
} from "./components/sections";

const newArrivals = products.filter((p) => p.isNew);
const topSelling = products.filter((p) => p.isTopSelling);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif]">
      <AnnouncementBar />
      <Navbar />

      <main>
        <HeroSection />
        <BrandsBanner />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-black/10" />
        </div>

        <ProductsSection title="New Arrivals" products={newArrivals} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="border-t border-black/10" />
        </div>

        <ProductsSection title="Top Selling" products={topSelling} />

        <StyleBrowser />
        <CustomerReviews />
        <NewsletterBanner />
      </main>

      <Footer />
    </div>
  );
}
