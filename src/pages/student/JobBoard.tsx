import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, MapPin, Calendar, CheckCircle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import Badge from '../../components/ui/Badge';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  datePosted: string;
}

export default function JobBoard() {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem('skillsync_jobs') || '[]');
    setJobs(storedJobs.reverse());
  }, []);

  const handleApply = (id: string) => {
    setAppliedJobs(prev => ({ ...prev, [id]: true }));
  };

  const filtered = jobs.filter((j) =>
    j.title.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Opportunities</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Job Board</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Discover and apply for your next big opportunity</p>
      </motion.div>

      <div className="relative mb-8 max-w-md">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search jobs or companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-bg-elevated border border-border rounded-xl pl-12 pr-4 py-3 text-text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all"
        />
      </div>

      {jobs.length === 0 ? (
        <GlassCard className="text-center p-12" accent>
          <Briefcase size={48} className="mx-auto text-text-muted mb-4" />
          <h3 className="text-2xl font-heading text-text-primary">No Jobs Posted Yet</h3>
          <p className="text-text-secondary mt-2">Check back later for new opportunities from recruiters.</p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {filtered.map((job, idx) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl text-text-primary mb-1">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                      <div className="flex items-center gap-1">
                        <Briefcase size={14} />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {new Date(job.datePosted).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary font-body mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {job.requirements.map((req, i) => (
                        <Badge key={i}>{req}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex md:flex-col items-center gap-3 w-full md:w-auto">
                    {appliedJobs[job.id] ? (
                      <div className="flex items-center gap-2 text-gold font-medium px-4 py-2 border border-gold/30 rounded-full bg-gold/10 w-full justify-center">
                        <CheckCircle size={18} /> Applied
                      </div>
                    ) : (
                      <div className="w-full flex justify-center">
                        <NeonButton onClick={() => handleApply(job.id)}>
                          Apply Now
                        </NeonButton>
                      </div>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
          {filtered.length === 0 && search && (
            <div className="text-center text-text-secondary py-8">
              No jobs found matching "{search}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}
