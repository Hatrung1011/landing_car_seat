import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MessageCircle, ShoppingCart, Shield, Truck, Gift, CheckCircle } from 'lucide-react';
import { fetchProductBySlug, fetchProductsCached } from '@/services/api';
import type { Product } from '@/types/product';
import { VercelTabs } from '@/components/ui/vercel-tabs';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorState, LoadingSpinner } from '@/components/ui/api-state';
import { cn } from '@/lib/utils';

const PLACEHOLDER_IMAGE = '/logo_car_seat.png';

function getBadgeClass(type?: string) {
  switch (type) {
    case 'new':
      return 'bg-green-600';
    case 'winner':
      return 'bg-amber-600';
    case 'award':
      return 'bg-purple-600';
    case 'offer':
      return 'bg-red-600';
    default:
      return 'bg-accent';
  }
}

function ProductDetailContent({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);

  const loadProduct = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    Promise.all([fetchProductBySlug(slug), fetchProductsCached()])
      .then(([found, catalog]) => {
        if (cancelled) return;
        setProduct(found);
        setAllProducts(catalog);
        setSelectedImage(0);
        setSelectedColor(0);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Không thể tải sản phẩm');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    const cleanup = loadProduct();
    return cleanup;
  }, [loadProduct]);

  if (loading) {
    return <LoadingSpinner message="Đang tải sản phẩm..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={loadProduct} />;
  }

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-heading text-2xl">Sản phẩm không tìm thấy</h2>
        <Link
          to="/san-pham"
          className={cn(buttonVariants(), 'mt-6 bg-accent text-accent-foreground hover:bg-accent/90')}
        >
          Quay lại tất cả sản phẩm
        </Link>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const tabs = [
    ...(product.specs
      ? [
        {
          label: 'Thông Số Kỹ Thuật',
          value: 'specs',
          content: (
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs).map(([key, value], i) => (
                  <tr key={key} className={cn(i % 2 === 0 && 'bg-secondary/50')}>
                    <td className="px-4 py-3 font-medium text-muted-foreground">{key}</td>
                    <td className="px-4 py-3">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ),
        },
      ]
      : []),
    ...(product.highlights?.length
      ? [
        {
          label: 'Điểm Nổi Bật',
          value: 'highlights',
          content: (
            <ul className="space-y-3">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          ),
        },
      ]
      : []),
  ];

  return (
    <>
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-accent">
          Trang chủ
        </Link>
        <span>/</span>
        <Link to="/san-pham" className="hover:text-accent">
          Ghế Ô Tô Trẻ Em
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-2xl bg-muted">
            {product.badge && (
              <span
                className={cn(
                  'absolute top-4 left-4 z-10 rounded-full px-3 py-1 text-xs font-semibold text-white',
                  getBadgeClass(product.badge_type),
                )}
              >
                {product.badge}
              </span>
            )}
            <img
              src={product.images?.[selectedImage] || PLACEHOLDER_IMAGE}
              alt={product.name}
              className="aspect-square w-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    'size-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                    selectedImage === i ? 'border-accent' : 'border-transparent',
                  )}
                >
                  <img src={img} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-sm font-medium text-accent uppercase">{product.brand}</span>
          <h1 className="mt-2 font-heading text-3xl md:text-4xl">{product.name}</h1>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {product.age_range && <span>{product.age_range}</span>}
            {product.weight && <span>{product.weight}</span>}
          </div>

          {product.description && (
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>
          )}

          <p className="mt-6 font-heading text-3xl text-accent">{product.price}</p>
          <p className="text-sm text-muted-foreground">Đã bao gồm VAT • Miễn phí lắp đặt</p>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-sm">
                Màu sắc: <strong>{product.colors[selectedColor]?.name}</strong>
              </p>
              <div className="mt-2 flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(i)}
                    className={cn(
                      'size-9 rounded-full border-2 transition-transform hover:scale-110',
                      selectedColor === i ? 'border-accent ring-2 ring-accent/30' : 'border-border',
                    )}
                    style={{ backgroundColor: color.hex }}
                    aria-label={color.name}
                    title={color.name}
                  />
                ))}
              </div>
            </div>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {product.features.map((f) => (
                <span key={f} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants(),
                'bg-accent text-accent-foreground hover:bg-accent/90',
              )}
            >
              <MessageCircle className="size-4" />
              Liên Hệ Facebook
            </a>
            <a
              href="https://shopee.vn/buihoangdiep"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'outline' })}
            >
              <ShoppingCart className="size-4" />
              Đặt Hàng
            </a>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 rounded-xl border border-border bg-secondary/30 p-4">
            {[
              { icon: Shield, label: 'Bảo hành chính hãng' },
              { icon: Truck, label: 'Giao hàng toàn quốc' },
              { icon: Gift, label: 'Miễn phí lắp đặt' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center text-xs">
                <Icon className="size-5 text-accent" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {tabs.length > 0 && (
        <div className="mt-16">
          <VercelTabs tabs={tabs} className="items-start" />
        </div>
      )}

      {relatedProducts.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-8 font-heading text-2xl">Sản Phẩm Tương Tự</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {relatedProducts.map((rp) => (
              <Link key={rp.id} to={`/san-pham/${rp.slug}`}>
                <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-md">
                  <img
                    src={rp.images?.[0] || PLACEHOLDER_IMAGE}
                    alt={rp.name}
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <CardContent className="p-4">
                    <span className="text-xs text-muted-foreground">{rp.brand}</span>
                    <h3 className="font-heading">{rp.name}</h3>
                    <p className="text-sm text-accent">{rp.price}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return (
      <div className="container-page pt-24 pb-16 text-center">
        <p>Sản phẩm không hợp lệ</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-page">
        <ProductDetailContent key={slug} slug={slug} />
      </div>
    </div>
  );
}
