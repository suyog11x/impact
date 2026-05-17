import { motion } from 'framer-motion';
import {
  RadarChart as RechartsRadar, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend,
} from 'recharts';
import { radarDomains } from './data';

export default function Section2_SkillRadar() {
  const gaps = radarDomains.map(d => ({
    ...d,
    gap: Math.max(0, d.industry - d.student),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
    >
      {/* Radar */}
      <div className="lg:col-span-2 card-flat p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="premium-label mb-1">Skill Radar</p>
            <h3 className="text-xl font-heading font-bold text-text-primary">You vs Industry</h3>
          </div>
          <div className="flex gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gold inline-block" />You</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-400 inline-block" />Industry</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={340}>
          <RechartsRadar data={radarDomains}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }} />
            <Radar name="You" dataKey="student" stroke="#D4AF37" fill="#D4AF37" fillOpacity={0.18} strokeWidth={2} dot={{ r: 3, fill: '#D4AF37' }} />
            <Radar name="Industry" dataKey="industry" stroke="#60A5FA" fill="#60A5FA" fillOpacity={0.1} strokeWidth={2} strokeDasharray="5 5" />
            <Tooltip
              contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, fontSize: 12 }}
              formatter={(val: number, name: string) => [`${val}%`, name]}
            />
            <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
          </RechartsRadar>
        </ResponsiveContainer>
      </div>

      {/* Gap table */}
      <div className="card-flat p-6 flex flex-col gap-3">
        <p className="premium-label mb-1">Gap Breakdown</p>
        <div className="space-y-2 overflow-y-auto max-h-80 pr-1">
          {gaps.sort((a, b) => b.gap - a.gap).map((d, i) => (
            <motion.div
              key={d.subject}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
              className="bg-bg-elevated rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-text-primary font-medium">{d.subject}</span>
                <span
                  className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: d.gap > 30 ? 'rgba(239,68,68,0.15)' : d.gap > 15 ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                    color: d.gap > 30 ? '#EF4444' : d.gap > 15 ? '#F59E0B' : '#10B981',
                  }}
                >
                  -{d.gap}%
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 bg-gold/30 rounded-full" style={{ width: `${d.industry}%` }} />
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.student}%` }}
                    transition={{ duration: 1, delay: i * 0.05 + 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gold rounded-full"
                  />
                </div>
                <span className="text-xs text-text-muted w-10 text-right">{d.student}/{d.industry}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
