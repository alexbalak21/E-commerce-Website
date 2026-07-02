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
  date: string; // e.g. "August 14, 2023"
}

// Main product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[]; // gallery thumbnails
  colors?: string[]; // hex values
  sizes?: string[];
  category: string;
  rating: number;
  reviews: Review[];
  isNew?: boolean;
  isTopSelling?: boolean;
}
