import './Hero.css';

const Hero = () => {
    return (
        <section className="hero" id="hero">
            <div className="hero__overlay"></div>
            <div className="hero__particles">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className={`hero__particle hero__particle--${i + 1}`}></div>
                ))}
            </div>
            <div className="hero__content container">
                <div className="hero__badge">
                    <span className="hero__badge-dot"></span>
                    Nhập khẩu chính hãng từ Châu Âu
                </div>
                <h1 className="hero__title">
                    Bảo Vệ <span className="hero__title-accent">Hoàn Hảo</span>
                    <br />Cho Hành Trình Của Bé
                </h1>
                <p className="hero__subtitle">
                    Ghế ô tô trẻ em cao cấp với chất liệu da Ý, thiết kế công thái học và đạt chuẩn an toàn ECE R129 — Mang đến sự an toàn tuyệt đối cho thiên thần nhỏ của bạn.
                </p>
                <div className="hero__actions">
                    <a href="#san-pham" className="btn btn-primary btn-lg hero__btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="7" height="7" />
                            <rect x="14" y="3" width="7" height="7" />
                            <rect x="14" y="14" width="7" height="7" />
                            <rect x="3" y="14" width="7" height="7" />
                        </svg>
                        Khám Phá Bộ Sưu Tập
                    </a>
                    <a href="#dich-vu" className="btn btn-secondary btn-lg hero__btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                        Đặt Lịch Tư Vấn
                    </a>
                </div>
                <div className="hero__trust">
                    <div className="hero__trust-item">
                        <div className="hero__trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                        </div>
                        <div>
                            <strong>An toàn ECE R129</strong>
                            <span>Chuẩn châu Âu</span>
                        </div>
                    </div>
                    <div className="hero__trust-divider"></div>
                    <div className="hero__trust-item">
                        <div className="hero__trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </div>
                        <div>
                            <strong>Chất liệu cao cấp</strong>
                            <span>Da Ý nhập khẩu</span>
                        </div>
                    </div>
                    <div className="hero__trust-divider"></div>
                    <div className="hero__trust-item">
                        <div className="hero__trust-icon">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <div>
                            <strong>Bảo hành 5 năm</strong>
                            <span>Hỗ trợ trọn đời</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hero__scroll-indicator">
                <span>Cuộn xuống</span>
                <div className="hero__scroll-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default Hero;
