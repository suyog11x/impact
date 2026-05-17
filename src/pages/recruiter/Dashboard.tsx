import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, Briefcase, Calendar, TrendingUp, Layers } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const stats = [
  { label: 'Total Candidates', value: '1,247', icon: Users },
  { label: 'Shortlisted', value: '184', icon: CheckCircle },
  { label: 'Open Job Roles', value: '12', icon: Briefcase },
  { label: 'Interviews', value: '45', icon: Calendar },
];

const cards = [
  { label: 'Avg. Readiness Score', value: '72%', icon: TrendingUp, detail: '+5% this month' },
  { label: 'Top Skill Domains', value: 'Web, AI, Cloud', icon: Layers, detail: 'High demand: React, Python' },
];

export default function RecruiterDashboard() {
  return (
    <div className="space-y-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <p className="premium-label mb-4">Overview</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Recruiter Dashboard</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Snapshot of your recruitment funnel and talent pool</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="p-6" accent>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary font-body uppercase tracking-widest">{stat.label}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-body text-xs text-gold uppercase tracking-widest mb-2">{card.label}</p>
                    <h3 className="text-4xl font-heading font-bold text-text-primary mb-2">{card.value}</h3>
                    <p className="text-sm text-text-secondary font-body">{card.detail}</p>
                  </div>
                  <div className="w-14 h-14 bg-gold/10 rounded-xl flex items-center justify-center text-gold">
                    <Icon size={28} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <GlassCard className="p-6">
        <h3 className="font-heading text-xl text-text-primary mb-6">Quick Links</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Search Candidates', path: '/recruiter/search' },
            { label: 'Match Jobs', path: '/recruiter/job-matching' },
            { label: 'Shortlisted Pool', path: '/recruiter/shortlisted' },
            { label: 'Post a Job', path: '/recruiter/post-job' },
            { label: 'Settings', path: '/settings' },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="p-4 bg-bg-elevated rounded-xl text-sm font-body text-text-secondary hover:text-gold hover:bg-gold/10 transition-all text-center block"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
