import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, Sparkles, AlertCircle, CheckCircle2, Search, ArrowRight, UserCheck } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

const mockMatchedCandidates = [
  {
    id: '1',
    name: 'Arjun Sharma',
    matchPercentage: 94,
    matchingSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    missingSkills: ['Redis', 'WebSockets'],
    role: 'Full Stack Developer',
    avatar: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: '2',
    name: 'Priya Patel',
    matchPercentage: 82,
    matchingSkills: ['Python', 'PostgreSQL'],
    missingSkills: ['React', 'Node.js', 'AWS'],
    role: 'AI/ML Engineer',
    avatar: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: '4',
    name: 'Ananya Singh',
    matchPercentage: 65,
    matchingSkills: ['Python', 'Linux'],
    missingSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Redis'],
    role: 'Cybersecurity Analyst',
    avatar: 'https://i.pravatar.cc/150?u=4',
  },
];

export default function JDMatcher() {
  const [jd, setJd] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<typeof mockMatchedCandidates | null>(null);

  const handleAnalyze = () => {
    if (!jd.trim()) return;
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResults(mockMatchedCandidates);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold text-text-primary">Job Description Matching</h1>
        <p className="text-text-secondary font-body mt-1">AI-powered candidate matching based on job requirements</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: JD Input */}
        <div className="space-y-6">
          <GlassCard className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-text-primary flex items-center gap-2">
                <FileSearch size={18} className="text-lime" /> Paste Job Description
              </h3>
              <Sparkles size={16} className="text-lime animate-pulse" />
            </div>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="flex-1 min-h-[400px] w-full glass rounded-2xl p-6 text-sm text-text-primary font-body placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-lime/30 resize-none transition-all"
              placeholder="Paste the full job description here... (e.g. We are looking for a Senior Full Stack Developer with experience in React, Node.js, and AWS...)"
            />
            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setJd('')}
                className="px-6 py-2.5 glass rounded-xl text-sm font-body text-text-secondary hover:text-text-primary transition-all"
              >
                Clear
              </button>
              <NeonButton 
                onClick={handleAnalyze} 
                disabled={analyzing || !jd.trim()} 
                className="flex-1"
              >
                {analyzing ? (
                  <><span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin mr-2" /> Analyzing talent pool...</>
                ) : (
                  <><Sparkles size={18} className="mr-2" /> Match Candidates</>
                )}
              </NeonButton>
            </div>
          </GlassCard>
        </div>

        {/* Right: Results */}
        <div className="space-y-6">
          {!results && !analyzing && (
            <div className="h-full min-h-[500px] glass rounded-[2rem] border-2 border-dashed border-white/5 flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center text-muted mb-6">
                <Search size={40} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-text-primary mb-2">Ready to Match</h3>
              <p className="text-text-secondary font-body max-w-sm">
                Paste a job description on the left and our AI will rank the best candidates from your database.
              </p>
            </div>
          )}

          {analyzing && (
            <div className="h-full min-h-[500px] glass rounded-[2rem] flex flex-col items-center justify-center p-10 space-y-8">
              <div className="relative">
                <div className="w-24 h-24 border-4 border-lime/20 border-t-lime rounded-full animate-spin" />
                <Sparkles size={32} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lime" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-heading font-bold text-text-primary">Extracting keywords...</h3>
                <div className="flex gap-1 justify-center">
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-2 h-2 bg-lime rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-2 h-2 bg-lime rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-2 h-2 bg-lime rounded-full" />
                </div>
              </div>
              <div className="w-full max-w-xs space-y-3">
                <div className="h-2 glass rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '100%' }} 
                    transition={{ duration: 2 }} 
                    className="h-full bg-lime" 
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-muted uppercase tracking-widest">
                  <span>Parsing JD</span>
                  <span>Matching Skills</span>
                  <span>Ranking</span>
                </div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {results && !analyzing && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading font-semibold text-text-primary">Top Matches</h3>
                  <Badge variant="success">{results.length} Candidates Found</Badge>
                </div>

                {results.map((c, idx) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <GlassCard hover className="p-6 relative overflow-hidden group">
                      <div className="flex items-start gap-5">
                        <img src={c.avatar} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/5" />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-heading font-bold text-text-primary">{c.name}</h4>
                              <p className="text-xs text-text-secondary font-body">{c.role}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-heading font-bold text-lime">{c.matchPercentage}%</span>
                              <p className="text-[10px] text-muted font-mono uppercase">Match</p>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <ProgressBar value={c.matchPercentage} size="sm" color="bg-lime" showValue={false} />
                            
                            <div className="flex flex-wrap gap-1.5">
                              {c.matchingSkills.map(s => (
                                <div key={s} className="flex items-center gap-1 text-[10px] font-body text-text-primary bg-lime/10 border border-lime/20 px-2 py-0.5 rounded-lg">
                                  <CheckCircle2 size={10} className="text-lime" /> {s}
                                </div>
                              ))}
                              {c.missingSkills.map(s => (
                                <div key={s} className="flex items-center gap-1 text-[10px] font-body text-text-secondary bg-white/5 border border-white/10 px-2 py-0.5 rounded-lg">
                                  <AlertCircle size={10} className="text-red-400" /> {s}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="flex items-center gap-1.5 text-xs font-heading font-bold text-lime bg-lime/10 px-3 py-1.5 rounded-xl hover:bg-lime/20 transition-all">
                          View Details <ArrowRight size={12} />
                        </button>
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}

                <button 
                  onClick={() => setResults(null)}
                  className="w-full py-3 glass rounded-2xl text-sm font-body text-text-secondary hover:text-text-primary transition-all flex items-center justify-center gap-2"
                >
                  <UserCheck size={16} /> New Match Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
