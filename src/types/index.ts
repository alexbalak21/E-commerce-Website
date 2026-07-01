// Product category
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Product review
export interface Review {
  id: string;
  user: string;
  rating: number; // 1–5
  comment: string;
}

// Main product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number; // optional for discounts
  image: string;
  category: string;
  rating: number;
  reviews: Review[];
  isNew?: boolean;
  isTopSelling?: boolean;
}
