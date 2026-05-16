import { motion } from 'framer-motion';
import { User, Mail, GraduationCap, Building2, Calendar, GitFork, Globe, MapPin, Edit2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const { user, profile } = useAuth();

  // Pull from profile (built from user_metadata on login)
  const name = profile?.full_name ?? user?.email?.split('@')[0] ?? 'User';
  const email = profile?.email ?? '';
  const college = profile?.college ?? '';
  const department = profile?.department ?? '';
  const graduationYear = profile?.graduation_year ?? '';
  const role = profile?.role ?? 'student';
  // Extra metadata not in UserProfile — read from user_metadata directly
  const meta = user?.user_metadata ?? {};
  const github = meta.github ?? '';
  const website = meta.website ?? '';
  const location = meta.location ?? '';

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Profile</h1>
        <p className="text-text-secondary font-body mt-1">Manage your personal and academic information</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-lime/20 flex items-center justify-center">
              <User size={40} className="text-lime" />
            </div>
            <h2 className="text-xl font-heading font-bold text-text-primary">{name}</h2>
            <p className="text-sm font-body text-text-secondary">{email}</p>
            <div className="mt-4">
              <Badge variant="lime">{role.toUpperCase()}</Badge>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-sm font-mono text-muted mb-2 uppercase tracking-wider">PROFILE COMPLETION</p>
              <ProgressBar value={75} color="bg-lime" />
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="font-heading font-semibold text-text-primary mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                { icon: GitFork, label: 'GitHub', val: github || 'Not linked' },
                { icon: Globe, label: 'Portfolio', val: website || 'Not linked' },
                { icon: MapPin, label: 'Location', val: location || 'Not set' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <Icon size={16} className="text-muted" />
                    <span className="text-text-secondary font-body">{item.label}:</span>
                    <span className="text-lime font-mono text-xs ml-auto">{item.val}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-text-primary">Personal Information</h3>
              <Edit2 size={16} className="text-muted cursor-pointer hover:text-lime transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue={name} icon={<User size={16} />} />
              <Input label="Email" defaultValue={email} icon={<Mail size={16} />} />
              <Input label="College" defaultValue={college} icon={<Building2 size={16} />} />
              <Input label="Department" defaultValue={department} icon={<GraduationCap size={16} />} />
              <Input label="Graduation Year" defaultValue={String(graduationYear)} icon={<Calendar size={16} />} />
            </div>
            <div className="mt-6 flex justify-end">
              <NeonButton size="sm">Save Changes</NeonButton>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-text-primary">Projects</h3>
              <NeonButton size="sm" variant="ghost">+ Add Project</NeonButton>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass rounded-xl p-4 mb-3">
                <h4 className="font-heading font-medium text-text-primary">Project {i}</h4>
                <p className="text-sm text-text-secondary font-body mt-1">A full-stack web application built with React, Node.js, and PostgreSQL. Features include real-time updates and AI-powered recommendations.</p>
                <div className="flex gap-2 mt-3">
                  <Badge variant="lime">React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>PostgreSQL</Badge>
                </div>
              </div>
            ))}
          </GlassCard>

          <GlassCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading font-semibold text-text-primary">Certifications</h3>
              <NeonButton size="sm" variant="ghost">+ Add</NeonButton>
            </div>
            <div className="space-y-3">
              {['AWS Cloud Practitioner', 'Google Data Analytics', 'Meta Frontend Developer'].map((cert) => (
                <div key={cert} className="flex items-center justify-between p-3 glass rounded-xl">
                  <span className="font-body text-sm text-text-primary">{cert}</span>
                  <Badge>VERIFIED</Badge>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
