import type { Product } from "../types";
import { StarRating, Badge } from "./index";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPct =
    product.oldPrice
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <article className="flex flex-col gap-3 group cursor-pointer">
      {/* Image tile */}
      <div className="bg-[#F0EEED] rounded-2xl overflow-hidden aspect-square flex items-center justify-center p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2">{product.name}</h3>
        <StarRating rating={product.rating} size="sm" />
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bold text-base">${product.price}</span>
          {product.oldPrice && (
            <span className="text-black/40 text-sm line-through">${product.oldPrice}</span>
          )}
          {discountPct && <Badge label={`-${discountPct}%`} />}
        </div>
      </div>
    </article>
  );
}
