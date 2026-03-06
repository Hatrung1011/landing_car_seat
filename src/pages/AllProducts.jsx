import { useState } from 'react';
import { Link } from 'react-router-dom';
import allProducts from '../data/products';
import './AllProducts.css';

const filterConfig = {
    brand: {
        label: 'Thương Hiệu',
        options: ['Nhật Hạ Platinum', 'Nhật Hạ Gold'],
    },
    category: {
        label: 'Độ Tuổi',
        options: [
            { value: 'infant', label: 'Sơ sinh — 4 tuổi' },
            { value: 'toddler', label: '1 — 7 tuổi' },
            { value: 'child', label: '3 — 12 tuổi' },
        ],
    },
    features: {
        label: 'Tính Năng',
        options: ['ISOFIX', 'Xoay 360°', 'i-Size', 'Da Ý', 'Siêu nhẹ', 'Thoáng khí'],
    },
};

const sortOptions = [
    { value: 'recommended', label: 'Đề xuất' },
    { value: 'price-asc', label: 'Giá: Thấp → Cao' },
    { value: 'price-desc', label: 'Giá: Cao → Thấp' },
    { value: 'newest', label: 'Mới nhất' },
];

const ITEMS_PER_PAGE = 6;

const AllProducts = () => {
    const [sortBy, setSortBy] = useState('recommended');
    const [openFilter, setOpenFilter] = useState({ brand: true, category: true, features: false });
    const [selectedFilters, setSelectedFilters] = useState({ brand: [], category: [], features: [] });
    const [activeColor, setActiveColor] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    const toggleFilter = (key) => {
        setOpenFilter((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleFilterOption = (filterKey, option) => {
        setSelectedFilters((prev) => {
            const current = prev[filterKey];
            const val = typeof option === 'object' ? option.value : option;
            return {
                ...prev,
                [filterKey]: current.includes(val)
                    ? current.filter((v) => v !== val)
                    : [...current, val],
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
        if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) return false;
        if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) return false;
        if (selectedFilters.features.length > 0) {
            const hasFeature = selectedFilters.features.some((f) => product.features.includes(f));
            if (!hasFeature) return false;
        }
        return true;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-asc') return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''));
        if (sortBy === 'price-desc') return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''));
        if (sortBy === 'newest') return (b.badgeType === 'new' ? 1 : 0) - (a.badgeType === 'new' ? 1 : 0);
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getBadgeClass = (type) => {
        switch (type) {
            case 'new': return 'allproducts__badge--new';
            case 'winner': return 'allproducts__badge--winner';
            case 'award': return 'allproducts__badge--award';
            case 'offer': return 'allproducts__badge--offer';
            default: return '';
        }
    };

    return (
        <div className="allproducts">
            {/* Top Navbar spacer */}
            <div className="allproducts__spacer"></div>

            <div className="allproducts__container container">
                {/* Breadcrumb */}
                <nav className="allproducts__breadcrumb">
                    <Link to="/">Trang chủ</Link>
                    <span className="allproducts__breadcrumb-sep">/</span>
                    <span>Ghế Ô Tô Trẻ Em</span>
                </nav>

                {/* Page Header */}
                <div className="allproducts__page-header">
                    <h1 className="allproducts__page-title">
                        Ghế Ô Tô Trẻ Em <span className="allproducts__count">({sortedProducts.length})</span>
                    </h1>
                </div>

                <div className="allproducts__layout">
                    {/* Sidebar Filters */}
                    <aside className="allproducts__sidebar">
                        {/* Sort (mobile-first, also shown in sidebar on desktop like Cybex) */}
                        <div className="allproducts__sort-section">
                            <button className="allproducts__sort-btn">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="14" y2="12" />
                                    <line x1="4" y1="18" x2="8" y2="18" />
                                </svg>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="allproducts__sort-select"
                                >
                                    {sortOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </button>
                        </div>

                        {/* Filters header */}
                        <div className="allproducts__filters-header">
                            <h3 className="allproducts__filters-title">Bộ Lọc</h3>
                            {hasActiveFilters && (
                                <button className="allproducts__clear-btn" onClick={clearAllFilters}>
                                    Xóa tất cả
                                </button>
                            )}
                        </div>

                        {/* Filter Groups */}
                        {Object.entries(filterConfig).map(([key, config]) => (
                            <div key={key} className="allproducts__filter-group">
                                <button
                                    className="allproducts__filter-toggle"
                                    onClick={() => toggleFilter(key)}
                                >
                                    <span>{config.label}</span>
                                    <svg
                                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                        className={`allproducts__filter-arrow ${openFilter[key] ? 'allproducts__filter-arrow--open' : ''}`}
                                    >
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                {openFilter[key] && (
                                    <div className="allproducts__filter-options">
                                        {config.options.map((option) => {
                                            const val = typeof option === 'object' ? option.value : option;
                                            const label = typeof option === 'object' ? option.label : option;
                                            const isChecked = selectedFilters[key].includes(val);
                                            return (
                                                <label key={val} className="allproducts__filter-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={isChecked}
                                                        onChange={() => toggleFilterOption(key, option)}
                                                        className="allproducts__checkbox"
                                                    />
                                                    <span className="allproducts__checkmark"></span>
                                                    <span>{label}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </aside>

                    {/* Products Grid */}
                    <div className="allproducts__grid-area">
                        {sortedProducts.length === 0 ? (
                            <div className="allproducts__empty">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <p>Không tìm thấy sản phẩm phù hợp.</p>
                                <button className="btn btn-outline" onClick={clearAllFilters}>Xóa bộ lọc</button>
                            </div>
                        ) : (
                            <>
                                <div className="allproducts__grid">
                                    {paginatedProducts.map((product) => (
                                        <Link key={product.id} to={`/san-pham/${product.slug}`} className="allproducts__card">
                                            {product.badge && (
                                                <span className={`allproducts__badge ${getBadgeClass(product.badgeType)}`}>
                                                    {product.badge}
                                                </span>
                                            )}
                                            <div className="allproducts__card-image">
                                                <img src={product.images[0]} alt={product.name} />
                                            </div>
                                            {/* Color swatches */}
                                            <div className="allproducts__colors">
                                                <button className="allproducts__color-nav allproducts__color-nav--prev" aria-label="Previous color" onClick={(e) => e.preventDefault()}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                                                </button>
                                                {product.colors.map((color, i) => (
                                                    <button
                                                        key={i}
                                                        className={`allproducts__color-swatch ${activeColor[product.id] === i ? 'allproducts__color-swatch--active' : ''}`}
                                                        style={{ backgroundColor: color.hex }}
                                                        onClick={(e) => { e.preventDefault(); setActiveColor((prev) => ({ ...prev, [product.id]: i })); }}
                                                        aria-label={color.name}
                                                    />
                                                ))}
                                                <button className="allproducts__color-nav allproducts__color-nav--next" aria-label="Next color" onClick={(e) => e.preventDefault()}>
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                                                </button>
                                            </div>
                                            <div className="allproducts__card-info">
                                                <span className="allproducts__card-brand">{product.brand}</span>
                                                <h3 className="allproducts__card-name">{product.name}</h3>
                                                <p className="allproducts__card-age">{product.ageRange}</p>
                                                <p className="allproducts__card-price">{product.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="allproducts__pagination">
                                        <button
                                            className="allproducts__page-btn allproducts__page-btn--nav"
                                            onClick={() => goToPage(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            aria-label="Previous page"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="15 18 9 12 15 6" />
                                            </svg>
                                        </button>

                                        {[...Array(totalPages)].map((_, i) => (
                                            <button
                                                key={i}
                                                className={`allproducts__page-btn ${currentPage === i + 1 ? 'allproducts__page-btn--active' : ''}`}
                                                onClick={() => goToPage(i + 1)}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}

                                        <button
                                            className="allproducts__page-btn allproducts__page-btn--nav"
                                            onClick={() => goToPage(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            aria-label="Next page"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="9 18 15 12 9 6" />
                                            </svg>
                                        </button>

                                        <span className="allproducts__page-info">
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
};

export default AllProducts;
