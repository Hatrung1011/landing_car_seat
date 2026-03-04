import { useEffect } from 'react';
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

function App() {
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

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Products />
        <Safety />
        <Testimonials />
        <Installation />
      </main>
      <Footer />
      <ChatButton />
    </>
  );
}

export default App;
