import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ChevronDown, Cpu, Layers, Target, TrendingUp, Code2, BarChart2, FileSearch, Users, Sparkles } from 'lucide-react';

import Section1_ReadinessScore from './skillgap/Section1_ReadinessScore';
import Section2_SkillRadar from './skillgap/Section2_SkillRadar';
import Section3_GapDetection from './skillgap/Section3_GapDetection';
import Section4_RoleAnalysis from './skillgap/Section4_RoleAnalysis';
import Section5_Roadmap from './skillgap/Section5_Roadmap';
import Section6_ProjectRecs from './skillgap/Section6_ProjectRecs';
import Section7_CodingProfiles from './skillgap/Section7_CodingProfiles';
import Section8_MarketTrends from './skillgap/Section8_MarketTrends';
import Section9_JDMatcher from './skillgap/Section9_JDMatcher';
import Section10_RecruiterView from './skillgap/Section10_RecruiterView';
import { CareerTwin, EmployabilityHeatmap, BurnoutDetector, AIMentor } from './skillgap/SectionAdvanced';

// ─── NAVIGATION CONFIG ────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: 'readiness',    label: 'Readiness Score',   icon: Target },
  { id: 'radar',        label: 'Skill Radar',        icon: Layers },
  { id: 'gap',          label: 'Gap Detection',      icon: Cpu },
  { id: 'role',         label: 'Role Analysis',      icon: Users },
  { id: 'roadmap',      label: 'AI Roadmap',         icon: TrendingUp },
  { id: 'projects',     label: 'Project Engine',     icon: Code2 },
  { id: 'coding',       label: 'Coding Profiles',    icon: Code2 },
  { id: 'market',       label: 'Market Trends',      icon: BarChart2 },
  { id: 'jd',           label: 'JD Matcher',         icon: FileSearch },
  { id: 'recruiter',    label: 'Recruiter View',     icon: Users },
  { id: 'ai',           label: 'AI Features',        icon: Sparkles },
];

// ─── AI ANALYSIS LOADER ───────────────────────────────────────────────────────
const ANALYSIS_STEPS = [
  'Scanning resume & skill profile…',
  'Connecting to GitHub activity feed…',
  'Analyzing LeetCode & coding history…',
  'Benchmarking against industry standards…',
  'Running skill gap detection model…',
  'Generating AI readiness score…',
  'Building personalized roadmap…',
  'Preparing recruiter intelligence report…',
  'Analysis complete ✓',
];

