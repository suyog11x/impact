import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import NeonButton from '../ui/NeonButton';
import StatusTag from '../ui/StatusTag';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lime/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 w-full">
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mb-6">
                <StatusTag />
              </div>

              <h1 className="font-heading font-bold text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] leading-[1.0] tracking-[-0.06em] text-text-primary mb-6 pb-4">
                Bridge The{' '}
                <span className="italic bg-gradient-to-r from-lime to-white bg-clip-text text-transparent">
                  Gap
                </span>{' '}
                Between<br />
                Academics & Industry
              </h1>

              <p className="text-lg md:text-xl text-text-secondary font-body max-w-xl mb-10 leading-relaxed">
                AI-powered placement readiness analysis that identifies skill gaps, creates personalized roadmaps, and predicts your placement success.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-12">
                <NeonButton size="lg" onClick={() => window.location.href = '/signup'}>
                  Get Started <ArrowRight size={20} />
                </NeonButton>
                <NeonButton variant="ghost" size="lg" onClick={() => window.location.href = '/login'}>
                  <Play size={18} /> Explore Dashboard
                </NeonButton>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-muted">
                <Sparkles size={14} className="text-lime" />
                AI PLACEMENT ENGINE v2.0
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="floating">
                <div className="glass-strong p-6 rounded-[2.5rem] relative">
                  <div className="absolute -top-3 -right-3 px-3 py-1.5 glass rounded-full text-xs font-mono text-lime flex items-center gap-1.5">
                    <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-lime" />
                    AI CURATED
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass p-4 rounded-2xl">
                      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Readiness</p>
                      <p className="text-3xl font-heading font-bold text-lime">82%</p>
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-lime h-full rounded-full" style={{ width: '82%' }} />
                      </div>
                    </div>
                    <div className="glass p-4 rounded-2xl">
                      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Resume</p>
                      <p className="text-3xl font-heading font-bold text-lime">74</p>
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-lime h-full rounded-full" style={{ width: '74%' }} />
                      </div>
                    </div>
                    <div className="glass p-4 rounded-2xl">
                      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">Coding</p>
                      <p className="text-3xl font-heading font-bold text-lime">78%</p>
                      <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-lime h-full rounded-full" style={{ width: '78%' }} />
                      </div>
                    </div>
                    <div className="glass p-4 rounded-2xl">
                      <p className="text-xs font-mono text-muted uppercase tracking-wider mb-1">AI Recs</p>
                      <p className="text-xs font-body text-text-secondary leading-relaxed">
                        Focus on Docker, AWS & System Design
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
