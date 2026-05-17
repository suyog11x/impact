import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, BookOpen, Code, Award, PlayCircle } from 'lucide-react';
import { roadmapData, type TimelineMode, type RoleKey } from './data';

const timelines: { key: TimelineMode; label: string }[] = [
  { key: '30', label: '30 Days' },
  { key: '90', label: '90 Days' },
  { key: '180', label: '6 Months' },
];

export default function Section5_Roadmap() {
  const [timeline, setTimeline] = useState<TimelineMode>('90');
  const [expanded, setExpanded] = useState<number | null>(0);

  const weeks = roadmapData[timeline]['fullstack'] ?? [];

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div>
          <p className="premium-label mb-1">AI Learning Roadmap</p>
          <h3 className="text-xl font-heading font-bold text-text-primary">Personalized Study Plan</h3>
        </div>
        <div className="flex gap-2 bg-bg-elevated p-1 rounded-xl">
          {timelines.map(t => (
            <button
              key={t.key}
              onClick={() => { setTimeline(t.key); setExpanded(0); }}
              className="px-4 py-1.5 text-xs font-medium rounded-lg transition-all"
              style={
                timeline === t.key
                  ? { background: '#D4AF37', color: '#000' }
                  : { color: 'rgba(255,255,255,0.5)' }
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/8 hidden sm:block" />

        <AnimatePresence mode="wait">
          <motion.div
            key={timeline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {weeks.map((week, i) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-gold z-10 hidden sm:block"
                  style={{ background: week.completed ? '#D4AF37' : '#0A0A0A' }}
                />

                <div className="sm:ml-16 card-flat overflow-hidden">
                  <button
                    className="w-full p-4 flex items-center justify-between text-left"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: 'rgba(212,175,55,0.15)', color: '#D4AF37' }}
                      >
                        W{week.week}
                      </span>
                      <div>
                        <h4 className="font-semibold text-sm text-text-primary">{week.title}</h4>
                        <p className="text-xs text-text-muted">{week.goals.length} goals · {week.projects ? '1 project' : ''}</p>
                      </div>
                    </div>
                    {expanded === i ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                  </button>

                  <AnimatePresence>
                    {expanded === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {/* Goals */}
                          <div className="bg-bg-elevated rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-gold mb-2">
                              <BookOpen size={12} /> Weekly Goals
                            </div>
                            <ul className="space-y-1">
                              {week.goals.map(g => (
                                <li key={g} className="text-xs text-text-secondary flex items-start gap-1.5">
                                  <span className="text-gold mt-0.5">›</span>{g}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Project */}
                          <div className="bg-bg-elevated rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                              <Code size={12} /> Build Project
                            </div>
                            <p className="text-xs text-text-secondary">{week.projects}</p>
                            {week.certification && (
                              <div className="mt-2 flex items-center gap-1 text-xs text-amber-400">
                                <Award size={11} /> {week.certification}
                              </div>
                            )}
                          </div>

                          {/* Resources */}
                          <div className="bg-bg-elevated rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 mb-2">
                              <PlayCircle size={12} /> Resources
                            </div>
                            <ul className="space-y-1">
                              {week.resources.map(r => (
                                <li key={r} className="text-xs text-text-secondary flex items-start gap-1.5">
                                  <span className="text-blue-400 mt-0.5">›</span>{r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
