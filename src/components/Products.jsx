import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                // Show first 3 products for the landing page preview
                setProducts(data.slice(0, 3));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section className="products" id="san-pham">
                <div className="container">
                    <div className="products__header text-center">
                        <span className="section-label animate-on-scroll">Bộ Sưu Tập</span>
                        <h2 className="section-title animate-on-scroll delay-1">
                            Ghế Ô Tô Cao Cấp Cho Mọi Độ Tuổi
                        </h2>
                    </div>
                    <div className="products__grid">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="products__card products__card--skeleton animate-on-scroll">
                                <div className="products__card-image" style={{ background: 'var(--color-surface)', aspectRatio: '4/3' }} />
                                <div className="products__card-body">
                                    <div style={{ height: '14px', width: '60%', background: 'var(--color-surface)', borderRadius: '4px', marginBottom: '8px' }} />
                                    <div style={{ height: '18px', width: '80%', background: 'var(--color-surface)', borderRadius: '4px', marginBottom: '8px' }} />
                                    <div style={{ height: '14px', width: '40%', background: 'var(--color-surface)', borderRadius: '4px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="products" id="san-pham">
            <div className="container">
                <div className="products__header text-center">
                    <span className="section-label animate-on-scroll">Bộ Sưu Tập</span>
                    <h2 className="section-title animate-on-scroll delay-1">
                        Ghế Ô Tô Cao Cấp Cho Mọi Độ Tuổi
                    </h2>
                    <p className="section-subtitle centered animate-on-scroll delay-2">
                        Mỗi sản phẩm đều được tuyển chọn kỹ lưỡng từ các thương hiệu hàng đầu châu Âu, đảm bảo an toàn và phong cách.
                    </p>
                </div>
                <div className="products__grid">
                    {products.map((product, index) => (
                        <Link key={product.id} to={`/san-pham/${product.slug}`} className={`products__card animate-on-scroll delay-${index + 2}`}>
                            <div className="products__card-image">
                                <img src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/600x400'} alt={product.name} />
                                {product.badge && <span className="products__card-tag">{product.badge}</span>}
                                <div className="products__card-overlay">
                                    <span className="btn btn-primary">Xem Chi Tiết</span>
                                </div>
                            </div>
                            <div className="products__card-body">
                                <div className="products__card-features">
                                    {product.features && product.features.map((f, i) => (
                                        <span key={i} className="products__card-feature">{f}</span>
                                    ))}
                                </div>
                                <h3 className="products__card-name">{product.name}</h3>
                                <p className="products__card-age">{product.age_range}</p>
                                <div className="products__card-pricing">
                                    <span className="products__card-price">{product.price}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="products__cta text-center animate-on-scroll delay-5">
                    <Link to="/san-pham" className="btn btn-outline">
                        Xem Tất Cả Sản Phẩm
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Products;
