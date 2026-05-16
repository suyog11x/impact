import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import NeonButton from '../ui/NeonButton';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-black border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-lime/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative max-w-[1600px] mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary mb-3">
              Ready to <span className="text-lime">Accelerate</span> Your Career?
            </h2>
            <p className="text-text-secondary font-body text-lg max-w-xl">
              Join thousands of students who have transformed their placement preparation with SkillSync AI.
            </p>
          </div>
          <Link to="/signup">
            <NeonButton size="lg">
              Get Started Free <ArrowUpRight size={20} />
            </NeonButton>
          </Link>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 bottom-40 pointer-events-none select-none">
          <span className="text-[12rem] md:text-[20rem] font-heading font-black text-white/5 tracking-tight">
            SKILLSYNC
          </span>
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-lime rounded-xl flex items-center justify-center">
                <span className="text-black font-heading font-bold text-lg">S</span>
              </div>
              <span className="font-heading font-semibold text-lg text-text-primary">Skill<span className="text-lime">Sync</span></span>
            </div>
            <p className="text-text-secondary font-body text-sm max-w-xs">
              AI-powered placement readiness platform bridging the gap between academics and industry.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Product</h3>
            <div className="space-y-3">
              {['Features', 'Dashboard', 'Integrations', 'Updates'].map((item) => (
                <p key={item} className="text-text-secondary hover:text-lime transition-colors font-body text-sm cursor-pointer">{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Company</h3>
            <div className="space-y-3">
              {['About', 'Blog', 'Careers', 'Press'].map((item) => (
                <p key={item} className="text-text-secondary hover:text-lime transition-colors font-body text-sm cursor-pointer">{item}</p>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Legal</h3>
            <div className="space-y-3">
              {['Privacy', 'Terms', 'Security', 'Cookies'].map((item) => (
                <p key={item} className="text-text-secondary hover:text-lime transition-colors font-body text-sm cursor-pointer">{item}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            &copy; {new Date().getFullYear()} SkillSync AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((s) => (
              <span key={s} className="font-mono text-xs uppercase tracking-wider text-muted hover:text-lime transition-colors cursor-pointer">{s}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
