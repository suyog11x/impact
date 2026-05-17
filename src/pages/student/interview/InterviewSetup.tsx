import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Cpu, Code, Network, FileText, FolderOpen, Heart, MessageSquare,
  Calculator, Brain, Layout, Server, Layers, Cloud, Zap, Building2,
  Briefcase, Rocket, ArrowRight, ArrowLeft, Sparkles, Clock
} from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import NeonButton from '../../../components/ui/NeonButton';
import Badge from '../../../components/ui/Badge';
import { useAuth } from '../../../context/AuthContext';
import {
  INTERVIEW_TYPES, COMPANY_MODES,
  type InterviewType, type CompanyMode, type Difficulty, type InterviewConfig
} from '../../../types/interview';

const ICONS: Record<string, any> = {
  Users, Cpu, Code, Network, FileText, FolderOpen, Heart, MessageSquare,
  Calculator, Brain, Layout, Server, Layers, Cloud, Zap,
};

const COMPANY_ICONS: Record<CompanyMode, any> = {
  mnc: Building2,
  service: Briefcase,
  startup: Rocket,
};

export default function InterviewSetup() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [companyMode, setCompanyMode] = useState<CompanyMode | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [duration, setDuration] = useState(30);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [targetCompany, setTargetCompany] = useState('');

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleStart = () => {
    if (!selectedType) return;
    const config: InterviewConfig = {
      type: selectedType,
      companyMode: companyMode || undefined,
      targetCompany: targetCompany || undefined,
      skills,
      difficulty,
      duration,
    };
    // Navigate to engine with config in state
    navigate('/student/interview/session/new', { state: { config } });
  };

  const selectedTypeInfo = INTERVIEW_TYPES.find(t => t.type === selectedType);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">AI Interview</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">
          Interview Setup
        </h1>
        <p className="text-text-secondary font-body mt-3 text-lg">
          Configure your mock interview experience
        </p>
      </motion.div>

      {/* Step Indicator */}
      <div className="flex items-center gap-4 mb-10">
        {[
          { num: 1, label: 'Interview Type' },
          { num: 2, label: 'Company Mode' },
          { num: 3, label: 'Configure' },
        ].map((s, idx) => (
          <div key={s.num} className="flex items-center gap-3">
            <button
              onClick={() => s.num <= step ? setStep(s.num as 1 | 2 | 3) : null}
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading transition-all ${
                step === s.num
                  ? 'bg-gold text-black'
                  : step > s.num
                    ? 'bg-success/20 text-success'
                    : 'bg-white/5 text-text-muted'
              }`}
            >
              {step > s.num ? '✓' : s.num}
            </button>
            <span className={`text-sm font-body ${step === s.num ? 'text-text-primary' : 'text-text-muted'}`}>
              {s.label}
            </span>
            {idx < 2 && <div className="w-16 h-px bg-border" />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 1: Interview Type */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            {/* Core Types */}
            <h3 className="font-heading text-lg text-text-primary mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-gold" /> Core Interviews
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {INTERVIEW_TYPES.filter(t => t.category === 'core').map((type, idx) => {
                const Icon = ICONS[type.icon] || Zap;
                const selected = selectedType === type.type;
                return (
                  <motion.div
                    key={type.type}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <GlassCard
                      className={`p-5 cursor-pointer transition-all ${selected ? 'border-gold/50 bg-gold/5' : ''}`}
                      onClick={() => setSelectedType(type.type)}
                    >
                      <Icon size={24} className={selected ? 'text-gold' : 'text-text-secondary'} />
                      <h4 className="font-heading text-base text-text-primary mt-3 mb-1">{type.title}</h4>
                      <p className="text-xs font-body text-text-secondary leading-relaxed">{type.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1 text-[10px] text-text-muted font-body">
                          <Clock size={10} /> {type.duration}m
                        </div>
                        <Badge variant={type.difficulty === 'hard' ? 'danger' : type.difficulty === 'medium' ? 'warning' : 'success'}>
                          {type.difficulty}
                        </Badge>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Specialized */}
            <h3 className="font-heading text-lg text-text-primary mb-4">Specialized</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {INTERVIEW_TYPES.filter(t => t.category === 'specialized').map((type, idx) => {
                const Icon = ICONS[type.icon] || Zap;
                const selected = selectedType === type.type;
                return (
                  <motion.div key={type.type} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                    <GlassCard
                      className={`p-5 cursor-pointer transition-all ${selected ? 'border-gold/50 bg-gold/5' : ''}`}
                      onClick={() => setSelectedType(type.type)}
                    >
                      <Icon size={24} className={selected ? 'text-gold' : 'text-text-secondary'} />
                      <h4 className="font-heading text-base text-text-primary mt-3 mb-1">{type.title}</h4>
                      <p className="text-xs font-body text-text-secondary leading-relaxed">{type.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1 text-[10px] text-text-muted font-body"><Clock size={10} /> {type.duration}m</div>
                        <Badge variant={type.difficulty === 'hard' ? 'danger' : type.difficulty === 'medium' ? 'warning' : 'success'}>{type.difficulty}</Badge>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Advanced */}
            <h3 className="font-heading text-lg text-text-primary mb-4">Advanced</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {INTERVIEW_TYPES.filter(t => t.category === 'advanced').map((type, idx) => {
                const Icon = ICONS[type.icon] || Zap;
                const selected = selectedType === type.type;
                return (
                  <motion.div key={type.type} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                    <GlassCard
                      className={`p-5 cursor-pointer transition-all ${selected ? 'border-gold/50 bg-gold/5' : ''}`}
                      onClick={() => setSelectedType(type.type)}
                    >
                      <Icon size={24} className={selected ? 'text-gold' : 'text-text-secondary'} />
                      <h4 className="font-heading text-base text-text-primary mt-3 mb-1">{type.title}</h4>
                      <p className="text-xs font-body text-text-secondary leading-relaxed">{type.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="flex items-center gap-1 text-[10px] text-text-muted font-body"><Clock size={10} /> {type.duration}m</div>
                        <Badge variant={type.difficulty === 'hard' ? 'danger' : type.difficulty === 'medium' ? 'warning' : 'success'}>{type.difficulty}</Badge>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <NeonButton onClick={() => { if (selectedType) setStep(2); }} disabled={!selectedType}>
                Next <ArrowRight size={16} className="ml-2" />
              </NeonButton>
            </div>
          </motion.div>
        )}

        {/* STEP 2: Company Mode */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <h3 className="font-heading text-xl text-text-primary mb-6">Select Company Mode</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {COMPANY_MODES.map((mode, idx) => {
                const Icon = COMPANY_ICONS[mode.mode];
                const selected = companyMode === mode.mode;
                return (
                  <motion.div key={mode.mode} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                    <GlassCard
                      className={`p-6 cursor-pointer transition-all ${selected ? 'border-gold/50 bg-gold/5' : ''}`}
                      onClick={() => setCompanyMode(selected ? null : mode.mode)}
                      accent={selected}
                    >
                      <Icon size={32} className={selected ? 'text-gold' : 'text-text-secondary'} />
                      <h4 className="font-heading text-xl text-text-primary mt-4 mb-2">{mode.title}</h4>
                      <p className="text-sm font-body text-text-secondary mb-4">{mode.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {mode.companies.map(c => (
                          <span key={c} className="text-[10px] font-body px-2 py-0.5 bg-white/5 rounded-full text-text-muted">{c}</span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {mode.focus.map(f => (
                          <Badge key={f} variant="gold">{f}</Badge>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Target Company Input */}
            <GlassCard className="p-5 mb-8">
              <label className="text-xs font-body text-text-muted uppercase tracking-widest mb-2 block">Target Company (Optional)</label>
              <input
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g. Google, TCS, Razorpay..."
                className="w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-gold/50 transition-all"
              />
            </GlassCard>

            <div className="flex justify-between">
              <NeonButton variant="ghost" onClick={() => setStep(1)}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </NeonButton>
              <NeonButton onClick={() => setStep(3)}>
                Next <ArrowRight size={16} className="ml-2" />
              </NeonButton>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Configure */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Difficulty */}
              <GlassCard className="p-6">
                <h4 className="font-heading text-lg text-text-primary mb-4">Difficulty Level</h4>
                <div className="flex gap-3">
                  {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
                    <button
                      key={d}
                      onClick={() => setDifficulty(d)}
                      className={`flex-1 py-3 rounded-xl font-body text-sm capitalize transition-all ${
                        difficulty === d
                          ? d === 'hard' ? 'bg-danger/20 text-danger border border-danger/30'
                            : d === 'medium' ? 'bg-warning/20 text-warning border border-warning/30'
                              : 'bg-success/20 text-success border border-success/30'
                          : 'bg-white/5 text-text-muted border border-border hover:bg-white/10'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Duration */}
              <GlassCard className="p-6">
                <h4 className="font-heading text-lg text-text-primary mb-4">Duration</h4>
                <div className="flex gap-3">
                  {[15, 30, 45, 60].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`flex-1 py-3 rounded-xl font-body text-sm transition-all ${
                        duration === d
                          ? 'bg-gold/15 text-gold border border-gold/30'
                          : 'bg-white/5 text-text-muted border border-border hover:bg-white/10'
                      }`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Skills */}
              <GlassCard className="p-6 lg:col-span-2">
                <h4 className="font-heading text-lg text-text-primary mb-4">Your Skills</h4>
                <div className="flex gap-2 mb-3">
                  <input
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                    placeholder="Add a skill (e.g. React, Python, SQL)..."
                    className="flex-1 bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-gold/50 transition-all"
                  />
                  <NeonButton size="sm" onClick={handleAddSkill}>Add</NeonButton>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/10 text-gold text-xs font-body rounded-full border border-gold/20"
                    >
                      {s}
                      <button onClick={() => setSkills(skills.filter(sk => sk !== s))} className="text-gold/60 hover:text-gold">×</button>
                    </motion.span>
                  ))}
                  {skills.length === 0 && (
                    <span className="text-xs font-body text-text-muted">No skills added yet. You can proceed without adding skills.</span>
                  )}
                </div>
              </GlassCard>
            </div>

            {/* Summary Card */}
            <GlassCard className="p-6 mb-8" accent>
              <h4 className="font-heading text-lg text-gold mb-4">Interview Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-body">
                <div><span className="text-text-muted block text-xs mb-1">Type</span><span className="text-text-primary capitalize">{selectedTypeInfo?.title || '—'}</span></div>
                <div><span className="text-text-muted block text-xs mb-1">Mode</span><span className="text-text-primary capitalize">{companyMode || 'General'}</span></div>
                <div><span className="text-text-muted block text-xs mb-1">Difficulty</span><span className="text-text-primary capitalize">{difficulty}</span></div>
                <div><span className="text-text-muted block text-xs mb-1">Duration</span><span className="text-text-primary">{duration} min</span></div>
              </div>
            </GlassCard>

            <div className="flex justify-between">
              <NeonButton variant="ghost" onClick={() => setStep(2)}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </NeonButton>
              <NeonButton size="lg" onClick={handleStart}>
                <Sparkles size={18} className="mr-2" /> Start Interview
              </NeonButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
