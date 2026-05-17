import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, TrendingUp } from 'lucide-react';
import { studentProfile } from './data';

function getLabel(score: number) {
  if (score < 30) return { text: 'Beginner', color: '#EF4444' };
  if (score < 50) return { text: 'Learning', color: '#F59E0B' };
  if (score < 70) return { text: 'Placement Ready', color: '#D4AF37' };
  if (score < 88) return { text: 'Industry Ready', color: '#10B981' };
  return { text: 'Elite Candidate', color: '#8B5CF6' };
}

export default function Section1_ReadinessScore() {
  const [displayScore, setDisplayScore] = useState(0);
  const score = studentProfile.readinessScore;
  const label = getLabel(score);

  // circumference of SVG circle r=70
  const r = 70;
  const circ = 2 * Math.PI * r;
  const offset = circ - (displayScore / 100) * circ;

  useEffect(() => {
    let start = 0;
    const step = () => {
      start += 1;
      setDisplayScore(Math.min(start, score));
      if (start < score) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Circular Score */}
      <div className="lg:col-span-1 card-flat p-8 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
        <p className="premium-label mb-6">Industry Readiness Score</p>
        <div className="relative w-44 h-44">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            <motion.circle
              cx="90" cy="90" r={r}
              fill="none"
              stroke={label.color}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
              style={{ filter: `drop-shadow(0 0 12px ${label.color}88)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold font-heading" style={{ color: label.color }}>{displayScore}</span>
            <span className="text-xs text-text-muted mt-1">out of 100</span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-5 px-4 py-1.5 rounded-full text-sm font-semibold"
          style={{ background: `${label.color}22`, color: label.color, border: `1px solid ${label.color}44` }}
        >
          {label.text}
        </motion.div>
      </div>

      {/* Right stats */}
      <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Confidence */}
        <div className="card-flat p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Zap size={15} className="text-gold" /> AI Confidence
          </div>
          <p className="text-4xl font-heading font-bold text-gold">{studentProfile.confidencePercent}%</p>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studentProfile.confidencePercent}%` }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="h-full bg-gold rounded-full"
              style={{ boxShadow: '0 0 8px rgba(212,175,55,0.5)' }}
            />
          </div>
          <p className="text-xs text-text-muted">Based on profile completeness & data quality</p>
        </div>

        {/* Timeline */}
        <div className="card-flat p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <Clock size={15} className="text-gold" /> Placement Timeline
          </div>
          <p className="text-4xl font-heading font-bold text-text-primary">{studentProfile.timelineMonths}<span className="text-lg font-body text-text-secondary ml-1">mo</span></p>
          <p className="text-xs text-text-secondary leading-relaxed">
            Based on your current progress, you may become <span className="text-gold font-medium">placement-ready in {studentProfile.timelineMonths} months</span> with consistent effort.
          </p>
        </div>

        {/* Placement probability */}
        <div className="card-flat p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <TrendingUp size={15} className="text-gold" /> Placement Probability
          </div>
          <p className="text-4xl font-heading font-bold text-text-primary">{studentProfile.placementProbability}%</p>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studentProfile.placementProbability}%` }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
          <p className="text-xs text-text-muted">ML-based estimate across target companies</p>
        </div>

        {/* Market alignment */}
        <div className="card-flat p-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            <TrendingUp size={15} className="text-amber-400" /> Market Alignment
          </div>
          <p className="text-4xl font-heading font-bold text-amber-400">{studentProfile.marketAlignment}%</p>
          <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${studentProfile.marketAlignment}%` }}
              transition={{ duration: 1.5, delay: 0.9 }}
              className="h-full bg-amber-400 rounded-full"
            />
          </div>
          <p className="text-xs text-text-muted">Profile alignment with 2025 hiring trends</p>
        </div>
      </div>
    </motion.div>
  );
}
