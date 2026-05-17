import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';

export default function Landing() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('skillsync-theme');
    if (saved) {
      setIsDark(saved === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('skillsync-theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDark ? 'bg-bg-primary' : 'bg-landing-bg'
    }`}>
      {/* Grain overlay for light mode */}
      {!isDark && <div className="grain-overlay" />}
      
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Hero isDark={isDark} />
      <Features isDark={isDark} />
      <HowItWorks isDark={isDark} />
      <Testimonials isDark={isDark} />
      <FAQ isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}
