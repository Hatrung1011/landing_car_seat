export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  brand?: string;
  price: string;
  age_range?: string;
  weight?: string;
  description?: string;
  badge?: string;
  badge_type?: string;
  category?: string;
  images?: string[];
  colors?: ProductColor[];
  features?: string[];
  specs?: Record<string, string>;
  highlights?: string[];
}
