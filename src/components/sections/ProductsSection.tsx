import type { Product } from "../../types";
import { SectionTitle, ProductCard, Button } from "../../ui";

interface ProductsSectionProps {
  title: string;
  products: Product[];
  maxItems?: number;
  onProductClick?: (product: Product) => void;
}

export default function ProductsSection({
  title,
  products,
  maxItems = 4,
  onProductClick,
}: ProductsSectionProps) {
  const visible = products.slice(0, maxItems);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center gap-10">
      <SectionTitle title={title} />
      <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} onProductClick={onProductClick} />
        ))}
      </div>
      <div className="w-full border-t border-black/10" />
      <Button variant="outline" size="md">View All</Button>
    </section>
  );
}
