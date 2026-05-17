import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, AlertCircle, Info, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { gapInsights, type GapInsight, type Severity } from './data';

const severityConfig: Record<Severity, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  critical: { color: '#EF4444', bg: 'rgba(239,68,68,0.08)', icon: <AlertCircle size={16} />, label: 'Critical' },
  high:     { color: '#F59E0B', bg: 'rgba(245,158,11,0.08)', icon: <AlertTriangle size={16} />, label: 'High' },
  medium:   { color: '#D4AF37', bg: 'rgba(212,175,55,0.08)', icon: <Info size={16} />, label: 'Medium' },
  low:      { color: '#10B981', bg: 'rgba(16,185,129,0.08)', icon: <Info size={16} />, label: 'Low' },
};

function InsightCard({ insight, index }: { insight: GapInsight; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = severityConfig[insight.severity];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 + 0.2 }}
      className="card-flat overflow-hidden cursor-pointer"
      onClick={() => setExpanded(e => !e)}
      style={{ borderLeft: `3px solid ${cfg.color}` }}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Severity icon */}
        <div className="mt-0.5 p-2 rounded-lg flex-shrink-0" style={{ background: cfg.bg, color: cfg.color }}>
          {cfg.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-semibold text-sm text-text-primary">{insight.title}</h4>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: cfg.bg, color: cfg.color }}
            >
              {cfg.label}
            </span>
            <span className="text-xs text-text-muted px-2 py-0.5 rounded-full bg-white/5">{insight.category}</span>
          </div>
          <p className="text-sm text-text-secondary">{insight.description}</p>
        </div>

        {/* Importance score + expand */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-center hidden sm:block">
            <p className="text-lg font-bold font-heading" style={{ color: cfg.color }}>{insight.importance}</p>
            <p className="text-xs text-text-muted">Impact</p>
          </div>
          <div className="text-text-muted">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 ml-12">
              <div className="rounded-xl p-3 flex gap-2 items-start" style={{ background: cfg.bg }}>
                <Lightbulb size={15} className="flex-shrink-0 mt-0.5" style={{ color: cfg.color }} />
                <p className="text-sm text-text-secondary">{insight.recommendation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Section3_GapDetection() {
  const [filter, setFilter] = useState<Severity | 'all'>('all');

  const filters: Array<{ key: Severity | 'all'; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
  ];

  const visible = filter === 'all' ? gapInsights : gapInsights.filter(g => g.severity === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="premium-label mb-1">AI Gap Detection Engine</p>
          <h3 className="text-xl font-heading font-bold text-text-primary">Intelligence Insights</h3>
        </div>
        <div className="flex gap-2 bg-bg-elevated p-1 rounded-xl">
          {filters.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all"
              style={
                filter === f.key
                  ? { background: '#D4AF37', color: '#000' }
                  : { color: 'rgba(255,255,255,0.5)' }
              }
            >
              {f.label}
              {f.key !== 'all' && (
                <span className="ml-1.5 opacity-60">{gapInsights.filter(g => g.severity === f.key).length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visible.map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
