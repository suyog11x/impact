import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Lightbulb, Building2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { placementPrediction } from '../../data/dummy';

export default function PlacementPrediction() {
  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Prediction</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Placement Prediction</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">ML-powered analysis of your placement readiness</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <GlassCard className="lg:col-span-1 text-center flex flex-col items-center justify-center p-8" accent>
          <p className="font-body text-xs text-text-secondary uppercase tracking-widest mb-4">Placement Probability</p>
          <div className="relative w-40 h-40 rounded-full bg-gold/10 border-4 border-gold/20 flex items-center justify-center mb-4">
            <span className="text-5xl font-heading font-bold text-gold">{placementPrediction.probability}%</span>
          </div>
          <ProgressBar value={placementPrediction.probability} color="bg-gold" />
          <Badge variant="success" className="mt-4">High Chance</Badge>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-gold" /> Strengths
          </h3>
          <div className="space-y-3">
            {placementPrediction.strengths.map((s) => (
              <div key={s} className="flex items-start gap-3 p-4 bg-bg-elevated rounded-xl">
                <TrendingUp size={16} className="text-gold mt-0.5 shrink-0" />
                <span className="font-body text-sm text-text-primary">{s}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
            <TrendingDown size={18} className="text-danger" /> Weaknesses
          </h3>
          <div className="space-y-3">
            {placementPrediction.weaknesses.map((w) => (
              <div key={w} className="flex items-start gap-3 p-4 bg-bg-elevated rounded-xl">
                <TrendingDown size={16} className="text-danger mt-0.5 shrink-0" />
                <span className="font-body text-sm text-text-primary">{w}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="mb-8 p-6">
        <h3 className="font-heading text-lg text-text-primary mb-6 flex items-center gap-2">
          <Lightbulb size={18} className="text-warning" /> Improvement Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {placementPrediction.suggestions.map((s, idx) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-bg-elevated rounded-xl">
              <span className="w-6 h-6 rounded-full bg-gold/10 text-gold text-xs font-body flex items-center justify-center shrink-0">{idx + 1}</span>
              <span className="font-body text-sm text-text-secondary">{s}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-lg text-text-primary flex items-center gap-2">
            <Building2 size={18} className="text-gold" /> Recommended Companies
          </h3>
        </div>
        <div className="space-y-4">
          {placementPrediction.recommendedCompanies.map((company) => (
            <div key={company.id} className="bg-bg-elevated rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                  <img src={company.logo} alt={company.name} className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <h4 className="font-heading text-text-primary">{company.name}</h4>
                  <p className="font-body text-xs text-text-secondary uppercase tracking-widest">{company.difficulty} • {company.rounds.length} rounds</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-body text-xs text-text-secondary uppercase tracking-widest">Progress</p>
                  <p className="font-heading font-bold text-gold">{company.preparationProgress}%</p>
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
