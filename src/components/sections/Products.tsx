import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { fetchProducts } from '@/services/api';
import type { Product } from '@/types/product';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ErrorState, ProductCardSkeleton } from '@/components/ui/api-state';

const PLACEHOLDER_IMAGE = '/logo_car_seat.png';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchProducts()
      .then((data) => setProducts(data.slice(0, 3)))
      .catch((err) => setError(err instanceof Error ? err.message : 'Không thể tải sản phẩm'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <section id="san-pham" className="py-24">
      <div className="container-page">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="section-label animate-on-scroll">Bộ Sưu Tập</span>
          <h2 className="animate-on-scroll scroll-delay-1 mt-3 font-heading text-3xl md:text-4xl">
            Ghế Ô Tô Cao Cấp Cho Mọi Độ Tuổi
          </h2>
          <p className="animate-on-scroll scroll-delay-2 mt-4 text-muted-foreground">
            Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng từ các thương hiệu hàng đầu châu Âu, đảm bảo
            an toàn và phong cách.
          </p>
        </div>

        {error ? (
          <ErrorState message={error} onRetry={loadProducts} />
        ) : loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Link to={`/san-pham/${product.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden border-border/60 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.images?.[0] || PLACEHOLDER_IMAGE}
                        alt={product.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className="absolute top-4 left-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                          {product.badge}
                        </span>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
                          Xem Chi Tiết
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-3 flex flex-wrap gap-2">
                        {product.features?.slice(0, 2).map((f) => (
                          <span
                            key={f}
                            className="rounded-md bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-heading text-lg group-hover:text-accent">{product.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{product.age_range}</p>
                      <p className="mt-3 font-semibold text-accent">{product.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="animate-on-scroll scroll-delay-4 mt-12 text-center">
          <Link
            to="/san-pham"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className: 'border-primary text-primary',
            })}
          >
            Xem Tất Cả Sản Phẩm
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
