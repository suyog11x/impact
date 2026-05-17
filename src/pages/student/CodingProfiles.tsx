import { motion } from 'framer-motion';
import { GitFork, Code, ExternalLink, GitCommit } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import { codingProfiles } from '../../data/dummy';

const platformIcons: Record<string, React.ReactNode> = {
  GitHub: <GitFork size={28} />,
  LeetCode: <Code size={28} />,
  CodeChef: <Code size={28} />,
  HackerRank: <Code size={28} />,
};

export default function CodingProfiles() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Platforms</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Coding Profiles</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Connect and analyze your coding platform performance</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard className="text-center p-6" accent>
          <p className="text-4xl font-heading font-bold text-gold">{codingProfiles.reduce((a, p) => a + p.problemsSolved, 0)}</p>
          <p className="text-sm text-text-secondary mt-2">Total Problems Solved</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-text-primary">{codingProfiles.reduce((a, p) => a + p.contributions, 0)}</p>
          <p className="text-sm text-text-secondary mt-2">Total Contributions</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-gold">{Math.max(...codingProfiles.map(p => p.streak))}</p>
          <p className="text-sm text-text-secondary mt-2">Longest Streak (days)</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-text-primary">{codingProfiles.length}</p>
          <p className="text-sm text-text-secondary mt-2">Platforms Connected</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {codingProfiles.map((profile, idx) => (
          <motion.div
            key={profile.platform}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="text-gold">{platformIcons[profile.platform]}</div>
                  <div>
                    <h3 className="font-heading text-xl text-text-primary">{profile.platform}</h3>
                    <p className="font-body text-sm text-text-secondary">{profile.username}</p>
                  </div>
                </div>
                <ExternalLink size={18} className="text-text-muted cursor-pointer hover:text-gold transition-colors" />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-text-primary">{profile.problemsSolved}</p>
                  <p className="font-body text-xs text-text-secondary uppercase tracking-widest mt-1">Solved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-gold">{profile.rating || '-'}</p>
                  <p className="font-body text-xs text-text-secondary uppercase tracking-widest mt-1">Rating</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-heading font-bold text-text-primary">{profile.streak}d</p>
                  <p className="font-body text-xs text-text-secondary uppercase tracking-widest mt-1">Streak</p>
                </div>
              </div>

              {profile.contributions > 0 && (
                <div className="pt-4 border-t border-border">
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

      <GlassCard className="p-6">
        <h3 className="font-heading text-xl text-text-primary mb-6">Activity Heatmap</h3>
        <div className="grid grid-cols-52 gap-1">
          {Array.from({ length: 364 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-sm transition-colors"
              style={{
                backgroundColor: Math.random() > 0.6 ? `rgba(212, 175, 55, ${0.1 + Math.random() * 0.4})` : 'rgba(255,255,255,0.03)',
              }}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 justify-end">
          <span className="text-xs text-text-secondary font-body">Less</span>
          {[0.03, 0.1, 0.2, 0.3, 0.5].map((o) => (
            <div key={o} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(212, 175, 55, ${o})` }} />
          ))}
          <span className="text-xs text-text-secondary font-body">More</span>
        </div>
      </GlassCard>
    </div>
  );
}
