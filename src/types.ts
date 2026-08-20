export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  colors?: string[];
  sizes?: string[];
  images: string[];
  isNew?: boolean;
  isTrending?: boolean;
  location?: string;
  year?: string;
  mileage?: string;
  created_at?: string;

  /** Lucide icon name used for the generated placeholder when `images` is empty. */
  icon?: string;
  /** Short spec bullets shown on the product card and detail page. */
  specs?: string[];
  /** Condition badge, e.g. "Brand New", "UK Used". */
  condition?: string;
  /** Services are quoted "from" a starting price rather than sold at a fixed one. */
  isService?: boolean;
  inStock?: boolean;
}

export interface Category {
  id: string;
  name: string;
  /** Short label used in navigation and chips. */
  shortName: string;
  description: string;
  icon: string;
  /** Tailwind gradient stops for the category card. */
  gradient: string;
  /** Service categories route to the services page instead of a product grid. */
  isService?: boolean;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export type ViewState =
  | 'home'
  | 'shop'
  | 'categories'
  | 'category'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'services'
  | 'admin'
  | 'terms'
  | 'privacy'
  | 'auth';

/** A repair/maintenance booking submitted from the services page. */
export interface RepairRequest {
  fullName: string;
  phone: string;
  email: string;
  deviceType: string;
  deviceModel: string;
  faultDescription: string;
  branch: string;
  serviceMode: 'drop-off' | 'pickup';
  preferredDate: string;
  urgency: 'standard' | 'express';
  photos: File[];
}
