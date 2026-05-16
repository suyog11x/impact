import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../../components/ui/GlassCard';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newJob = {
      id: Date.now().toString(),
      ...formData,
      requirements: formData.requirements.split(',').map((req) => req.trim()),
      datePosted: new Date().toISOString(),
    };
    
    const existingJobs = JSON.parse(localStorage.getItem('skillsync_jobs') || '[]');
    localStorage.setItem('skillsync_jobs', JSON.stringify([...existingJobs, newJob]));
    
    setSuccess(true);
    setFormData({ title: '', company: '', location: '', description: '', requirements: '' });
    
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Post a New Job</h1>
        <p className="text-text-secondary font-body mt-1">Create a new job listing to attract candidates.</p>
      </motion.div>

      <GlassCard className="p-8">
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-lime/10 border border-lime/20 text-lime font-body text-center">
            Job posted successfully! Candidates can now view it.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Job Title"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Senior Frontend Developer"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Company Name"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. TechCorp Inc."
            />
            <Input
              label="Location"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g. Remote, NY, etc."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary font-body">Job Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-transparent transition-all font-body min-h-[120px]"
              placeholder="Describe the role and responsibilities..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-secondary font-body">Requirements (comma separated)</label>
            <textarea
              required
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="w-full bg-background/50 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-lime/50 focus:border-transparent transition-all font-body min-h-[80px]"
              placeholder="e.g. React, TypeScript, 3+ years experience"
            />
          </div>
          <div className="pt-4">
            <div className="w-full flex justify-center">
              <NeonButton type="submit">
                Post Job
              </NeonButton>
            </div>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}
