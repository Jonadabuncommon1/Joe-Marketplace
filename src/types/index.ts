export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  condition?: string;
  isHot?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  badge?: string;
  colors?: string[];
  created_at?: string;
  createdAt?: string;
  [key: string]: any;
}