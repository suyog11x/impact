import { motion } from 'framer-motion';
import { TrendingUp, FileText, Code, MessageSquare, Award, AlertTriangle, Target } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import RadarChart from '../../components/charts/RadarChart';
import LineChart from '../../components/charts/LineChart';
import { skills, studentStats, skillGap } from '../../data/dummy';
import { useAuth } from '../../context/AuthContext';

const statCards = [
  { label: 'Industry Readiness Score', value: `${studentStats.readinessScore}%`, icon: TrendingUp },
  { label: 'Resume Score', value: `${studentStats.resumeScore}/100`, icon: FileText },
  { label: 'Coding Score', value: `${studentStats.codingScore}%`, icon: Code },
  { label: 'Communication Score', value: `${studentStats.communicationScore}%`, icon: MessageSquare },
  { label: 'Internship Score', value: `${studentStats.internshipScore}%`, icon: Award },
];

const radarData = skills.filter(s => ['DSA', 'Algorithms', 'React', 'TypeScript', 'Python', 'SQL'].includes(s.name)).map(s => ({
  subject: s.name,
  value: s.level,
}));

const monthlyData = [
  { month: 'Jan', value: 45 },
  { month: 'Feb', value: 52 },
  { month: 'Mar', value: 58 },
  { month: 'Apr', value: 65 },
  { month: 'May', value: 72 },
  { month: 'Jun', value: 82 },
];

export default function StudentDashboard() {
  const { profile } = useAuth();
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Dashboard Overview</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">
          Welcome back, {profile?.full_name?.split(' ')[0] ?? profile?.email?.split('@')[0] ?? 'there'}
        </h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Here&apos;s your placement readiness overview.</p>
      </motion.div>

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
              <GlassCard className="text-center p-6" accent>
                <Icon size={24} className="mx-auto mb-3 text-gold" />
                <p className="text-3xl font-heading font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs font-body text-text-secondary mt-2">{stat.label}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <GlassCard className="lg:col-span-1 p-6">
          <h3 className="font-heading text-xl text-text-primary mb-4">Skill Radar</h3>
          <RadarChart data={radarData} />
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-6">
          <h3 className="font-heading text-xl text-text-primary mb-4">Readiness Progress</h3>
          <LineChart data={monthlyData} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl text-text-primary">Missing Skills</h3>
            <Target size={20} className="text-gold" />
          </div>
          <div className="space-y-3">
            {skillGap.missingSkills.map((skill) => (
              <div key={skill} className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-warning" />
                  <span className="font-body text-sm text-text-primary">{skill}</span>
                </div>
                <span className="font-body text-xs text-warning uppercase tracking-widest">Critical</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl text-text-primary">Skill Levels</h3>
          </div>
          <div className="space-y-4">
            {skills.slice(0, 8).map((skill) => (
              <ProgressBar key={skill.name} label={skill.name} value={skill.level} />
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
