import { motion } from 'framer-motion';
import { Users, Brain, Play, Clock, BarChart3 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';

const interviewTypes = [
  { icon: <Brain size={36} />, title: 'Technical', desc: 'AI-conducted technical interview with DSA & system design questions', duration: '45 min', difficulty: 'Hard' },
  { icon: <Users size={36} />, title: 'HR', desc: 'Behavioral and HR round with common placement questions', duration: '30 min', difficulty: 'Medium' },
  { icon: <BarChart3 size={36} />, title: 'Aptitude', desc: 'Quantitative, logical reasoning and verbal ability test', duration: '60 min', difficulty: 'Easy' },
];

const previousReports = [
  { type: 'Technical', score: 72, date: '2026-05-10', feedback: 'Good DSA, need more system design practice' },
  { type: 'HR', score: 85, date: '2026-05-05', feedback: 'Excellent communication, confident responses' },
  { type: 'Aptitude', score: 68, date: '2026-04-28', feedback: 'Quantitative needs improvement' },
];

export default function MockInterviews() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Practice</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Mock Interviews</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Practice with AI-conducted mock interviews tailored to your target companies</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {interviewTypes.map((type, idx) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <GlassCard className="p-6 flex flex-col h-full" hover accent>
              <div className="text-gold mb-4">{type.icon}</div>
              <h3 className="text-2xl font-heading text-text-primary mb-2">{type.title}</h3>
              <p className="text-sm font-body text-text-secondary flex-1">{type.desc}</p>
              <div className="flex items-center gap-3 mt-4 mb-4">
                <div className="flex items-center gap-1.5 text-xs text-text-secondary font-body">
                  <Clock size={14} /> {type.duration}
                </div>
                <Badge variant={
                  type.difficulty === 'Hard' ? 'danger' :
                  type.difficulty === 'Medium' ? 'warning' : 'success'
                }>
                  {type.difficulty}
                </Badge>
              </div>
              <NeonButton size="sm" className="w-full">
                <Play size={14} /> Start Interview
              </NeonButton>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="font-heading text-xl text-text-primary mb-6">Previous Reports</h3>
        <div className="space-y-3">
          {previousReports.map((report, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-bg-elevated rounded-xl p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-heading text-text-primary">{report.type}</span>
                  <Badge variant={report.score >= 80 ? 'success' : report.score >= 60 ? 'warning' : 'danger'}>
                    {report.score}%
                  </Badge>
                </div>
                <p className="text-xs font-body text-text-secondary">{report.date} • {report.feedback}</p>
              </div>
              <NeonButton size="sm" variant="ghost">
                View Report
              </NeonButton>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
