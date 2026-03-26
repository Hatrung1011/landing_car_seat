const API_BASE = import.meta.env.VITE_API_BASE || 'https://cms.nhathastore.vn/api';

export async function fetchProducts() {
    const res = await fetch(`${API_BASE}/products`);
    const json = await res.json();
    if (json.success) return json.data;
    throw new Error(json.error || 'Failed to fetch products');
}

export async function fetchBrands() {
    const res = await fetch(`${API_BASE}/brands`);
    const json = await res.json();
    if (json.success) return json.data;
    throw new Error(json.error || 'Failed to fetch brands');
}

export async function fetchCategories() {
    const res = await fetch(`${API_BASE}/categories`);
    const json = await res.json();
    if (json.success) return json.data;
    throw new Error(json.error || 'Failed to fetch categories');
}
