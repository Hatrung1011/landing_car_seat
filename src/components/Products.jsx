import { Link } from 'react-router-dom';
import './Products.css';

const products = [
    {
        id: 1,
        name: 'Nhật Hạ Cocoon',
        slug: 'nhat-ha-cocoon-plus',
        ageRange: 'Sơ sinh — 12 tháng',
        price: '12.900.000₫',
        originalPrice: '15.900.000₫',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80',
        tag: 'Bestseller',
        features: ['Xoay 360°', 'ISOFIX', 'Da Ý'],
    },
    {
        id: 2,
        name: 'Nhật Hạ Explorer',
        slug: 'sirona-t-i-size',
        ageRange: '1 — 4 tuổi',
        price: '14.500.000₫',
        originalPrice: '18.000.000₫',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&q=80',
        tag: 'Mới nhất',
        features: ['5 tư thế ngả', 'ISOFIX', 'Thoáng khí'],
    },
    {
        id: 3,
        name: 'Nhật Hạ Guardian',
        slug: 'pallas-g3',
        ageRange: '4 — 12 tuổi',
        price: '9.800.000₫',
        originalPrice: '12.500.000₫',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
        tag: 'Hot Deal',
        features: ['Tăng trưởng cùng bé', 'ISOFIX', 'Siêu nhẹ'],
    },
];

const Products = () => {
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
                                <img src={product.image} alt={product.name} />
                                <span className="products__card-tag">{product.tag}</span>
                                <div className="products__card-overlay">
                                    <span className="btn btn-primary">Xem Chi Tiết</span>
                                </div>
                            </div>
                            <div className="products__card-body">
                                <div className="products__card-features">
                                    {product.features.map((f, i) => (
                                        <span key={i} className="products__card-feature">{f}</span>
                                    ))}
                                </div>
                                <h3 className="products__card-name">{product.name}</h3>
                                <p className="products__card-age">{product.ageRange}</p>
                                <div className="products__card-pricing">
                                    <span className="products__card-price">{product.price}</span>
                                    <span className="products__card-original">{product.originalPrice}</span>
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
