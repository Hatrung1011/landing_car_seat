import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useScrollAnimations } from '@/hooks/useScrollAnimations';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatButton from '@/components/layout/ChatButton';
import Hero from '@/components/sections/Hero';
import WhyUs from '@/components/sections/WhyUs';
import Products from '@/components/sections/Products';
import Safety from '@/components/sections/Safety';
import Testimonials from '@/components/sections/Testimonials';
import Installation from '@/components/sections/Installation';
import AllProducts from '@/pages/AllProducts';
import ProductDetail from '@/pages/ProductDetail';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function LandingPage() {
  useScrollAnimations();

  return (
    <main>
      <Hero />
      <WhyUs />
      <Products />
      <Safety />
      <Testimonials />
      <Installation />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/san-pham" element={<AllProducts />} />
        <Route path="/san-pham/:slug" element={<ProductDetail />} />
      </Routes>
      <Footer />
      <ChatButton />
    </BrowserRouter>
  );
}
