import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(0);
    const [activeTab, setActiveTab] = useState('specs');

    useEffect(() => {
        setLoading(true);
        setSelectedImage(0);
        setSelectedColor(0);
        setActiveTab('specs');
        fetchProducts()
            .then((data) => {
                setAllProducts(data);
                const found = data.find((p) => p.slug === slug);
                setProduct(found || null);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="pd">
                <div className="pd__spacer"></div>
                <div className="container">
                    <div className="loader-wrapper">
                        <div className="loader"></div>
                        <p>Đang tải sản phẩm...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pd">
                <div className="pd__spacer"></div>
                <div className="container pd__not-found">
                    <h2>Sản phẩm không tìm thấy</h2>
                    <Link to="/san-pham" className="btn btn-primary">Quay lại tất cả sản phẩm</Link>
                </div>
            </div>
        );
    }

    const getBadgeClass = (type) => {
        switch (type) {
            case 'new': return 'pd__badge--new';
            case 'winner': return 'pd__badge--winner';
            case 'award': return 'pd__badge--award';
            case 'offer': return 'pd__badge--offer';
            default: return '';
        }
    };

    // Get related products (same category, excluding current)
    const relatedProducts = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <div className="pd">
            <div className="pd__spacer"></div>

            <div className="container">
                {/* Breadcrumb */}
                <nav className="pd__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span>/</span>
                    <Link to="/san-pham">Ghế Ô Tô Trẻ Em</Link>
                    <span>/</span>
                    <span className="pd__breadcrumb-current">{product.name}</span>
                </nav>

                {/* Product Main Section */}
                <div className="pd__main">
                    {/* Image Gallery */}
                    <div className="pd__gallery">
                        <div className="pd__gallery-main">
                            {product.badge && (
                                <span className={`pd__badge ${getBadgeClass(product.badge_type)}`}>
                                    {product.badge}
                                </span>
                            )}
                            <img
                                src={product.images && product.images[selectedImage] ? product.images[selectedImage] : 'https://via.placeholder.com/800x600'}
                                alt={`${product.name} - Ảnh ${selectedImage + 1}`}
                                className="pd__gallery-image"
                            />
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="pd__gallery-thumbs">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`pd__thumb ${selectedImage === i ? 'pd__thumb--active' : ''}`}
                                        onClick={() => setSelectedImage(i)}
                                    >
                                        <img src={img} alt={`Thumbnail ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="pd__info">
                        <span className="pd__brand">{product.brand}</span>
                        <h1 className="pd__name">{product.name}</h1>

                        <div className="pd__meta">
                            <span className="pd__meta-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                {product.age_range}
                            </span>
                            {product.weight && (
                                <span className="pd__meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                        <line x1="7" y1="7" x2="7.01" y2="7" />
                                    </svg>
                                    {product.weight}
                                </span>
                            )}
                        </div>

                        {product.description && <p className="pd__description">{product.description}</p>}

                        <div className="pd__price-block">
                            <span className="pd__price">{product.price}</span>
                            <span className="pd__price-note">Đã bao gồm VAT • Miễn phí lắp đặt</span>
                        </div>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="pd__colors">
                                <span className="pd__colors-label">
                                    Màu sắc: <strong>{product.colors[selectedColor]?.name}</strong>
                                </span>
                                <div className="pd__colors-list">
                                    {product.colors.map((color, i) => (
                                        <button
                                            key={i}
                                            className={`pd__color-btn ${selectedColor === i ? 'pd__color-btn--active' : ''}`}
                                            style={{ backgroundColor: color.hex }}
                                            onClick={() => setSelectedColor(i)}
                                            aria-label={color.name}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Feature Tags */}
                        {product.features && product.features.length > 0 && (
                            <div className="pd__features">
                                {product.features.map((f, i) => (
                                    <span key={i} className="pd__feature-tag">{f}</span>
                                ))}
                            </div>
                        )}

                        {/* CTA Buttons */}
                        <div className="pd__cta">
                            <a href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="btn btn-primary pd__cta-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z" />
                                </svg>
                                Liên Hệ Facebook
                            </a>
                            <a href="https://shopee.vn/buihoangdiep" target="_blank" rel="noopener noreferrer" className="btn btn-outline pd__cta-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                Đặt Hàng
                            </a>
                        </div>

                        {/* Trust Signals */}
                        <div className="pd__trust">
                            <div className="pd__trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                <span>Bảo hành chính hãng</span>
                            </div>
                            <div className="pd__trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="1" y="3" width="15" height="13" />
                                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                    <circle cx="5.5" cy="18.5" r="2.5" />
                                    <circle cx="18.5" cy="18.5" r="2.5" />
                                </svg>
                                <span>Giao hàng toàn quốc</span>
                            </div>
                            <div className="pd__trust-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 12 20 22 4 22 4 12" />
                                    <rect x="2" y="7" width="20" height="5" />
                                    <line x1="12" y1="22" x2="12" y2="7" />
                                    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                                    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                                </svg>
                                <span>Miễn phí lắp đặt</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs: Specs + Highlights */}
                {(product.specs || product.highlights) && (
                    <div className="pd__tabs-section">
                        <div className="pd__tabs">
                            {product.specs && (
                                <button
                                    className={`pd__tab ${activeTab === 'specs' ? 'pd__tab--active' : ''}`}
                                    onClick={() => setActiveTab('specs')}
                                >
                                    Thông Số Kỹ Thuật
                                </button>
                            )}
                            {product.highlights && product.highlights.length > 0 && (
                                <button
                                    className={`pd__tab ${activeTab === 'highlights' ? 'pd__tab--active' : ''}`}
                                    onClick={() => setActiveTab('highlights')}
                                >
                                    Điểm Nổi Bật
                                </button>
                            )}
                        </div>

                        <div className="pd__tab-content">
                            {activeTab === 'specs' && product.specs && (
                                <div className="pd__specs">
                                    <table className="pd__specs-table">
                                        <tbody>
                                            {Object.entries(product.specs).map(([key, value], i) => (
                                                <tr key={i} className={i % 2 === 0 ? 'pd__specs-row--even' : ''}>
                                                    <td className="pd__specs-key">{key}</td>
                                                    <td className="pd__specs-value">{value}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            {activeTab === 'highlights' && product.highlights && (
                                <div className="pd__highlights">
                                    <ul className="pd__highlights-list">
                                        {product.highlights.map((h, i) => (
                                            <li key={i} className="pd__highlight-item">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                    <polyline points="22 4 12 14.01 9 11.01" />
                                                </svg>
                                                <span>{h}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="pd__related">
                        <h2 className="pd__related-title">Sản Phẩm Tương Tự</h2>
                        <div className="pd__related-grid">
                            {relatedProducts.map((rp) => (
                                <Link key={rp.id} to={`/san-pham/${rp.slug}`} className="pd__related-card">
                                    <div className="pd__related-image">
                                        <img src={rp.images && rp.images[0] ? rp.images[0] : 'https://via.placeholder.com/400x300'} alt={rp.name} />
                                    </div>
                                    <div className="pd__related-info">
                                        <span className="pd__related-brand">{rp.brand}</span>
                                        <h3 className="pd__related-name">{rp.name}</h3>
                                        <p className="pd__related-age">{rp.age_range}</p>
                                        <p className="pd__related-price">{rp.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
