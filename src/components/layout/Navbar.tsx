import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/#features', label: 'Features' },
  { path: '/#about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <div className="max-w-5xl mx-auto">
        <nav className={`px-6 py-3 flex items-center justify-between rounded-full ${
          isDark 
            ? 'bg-bg-card/90 backdrop-blur-xl border border-border' 
            : 'bg-white/70 backdrop-blur-xl border border-landing-stone-200'
        }`}>
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-landing-coral flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className={`font-landing font-medium text-sm hidden sm:block ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>
              SkillSync
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.path}
                className={`px-4 py-2 text-sm font-landing font-medium rounded-full transition-all duration-200 ${
                  isDark 
                    ? 'text-text-secondary hover:text-text-primary' 
                    : 'text-landing-muted hover:text-landing-text'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme} 
              className={`p-2 rounded-full transition-colors ${
                isDark ? 'text-text-secondary hover:text-text-primary' : 'text-landing-muted hover:text-landing-text'
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className={`hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-landing font-medium rounded-full transition-colors ${
                isDark 
                  ? 'text-text-secondary hover:text-text-primary' 
                  : 'text-landing-muted hover:text-landing-text'
              }`}
            >
              Login
            </button>
            <button 
              onClick={() => navigate('/signup')} 
              className={`px-5 py-2 text-sm font-landing font-semibold rounded-full transition-all ${
                isDark 
                  ? 'bg-gold text-black hover:bg-gold-light' 
                  : 'bg-landing-text text-white hover:bg-landing-text/90'
              }`}
            >
              Get started
            </button>

            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className={`md:hidden p-2 ${isDark ? 'text-text-primary' : 'text-landing-text'}`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-5xl mx-auto mt-2 px-4"
          >
            <div className={`p-4 rounded-2xl flex flex-col gap-2 ${
              isDark ? 'bg-bg-card/90 backdrop-blur-xl border border-border' : 'bg-white/70 backdrop-blur-xl border border-landing-stone-200'
            }`}>
              {navLinks.map((link) => (
                <a 
                  key={link.path} 
                  href={link.path} 
                  onClick={() => setMobileOpen(false)} 
                  className={`px-4 py-3 font-landing font-medium rounded-xl transition-colors ${
                    isDark ? 'text-text-secondary hover:text-text-primary' : 'text-landing-muted hover:text-landing-text'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className={`border-t my-2 ${isDark ? 'border-border' : 'border-landing-stone-200'}`} />
              <button 
                onClick={() => { navigate('/login'); setMobileOpen(false); }} 
                className={`px-4 py-3 font-landing font-medium text-left rounded-xl ${
                  isDark ? 'text-text-secondary hover:text-text-primary' : 'text-landing-muted hover:text-landing-text'
                }`}
              >
                Login
              </button>
              <button 
                onClick={() => { navigate('/signup'); setMobileOpen(false); }} 
                className={`px-4 py-3 font-landing font-semibold rounded-xl text-center ${
                  isDark ? 'bg-gold text-black' : 'bg-landing-text text-white'
                }`}
              >
                Get started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