function AILoader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(s => {
        const next = s + 1;
        if (next >= ANALYSIS_STEPS.length) {
          clearInterval(interval);
          setTimeout(onDone, 500);
        }
        return next;
      });
      setProgress(p => Math.min(p + 100 / ANALYSIS_STEPS.length, 100));
    }, 420);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)' }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-md w-full px-8 text-center relative z-10">
        {/* Animated brain icon */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center"
          style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', boxShadow: '0 0 40px rgba(212,175,55,0.1)' }}
        >
          <Brain size={36} className="text-gold" />
        </motion.div>

        <p className="premium-label mb-3">SkillSync AI Engine</p>
        <h2 className="text-3xl font-heading font-bold text-text-primary mb-2">Analyzing Your Profile</h2>
        <p className="text-text-secondary text-sm mb-8">Processing your resume, coding profiles, GitHub activity and market data…</p>

        {/* Progress bar */}
        <div className="w-full bg-white/5 rounded-full h-1.5 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gold rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
            style={{ boxShadow: '0 0 12px rgba(212,175,55,0.6)' }}
          />
        </div>
        <p className="text-xs font-medium text-gold mb-6">{Math.round(progress)}%</p>

        {/* Step text with typing effect */}
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-text-secondary font-mono"
          >
            {ANALYSIS_STEPS[Math.min(step, ANALYSIS_STEPS.length - 1)]}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
function SectionWrapper({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6">
      {children}
    </section>
  );
}

// ─── DIVIDER ─────────────────────────────────────────────────────────────────
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex-1 h-px bg-white/5" />
      <span className="text-xs text-text-muted uppercase tracking-widest font-medium">{label}</span>
      <div className="flex-1 h-px bg-white/5" />
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function SkillGapAnalysis() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('readiness');
  const [navOpen, setNavOpen] = useState(false);

  function scrollTo(id: string) {
    setActiveSection(id);
    setNavOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      {/* AI Loader overlay */}
      <AnimatePresence>
        {loading && <AILoader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* ── Page header ───────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <p className="premium-label mb-3">AI-Powered Intelligence</p>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-text-primary">
                    Skill Gap Analysis Engine
                  </h1>
                  <p className="text-text-secondary mt-2 text-base max-w-2xl">
                    Enterprise-grade employability intelligence. Your full profile benchmarked against industry standards, role requirements, and 2025 hiring trends.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted px-3 py-1.5 rounded-full border border-white/8 bg-bg-elevated">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI analysis complete
                </div>
              </div>
            </motion.div>

            {/* ── Sticky section nav ────────────────────────────── */}
            <div className="sticky top-0 z-30 -mx-4 px-4 py-2 mb-8 glass-bar border-b border-white/5">
              {/* Mobile toggle */}
              <div className="flex items-center justify-between lg:hidden">
                <span className="text-sm font-medium text-text-primary capitalize">{activeSection}</span>
                <button onClick={() => setNavOpen(o => !o)} className="flex items-center gap-1 text-xs text-text-muted">
                  Sections <ChevronDown size={14} className={`transition-transform ${navOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Desktop nav */}
              <div className="hidden lg:flex gap-1 overflow-x-auto scrollbar-none">
                {NAV_SECTIONS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0"
                    style={
                      activeSection === s.id
                        ? { background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }
                        : { color: 'rgba(255,255,255,0.45)', background: 'transparent' }
                    }
                  >
                    <s.icon size={12} />
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Mobile dropdown */}
              <AnimatePresence>
                {navOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="lg:hidden overflow-hidden mt-2"
                  >
                    <div className="grid grid-cols-2 gap-1 pb-1">
                      {NAV_SECTIONS.map(s => (
                        <button
                          key={s.id}
                          onClick={() => scrollTo(s.id)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-left transition-all"
                          style={
                            activeSection === s.id
                              ? { background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }
                              : { color: 'rgba(255,255,255,0.45)' }
                          }
                        >
                          <s.icon size={12} />
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── All sections ─────────────────────────────────── */}
            <div className="space-y-16">

              <SectionWrapper id="readiness">
                <Section1_ReadinessScore />
              </SectionWrapper>

              <SectionDivider label="Skills Intelligence" />

              <SectionWrapper id="radar">
                <Section2_SkillRadar />
              </SectionWrapper>

              <SectionWrapper id="gap">
                <Section3_GapDetection />
              </SectionWrapper>

              <SectionDivider label="Career Targeting" />

              <SectionWrapper id="role">
                <Section4_RoleAnalysis />
              </SectionWrapper>

              <SectionWrapper id="roadmap">
                <Section5_Roadmap />
              </SectionWrapper>

              <SectionDivider label="Growth Engine" />

              <SectionWrapper id="projects">
                <Section6_ProjectRecs />
              </SectionWrapper>

              <SectionWrapper id="coding">
                <Section7_CodingProfiles />
              </SectionWrapper>

              <SectionDivider label="Market & Recruiter Intelligence" />

              <SectionWrapper id="market">
                <Section8_MarketTrends />
              </SectionWrapper>

              <SectionWrapper id="jd">
                <Section9_JDMatcher />
              </SectionWrapper>

              <SectionWrapper id="recruiter">
                <Section10_RecruiterView />
              </SectionWrapper>

              <SectionDivider label="Advanced AI Features" />

              <SectionWrapper id="ai">
                <div className="mb-5">
                  <p className="premium-label mb-1">Futuristic AI Suite</p>
                  <h3 className="text-xl font-heading font-bold text-text-primary">Advanced Intelligence Features</h3>
                </div>

                {/* Career Twin + Heatmap */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <CareerTwin />
                  <EmployabilityHeatmap />
                </div>

                {/* Burnout + AI Mentor */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <BurnoutDetector />
                  <AIMentor />
                </div>
              </SectionWrapper>

            </div>

            {/* Bottom padding */}
            <div className="h-20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
