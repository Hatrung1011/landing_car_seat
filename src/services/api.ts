import type { Brand, Category } from '@/types/catalog';
import type { Product } from '@/types/product';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://cms.nhathastore.vn/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: Không thể kết nối máy chủ`);
  }

  let json: { success?: boolean; data?: T; error?: string };
  try {
    json = await res.json();
  } catch {
    throw new Error('Phản hồi máy chủ không hợp lệ');
  }

  if (!json.success) {
    throw new Error(json.error || 'Yêu cầu thất bại');
  }
  return json.data as T;
}

let productsCache: Product[] | null = null;
let productsCachePromise: Promise<Product[]> | null = null;

export async function fetchProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${API_BASE}/products`);
}

/** Cached list — avoids refetching full catalog on every product detail visit */
export async function fetchProductsCached(): Promise<Product[]> {
  if (productsCache) return productsCache;
  if (!productsCachePromise) {
    productsCachePromise = fetchProducts().then((data) => {
      productsCache = data;
      return data;
    });
  }
  return productsCachePromise;
}

export function clearProductsCache() {
  productsCache = null;
  productsCachePromise = null;
}

export async function fetchProductBySlug(slug: string): Promise<Product> {
  try {
    return await fetchJson<Product>(
      `${API_BASE}/products/by-slug/${encodeURIComponent(slug)}`,
    );
  } catch {
    const products = await fetchProductsCached();
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      throw new Error('Sản phẩm không tìm thấy');
    }
    return product;
  }
}

export async function fetchBrands(): Promise<Brand[]> {
  return fetchJson<Brand[]>(`${API_BASE}/brands`);
}

export async function fetchCategories(): Promise<Category[]> {
  return fetchJson<Category[]>(`${API_BASE}/categories`);
}
