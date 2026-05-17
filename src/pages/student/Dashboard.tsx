import { motion } from 'framer-motion';
import { TrendingUp, FileText, Code, Target, AlertTriangle, Zap, Trophy, Flame, BarChart2, ExternalLink } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import RadarChart from '../../components/charts/RadarChart';
import { skillGap } from '../../data/dummy';
import { useAuth } from '../../context/AuthContext';
import { useLeetCode } from '../../hooks/useLeetCode';

export default function StudentDashboard() {
  const { profile } = useAuth();
  const { stats, loading: lcLoading } = useLeetCode(profile?.leetcode_username);

  const firstName = profile?.full_name?.split(' ')[0] ?? profile?.email?.split('@')[0] ?? 'there';

  // Build radar data from LeetCode tag stats if available
  const radarData = stats?.topTags
    ? [
        ...stats.topTags.fundamental.slice(0, 2).map(t => ({ subject: t.tagName, value: Math.min(t.problemsSolved * 3, 100) })),
        ...stats.topTags.intermediate.slice(0, 2).map(t => ({ subject: t.tagName, value: Math.min(t.problemsSolved * 4, 100) })),
        ...stats.topTags.advanced.slice(0, 2).map(t => ({ subject: t.tagName, value: Math.min(t.problemsSolved * 6, 100) })),
      ].slice(0, 6)
    : [
        { subject: 'DSA', value: 68 },
        { subject: 'Algorithms', value: 72 },
        { subject: 'React', value: 70 },
        { subject: 'TypeScript', value: 60 },
        { subject: 'Python', value: 75 },
        { subject: 'SQL', value: 65 },
      ];

  // Stat cards — real data where possible
  const statCards = [
    {
      label: 'LeetCode Solved',
      value: lcLoading ? '...' : stats ? `${stats.solved.total}` : '—',
      icon: Code,
      sub: stats ? `E:${stats.solved.easy} M:${stats.solved.medium} H:${stats.solved.hard}` : 'Link your LeetCode',
      accent: true,
    },
    {
      label: 'Contest Rating',
      value: lcLoading ? '...' : stats?.contest?.rating ? Math.round(stats.contest.rating).toString() : '—',
      icon: Trophy,
      sub: stats?.contest?.badge?.name || 'No badge yet',
      accent: false,
    },
    {
      label: 'Current Streak',
      value: lcLoading ? '...' : stats ? `${stats.streak}d` : '—',
      icon: Flame,
      sub: stats ? `${stats.totalActiveDays} total active days` : '',
      accent: false,
    },
    {
      label: 'Global Rank',
      value: lcLoading ? '...' : stats?.ranking ? `#${stats.ranking.toLocaleString()}` : '—',
      icon: TrendingUp,
      sub: stats?.contest?.topPercentage ? `Top ${stats.contest.topPercentage.toFixed(1)}%` : '',
      accent: false,
    },
    {
      label: 'Contests Attended',
      value: lcLoading ? '...' : stats?.contest?.attendedContestsCount?.toString() ?? '—',
      icon: BarChart2,
      sub: 'LeetCode contests',
      accent: false,
    },
  ];

  return (
    <div>
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Dashboard Overview</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">
          Welcome back, {firstName}
        </h1>
        <p className="text-text-secondary font-body mt-3 text-lg">
          {profile?.leetcode_username
            ? `Showing live data for LeetCode: @${profile.leetcode_username}`
            : "Here's your placement readiness overview."}
        </p>
      </motion.div>

      {/* LeetCode not linked warning */}
      {!profile?.leetcode_username && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
          <GlassCard className="p-4 border border-yellow-500/30 bg-yellow-500/5 flex items-center gap-3">
            <AlertTriangle size={18} className="text-yellow-400 shrink-0" />
            <p className="text-sm text-text-secondary font-body">
              LeetCode not linked. <a href="/student/coding-profiles" className="text-lime hover:underline">Go to Coding Profiles</a> to connect your account.
            </p>
          </GlassCard>
        </motion.div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="text-center p-6" accent={stat.accent}>
                <Icon size={24} className={`mx-auto mb-3 ${stat.accent ? 'text-lime' : 'text-gold'}`} />
                <p className="text-3xl font-heading font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs font-body text-text-secondary mt-1">{stat.label}</p>
                {stat.sub && <p className="text-xs font-mono text-text-muted mt-1">{stat.sub}</p>}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Skill Radar */}
        <GlassCard className="lg:col-span-1 p-6">
          <h3 className="font-heading text-xl text-text-primary mb-1">Topic Radar</h3>
          <p className="text-xs text-text-muted font-body mb-4">
            {stats ? 'Based on your LeetCode solved topics' : 'Static preview — link LeetCode to see yours'}
          </p>
          <RadarChart data={radarData} />
        </GlassCard>

        {/* Difficulty Breakdown */}
        <GlassCard className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl text-text-primary">Difficulty Breakdown</h3>
            {profile?.leetcode_username && (
              <a
                href={`https://leetcode.com/${profile.leetcode_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-lime hover:underline font-body"
              >
                View on LeetCode <ExternalLink size={12} />
              </a>
            )}
          </div>

          {stats ? (
            <div className="space-y-5">
              {[
                { label: 'Easy', count: stats.solved.easy, color: 'bg-green-400', total: 856 },
                { label: 'Medium', count: stats.solved.medium, color: 'bg-yellow-400', total: 1793 },
                { label: 'Hard', count: stats.solved.hard, color: 'bg-red-400', total: 776 },
              ].map(({ label, count, color, total }) => (
                <div key={label}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-body text-text-secondary">{label}</span>
                    <span className="text-sm font-heading text-text-primary">{count} <span className="text-text-muted font-body text-xs">/ {total}</span></span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((count / total) * 100, 100)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full rounded-full ${color}`}
                    />
                  </div>
                </div>
              ))}

              {/* Language breakdown */}
              {stats.languages.length > 0 && (
                <div className="pt-4 border-t border-border">
                  <p className="text-xs font-body text-text-muted uppercase tracking-widest mb-3">Languages Used</p>
                  <div className="flex flex-wrap gap-2">
                    {stats.languages.slice(0, 6).map(lang => (
                      <span key={lang.languageName} className="text-xs font-mono px-2 py-1 bg-white/5 rounded-lg text-text-secondary">
                        {lang.languageName} <span className="text-gold">{lang.problemsSolved}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : lcLoading ? (
            <div className="flex items-center justify-center h-32 text-text-muted font-body text-sm">
              <Zap size={16} className="mr-2 animate-pulse" /> Fetching LeetCode data...
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-text-muted font-body text-sm">
              Link your LeetCode account to see real data
            </div>
          )}
        </GlassCard>
      </div>

      {/* Recent Submissions + Missing Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Recent Submissions */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl text-text-primary">Recent Submissions</h3>
            <FileText size={20} className="text-gold" />
          </div>
          {stats?.recentSubmissions.length ? (
            <div className="space-y-3">
              {stats.recentSubmissions.slice(0, 6).map((sub) => (
                <a
                  key={sub.id}
                  href={`https://leetcode.com/problems/${sub.titleSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-bg-elevated rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                    <span className="font-body text-sm text-text-primary truncate group-hover:text-lime transition-colors">
                      {sub.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-text-muted shrink-0 ml-2">{sub.lang}</span>
                </a>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {skillGap.missingSkills.slice(0, 5).map(skill => (
                <div key={skill} className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                  <div className="flex items-center gap-3">
                    <AlertTriangle size={16} className="text-warning" />
                    <span className="font-body text-sm text-text-primary">{skill}</span>
                  </div>
                  <span className="font-body text-xs text-warning uppercase tracking-widest">Critical</span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        {/* Skill Gap */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl text-text-primary">Skill Gaps to Close</h3>
            <Target size={20} className="text-gold" />
          </div>
          <div className="space-y-4">
            {skillGap.missingSkills.map(skill => (
              <div key={skill} className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-warning" />
                  <span className="font-body text-sm text-text-primary">{skill}</span>
                </div>
                <span className="font-body text-xs text-warning uppercase tracking-widest">Critical</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border space-y-3">
            <p className="text-xs font-body text-text-muted uppercase tracking-widest">Your Skill Progress</p>
            {[
              { label: 'DSA', value: stats ? Math.min(Math.round((stats.solved.total / 500) * 100), 100) : 68 },
              { label: 'Problem Solving', value: stats ? Math.min(Math.round((stats.solved.hard * 5 + stats.solved.medium * 2), 100), 100) : 72 },
            ].map(s => <ProgressBar key={s.label} label={s.label} value={s.value} />)}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
