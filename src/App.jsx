import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyUs from './components/WhyUs';
import Products from './components/Products';
import Safety from './components/Safety';
import Testimonials from './components/Testimonials';
import Installation from './components/Installation';
import Footer from './components/Footer';
import ChatButton from './components/ChatButton';
import AllProducts from './pages/AllProducts';
import ProductDetail from './pages/ProductDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function useScrollAnimations() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Re-observe on each render to catch new elements
    const timeout = setTimeout(() => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  });
}

function LandingPage() {
  useScrollAnimations();

  return (
    <>
      <main>
        <Hero />
        <WhyUs />
        <Products />
        <Safety />
        <Testimonials />
        <Installation />
      </main>
    </>
  );
}

function AllProductsPage() {
  return <AllProducts />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/san-pham" element={<AllProductsPage />} />
        <Route path="/san-pham/:slug" element={<ProductDetail />} />
      </Routes>
      <Footer />
      <ChatButton />
    </BrowserRouter>
  );
}

export default App;
