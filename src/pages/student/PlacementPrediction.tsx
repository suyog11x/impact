import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Lightbulb, Building2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { placementPrediction } from '../../data/dummy';

export default function PlacementPrediction() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Placement Prediction</h1>
        <p className="text-text-secondary font-body mt-1">ML-powered analysis of your placement readiness</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <GlassCard className="lg:col-span-1 text-center flex flex-col items-center justify-center" glow>
          <p className="font-mono text-xs text-muted uppercase tracking-wider mb-4">PLACEMENT PROBABILITY</p>
          <div className="relative w-40 h-40 rounded-full bg-lime/10 border-4 border-lime flex items-center justify-center mb-4">
            <span className="text-5xl font-heading font-bold text-lime">{placementPrediction.probability}%</span>
          </div>
          <ProgressBar value={placementPrediction.probability} color="bg-lime" />
          <Badge variant="success" className="mt-3">HIGH CHANCE</Badge>
        </GlassCard>

        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-lime" /> Strengths
          </h3>
          <div className="space-y-3">
            {placementPrediction.strengths.map((s) => (
              <div key={s} className="flex items-start gap-3 p-3 glass rounded-xl">
                <TrendingUp size={16} className="text-lime mt-0.5 shrink-0" />
                <span className="font-body text-sm text-text-primary">{s}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
            <TrendingDown size={18} className="text-red-400" /> Weaknesses
          </h3>
          <div className="space-y-3">
            {placementPrediction.weaknesses.map((w) => (
              <div key={w} className="flex items-start gap-3 p-3 glass rounded-xl">
                <TrendingDown size={16} className="text-red-400 mt-0.5 shrink-0" />
                <span className="font-body text-sm text-text-primary">{w}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mb-8">
        <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Lightbulb size={18} className="text-amber-400" /> Improvement Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {placementPrediction.suggestions.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 glass rounded-xl">
              <span className="w-6 h-6 rounded-full bg-lime/10 text-lime text-xs font-mono flex items-center justify-center shrink-0">{idx + 1}</span>
              <span className="font-body text-sm text-text-secondary">{s}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-text-primary flex items-center gap-2">
            <Building2 size={18} className="text-lime" /> Recommended Companies
          </h3>
        </div>
        <div className="space-y-4">
          {placementPrediction.recommendedCompanies.map((company) => (
            <div key={company.id} className="glass rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                  <img src={company.logo} alt={company.name} className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h4 className="font-heading font-medium text-text-primary">{company.name}</h4>
                  <p className="font-mono text-xs text-text-secondary uppercase tracking-wider">{company.difficulty} • {company.rounds.length} rounds</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-mono text-xs text-muted uppercase tracking-wider">Progress</p>
                  <p className="font-heading font-semibold text-lime">{company.preparationProgress}%</p>
                </div>
                <Badge variant={
                  company.status === 'Ready' ? 'success' :
                  company.status === 'In Progress' ? 'warning' : 'default'
                }>
                  {company.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
