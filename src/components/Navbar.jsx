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

        <a href="https://www.facebook.com/share/1Cvxse99kA/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="navbar__cta btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12.037C22 6.494 17.523 2 12 2S2 6.494 2 12.037c0 4.707 3.229 8.656 7.584 9.741v-6.674H7.522v-3.067h2.062v-1.322c0-3.416 1.54-5 4.882-5 .634 0 1.727.125 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.56 3.067h-2.706V22C18.164 21.4 22 17.168 22 12.037z" />
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
