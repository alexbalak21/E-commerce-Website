import type { Product } from "../../types";
import { SectionTitle, ProductCard, Button } from "../../ui";

interface ProductsSectionProps {
  title: string;
  products: Product[];
  maxItems?: number;
}

export default function ProductsSection({
  title,
  products,
  maxItems = 4,
}: ProductsSectionProps) {
  const visible = products.slice(0, maxItems);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center gap-10">
      <SectionTitle title={title} />

      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Divider */}
      <div className="w-full border-t border-black/10" />

      <Button variant="outline" size="md">
        View All
      </Button>
    </section>
  );
}
