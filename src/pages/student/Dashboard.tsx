import { motion } from 'framer-motion';
import { TrendingUp, FileText, Code, MessageSquare, Award, AlertTriangle, Target } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import RadarChart from '../../components/charts/RadarChart';
import LineChart from '../../components/charts/LineChart';
import { skills, studentStats, skillGap } from '../../data/dummy';
import { useAuth } from '../../context/AuthContext';

const statCards = [
  { label: 'Industry Readiness Score', value: `${studentStats.readinessScore}%`, icon: TrendingUp, color: 'text-lime' },
  { label: 'Resume Score', value: `${studentStats.resumeScore}/100`, icon: FileText, color: 'text-lime' },
  { label: 'Coding Score', value: `${studentStats.codingScore}%`, icon: Code, color: 'text-lime' },
  { label: 'Communication Score', value: `${studentStats.communicationScore}%`, icon: MessageSquare, color: 'text-lime' },
  { label: 'Internship Score', value: `${studentStats.internshipScore}%`, icon: Award, color: 'text-lime' },
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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Dashboard</h1>
        <p className="text-text-secondary font-body mt-1">Welcome back, {profile?.full_name ?? profile?.email ?? 'there'}! Here&apos;s your placement readiness overview.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="text-center" glow>
                <Icon size={22} className={`mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-heading font-bold text-text-primary">{stat.value}</p>
                <p className="text-xs font-body text-text-secondary mt-1">{stat.label}</p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GlassCard className="lg:col-span-1">
          <h3 className="font-heading font-semibold text-text-primary mb-2">Skill Radar</h3>
          <RadarChart data={radarData} />
        </GlassCard>

        <GlassCard className="lg:col-span-2">
          <h3 className="font-heading font-semibold text-text-primary mb-2">Readiness Progress</h3>
          <LineChart data={monthlyData} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-text-primary">Missing Skills</h3>
            <Target size={18} className="text-lime" />
          </div>
          <div className="space-y-3">
            {skillGap.missingSkills.map((skill) => (
              <div key={skill} className="flex items-center justify-between p-3 glass rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-amber-400" />
                  <span className="font-body text-sm text-text-primary">{skill}</span>
                </div>
                <span className="font-mono text-xs text-amber-400">CRITICAL</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-text-primary">Skill Levels</h3>
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
