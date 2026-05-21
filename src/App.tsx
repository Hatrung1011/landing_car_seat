import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatButton from '@/components/layout/ChatButton';
import Hero from '@/components/sections/Hero';
import Products from '@/components/sections/Products';
import Testimonials from '@/components/sections/Testimonials';

const TextMarquee = lazy(() => import('@/components/sections/TextMarquee'));
const WhyUs = lazy(() => import('@/components/sections/WhyUs'));
const Safety = lazy(() => import('@/components/sections/Safety'));
const Installation = lazy(() => import('@/components/sections/Installation'));
import { LoadingSpinner } from '@/components/ui/api-state';

const AllProducts = lazy(() => import('@/pages/AllProducts'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function HomeScrollHandler() {
  const location = useLocation();

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (scrollTo && location.pathname === '/') {
      requestAnimationFrame(() => {
        document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      });
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return null;
}

function LandingPage() {
  return (
    <main>
      <Hero />
      <Suspense fallback={null}>
        <TextMarquee />
        <WhyUs />
      </Suspense>
      <Products />
      <Suspense fallback={null}>
        <Safety />
      </Suspense>
      <Testimonials />
      <Suspense fallback={null}>
        <Installation />
      </Suspense>
    </main>
  );
}

function PageFallback() {
  return <LoadingSpinner className="min-h-[60vh] pt-24" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <HomeScrollHandler />
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/san-pham" element={<AllProducts />} />
          <Route path="/san-pham/:slug" element={<ProductDetail />} />
        </Routes>
      </Suspense>
      <Footer />
      <ChatButton />
    </BrowserRouter>
  );
}
