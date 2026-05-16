import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Target } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import RadarChart from '../../components/charts/RadarChart';
import BarChart from '../../components/charts/BarChart';
import { skillGap, skills } from '../../data/dummy';

const radarData = skillGap.currentSkills.filter(s => ['JavaScript', 'React', 'Python', 'DSA', 'Algorithms', 'SQL'].includes(s.name)).map(s => ({
  subject: s.name,
  value: s.level,
}));

const barData = skillGap.requiredSkills.map(s => ({
  name: s.name,
  value: s.level,
}));

export default function SkillGapAnalysis() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Skill Gap Analysis</h1>
        <p className="text-text-secondary font-body mt-1">Compare your current skills against industry requirements</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <GlassCard className="text-center lg:col-span-1" glow>
          <Target size={24} className="mx-auto mb-2 text-lime" />
          <p className="text-4xl font-heading font-bold text-lime">{skillGap.readinessScore}%</p>
          <p className="text-sm text-text-secondary mt-1">Readiness Score</p>
          <ProgressBar value={skillGap.readinessScore} color="bg-lime" />
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-text-primary">{skillGap.currentSkills.length}</p>
          <p className="text-sm text-text-secondary">Current Skills</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-amber-400">{skillGap.requiredSkills.length}</p>
          <p className="text-sm text-text-secondary">Required Skills</p>
        </GlassCard>
        <GlassCard className="text-center">
          <p className="text-3xl font-heading font-bold text-red-400">{skillGap.missingSkills.length}</p>
          <p className="text-sm text-text-secondary">Missing Skills</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Current vs Required</h3>
          <RadarChart data={radarData} />
        </GlassCard>
        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4">Required Skill Levels</h3>
          <BarChart data={barData} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
            <CheckCircle size={18} className="text-lime" /> Current Skills
          </h3>
          <div className="space-y-3">
            {skills.filter(s => s.level >= 60).map((skill) => (
              <div key={skill.name} className="glass rounded-xl p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-body text-sm text-text-primary">{skill.name}</span>
                  <span className="font-mono text-xs text-lime">{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-400" /> Missing Skills
          </h3>
          <div className="space-y-3">
            {skillGap.missingSkills.map((skill) => (
              <div key={skill} className="flex items-center justify-between p-3 glass rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-red-400" />
                  <span className="font-body text-sm text-text-primary">{skill}</span>
                </div>
                <Badge variant="danger">GAP</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
