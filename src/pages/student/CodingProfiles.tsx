import { motion } from 'framer-motion';
import { GitFork, Code, ExternalLink, GitCommit } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import { codingProfiles } from '../../data/dummy';

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: <GitFork size={24} />,
  LeetCode: <Code size={24} />,
  CodeChef: <Code size={24} />,
  HackerRank: <Code size={24} />,
};

export default function CodingProfiles() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Coding Profiles</h1>
        <p className="text-text-secondary font-body mt-1">Connect and analyze your coding platform performance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard className="text-center" glow>
          <p className="text-3xl font-heading font-bold text-lime">{codingProfiles.reduce((a, p) => a + p.problemsSolved, 0)}</p>
          <p className="text-sm text-text-secondary">Total Problems Solved</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-text-primary">{codingProfiles.reduce((a, p) => a + p.contributions, 0)}</p>
          <p className="text-sm text-text-secondary">Total Contributions</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-lime">{Math.max(...codingProfiles.map(p => p.streak))}</p>
          <p className="text-sm text-text-secondary">Longest Streak (days)</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-text-primary">{codingProfiles.length}</p>
          <p className="text-sm text-text-secondary">Platforms Connected</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {codingProfiles.map((profile, idx) => (
          <motion.div
            key={profile.platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-lime">{platformIcons[profile.platform]}</div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary">{profile.platform}</h3>
                    <p className="font-mono text-xs text-text-secondary">{profile.username}</p>
                  </div>
                </div>
                <ExternalLink size={16} className="text-muted cursor-pointer hover:text-lime transition-colors" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-xl font-heading font-bold text-text-primary">{profile.problemsSolved}</p>
                  <p className="font-mono text-xs text-muted uppercase tracking-wider">Solved</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-heading font-bold text-lime">{profile.rating || '-'}</p>
                  <p className="font-mono text-xs text-muted uppercase tracking-wider">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-heading font-bold text-text-primary">{profile.streak}d</p>
                  <p className="font-mono text-xs text-muted uppercase tracking-wider">Streak</p>
                </div>
              </div>

              {profile.contributions > 0 && (
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                    <GitCommit size={14} />
                    Contributions this year
                  </div>
                  <ProgressBar value={Math.min(profile.contributions, 1000)} max={1000} showValue={false} />
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard>
        <h3 className="font-heading font-semibold text-text-primary mb-4">Activity Heatmap</h3>
        <div className="grid grid-cols-52 gap-1">
          {Array.from({ length: 364 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm transition-colors"
              style={{
                backgroundColor: Math.random() > 0.6 ? `rgba(204, 255, 0, ${0.1 + Math.random() * 0.4})` : 'rgba(255,255,255,0.03)',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 justify-end">
          <span className="text-xs text-muted font-body">Less</span>
          {[0.03, 0.1, 0.2, 0.3, 0.5].map((o) => (
            <div key={o} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(204, 255, 0, ${o})` }} />
          ))}
          <span className="text-xs text-muted font-body">More</span>
        </div>
      </GlassCard>
    </div>
  );
}
