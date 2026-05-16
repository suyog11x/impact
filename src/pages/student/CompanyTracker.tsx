import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Clock, CheckCircle, Circle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { placementPrediction } from '../../data/dummy';

const companies = placementPrediction.recommendedCompanies;

const statusIcon: Record<string, React.ReactNode> = {
  'Not Started': <Circle size={16} className="text-muted" />,
  'In Progress': <Clock size={16} className="text-amber-400" />,
  'Ready': <CheckCircle size={16} className="text-lime" />,
};

export default function CompanyTracker() {
  const [search, setSearch] = useState('');

  const filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Company Tracker</h1>
        <p className="text-text-secondary font-body mt-1">Track and manage your preparation for target companies</p>
      </motion.div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full glass rounded-xl pl-12 pr-4 py-3 text-text-primary font-body placeholder:text-muted focus:outline-none focus:border-lime/30 transition-all"
        />
      </div>

      <div className="space-y-4">
        {filtered.map((company, idx) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <GlassCard>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center overflow-hidden">
                    <img src={company.logo} alt={company.name} className="w-8 h-8 object-contain" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-primary text-lg">{company.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant={
                        company.difficulty === 'Hard' ? 'danger' :
                        company.difficulty === 'Medium' ? 'warning' : 'success'
                      }>
                        {company.difficulty}
                      </Badge>
                      <span className="font-mono text-xs text-muted uppercase tracking-wider">{company.rounds.length} Rounds</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 lg:gap-10">
                  <div className="flex items-center gap-2">
                    {statusIcon[company.status]}
                    <span className="font-body text-sm text-text-secondary">{company.status}</span>
                  </div>

                  <div className="w-32">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-muted uppercase tracking-wider">Prep</span>
                      <span className="font-mono text-xs text-lime">{company.preparationProgress}%</span>
                    </div>
                    <ProgressBar value={company.preparationProgress} size="sm" color="bg-lime" showValue={false} />
                  </div>

                  <NeonButton size="sm" variant="ghost">
                    View <ArrowRight size={14} />
                  </NeonButton>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                {company.requiredSkills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
