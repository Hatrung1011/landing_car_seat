import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal, Search } from 'lucide-react';
import { fetchProducts, fetchBrands, fetchCategories } from '@/services/api';
import type { Product } from '@/types/product';
import type { Brand, Category } from '@/types/catalog';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import { ErrorState, LoadingSpinner } from '@/components/ui/api-state';
import { cn } from '@/lib/utils';

const PLACEHOLDER_IMAGE = '/logo_car_seat.png';
const ITEMS_PER_PAGE = 6;

const sortOptions = [
  { value: 'recommended', label: 'Đề xuất' },
  { value: 'price-asc', label: 'Giá: Thấp → Cao' },
  { value: 'price-desc', label: 'Giá: Cao → Thấp' },
  { value: 'newest', label: 'Mới nhất' },
] as const;

type SortValue = (typeof sortOptions)[number]['value'];
type FilterKey = 'brand' | 'category' | 'features';

function parsePrice(price: string) {
  return parseInt(price.replace(/\D/g, ''), 10) || 0;
}

function getBadgeClass(type?: string) {
  switch (type) {
    case 'new':
      return 'bg-green-600 text-white';
    case 'winner':
      return 'bg-amber-600 text-white';
    case 'award':
      return 'bg-purple-600 text-white';
    case 'offer':
      return 'bg-red-600 text-white';
    default:
      return 'bg-accent text-accent-foreground';
  }
}

