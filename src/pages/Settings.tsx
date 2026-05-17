import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Bell, Sun } from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import Input from '../components/ui/Input';
import NeonButton from '../components/ui/NeonButton';
import { useAuth } from '../context/AuthContext';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'theme', label: 'Theme', icon: Sun },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const { profile } = useAuth();

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Preferences</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Settings</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Manage your account preferences</p>
      </motion.div>

      <div className="flex gap-3 mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gold text-black font-semibold'
                  : 'bg-bg-card text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <GlassCard className="p-8">
        {activeTab === 'profile' && (
          <div>
            <h3 className="font-heading text-xl text-text-primary mb-6">Profile Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <Input label="Full Name" defaultValue={profile?.full_name} />
              <Input label="Email" defaultValue={profile?.email} />
              <Input label="College" defaultValue={profile?.college} />
              <Input label="Department" defaultValue={profile?.department} />
            </div>
            <div className="mt-6">
              <NeonButton size="sm">Save Changes</NeonButton>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div>
            <h3 className="font-heading text-xl text-text-primary mb-6">Security Settings</h3>
            <div className="max-w-md space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
              <Input label="Confirm New Password" type="password" placeholder="••••••••" />
              <NeonButton size="sm">Update Password</NeonButton>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            <h3 className="font-heading text-xl text-text-primary mb-6">Notification Preferences</h3>
            <div className="space-y-4 max-w-lg">
              {[
                { label: 'Skill Gap Alerts', desc: 'Get notified when new skill gaps are detected' },
                { label: 'Deadline Reminders', desc: 'Receive reminders for application deadlines' },
                { label: 'Recommendations', desc: 'Get personalized course and project suggestions' },
                { label: 'Weekly Reports', desc: 'Receive weekly progress summary via email' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                  <div>
                    <p className="font-body text-sm text-text-primary">{item.label}</p>
                    <p className="font-body text-xs text-text-secondary mt-0.5">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:bg-gold after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'theme' && (
          <div>
            <h3 className="font-heading text-xl text-text-primary mb-6">Theme Settings</h3>
            <div className="max-w-md">
              <div className="flex items-center justify-between p-4 bg-bg-elevated rounded-xl">
                <div className="flex items-center gap-3">
                  <Sun size={20} className="text-gold" />
                  <div>
                    <p className="font-body text-sm text-text-primary">Dark Theme</p>
                    <p className="font-body text-xs text-text-secondary">Modern Professional Luxury</p>
                  </div>
                </div>
                <span className="font-body text-xs text-gold uppercase tracking-widest">Active</span>
              </div>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
