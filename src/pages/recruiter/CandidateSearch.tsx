import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronRight, Star, ExternalLink, Download, UserPlus, CheckCircle2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Badge from '../../components/ui/Badge';
import NeonButton from '../../components/ui/NeonButton';
import Input from '../../components/ui/Input';

const mockCandidates = [
  {
    id: '1',
    name: 'Arjun Sharma',
    avatar: 'https://i.pravatar.cc/150?u=1',
    role: 'Full Stack Developer',
    domain: 'Web Development',
    skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    readinessScore: 88,
    gradYear: 2024,
    college: 'MIT Engineering',
    resumeScore: 92,
    projects: 12,
  },
  {
    id: '2',
    name: 'Priya Patel',
    avatar: 'https://i.pravatar.cc/150?u=2',
    role: 'AI/ML Engineer',
    domain: 'Data Science',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-Learn'],
    readinessScore: 91,
    gradYear: 2024,
    college: 'BITS Pilani',
    resumeScore: 89,
    projects: 8,
  },
  {
    id: '3',
    name: 'Rahul Verma',
    avatar: 'https://i.pravatar.cc/150?u=3',
    role: 'Cloud Architect',
    domain: 'Cloud Computing',
    skills: ['Azure', 'Docker', 'Kubernetes', 'Terraform'],
    readinessScore: 76,
    gradYear: 2025,
    college: 'VIT Vellore',
    resumeScore: 84,
    projects: 5,
  },
  {
    id: '4',
    name: 'Ananya Singh',
    avatar: 'https://i.pravatar.cc/150?u=4',
    role: 'Cybersecurity Analyst',
    domain: 'Cybersecurity',
    skills: ['Penetration Testing', 'Wireshark', 'Python', 'Linux'],
    readinessScore: 82,
    gradYear: 2024,
    college: 'Delhi Technological University',
    resumeScore: 90,
    projects: 7,
  },
];

