import { motion } from 'framer-motion';
import { CheckCircle, Circle, BookOpen } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { roadmap } from '../../data/dummy';

export default function LearningRoadmap() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Plan</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Learning Roadmap</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Personalized monthly milestones to bridge your skill gaps</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard className="text-center p-6" accent>
          <p className="text-4xl font-heading font-bold text-gold">{roadmap.reduce((a, m) => a + m.completed, 0)}</p>
          <p className="text-sm text-text-secondary mt-2">Tasks Completed</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-text-primary">{roadmap.reduce((a, m) => a + m.total, 0)}</p>
          <p className="text-sm text-text-secondary mt-2">Total Tasks</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-gold">{Math.round(roadmap.reduce((a, m) => a + m.completed, 0) / roadmap.reduce((a, m) => a + m.total, 0) * 100)}%</p>
          <p className="text-sm text-text-secondary mt-2">Overall Progress</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-text-primary">{roadmap.length}</p>
          <p className="text-sm text-text-secondary mt-2">Months Planned</p>
        </GlassCard>
      </div>

      <div className="relative">
        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-border" />

        <div className="space-y-6">
          {roadmap.map((milestone, idx) => (
            <motion.div
              key={milestone.month}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-14"
            >
              <div className="absolute left-[14px] top-2 w-[22px] h-[22px] rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-gold" />
              </div>

              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen size={20} className="text-gold" />
                    <div>
                      <h3 className="font-heading text-lg text-text-primary">{milestone.title}</h3>
                      <p className="font-body text-xs text-text-secondary uppercase tracking-widest">Month {milestone.month}</p>
                    </div>
                  </div>
                  <Badge variant={milestone.completed === milestone.total ? 'success' : 'warning'}>
                    {milestone.completed}/{milestone.total}
                  </Badge>
                </div>

                <ProgressBar value={milestone.completed} max={milestone.total} size="sm" color="bg-gold" />

                <div className="mt-4 space-y-2">
                  {milestone.tasks.map((task) => {
                    const done = milestone.tasks.indexOf(task) < milestone.completed;
                    return (
                      <div key={task} className="flex items-center gap-3">
                        {done ? (
                          <CheckCircle size={16} className="text-gold shrink-0" />
                        ) : (
                          <Circle size={16} className="text-text-muted shrink-0" />
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
