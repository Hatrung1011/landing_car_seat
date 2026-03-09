import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (!isHome) {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  // On non-home pages, navbar should always be scrolled style (solid bg)
  const navScrolled = !isHome || scrolled;

  return (
    <nav className={`navbar ${navScrolled ? 'navbar--scrolled' : ''}`} id="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <span className="navbar__logo-icon">
            <img src="/logo_car_seat.png" alt="Nhật Hạ" style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          </span>
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">Nhật Hạ Store</span>
            <span className="navbar__brand-tagline">Premium Car Seats</span>
          </div>
        </Link>

        <ul className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <li><a href="#gioi-thieu" onClick={(e) => { e.preventDefault(); scrollToSection('gioi-thieu'); }}>Giới Thiệu</a></li>
          <li><a href="#san-pham" onClick={(e) => { e.preventDefault(); scrollToSection('san-pham'); }}>Sản Phẩm</a></li>
          <li><a href="#an-toan" onClick={(e) => { e.preventDefault(); scrollToSection('an-toan'); }}>An Toàn</a></li>
          <li><a href="#danh-gia" onClick={(e) => { e.preventDefault(); scrollToSection('danh-gia'); }}>Đánh Giá</a></li>
          <li><a href="#dich-vu" onClick={(e) => { e.preventDefault(); scrollToSection('dich-vu'); }}>Dịch Vụ</a></li>
        </ul>

        <a href="https://zalo.me/0368081193" target="_blank" rel="noopener noreferrer" className="navbar__cta btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Liên Hệ
        </a>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
