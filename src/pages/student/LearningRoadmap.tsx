import { motion } from 'framer-motion';
import { CheckCircle, Circle, BookOpen } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { roadmap } from '../../data/dummy';

export default function LearningRoadmap() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Learning Roadmap</h1>
        <p className="text-text-secondary font-body mt-1">Personalized monthly milestones to bridge your skill gaps</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard className="text-center" glow>
          <p className="text-3xl font-heading font-bold text-lime">{roadmap.reduce((a, m) => a + m.completed, 0)}</p>
          <p className="text-sm text-text-secondary">Tasks Completed</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-text-primary">{roadmap.reduce((a, m) => a + m.total, 0)}</p>
          <p className="text-sm text-text-secondary">Total Tasks</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-lime">{Math.round(roadmap.reduce((a, m) => a + m.completed, 0) / roadmap.reduce((a, m) => a + m.total, 0) * 100)}%</p>
          <p className="text-sm text-text-secondary">Overall Progress</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-text-primary">{roadmap.length}</p>
          <p className="text-sm text-text-secondary">Months Planned</p>
        </GlassCard>
      </div>

      <div className="relative">
        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-white/5" />

        <div className="space-y-6">
          {roadmap.map((milestone, idx) => (
            <motion.div
              key={milestone.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-14"
            >
              <div className="absolute left-[14px] top-2 w-[22px] h-[22px] rounded-full bg-lime/20 border-2 border-lime flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-lime" />
              </div>

              <GlassCard>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <BookOpen size={18} className="text-lime" />
                    <div>
                      <h3 className="font-heading font-semibold text-text-primary">{milestone.title}</h3>
                      <p className="font-mono text-xs text-muted uppercase tracking-wider">Month {milestone.month}</p>
                    </div>
                  </div>
                  <Badge variant={milestone.completed === milestone.total ? 'success' : 'warning'}>
                    {milestone.completed}/{milestone.total}
                  </Badge>
                </div>

                <ProgressBar value={milestone.completed} max={milestone.total} size="sm" color="bg-lime" />

                <div className="mt-4 space-y-2">
                  {milestone.tasks.map((task) => {
                    const done = milestone.tasks.indexOf(task) < milestone.completed;
                    return (
                      <div key={task} className="flex items-center gap-3">
                        {done ? (
                          <CheckCircle size={16} className="text-lime shrink-0" />
                        ) : (
                          <Circle size={16} className="text-muted shrink-0" />
                        )}
                        <span className={`font-body text-sm ${done ? 'text-text-secondary line-through opacity-60' : 'text-text-primary'}`}>
                          {task}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
