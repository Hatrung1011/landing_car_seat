export interface Brand {
  id: number;
  name: string;
  is_active?: boolean;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active?: boolean;
}
