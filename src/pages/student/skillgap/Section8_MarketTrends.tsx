import { motion } from 'framer-motion';
import { marketTrends, studentProfile } from './data';
import { TrendingUp, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const categoryColors: Record<string, string> = {
  AI: '#8B5CF6',
  DevOps: '#3B82F6',
  Cloud: '#06B6D4',
  Frontend: '#D4AF37',
  Backend: '#10B981',
  Database: '#F59E0B',
  Systems: '#EF4444',
};

export default function Section8_MarketTrends() {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
      <div className="mb-5">
        <p className="premium-label mb-1">Market Trend Intelligence</p>
        <h3 className="text-xl font-heading font-bold text-text-primary">2025 Industry Demand Map</h3>
      </div>

      {/* Alignment banner */}
      <div className="card-flat p-4 mb-6 flex items-center gap-4"
        style={{ borderLeft: '3px solid #D4AF37', background: 'rgba(212,175,55,0.04)' }}>
        <Zap size={20} className="text-gold flex-shrink-0" />
        <p className="text-sm text-text-secondary">
          Your profile aligns with <span className="text-gold font-bold text-base">{studentProfile.marketAlignment}%</span> of current 2025 market demand.{' '}
          <span className="text-text-primary">9 trending skills are missing from your profile.</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="card-flat p-5">
          <h4 className="font-semibold text-sm text-text-primary mb-4">Top 12 In-Demand Skills</h4>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={marketTrends} layout="vertical" margin={{ left: 16, right: 32 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="skill" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 10 }} width={130} />
              <Tooltip
                contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 12 }}
                formatter={(v: number) => [`${v}% demand`, 'Market Demand']}
              />
              <Bar dataKey="demand" radius={[0, 4, 4, 0]}>
                {marketTrends.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.aligned ? '#10B981' : categoryColors[d.category] ?? '#D4AF37'}
                    opacity={d.aligned ? 1 : 0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-text-muted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" />You have it</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-purple-500 inline-block" />Missing</span>
          </div>
        </div>

        {/* Trending skills grid */}
        <div className="card-flat p-5">
          <h4 className="font-semibold text-sm text-text-primary mb-4">Fastest-Growing Technologies</h4>
          <div className="space-y-2 overflow-y-auto max-h-80 pr-1">
            {[...marketTrends].sort((a, b) => parseInt(b.growth) - parseInt(a.growth)).map((t, i) => (
              <motion.div
                key={t.skill}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 bg-bg-elevated rounded-xl"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                  style={{ background: `${categoryColors[t.category] ?? '#D4AF37'}18`, color: categoryColors[t.category] ?? '#D4AF37' }}
                >
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-text-primary font-medium truncate">{t.skill}</p>
                    {t.aligned && <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400">✓ You have it</span>}
                  </div>
                  <p className="text-xs text-text-muted">{t.category}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp size={12} />{t.growth}
                  </p>
                  <p className="text-xs text-text-muted">{t.demand}% demand</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
