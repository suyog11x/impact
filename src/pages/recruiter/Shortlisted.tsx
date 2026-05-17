import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Calendar, Trash2, Mail, ExternalLink, ChevronRight, UserCheck, MoreHorizontal } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';

const initialShortlisted = [
  {
    id: '1',
    name: 'Arjun Sharma',
    role: 'Full Stack Developer',
    status: 'Shortlisted',
    appliedDate: '2024-05-10',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'Priya Patel',
    role: 'AI/ML Engineer',
    status: 'Interview Scheduled',
    interviewDate: '2024-05-20 10:00 AM',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
];

export default function Shortlisted() {
  const [activeTab, setActiveTab] = useState<'Shortlisted' | 'Interview Scheduled'>('Shortlisted');
  const [candidates, setCandidates] = useState(initialShortlisted);

  const filtered = candidates.filter(c => c.status === activeTab);

  const removeCandidate = (id: string) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold text-text-primary">Shortlisted Candidates</h1>
        <p className="text-text-secondary font-body mt-1">Manage your recruitment pipeline and interview schedule</p>
      </motion.div>

      <div className="flex gap-2 p-1 glass rounded-2xl w-fit mb-6">
        {['Shortlisted', 'Interview Scheduled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2.5 rounded-xl text-sm font-body font-medium transition-all ${
              activeTab === tab 
                ? 'bg-lime text-black' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
            }`}
          >
            {tab}
            <span className={`ml-2 px-1.5 py-0.5 rounded-md text-[10px] ${
              activeTab === tab ? 'bg-black/20' : 'bg-white/10'
            }`}>
              {candidates.filter(c => c.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.length > 0 ? (
            filtered.map((c, idx) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
              >
                <GlassCard className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group">
                  <div className="flex items-center gap-4">
                    <img src={c.avatar} className="w-14 h-14 rounded-2xl object-cover" />
                    <div>
                      <h4 className="font-heading font-bold text-text-primary">{c.name}</h4>
                      <p className="text-xs text-text-secondary font-body">{c.role}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-muted font-mono flex items-center gap-1">
                          <Calendar size={10} /> {activeTab === 'Shortlisted' ? `Applied: ${c.appliedDate}` : `Interview: ${c.interviewDate}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4 self-end md:self-center">
                    <div className="flex gap-2 mr-2">
                      <button className="p-2.5 glass rounded-xl text-text-secondary hover:text-lime transition-colors" title="Message">
                        <Mail size={16} />
                      </button>
                      <button className="p-2.5 glass rounded-xl text-text-secondary hover:text-lime transition-colors" title="External Profile">
                        <ExternalLink size={16} />
                      </button>
                      <button 
                        onClick={() => removeCandidate(c.id)}
                        className="p-2.5 glass rounded-xl text-text-secondary hover:text-red-400 transition-colors" 
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="h-8 w-[1px] bg-white/5 hidden md:block" />

                    {activeTab === 'Shortlisted' ? (
                      <NeonButton size="md">
                        <Calendar size={16} /> Schedule
                      </NeonButton>
                    ) : (
                      <NeonButton variant="secondary" size="md">
                        <UserCheck size={16} /> Move to Final
                      </NeonButton>
                    )}
                    
                    <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-20 flex flex-col items-center justify-center text-center glass rounded-[2rem] border-2 border-dashed border-white/5"
            >
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-muted mb-4">
                <ClipboardList size={32} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary">No candidates in this stage</h3>
              <p className="text-text-secondary font-body text-sm mt-1">
                {activeTab === 'Shortlisted' ? 'Start shortlisting from the Search page' : 'Schedule an interview to see it here'}
              </p>
              <button 
                onClick={() => window.location.href = '/recruiter/search'}
                className="mt-6 text-sm font-heading font-bold text-lime hover:underline flex items-center gap-1"
              >
                Go to Search <ChevronRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
