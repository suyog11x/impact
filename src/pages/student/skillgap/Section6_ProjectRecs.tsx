import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, Clock, Star, TrendingUp } from 'lucide-react';
import { projectRecs, type ProjectRec } from './data';

const diffColor: Record<ProjectRec['difficulty'], string> = {
  Beginner: '#10B981',
  Intermediate: '#D4AF37',
  Advanced: '#EF4444',
};

function ScoreDot({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="text-xs font-semibold w-8 text-right" style={{ color }}>{value}</span>
    </div>
  );
}

export default function Section6_ProjectRecs() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
      <div className="mb-5">
        <p className="premium-label mb-1">Smart Project Engine</p>
        <h3 className="text-xl font-heading font-bold text-text-primary">AI-Recommended Projects</h3>
        <p className="text-sm text-text-secondary mt-1">Projects selected to fill your specific skill gaps</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectRecs.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelected(selected === p.id ? null : p.id)}
            className="card-flat p-5 cursor-pointer transition-all"
            style={selected === p.id ? { borderColor: 'rgba(212,175,55,0.4)', background: 'rgba(212,175,55,0.03)' } : {}}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <h4 className="font-semibold text-sm text-text-primary leading-snug">{p.title}</h4>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                style={{ background: `${diffColor[p.difficulty]}18`, color: diffColor[p.difficulty] }}
              >
                {p.difficulty}
              </span>
            </div>

            <p className="text-xs text-text-secondary mb-4 leading-relaxed">{p.description}</p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.techStack.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 rounded-lg bg-bg-elevated text-text-muted">{t}</span>
              ))}
            </div>

            {/* Scores */}
            <div className="space-y-2 mb-4">
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span className="flex items-center gap-1"><Star size={10} /> Resume Value</span>
                </div>
                <ScoreDot value={p.resumeValue} color="#D4AF37" />
              </div>
              <div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span className="flex items-center gap-1"><TrendingUp size={10} /> Recruiter Impact</span>
                </div>
                <ScoreDot value={p.recruiterImpact} color="#10B981" />
              </div>
            </div>

            {/* Bottom meta */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <Clock size={11} /> {p.timeEstimate}
              </div>
              <div className="flex items-center gap-1 text-xs text-text-muted">
                <Layers size={11} /> {p.missingSkillsCovered.length} gaps covered
              </div>
            </div>

            {/* Expanded gap tags */}
            {selected === p.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3 flex flex-wrap gap-1.5"
              >
                {p.missingSkillsCovered.map(g => (
                  <span key={g} className="text-xs px-2 py-0.5 rounded-lg bg-gold/10 text-gold border border-gold/20">
                    Fills: {g}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
