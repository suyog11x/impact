import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { roleProfiles, type RoleKey } from './data';

const roleIcons: Record<RoleKey, string> = {
  frontend: '🎨',
  backend: '⚙️',
  fullstack: '🔗',
  ai: '🤖',
  data: '📊',
  devops: '🚀',
  security: '🔐',
};

function getRoleColor(match: number) {
  if (match >= 75) return '#10B981';
  if (match >= 55) return '#D4AF37';
  if (match >= 40) return '#F59E0B';
  return '#EF4444';
}

export default function Section4_RoleAnalysis() {
  const [selected, setSelected] = useState<RoleKey>('fullstack');
  const profile = roleProfiles[selected];
  const color = getRoleColor(profile.match);

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
      <div className="mb-5">
        <p className="premium-label mb-1">Role-Based Analysis</p>
        <h3 className="text-xl font-heading font-bold text-text-primary">Career Target Comparison</h3>
      </div>

      {/* Role selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {(Object.keys(roleProfiles) as RoleKey[]).map(key => (
          <button
            key={key}
            onClick={() => setSelected(key)}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all font-medium border"
            style={
              selected === key
                ? { background: 'rgba(212,175,55,0.15)', borderColor: 'rgba(212,175,55,0.4)', color: '#D4AF37' }
                : { background: 'transparent', borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }
            }
          >
            <span>{roleIcons[key]}</span>
            {roleProfiles[key].label}
          </button>
        ))}
      </div>

      {/* Selected role detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Big match score */}
          <div className="card-flat p-8 flex flex-col items-center justify-center gap-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
            <span className="text-5xl">{roleIcons[selected]}</span>
            <div>
              <p
                className="text-6xl font-heading font-bold text-center"
                style={{ color }}
              >
                {profile.match}%
              </p>
              <p className="text-center text-text-secondary text-sm mt-1">Profile Match</p>
            </div>
            {/* Arc progress */}
            <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${profile.match}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: color, boxShadow: `0 0 10px ${color}66` }}
              />
            </div>
            <p className="text-xs text-text-secondary text-center leading-relaxed">
              You match <span className="font-semibold" style={{ color }}>{profile.match}%</span> of a modern <span className="text-text-primary">{profile.label}</span> profile.
            </p>
          </div>

          {/* Skills breakdown */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strong */}
            <div className="card-flat p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={16} className="text-emerald-400" />
                <h4 className="font-semibold text-sm text-text-primary">Matching Skills</h4>
              </div>
              <div className="space-y-2">
                {profile.strongSkills.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span className="text-text-secondary">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="card-flat p-5">
              <div className="flex items-center gap-2 mb-4">
                <XCircle size={16} className="text-red-400" />
                <h4 className="font-semibold text-sm text-text-primary">Missing Skills</h4>
              </div>
              <div className="space-y-2">
                {profile.missingSkills.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    <span className="text-text-secondary">{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* AI summary */}
            <div className="sm:col-span-2 card-flat p-4 flex gap-3 items-start"
              style={{ borderLeft: '3px solid rgba(212,175,55,0.5)', background: 'rgba(212,175,55,0.04)' }}>
              <ChevronRight size={16} className="text-gold flex-shrink-0 mt-0.5" />
              <p className="text-sm text-text-secondary">{profile.description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
