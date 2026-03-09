import { useState } from 'react';
import './Footer.css';

const Footer = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ gửi thông tin ưu đãi sớm nhất.');
            setEmail('');
        }
    };

    return (
        <footer className="footer" id="lien-he">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__col footer__col--brand">
                        <div className="footer__brand">
                            <span className="footer__logo-icon">
                                <img src="/logo_car_seat.png" alt="Nhật Hạ" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
                            </span>
                            <div>
                                <span className="footer__brand-name">Nhật Hạ Store</span>
                                <span className="footer__brand-tagline">Premium Car Seats</span>
                            </div>
                        </div>
                        <p className="footer__brand-desc">
                            Cửa hàng ghế ô tô trẻ em cao cấp nhập khẩu chính hãng từ châu Âu. An toàn — Sang trọng — Đẳng cấp.
                        </p>
                        <div className="footer__social">
                            <a href="#" aria-label="Facebook" className="footer__social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="footer__social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a href="#" aria-label="YouTube" className="footer__social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white" />
                                </svg>
                            </a>
                            <a href="#" aria-label="TikTok" className="footer__social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.11v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.26 8.26 0 0 0 4.83 1.56V6.84a4.86 4.86 0 0 1-1.07-.15z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Thông Tin</h4>
                        <ul className="footer__links">
                            <li><a href="#">Về Chúng Tôi</a></li>
                            <li><a href="#">Chính Sách Bảo Hành</a></li>
                            <li><a href="#">Hướng Dẫn Chọn Ghế</a></li>
                            <li><a href="#">Blog & Kiến Thức</a></li>
                            <li><a href="#">Câu Hỏi Thường Gặp</a></li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Liên Hệ</h4>
                        <ul className="footer__contact">
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                                </svg>
                                123 Nguyễn Huệ, Quận 1, TP.HCM
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <a href="https://zalo.me/0368081193" target="_blank" rel="noopener noreferrer">0368 081 193 (Zalo)</a>
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                                info@nhathastore.vn
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                                </svg>
                                T2 - CN: 8:00 - 21:00
                            </li>
                        </ul>
                    </div>

                    <div className="footer__col">
                        <h4 className="footer__col-title">Nhận Ưu Đãi</h4>
                        <p className="footer__newsletter-desc">Đăng ký để nhận thông tin ưu đãi độc quyền và hướng dẫn chọn ghế an toàn cho bé.</p>
                        <form className="footer__newsletter" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                placeholder="Email của bạn..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="footer__newsletter-input"
                                required
                            />
                            <button type="submit" className="footer__newsletter-btn">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p>© 2024 Nhật Hạ Store. Tất cả quyền được bảo lưu.</p>
                    <div className="footer__payment">
                        <span>Thanh toán:</span>
                        <div className="footer__payment-icons">
                            <span className="footer__payment-icon">VISA</span>
                            <span className="footer__payment-icon">MC</span>
                            <span className="footer__payment-icon">MOMO</span>
                            <span className="footer__payment-icon">COD</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
