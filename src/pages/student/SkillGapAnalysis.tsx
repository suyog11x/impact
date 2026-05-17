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
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Analysis</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Skill Gap Analysis</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Compare your current skills against industry requirements</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        <GlassCard className="text-center p-6" accent>
          <Target size={28} className="mx-auto mb-3 text-gold" />
          <p className="text-4xl font-heading font-bold text-gold">{skillGap.readinessScore}%</p>
          <p className="text-sm text-text-secondary mt-2">Readiness Score</p>
          <ProgressBar value={skillGap.readinessScore} color="bg-gold" />
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-text-primary">{skillGap.currentSkills.length}</p>
          <p className="text-sm text-text-secondary mt-2">Current Skills</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-warning">{skillGap.requiredSkills.length}</p>
          <p className="text-sm text-text-secondary mt-2">Required Skills</p>
        </GlassCard>
        <GlassCard className="text-center p-6">
          <p className="text-4xl font-heading font-bold text-danger">{skillGap.missingSkills.length}</p>
          <p className="text-sm text-text-secondary mt-2">Missing Skills</p>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <GlassCard className="p-6">
          <h3 className="font-heading text-xl text-text-primary mb-4">Current vs Required</h3>
          <RadarChart data={radarData} />
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-heading text-xl text-text-primary mb-4">Required Skill Levels</h3>
          <BarChart data={barData} />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GlassCard className="p-6">
          <h3 className="font-heading text-xl text-text-primary mb-6 flex items-center gap-2">
            <CheckCircle size={20} className="text-gold" /> Current Skills
          </h3>
          <div className="space-y-3">
            {skills.filter(s => s.level >= 60).map((skill) => (
              <div key={skill.name} className="bg-bg-elevated rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-body text-sm text-text-primary">{skill.name}</span>
                  <span className="font-body text-xs text-gold">{skill.level}%</span>
                </div>
                <ProgressBar value={skill.level} />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-heading text-xl text-text-primary mb-6 flex items-center gap-2">
            <AlertTriangle size={20} className="text-danger" /> Missing Skills
          </h3>
          <div className="space-y-3">
            {skillGap.missingSkills.map((skill) => (
              <div key={skill} className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                <div className="flex items-center gap-3">
                  <AlertTriangle size={16} className="text-danger" />
                  <span className="font-body text-sm text-text-primary">{skill}</span>
                </div>
                <Badge variant="danger">Gap</Badge>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
