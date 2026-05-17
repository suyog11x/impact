import { motion } from 'framer-motion';
import {
  Code, ExternalLink, Flame, Trophy, GitFork,
  Plus, CheckCircle2, Loader2, AlertCircle, Award
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import { useAuth } from '../../context/AuthContext';
import { useLeetCode } from '../../hooks/useLeetCode';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { validateLeetCodeUsername } from '../../hooks/useLeetCode';

// ── Submission Heatmap from real calendar data ───────────────────────────────
function SubmissionHeatmap({ calendar }: { calendar: Record<string, number> }) {
  const now = Math.floor(Date.now() / 1000);
  const ONE_YEAR_AGO = now - 365 * 86400;

  // Build 53 weeks × 7 days grid
  const weeks: Array<Array<{ ts: number; count: number }>> = [];
  let current = new Date();
  current.setHours(0, 0, 0, 0);
  // Roll back to start of the week (Sunday)
  current.setDate(current.getDate() - current.getDay());

  for (let w = 52; w >= 0; w--) {
    const week: Array<{ ts: number; count: number }> = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(current);
      date.setDate(date.getDate() - (w * 7) + d);
      const ts = Math.floor(date.getTime() / 1000);
      const count = calendar[ts] || 0;
      week.push({ ts, count: ts >= ONE_YEAR_AGO ? count : 0 });
    }
    weeks.push(week);
  }

  const getColor = (count: number) => {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    if (count <= 2) return 'rgba(253, 224, 71, 0.35)';
    if (count <= 5) return 'rgba(253, 224, 71, 0.6)';
    if (count <= 10) return 'rgba(253, 224, 71, 0.8)';
    return 'rgba(253, 224, 71, 1)';
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-0.5 min-w-max">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-0.5">
            {week.map((day, di) => (
              <div
                key={di}
                title={`${new Date(day.ts * 1000).toDateString()}: ${day.count} submissions`}
                className="w-3 h-3 rounded-sm transition-colors cursor-default"
                style={{ backgroundColor: getColor(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-xs text-text-secondary font-body">Less</span>
        {[0, 2, 5, 10, 15].map(v => (
          <div key={v} className="w-3 h-3 rounded-sm" style={{ backgroundColor: getColor(v) }} />
        ))}
        <span className="text-xs text-text-secondary font-body">More</span>
      </div>
    </div>
  );
}

// ── Add LeetCode Modal ────────────────────────────────────────────────────────
function AddLeetCodeModal({ onClose, onSaved }: { onClose: () => void; onSaved: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [msg, setMsg] = useState('');
  const [saving, setSaving] = useState(false);

  const handleCheck = async () => {
    if (!username.trim()) return;
    setStatus('checking');
    const result = await validateLeetCodeUsername(username.trim());
    if (result.valid) {
      setStatus('valid');
      setMsg(`Found: ${result.realName || username}`);
    } else {
      setStatus('invalid');
      setMsg(result.error || 'Not found');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.auth.updateUser({ data: { leetcode_username: username.trim() } });
      await supabase.from('profiles').update({ leetcode_username: username.trim() }).eq('id', user.id);
    }
    setSaving(false);
    onSaved(username.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-[2rem] p-8 w-full max-w-md"
      >
        <h3 className="font-heading text-2xl text-text-primary mb-2">Link LeetCode Account</h3>
        <p className="text-text-secondary font-body text-sm mb-6">Enter your LeetCode username to import real stats</p>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={username}
            onChange={e => { setUsername(e.target.value); setStatus('idle'); setMsg(''); }}
            placeholder="your-leetcode-username"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-text-primary outline-none focus:border-lime/40 placeholder:text-text-muted"
          />
          <button
            type="button"
            onClick={handleCheck}
            disabled={!username.trim() || status === 'checking'}
            className="px-4 py-2.5 bg-white/10 hover:bg-lime/20 border border-white/10 rounded-xl text-sm text-text-secondary hover:text-lime transition-colors font-body"
          >
            {status === 'checking' ? <Loader2 size={16} className="animate-spin" /> : 'Verify'}
          </button>
        </div>

        {msg && (
          <p className={`text-xs font-body mb-4 px-1 ${status === 'valid' ? 'text-green-400' : 'text-red-400'}`}>{msg}</p>
        )}

        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/10 text-text-secondary text-sm font-body hover:border-white/20 transition-colors">
            Cancel
          </button>
          <NeonButton
            size="sm"
            className="flex-1"
            disabled={status !== 'valid' || saving}
            onClick={handleSave}
          >
            {saving ? 'Saving...' : 'Save Account'}
          </NeonButton>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function CodingProfiles() {
  const { profile, refreshProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { stats, loading, error } = useLeetCode(profile?.leetcode_username);

  const handleSaved = async (username: string) => {
    await refreshProfile();
    console.log('LeetCode linked:', username);
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Platforms</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Coding Profiles</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Your real performance — live from LeetCode</p>
      </motion.div>

      {/* LeetCode not linked */}
      {!profile?.leetcode_username && (
        <GlassCard className="p-8 text-center mb-10 border border-dashed border-lime/30">
          <Code size={40} className="mx-auto mb-4 text-lime/60" />
          <h3 className="font-heading text-xl text-text-primary mb-2">LeetCode Not Linked</h3>
          <p className="text-text-secondary font-body text-sm mb-6">Connect your LeetCode account to see real stats, streak, and submission history.</p>
          <NeonButton onClick={() => setShowModal(true)}>
            <Plus size={16} /> Link LeetCode Account
          </NeonButton>
        </GlassCard>
      )}

      {/* Main Stats — LeetCode */}
      {profile?.leetcode_username && (
        <>
          {/* Summary Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {[
              { label: 'Total Solved', value: loading ? '...' : stats ? stats.solved.total.toString() : '—', icon: Code, accent: true },
              { label: 'Contest Rating', value: loading ? '...' : stats?.contest?.rating ? Math.round(stats.contest.rating).toString() : '—', icon: Trophy, accent: false },
              { label: 'Streak', value: loading ? '...' : stats ? `${stats.streak}d` : '—', icon: Flame, accent: false },
              { label: 'Global Rank', value: loading ? '...' : stats?.ranking ? `#${stats.ranking.toLocaleString()}` : '—', icon: GitFork, accent: false },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <GlassCard className="text-center p-6" accent={s.accent}>
                    <Icon size={22} className={`mx-auto mb-2 ${s.accent ? 'text-lime' : 'text-gold'}`} />
                    <p className="text-3xl font-heading font-bold text-text-primary">{s.value}</p>
                    <p className="text-xs font-body text-text-secondary mt-1">{s.label}</p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* LeetCode Card + Difficulty */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ffa116]/10 flex items-center justify-center">
                    <Code size={22} className="text-[#ffa116]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-text-primary">LeetCode</h3>
                    <p className="font-body text-sm text-text-secondary">@{profile.leetcode_username}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowModal(true)}
                    className="text-xs text-text-muted hover:text-lime transition-colors font-body flex items-center gap-1"
                  >
                    <Plus size={12} /> Change
                  </button>
                  <a
                    href={`https://leetcode.com/${profile.leetcode_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-gold transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {loading && (
                <div className="flex items-center gap-2 text-text-muted font-body text-sm py-8 justify-center">
                  <Loader2 size={16} className="animate-spin" /> Loading stats…
                </div>
              )}
              {error && (
                <div className="flex items-center gap-2 text-red-400 font-body text-sm py-4">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              {stats && (
                <>
                  {/* Profile info */}
                  {stats.avatar && (
                    <div className="flex items-center gap-3 mb-5 p-3 bg-bg-elevated rounded-xl">
                      <img src={stats.avatar} alt="avatar" className="w-12 h-12 rounded-full border border-[#ffa116]/30" />
                      <div>
                        <p className="font-heading text-text-primary">{stats.realName || profile.leetcode_username}</p>
                        <p className="text-xs text-text-muted font-body">{stats.country || ''}</p>
                      </div>
                      {stats.activeBadge && (
                        <div className="ml-auto flex items-center gap-1">
                          <img src={stats.activeBadge.icon} alt={stats.activeBadge.displayName} className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Difficulty bars */}
                  <div className="space-y-4">
                    {[
                      { label: 'Easy', count: stats.solved.easy, max: 856, color: 'bg-green-400' },
                      { label: 'Medium', count: stats.solved.medium, max: 1793, color: 'bg-yellow-400' },
                      { label: 'Hard', count: stats.solved.hard, max: 776, color: 'bg-red-400' },
                    ].map(({ label, count, max, color }) => (
                      <div key={label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-body text-text-secondary">{label}</span>
                          <span className="text-sm font-heading text-text-primary">{count}</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((count / max) * 100, 100)}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full rounded-full ${color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </GlassCard>

            {/* Languages + Badges */}
            <GlassCard className="p-6">
              <h3 className="font-heading text-xl text-text-primary mb-5">Languages & Badges</h3>

              {stats?.languages.length ? (
                <>
                  <div className="space-y-3 mb-6">
                    {stats.languages.slice(0, 6).map(lang => (
                      <div key={lang.languageName} className="flex items-center gap-3">
                        <span className="font-body text-sm text-text-secondary w-24 shrink-0">{lang.languageName}</span>
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min((lang.problemsSolved / (stats?.solved.total || 1)) * 100, 100)}%` }}
                            transition={{ duration: 1 }}
                            className="h-full rounded-full bg-lime/60"
                          />
                        </div>
                        <span className="text-xs font-mono text-gold w-8 text-right">{lang.problemsSolved}</span>
                      </div>
                    ))}
                  </div>

                  {stats.badges.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-text-muted uppercase tracking-widest mb-3 font-body">Badges Earned</p>
                      <div className="flex flex-wrap gap-2">
                        {stats.badges.slice(0, 6).map(badge => (
                          <div key={badge.id} title={badge.displayName} className="flex items-center gap-1.5 px-2 py-1 bg-bg-elevated rounded-lg">
                            {badge.icon
                              ? <img src={badge.icon} alt={badge.displayName} className="w-5 h-5" />
                              : <Award size={14} className="text-gold" />
                            }
                            <span className="text-xs font-body text-text-secondary">{badge.displayName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : loading ? (
                <div className="flex items-center justify-center h-32 text-text-muted text-sm font-body">
                  <Loader2 size={16} className="animate-spin mr-2" /> Loading…
                </div>
              ) : (
                <div className="text-center text-text-muted font-body text-sm py-8">No data available</div>
              )}
            </GlassCard>
          </div>

          {/* Submission Heatmap */}
          <GlassCard className="p-6 mb-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading text-xl text-text-primary">Submission Heatmap</h3>
              <span className="text-xs text-text-muted font-body">Last 12 months</span>
            </div>
            {stats?.submissionCalendar && Object.keys(stats.submissionCalendar).length > 0 ? (
              <SubmissionHeatmap calendar={stats.submissionCalendar} />
            ) : loading ? (
              <div className="h-20 flex items-center justify-center text-text-muted text-sm font-body">
                <Loader2 size={16} className="animate-spin mr-2" /> Loading calendar…
              </div>
            ) : (
              <div className="h-20 flex items-center justify-center text-text-muted text-sm font-body">
                No submission data available
              </div>
            )}
          </GlassCard>

          {/* Recent Submissions */}
          {stats?.recentSubmissions.length ? (
            <GlassCard className="p-6">
              <h3 className="font-heading text-xl text-text-primary mb-5">Recent Accepted Submissions</h3>
              <div className="space-y-3">
                {stats.recentSubmissions.map(sub => (
                  <a
                    key={sub.id}
                    href={`https://leetcode.com/problems/${sub.titleSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-2 h-2 bg-green-400 rounded-full shrink-0" />
                      <span className="font-body text-sm text-text-primary truncate group-hover:text-lime transition-colors">{sub.title}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0 ml-3">
                      <span className="font-mono text-xs text-text-muted">{sub.lang}</span>
                      <span className="font-mono text-xs text-text-muted">{new Date(Number(sub.timestamp) * 1000).toLocaleDateString()}</span>
                      <ExternalLink size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </a>
                ))}
              </div>
            </GlassCard>
          ) : null}
        </>
      )}

      {showModal && (
        <AddLeetCodeModal onClose={() => setShowModal(false)} onSaved={handleSaved} />
      )}
    </div>
  );
}
