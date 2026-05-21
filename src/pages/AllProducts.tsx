import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { fetchProducts } from '@/services/api';
import type { Product } from '@/types/product';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useScrollAnimations();

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container-page">
        <div className="mb-12 text-center">
          <span className="section-label">Bộ Sưu Tập</span>
          <h1 className="mt-3 font-heading text-4xl">Tất Cả Sản Phẩm</h1>
          <p className="mt-4 text-muted-foreground">
            Ghế ô tô trẻ em cao cấp nhập khẩu chính hãng từ châu Âu
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="size-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
            <p className="mt-4 text-muted-foreground">Đang tải sản phẩm...</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={`/san-pham/${product.slug}`} className="group block h-full">
                  <Card className="h-full overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                      <img
                        src={product.images?.[0] || 'https://via.placeholder.com/600x400'}
                        alt={product.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className="absolute top-3 left-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <span className="text-xs text-muted-foreground uppercase">{product.brand}</span>
                      <h2 className="mt-1 font-heading text-lg group-hover:text-accent">{product.name}</h2>
                      <p className="text-sm text-muted-foreground">{product.age_range}</p>
                      <p className="mt-2 font-semibold text-accent">{product.price}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
