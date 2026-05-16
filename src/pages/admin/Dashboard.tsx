import { motion } from 'framer-motion';
import { Users, GraduationCap, Building2, Activity, TrendingUp, UserCheck } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';

const statCards = [
  { label: 'Total Students', value: '2,847', icon: Users, sub: 'Active this semester' },
  { label: 'Total Recruiters', value: '126', icon: GraduationCap, sub: 'Active this cycle' },
  { label: 'Registered Companies', value: '89', icon: Building2, sub: 'For current cycle' },
  { label: 'Active Assessments', value: '1.2K', icon: Activity, sub: 'This month' },
  { label: 'Placement Rate', value: '74%', icon: TrendingUp, sub: '+12% vs last year' },
  { label: 'Students Assessed', value: '2,341', icon: UserCheck, sub: '82% of total' },
];

export default function AdminDashboard() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Admin Dashboard</h1>
        <p className="text-text-secondary font-body mt-1">Platform overview and system management</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard glow>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-lime/10 flex items-center justify-center">
                    <Icon size={22} className="text-lime" />
                  </div>
                  <div>
                    <p className="text-2xl font-heading font-bold text-text-primary">{card.value}</p>
                    <p className="text-xs text-text-secondary font-body">{card.label}</p>
                    <p className="text-xs text-muted font-mono mt-0.5">{card.sub}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GlassCard className="lg:col-span-2">
          <h3 className="font-heading font-semibold text-text-primary mb-4">Platform Growth</h3>
          <div className="h-64 flex items-end gap-3">
            {[40, 55, 48, 62, 70, 58, 78, 85, 72, 90, 88, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="font-mono text-xs text-muted">{val}%</span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${val * 0.6}%` }}
                  transition={{ duration: 0.6, delay: i * 0.03 }}
                  className="w-full bg-lime rounded-t-lg"
                  style={{ opacity: 0.3 + (val / 100) * 0.7 }}
                />
                <span className="font-mono text-xs text-muted">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { label: 'API Uptime', value: 99.9 },
              { label: 'Database Load', value: 42 },
              { label: 'Storage Used', value: 68 },
              { label: 'Active Sessions', value: 87 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-body text-text-secondary">{item.label}</span>
                  <span className="text-sm font-mono text-lime">{item.value}%</span>
                </div>
                <ProgressBar value={item.value} size="sm" color="bg-lime" showValue={false} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Manage Students</h3>
          <p className="text-text-secondary font-body text-sm mb-4">View, edit, and manage all student accounts</p>
          <div className="space-y-2">
            {['Add New Student', 'Bulk Import', 'Export Data', 'Manage Roles'].map((action) => (
              <div key={action} className="p-3 glass rounded-xl text-sm text-text-primary font-body cursor-pointer hover:border-lime/30 transition-all">
                {action}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Manage Companies</h3>
          <p className="text-text-secondary font-body text-sm mb-4">Add and manage partner companies and their requirements</p>
          <div className="space-y-2">
            {['Add Company', 'Update Requirements', 'Interview Schedule', 'Placement Stats'].map((action) => (
              <div key={action} className="p-3 glass rounded-xl text-sm text-text-primary font-body cursor-pointer hover:border-lime/30 transition-all">
                {action}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