export default function CandidateSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<typeof mockCandidates[0] | null>(null);
  const [filters, setFilters] = useState({
    domain: 'All',
    readiness: 0,
    gradYear: 'All',
  });

  const filteredCandidates = mockCandidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDomain = filters.domain === 'All' || c.domain === filters.domain;
    const matchesReadiness = c.readinessScore >= filters.readiness;
    const matchesYear = filters.gradYear === 'All' || c.gradYear.toString() === filters.gradYear;
    
    return matchesSearch && matchesDomain && matchesReadiness && matchesYear;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-text-primary">Search Candidates</h1>
          <p className="text-text-secondary font-body mt-1">Discover top talent matching your requirements</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full glass rounded-xl pl-10 pr-4 py-2.5 text-sm text-text-primary placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-lime/30"
              placeholder="Search by name or skill..."
            />
          </div>
          <button className="p-2.5 glass rounded-xl text-text-secondary hover:text-lime transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-text-primary mb-4 flex items-center gap-2 text-sm">
              <Filter size={16} /> Filters
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Domain</label>
                <select 
                  className="w-full glass rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none"
                  value={filters.domain}
                  onChange={(e) => setFilters({...filters, domain: e.target.value})}
                >
                  <option value="All">All Domains</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Min. Readiness ({filters.readiness}%)</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-lime"
                  value={filters.readiness}
                  onChange={(e) => setFilters({...filters, readiness: parseInt(e.target.value)})}
                />
              </div>

              <div>
                <label className="text-xs font-mono text-muted uppercase tracking-wider block mb-2">Graduation Year</label>
                <div className="flex flex-wrap gap-2">
                  {['All', '2024', '2025', '2026'].map(year => (
                    <button
                      key={year}
                      onClick={() => setFilters({...filters, gradYear: year})}
                      className={`px-3 py-1.5 rounded-lg text-xs font-body transition-all ${
                        filters.gradYear === year ? 'bg-lime text-black font-semibold' : 'glass text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setFilters({ domain: 'All', readiness: 0, gradYear: 'All' })}
              className="w-full mt-6 py-2 text-xs font-mono text-muted hover:text-red-400 transition-colors"
            >
              Reset All Filters
            </button>
          </GlassCard>
        </div>

        {/* Candidate List */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredCandidates.map((c, idx) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <GlassCard 
                    hover 
                    className="p-5 cursor-pointer group"
                    onClick={() => setSelectedCandidate(c)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <img src={c.avatar} alt={c.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-white/5 group-hover:ring-lime/30 transition-all" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-black border border-white/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-lime">
                          {c.readinessScore}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="font-heading font-bold text-text-primary truncate">{c.name}</h4>
                          <ChevronRight size={14} className="text-muted group-hover:text-lime group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-text-secondary font-body mb-2">{c.role} • {c.gradYear}</p>
                        <div className="flex flex-wrap gap-1">
                          {c.skills.slice(0, 3).map(s => (
                            <Badge key={s} className="text-[10px] px-1.5 py-0">{s}</Badge>
                          ))}
                          {c.skills.length > 3 && (
                            <span className="text-[10px] text-muted font-body ml-1">+{c.skills.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {filteredCandidates.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-muted mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-heading font-semibold text-text-primary">No candidates found</h3>
              <p className="text-text-secondary font-body text-sm mt-1">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>

      {/* Candidate Profile Modal */}
      <AnimatePresence>
        {selectedCandidate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCandidate(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-full max-h-[90vh] glass-strong rounded-[2.5rem] overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <img src={selectedCandidate.avatar} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h2 className="text-xl font-heading font-bold text-text-primary">{selectedCandidate.name}</h2>
                    <p className="text-sm text-text-secondary font-body">{selectedCandidate.role}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <X size={20} className="text-text-secondary" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-none">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Stats & Analytics */}
                  <div className="lg:col-span-1 space-y-6">
                    <GlassCard className="p-5 text-center">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-lime/20 relative mb-4">
                        <div className="text-3xl font-heading font-bold text-lime">{selectedCandidate.readinessScore}%</div>
                        <svg className="absolute inset-0 -rotate-90 w-full h-full" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="8" className="text-lime" strokeDasharray={`${selectedCandidate.readinessScore * 2.89} 289`} />
                        </svg>
                      </div>
                      <h4 className="font-heading font-bold text-text-primary">Readiness Score</h4>
                      <p className="text-xs text-text-secondary font-body mt-1">Based on skills, projects & scores</p>
                    </GlassCard>

                    <div className="grid grid-cols-2 gap-3">
                      <GlassCard className="p-4 text-center">
                        <p className="text-xs font-mono text-muted uppercase mb-1">Resume</p>
                        <p className="text-xl font-heading font-bold text-text-primary">{selectedCandidate.resumeScore}%</p>
                      </GlassCard>
                      <GlassCard className="p-4 text-center">
                        <p className="text-xs font-mono text-muted uppercase mb-1">Projects</p>
                        <p className="text-xl font-heading font-bold text-text-primary">{selectedCandidate.projects}</p>
                      </GlassCard>
                    </div>

                    <GlassCard className="p-5">
                      <h4 className="font-heading font-semibold text-text-primary mb-4 text-sm">Skill Radar</h4>
                      {/* Simple placeholder for radar chart */}
                      <div className="aspect-square flex items-center justify-center relative">
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-100" />
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-75" />
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-50" />
                        <div className="absolute inset-0 border border-white/5 rounded-full scale-25" />
                        <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[80px] border-b-lime/20 blur-sm" />
                        <div className="absolute text-[10px] font-mono text-muted -top-2">Logic</div>
                        <div className="absolute text-[10px] font-mono text-muted -bottom-2">Soft Skills</div>
                        <div className="absolute text-[10px] font-mono text-muted -left-6 top-1/2">Coding</div>
                        <div className="absolute text-[10px] font-mono text-muted -right-6 top-1/2">Design</div>
                      </div>
                    </GlassCard>
                  </div>

                  {/* Right Column: Details */}
                  <div className="lg:col-span-2 space-y-6">
                    <section>
                      <h4 className="text-sm font-mono text-lime uppercase tracking-widest mb-4">Experience & Projects</h4>
                      <div className="space-y-4">
                        {[1, 2].map(i => (
                          <div key={i} className="p-4 glass rounded-2xl">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h5 className="font-heading font-bold text-text-primary text-sm">FinTech Dashboard Application</h5>
                                <p className="text-xs text-text-secondary font-body mt-0.5">Jan 2024 - Present</p>
                              </div>
                              <ExternalLink size={14} className="text-muted hover:text-lime cursor-pointer" />
                            </div>
                            <p className="text-xs text-text-secondary font-body leading-relaxed">
                              Built a high-performance financial tracking system using React and GraphQL. Optimized data fetching by 40% and implemented real-time notifications.
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-mono text-lime uppercase tracking-widest mb-4">Education</h4>
                      <div className="p-4 glass rounded-2xl">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-heading font-bold text-text-primary text-sm">{selectedCandidate.college}</h5>
                            <p className="text-xs text-text-secondary font-body mt-0.5">Bachelor of Technology in Computer Science</p>
                          </div>
                          <span className="text-xs font-mono text-muted">{selectedCandidate.gradYear} Graduate</span>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-mono text-lime uppercase tracking-widest mb-4">Skills & Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map(s => (
                          <Badge key={s} variant="success">{s}</Badge>
                        ))}
                        <Badge variant="warning">AWS Certified Cloud Practitioner</Badge>
                        <Badge variant="warning">Meta Front-End Developer Professional</Badge>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-body text-text-secondary hover:text-text-primary transition-all">
                    <Download size={16} /> Download Resume
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm font-body text-text-secondary hover:text-text-primary transition-all">
                    <ExternalLink size={16} /> Portfolio
                  </button>
                </div>
                <div className="flex gap-3">
                  <NeonButton variant="outline" size="md">
                    <UserPlus size={18} /> Shortlist
                  </NeonButton>
                  <NeonButton size="md">
                    <CheckCircle2 size={18} /> Schedule Interview
                  </NeonButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
