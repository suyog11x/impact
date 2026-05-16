import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, CheckCircle, Briefcase, Calendar, TrendingUp, Layers } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';

const stats = [
  { label: 'Total Candidates', value: '1,247', icon: Users, color: 'text-blue-400' },
  { label: 'Shortlisted', value: '184', icon: CheckCircle, color: 'text-lime' },
  { label: 'Open Job Roles', value: '12', icon: Briefcase, color: 'text-purple-400' },
  { label: 'Interviews', value: '45', icon: Calendar, color: 'text-orange-400' },
];

const cards = [
  { label: 'Avg. Readiness Score', value: '72%', icon: TrendingUp, detail: '+5% this month' },
  { label: 'Top Skill Domains', value: 'Web, AI, Cloud', icon: Layers, detail: 'High demand: React, Python' },
];

export default function RecruiterDashboard() {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Recruiter Overview</h1>
        <p className="text-text-secondary font-body mt-1">Snapshot of your recruitment funnel and talent pool</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard glow className="relative overflow-hidden group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
                    <p className="text-xs text-text-secondary font-body font-medium uppercase tracking-wider">{stat.label}</p>
                  </div>
                </div>
                <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <Icon size={80} />
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <GlassCard className="p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-mono text-lime uppercase tracking-widest mb-1">{card.label}</p>
                    <h3 className="text-4xl font-heading font-bold text-text-primary mb-2">{card.value}</h3>
                    <p className="text-sm text-text-secondary font-body">{card.detail}</p>
                  </div>
                  <div className="w-14 h-14 bg-lime/10 rounded-2xl flex items-center justify-center text-lime">
                    <Icon size={28} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <GlassCard>
        <h3 className="font-heading font-semibold text-text-primary mb-4">Quick Links</h3>
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
              className="p-4 glass rounded-xl text-sm font-body text-text-secondary hover:text-lime hover:border-lime/30 transition-all text-center block"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
