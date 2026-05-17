import { motion } from 'framer-motion';
import { Upload, GitFork, Brain, Map } from 'lucide-react';

interface HowItWorksProps {
  isDark: boolean;
}

const steps = [
  { icon: <Upload size={28} />, title: 'Upload resume', desc: 'Upload your resume for AI-powered analysis and ATS scoring' },
  { icon: <GitFork size={28} />, title: 'Connect profiles', desc: 'Link GitHub, LeetCode, CodeChef for comprehensive analysis' },
  { icon: <Brain size={28} />, title: 'AI analysis', desc: 'Our AI identifies skill gaps against industry standards' },
  { icon: <Map size={28} />, title: 'Get roadmap', desc: 'Receive a personalized learning roadmap with milestones' },
];

export default function HowItWorks({ isDark }: HowItWorksProps) {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className={`font-landing text-sm font-medium tracking-widest uppercase mb-4 ${
            isDark ? 'text-gold' : 'text-landing-muted'
          }`}>
            How it works
          </p>
          <h2 className={`font-landing font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight ${
            isDark ? 'text-text-primary' : 'text-landing-text'
          }`}>
            From zero to placement ready
          </h2>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className={`rounded-3xl p-8 relative ${
                isDark ? 'bg-bg-card border border-border' : 'bg-white border border-landing-stone-100'
              }`}
            >
              <div className={`absolute -top-3 left-6 w-6 h-6 rounded-full flex items-center justify-center font-landing font-bold text-xs ${
                isDark ? 'bg-gold text-black' : 'bg-landing-coral text-white'
              }`}>
                {idx + 1}
              </div>
              <div className={`mt-2 mb-5 ${isDark ? 'text-gold' : 'text-landing-text'}`}>
                {step.icon}
              </div>
              <h3 className={`font-landing font-semibold text-lg mb-2 ${
                isDark ? 'text-text-primary' : 'text-landing-text'
              }`}>
                {step.title}
              </h3>
              <p className={`font-landing text-sm leading-relaxed ${
                isDark ? 'text-text-secondary' : 'text-landing-muted'
              }`}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* App preview mockups */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-end gap-4 md:gap-6"
        >
          {/* Left phone */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className={`hidden sm:block w-48 md:w-56 rounded-3xl overflow-hidden ${
              isDark ? 'bg-bg-card border border-border opacity-80' : 'bg-landing-sage opacity-80'
            }`}
            style={{ height: '360px', transform: 'translateY(48px)' }}
          >
            <div className="p-4 h-full flex flex-col">
              <div className={`w-full h-32 rounded-2xl mb-3 ${isDark ? 'bg-bg-elevated' : 'bg-white/50'}`} />
              <div className={`w-3/4 h-3 rounded-full mb-2 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
              <div className={`w-1/2 h-3 rounded-full ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
            </div>
          </motion.div>

          {/* Center phone */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className={`w-56 md:w-72 rounded-3xl overflow-hidden ${
              isDark ? 'bg-bg-card border border-border' : 'bg-white border border-landing-stone-200'
            }`}
            style={{ height: '480px', boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 4px 20px rgba(0,0,0,0.05)' }}
          >
            <div className="p-6 h-full flex flex-col">
              <div className={`w-12 h-12 rounded-2xl mb-4 ${isDark ? 'bg-gold/10' : 'bg-landing-coral/20'}`} />
              <div className={`w-full h-40 rounded-2xl mb-4 ${isDark ? 'bg-bg-elevated' : 'bg-landing-sage'}`} />
              <div className={`w-full h-3 rounded-full mb-2 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
              <div className={`w-3/4 h-3 rounded-full mb-4 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
              <motion.button 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`w-full py-3 rounded-full font-landing font-semibold text-sm mt-auto ${
                  isDark ? 'bg-gold text-black' : 'bg-landing-coral text-landing-text'
                }`}
              >
                Breathe
              </motion.button>
            </div>
          </motion.div>

          {/* Right phone */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className={`hidden sm:block w-48 md:w-56 rounded-3xl overflow-hidden ${
              isDark ? 'bg-bg-card border border-border opacity-80' : 'bg-landing-lavender opacity-80'
            }`}
            style={{ height: '360px', transform: 'translateY(96px)' }}
          >
            <div className="p-4 h-full flex flex-col">
              <div className={`w-full h-24 rounded-2xl mb-3 ${isDark ? 'bg-bg-elevated' : 'bg-white/50'}`} />
              <div className={`w-2/3 h-3 rounded-full mb-2 ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
              <div className={`w-full h-3 rounded-full ${isDark ? 'bg-border' : 'bg-landing-stone-200'}`} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
