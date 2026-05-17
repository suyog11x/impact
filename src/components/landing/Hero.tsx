import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  isDark: boolean;
}

export default function Hero({ isDark }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-20 left-10 w-80 h-80 rounded-full blur-[100px] ${
          isDark ? 'bg-gold/5' : 'bg-landing-coral/60'
        }`} 
      />
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`absolute bottom-20 right-10 w-72 h-72 rounded-full blur-[100px] ${
          isDark ? 'bg-gold/5' : 'bg-landing-lavender/60'
        }`} 
      />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          {/* Tag */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-landing font-medium tracking-widest uppercase mb-8 ${
            isDark ? 'bg-gold/10 text-gold' : 'bg-landing-coral/20 text-landing-text'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-gold' : 'bg-landing-coral'}`} />
            AI placement engine
          </div>

          {/* Headline */}
          <h1 className={`font-landing font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6 ${
            isDark ? 'text-text-primary' : 'text-landing-text'
          }`}>
            Bridge the gap between
            <br />
            academics and{' '}
            <span className="font-cursive text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal" style={{ color: isDark ? '#D4AF37' : '#FFB7B2' }}>
              industry
            </span>
          </h1>

          {/* Sub-headline */}
          <p className={`text-lg md:text-xl font-landing max-w-lg mx-auto mb-10 leading-relaxed ${
            isDark ? 'text-text-secondary' : 'text-landing-muted'
          }`}>
            AI-powered placement readiness analysis that identifies skill gaps, creates personalized roadmaps, and predicts your placement success.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-landing font-semibold text-base ${
                isDark 
                  ? 'bg-gold text-black hover:bg-gold-light' 
                  : 'bg-landing-coral text-landing-text hover:bg-landing-coral/90'
              }`}
              style={{ boxShadow: isDark ? '0 4px 20px rgba(212, 175, 55, 0.3)' : '0 4px 20px rgba(255, 183, 178, 0.4)' }}
            >
              Get started <ArrowRight size={18} />
            </motion.a>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-landing font-medium text-base ${
                isDark 
                  ? 'bg-transparent text-text-primary border border-border hover:bg-white/5' 
                  : 'bg-white text-landing-text border border-landing-stone-200 hover:bg-landing-stone-50'
              }`}
            >
              Explore dashboard
            </motion.a>
          </div>

          {/* Stats */}
          <div className={`flex items-center justify-center gap-8 font-landing text-sm ${
            isDark ? 'text-text-muted' : 'text-landing-stone-400'
          }`}>
            <div className="text-center">
              <p className={`text-2xl font-bold ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>2,800+</p>
              <p>Students</p>
            </div>
            <div className={`w-px h-8 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
            <div className="text-center">
              <p className={`text-2xl font-bold ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>89</p>
              <p>Companies</p>
            </div>
            <div className={`w-px h-8 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
            <div className="text-center">
              <p className={`text-2xl font-bold ${isDark ? 'text-text-primary' : 'text-landing-text'}`}>74%</p>
              <p>Placement rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
