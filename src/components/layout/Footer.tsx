import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Share2, Link2, Code2 } from 'lucide-react';

interface FooterProps {
  isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a waitlist API
    setEmail('');
  };

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-bg-card' : 'bg-landing-stone-50'}`}>
      {/* Floating gradients */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] ${
          isDark ? 'bg-gold/5' : 'bg-landing-coral/20'
        }`} 
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className={`absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[150px] ${
          isDark ? 'bg-gold/5' : 'bg-landing-lavender/20'
        }`} 
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20">
        {/* CTA Section */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 ${
              isDark ? 'bg-bg-elevated' : 'bg-landing-text'
            }`}>
              <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-gold' : 'bg-landing-coral'}`} />
            </div>

            <h2 className={`font-landing font-bold text-4xl md:text-5xl tracking-tight mb-4 ${
              isDark ? 'text-text-primary' : 'text-landing-text'
            }`}>
              Ready to accelerate your career?
            </h2>
            <p className={`font-landing text-lg max-w-md mx-auto mb-8 ${
              isDark ? 'text-text-secondary' : 'text-landing-muted'
            }`}>
              Join thousands of students who have transformed their placement preparation with SkillSync AI.
            </p>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className={`w-full px-6 py-4 rounded-full font-landing text-base focus:outline-none ${
                  isDark 
                    ? 'bg-bg-elevated text-text-primary placeholder:text-text-muted border border-border' 
                    : 'bg-white text-landing-text placeholder:text-landing-stone-400 border border-landing-stone-200'
                }`}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full sm:w-auto px-8 py-4 rounded-full font-landing font-semibold text-base flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-gold text-black hover:bg-gold-light' 
                    : 'bg-landing-text text-white hover:bg-landing-text/90'
                }`}
              >
                Get started <ArrowRight size={18} />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isDark ? 'bg-gold/10' : 'bg-landing-coral/20'
              }`}>
                <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-gold' : 'bg-landing-coral'}`} />
              </div>
              <span className={`font-landing font-semibold text-lg ${
                isDark ? 'text-text-primary' : 'text-landing-text'
              }`}>
                SkillSync
              </span>
            </div>
            <p className={`font-landing text-sm max-w-xs ${
              isDark ? 'text-text-secondary' : 'text-landing-muted'
            }`}>
              AI-powered placement readiness platform bridging the gap between academics and industry.
            </p>
          </div>

          <div>
            <h3 className={`font-landing font-semibold mb-4 ${
              isDark ? 'text-text-primary' : 'text-landing-text'
            }`}>
              Product
            </h3>
            <div className="space-y-3">
              {['Features', 'Dashboard', 'Pricing', 'Updates'].map((item) => (
                <p key={item} className={`font-landing text-sm cursor-pointer transition-colors ${
                  isDark ? 'text-text-secondary hover:text-gold' : 'text-landing-muted hover:text-landing-text'
                }`}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`font-landing font-semibold mb-4 ${
              isDark ? 'text-text-primary' : 'text-landing-text'
            }`}>
              Company
            </h3>
            <div className="space-y-3">
              {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                <p key={item} className={`font-landing text-sm cursor-pointer transition-colors ${
                  isDark ? 'text-text-secondary hover:text-gold' : 'text-landing-muted hover:text-landing-text'
                }`}>
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h3 className={`font-landing font-semibold mb-4 ${
              isDark ? 'text-text-primary' : 'text-landing-text'
            }`}>
              Follow us
            </h3>
            <div className="flex items-center gap-4">
              {[
                { icon: <Share2 size={18} />, label: 'Twitter' },
                { icon: <Link2 size={18} />, label: 'LinkedIn' },
                { icon: <Code2 size={18} />, label: 'GitHub' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className={`p-2 rounded-full transition-colors ${
                    isDark ? 'text-text-secondary hover:text-gold hover:bg-gold/10' : 'text-landing-muted hover:text-landing-text hover:bg-landing-stone-100'
                  }`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 ${
          isDark ? 'border-border' : 'border-landing-stone-200'
        }`}>
          <p className={`font-landing text-xs uppercase tracking-widest ${
            isDark ? 'text-text-muted' : 'text-landing-stone-400'
          }`}>
            &copy; {new Date().getFullYear()} SkillSync AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy', 'Terms', 'Security'].map((item) => (
              <Link 
                key={item} 
                to="#" 
                className={`font-landing text-xs uppercase tracking-widest transition-colors ${
                  isDark ? 'text-text-muted hover:text-text-primary' : 'text-landing-stone-400 hover:text-landing-text'
                }`}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