export default function AllProducts() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<SortValue>('recommended');
  const [openFilter, setOpenFilter] = useState<Record<FilterKey, boolean>>({
    brand: true,
    category: true,
    features: false,
  });
  const [selectedFilters, setSelectedFilters] = useState<Record<FilterKey, string[]>>({
    brand: [],
    category: [],
    features: [],
  });
  const [activeColor, setActiveColor] = useState<Record<number, number>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const loadData = useCallback(() => {
    setLoading(true);
    setError(null);
    Promise.all([fetchProducts(), fetchBrands(), fetchCategories()])
      .then(([products, brandsData, categoriesData]) => {
        setAllProducts(products);
        setBrands(brandsData.filter((b) => b.is_active !== false));
        setCategories(categoriesData.filter((c) => c.is_active !== false));
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Không thể tải danh sách sản phẩm'),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const allFeatures = useMemo(
    () => [...new Set(allProducts.flatMap((p) => p.features || []))],
    [allProducts],
  );

  const filterConfig = useMemo(
    () => ({
      brand: { label: 'Thương Hiệu', options: brands.map((b) => b.name) },
      category: {
        label: 'Độ Tuổi',
        options: categories.map((c) => ({ value: c.slug, label: c.name })),
      },
      features: { label: 'Tính Năng', options: allFeatures },
    }),
    [brands, categories, allFeatures],
  );

  const toggleFilter = (key: FilterKey) => {
    setOpenFilter((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilterOption = (filterKey: FilterKey, option: string | { value: string; label: string }) => {
    const val = typeof option === 'object' ? option.value : option;
    setSelectedFilters((prev) => {
      const current = prev[filterKey];
      return {
        ...prev,
        [filterKey]: current.includes(val) ? current.filter((v) => v !== val) : [...current, val],
      };
    });
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedFilters({ brand: [], category: [], features: [] });
    setCurrentPage(1);
  };

  const hasActiveFilters = Object.values(selectedFilters).some((arr) => arr.length > 0);

  const filteredProducts = allProducts.filter((product) => {
    if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand ?? ''))
      return false;
    if (
      selectedFilters.category.length > 0 &&
      !selectedFilters.category.includes(product.category ?? '')
    )
      return false;
    if (selectedFilters.features.length > 0) {
      const hasFeature = selectedFilters.features.some((f) =>
        (product.features || []).includes(f),
      );
      if (!hasFeature) return false;
    }
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === 'price-desc') return parsePrice(b.price) - parsePrice(a.price);
    if (sortBy === 'newest') return (b.badge_type === 'new' ? 1 : 0) - (a.badge_type === 'new' ? 1 : 0);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-page">
          <Breadcrumb />
          <h1 className="font-heading text-3xl md:text-4xl">Ghế Ô Tô Trẻ Em</h1>
          <LoadingSpinner message="Đang tải sản phẩm..." className="py-16" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-page">
          <Breadcrumb />
          <h1 className="font-heading text-3xl">Ghế Ô Tô Trẻ Em</h1>
          <ErrorState message={error} onRetry={loadData} className="mt-8" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-page">
        <Breadcrumb />
        <h1 className="font-heading text-3xl md:text-4xl">
          Ghế Ô Tô Trẻ Em{' '}
          <span className="text-lg font-normal text-muted-foreground">({sortedProducts.length})</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-3">
              <SlidersHorizontal className="size-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortValue)}
                className="w-full bg-transparent text-sm outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-heading text-sm tracking-wide uppercase">Bộ Lọc</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs text-accent hover:underline"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {(Object.entries(filterConfig) as [FilterKey, (typeof filterConfig)[FilterKey]][]).map(
              ([key, config]) => (
                <div key={key} className="rounded-lg border border-border bg-card">
                  <button
                    type="button"
                    onClick={() => toggleFilter(key)}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium"
                  >
                    {config.label}
                    <ChevronDown
                      className={cn('size-4 transition-transform', openFilter[key] && 'rotate-180')}
                    />
                  </button>
                  {openFilter[key] && (
                    <div className="space-y-2 border-t border-border px-4 py-3">
                      {config.options.map((option) => {
                        const val = typeof option === 'object' ? option.value : option;
                        const label = typeof option === 'object' ? option.label : option;
                        const isChecked = selectedFilters[key].includes(val);
                        return (
                          <label
                            key={val}
                            className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleFilterOption(key, option)}
                              className="accent-accent"
                            />
                            <span>{label}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                </div>
              ),
            )}
          </aside>

          {/* Grid */}
          <div>
            {sortedProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border py-20 text-center">
                <Search className="size-12 text-muted-foreground/40" />
                <p className="text-muted-foreground">Không tìm thấy sản phẩm phù hợp.</p>
                <Button variant="outline" onClick={clearAllFilters}>
                  Xóa bộ lọc
                </Button>
              </div>
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/san-pham/${product.slug}`}
                      className="group relative block overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                    >
                      {product.badge && (
                        <span
                          className={cn(
                            'absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            getBadgeClass(product.badge_type),
                          )}
                        >
                          {product.badge}
                        </span>
                      )}
                      <div className="aspect-[4/3] overflow-hidden bg-muted">
                        <img
                          src={product.images?.[0] || PLACEHOLDER_IMAGE}
                          alt={product.name}
                          className="size-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                      {product.colors && product.colors.length > 0 && (
                        <div
                          className="flex items-center justify-center gap-1.5 border-t border-border px-3 py-2"
                          onClick={(e) => e.preventDefault()}
                        >
                          {product.colors.map((color, i) => (
                            <button
                              key={color.name}
                              type="button"
                              className={cn(
                                'size-6 rounded-full border-2 transition-transform hover:scale-110',
                                activeColor[product.id] === i
                                  ? 'border-accent ring-2 ring-accent/30'
                                  : 'border-border',
                              )}
                              style={{ backgroundColor: color.hex }}
                              onClick={(e) => {
                                e.preventDefault();
                                setActiveColor((prev) => ({ ...prev, [product.id]: i }));
                              }}
                              aria-label={color.name}
                            />
                          ))}
                        </div>
                      )}
                      <CardContent className="p-4">
                        <span className="text-xs text-muted-foreground uppercase">{product.brand}</span>
                        <h3 className="font-heading text-base group-hover:text-accent">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.age_range}</p>
                        <p className="mt-2 font-semibold text-accent">{product.price}</p>
                      </CardContent>
                    </Link>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Trang trước"
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? 'default' : 'outline'}
                        size="sm"
                        className={currentPage === i + 1 ? 'bg-primary text-primary-foreground' : ''}
                        onClick={() => goToPage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Trang sau"
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                    <span className="ml-2 text-sm text-muted-foreground">
                      Trang {currentPage} / {totalPages}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb() {
  return (
    <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
      <Link to="/" className="hover:text-accent">
        Trang chủ
      </Link>
      <span>/</span>
      <span className="text-foreground">Ghế Ô Tô Trẻ Em</span>
    </nav>
  );
}
