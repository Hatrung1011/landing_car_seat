import type { Brand, Category } from '@/types/catalog';
import type { Product } from '@/types/product';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://cms.nhathastore.vn/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: Không thể kết nối máy chủ`);
  }
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error || 'Yêu cầu thất bại');
  }
  return json.data as T;
}

export async function fetchProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${API_BASE}/products`);
}

export async function fetchBrands(): Promise<Brand[]> {
  return fetchJson<Brand[]>(`${API_BASE}/brands`);
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchJson<Category[]>(`${API_BASE}/categories`);
}
