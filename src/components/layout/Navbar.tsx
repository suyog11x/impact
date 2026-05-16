import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import StatusTag from '../ui/StatusTag';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/#features', label: 'Features' },
  { path: '/#about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
    >
      <div className="max-w-[1600px] mx-auto">
        <nav className="glass-strong px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center">
              <span className="text-black font-heading font-bold text-lg tracking-tight">S</span>
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight text-text-primary hidden sm:block">
              Skill<span className="text-lime">Sync</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center px-1 py-1 glass rounded-full">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  className={`px-5 py-2 text-sm font-body tracking-tight rounded-full transition-all duration-200 ${
                    location.pathname === link.path ? 'bg-lime/10 text-lime' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <StatusTag />
            <button onClick={() => navigate('/login')} className="flex items-center gap-2 px-4 py-2 text-sm font-body text-text-secondary hover:text-text-primary transition-colors">
              <LogIn size={16} /> Login
            </button>
            <button onClick={() => navigate('/signup')} className="flex items-center gap-2 px-5 py-2 bg-lime text-black text-sm font-body font-medium rounded-full hover:scale-105 transition-all glow-lime-sm">
              <UserPlus size={16} /> Signup
            </button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-text-primary">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-[1600px] mx-auto mt-2 px-4"
          >
            <div className="glass-strong p-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.path} href={link.path} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-text-secondary hover:text-lime transition-colors font-body rounded-lg hover:bg-white/5">
                  {link.label}
                </a>
              ))}
              <hr className="border-white/5 my-2" />
              <button onClick={() => { navigate('/login'); setMobileOpen(false); }} className="px-4 py-3 text-text-secondary hover:text-text-primary transition-colors font-body text-left">Login</button>
              <button onClick={() => { navigate('/signup'); setMobileOpen(false); }} className="px-4 py-3 bg-lime text-black font-body font-medium rounded-xl text-center">Signup</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
