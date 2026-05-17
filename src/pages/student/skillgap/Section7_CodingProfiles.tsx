import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { dsaTopics, codingPlatforms } from './data';
import { TrendingDown, TrendingUp, GitBranch, Code } from 'lucide-react';

const platformIcons: Record<string, React.ReactNode> = {
  LeetCode: <Code size={15} />,
  GitHub: <GitBranch size={15} />,
  Codeforces: <Code size={15} />,
  HackerRank: <Code size={15} />,
};

// Fake heatmap — 24 weeks × 7 days
function ContributionHeatmap() {
  const cells = Array.from({ length: 24 * 7 }, (_, i) => {
    const r = Math.random();
    const intensity = r < 0.4 ? 0 : r < 0.65 ? 1 : r < 0.82 ? 2 : r < 0.93 ? 3 : 4;
    return intensity;
  });
  const colors = ['rgba(255,255,255,0.04)', 'rgba(212,175,55,0.2)', 'rgba(212,175,55,0.45)', 'rgba(212,175,55,0.7)', '#D4AF37'];
  return (
    <div className="flex gap-0.5 flex-wrap">
      {cells.map((v, i) => (
        <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: colors[v] }} />
      ))}
    </div>
  );
}

export default function Section7_CodingProfiles() {
  const dsaData = dsaTopics.map(t => ({ ...t, pct: Math.round((t.solved / t.total) * 100) }));

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>
      <div className="mb-5">
        <p className="premium-label mb-1">Coding Profile Analysis</p>
        <h3 className="text-xl font-heading font-bold text-text-primary">Multi-Platform Intelligence</h3>
      </div>

      {/* Platform cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {codingPlatforms.map((p, i) => (
          <motion.div
            key={p.platform}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="card-flat p-4 flex flex-col gap-2"
            style={{ borderTop: `2px solid ${p.color}` }}
          >
            <div className="flex items-center gap-2" style={{ color: p.color }}>
              {platformIcons[p.platform]}
              <span className="text-xs font-semibold">{p.platform}</span>
            </div>
            <p className="text-2xl font-heading font-bold text-text-primary">
              {p.platform === 'GitHub' ? p.problems : p.problems}
              <span className="text-xs text-text-muted ml-1">{p.platform === 'GitHub' ? 'commits' : 'solved'}</span>
            </p>
            <div className="flex items-center justify-between text-xs text-text-muted">
              <span>🔥 {p.streak}d streak</span>
              {p.rating > 0 && <span style={{ color: p.color }}>{p.rating}</span>}
              {p.rating === 0 && <span style={{ color: p.color }}>{p.rank}</span>}
            </div>
          </motion.div>
        ))}
      </div>

      {/* DSA breakdown + heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* DSA Bar chart */}
        <div className="card-flat p-5">
          <h4 className="font-semibold text-sm text-text-primary mb-4">DSA Topic Performance</h4>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dsaData} layout="vertical" margin={{ left: 16, right: 24 }}>
              <XAxis type="number" domain={[0, 100]} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickFormatter={v => `${v}%`} />
              <YAxis type="category" dataKey="topic" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 10 }} width={110} />
              <Tooltip
                contentStyle={{ background: '#141414', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, fontSize: 12 }}
                formatter={(v: number) => [`${v}%`, 'Mastery']}
              />
              <Bar dataKey="pct" radius={[0, 4, 4, 0]}>
                {dsaData.map((d, i) => (
                  <Cell key={i} fill={d.strength ? '#D4AF37' : '#EF444488'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-xs text-text-muted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-gold inline-block" />Strong</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-400/50 inline-block" />Weak</span>
          </div>
        </div>

        {/* Contribution heatmap + insights */}
        <div className="card-flat p-5 flex flex-col gap-4">
          <h4 className="font-semibold text-sm text-text-primary">Contribution Heatmap (24 weeks)</h4>
          <ContributionHeatmap />
          <div className="space-y-2 mt-auto">
            <div className="flex items-start gap-2 p-3 bg-bg-elevated rounded-xl">
              <TrendingUp size={14} className="text-gold mt-0.5 flex-shrink-0" />
              <p className="text-xs text-text-secondary">Strong in <span className="text-gold">arrays, strings, binary search</span>. Consistently solving 5–10 problems/week.</p>
            </div>
            <div className="flex items-start gap-2 p-3 bg-bg-elevated rounded-xl">
              <TrendingDown size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-text-secondary">Problem-solving <span className="text-red-400">consistency dropped 34%</span> last month. Graphs & DP need urgent focus.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
