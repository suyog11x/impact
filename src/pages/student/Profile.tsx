import { motion } from 'framer-motion';
import {
  User, Mail, GraduationCap, Building2, Calendar,
  GitFork, Globe, MapPin, Edit2, Code, CheckCircle2,
  ExternalLink, Plus, Loader2
} from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { useLeetCode } from '../../hooks/useLeetCode';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { validateLeetCodeUsername } from '../../hooks/useLeetCode';

export default function Profile() {
  const { user, profile, refreshProfile } = useAuth();
  const { stats, loading: lcLoading } = useLeetCode(profile?.leetcode_username);

  const name = profile?.full_name ?? user?.email?.split('@')[0] ?? 'User';
  const email = profile?.email ?? '';
  const college = profile?.college ?? '';
  const department = profile?.department ?? '';
  const graduationYear = profile?.graduation_year ?? '';
  const role = profile?.role ?? 'student';
  const leetcodeUsername = profile?.leetcode_username ?? '';
  const githubUsername = profile?.github_username ?? '';

  // Editable state
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editCollege, setEditCollege] = useState(college);
  const [editDept, setEditDept] = useState(department);
  const [editYear, setEditYear] = useState(String(graduationYear));
  const [editGithub, setEditGithub] = useState(githubUsername);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');

  // LeetCode account link/change
  const [showLcInput, setShowLcInput] = useState(false);
  const [newLcUsername, setNewLcUsername] = useState('');
  const [lcStatus, setLcStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [lcMsg, setLcMsg] = useState('');

  const handleSaveProfile = async () => {
    setSaving(true);
    await supabase.auth.updateUser({
      data: {
        full_name: editName,
        college: editCollege,
        department: editDept,
        graduation_year: editYear,
        github_username: editGithub,
      }
    });
    await supabase.from('profiles').update({
      name: editName,
      college: editCollege,
      department: editDept,
      graduationYear: editYear ? Number(editYear) : null,
      github_username: editGithub,
    }).eq('id', user?.id);
    await refreshProfile();
    setSaving(false);
    setEditMode(false);
    setSaveMsg('Profile updated!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleVerifyLc = async () => {
    if (!newLcUsername.trim()) return;
    setLcStatus('checking');
    const result = await validateLeetCodeUsername(newLcUsername.trim());
    if (result.valid) {
      setLcStatus('valid');
      setLcMsg(`Found: ${result.realName || newLcUsername}`);
    } else {
      setLcStatus('invalid');
      setLcMsg(result.error || 'Not found on LeetCode');
    }
  };

  const handleSaveLc = async () => {
    setSaving(true);
    await supabase.auth.updateUser({ data: { leetcode_username: newLcUsername.trim() } });
    await supabase.from('profiles').update({ leetcode_username: newLcUsername.trim() }).eq('id', user?.id);
    await refreshProfile();
    setSaving(false);
    setShowLcInput(false);
    setNewLcUsername('');
    setLcStatus('idle');
    setSaveMsg('LeetCode account updated!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  // Compute profile completion %
  const fields = [name, email, college, department, graduationYear, leetcodeUsername, githubUsername];
  const filled = fields.filter(f => f && String(f).trim()).length;
  const completion = Math.round((filled / fields.length) * 100);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <p className="premium-label mb-4">Account</p>
        <h1 className="text-5xl md:text-6xl font-heading font-bold tracking-tight text-text-primary">Profile</h1>
        <p className="text-text-secondary font-body mt-3 text-lg">Manage your personal, academic and coding information</p>
      </motion.div>

      {saveMsg && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 flex items-center gap-2 p-4 bg-lime/10 border border-lime/20 rounded-xl text-lime text-sm font-body">
          <CheckCircle2 size={16} /> {saveMsg}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar + Info */}
          <GlassCard className="text-center p-8" accent>
            {stats?.avatar ? (
              <img src={stats.avatar} alt="avatar" className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-lime/30" />
            ) : (
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <User size={40} className="text-gold" />
              </div>
            )}
            <h2 className="text-2xl font-heading font-bold text-text-primary">{stats?.realName || name}</h2>
            <p className="text-sm font-body text-text-secondary">{email}</p>
            <div className="mt-3 flex gap-2 justify-center flex-wrap">
              <Badge variant="gold">{role.toUpperCase()}</Badge>
              {leetcodeUsername && <Badge variant="gold">LC LINKED</Badge>}
            </div>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs font-body text-text-secondary uppercase tracking-widest mb-3">Profile Completion</p>
              <ProgressBar value={completion} color="bg-lime" />
              <p className="text-xs text-text-muted font-body mt-1">{completion}% complete</p>
            </div>
          </GlassCard>

          {/* Quick Links */}
          <GlassCard className="p-6">
            <h3 className="font-heading text-lg text-text-primary mb-4">Quick Links</h3>
            <div className="space-y-3">
              {[
                {
                  icon: Code,
                  label: 'LeetCode',
                  val: leetcodeUsername || 'Not linked',
                  href: leetcodeUsername ? `https://leetcode.com/${leetcodeUsername}` : null,
                  linked: !!leetcodeUsername,
                },
                {
                  icon: GitFork,
                  label: 'GitHub',
                  val: githubUsername || 'Not linked',
                  href: githubUsername ? `https://github.com/${githubUsername}` : null,
                  linked: !!githubUsername,
                },
                { icon: Globe, label: 'Portfolio', val: 'Not set', href: null, linked: false },
                { icon: MapPin, label: 'College', val: college || 'Not set', href: null, linked: false },
              ].map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 text-sm">
                    <Icon size={16} className={item.linked ? 'text-lime' : 'text-text-muted'} />
                    <span className="text-text-secondary font-body">{item.label}:</span>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-lime font-body text-xs ml-auto flex items-center gap-1 hover:underline">
                        {item.val} <ExternalLink size={10} />
                      </a>
                    ) : (
                      <span className={`font-body text-xs ml-auto ${item.linked ? 'text-gold' : 'text-text-muted'}`}>{item.val}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* LeetCode Stats Snapshot */}
          {leetcodeUsername && (
            <GlassCard className="p-6">
              <h3 className="font-heading text-lg text-text-primary mb-4">LeetCode Snapshot</h3>
              {lcLoading ? (
                <div className="flex items-center gap-2 text-text-muted text-sm font-body">
                  <Loader2 size={14} className="animate-spin" /> Loading…
                </div>
              ) : stats ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-body text-text-secondary">Total Solved</span>
                    <span className="font-heading text-text-primary">{stats.solved.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-body text-text-secondary">Easy / Med / Hard</span>
                    <span className="font-mono text-xs text-gold">
                      {stats.solved.easy}/{stats.solved.medium}/{stats.solved.hard}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-body text-text-secondary">Streak</span>
                    <span className="font-heading text-text-primary">{stats.streak}d 🔥</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-body text-text-secondary">Global Rank</span>
                    <span className="font-heading text-text-primary">
                      {stats.ranking ? `#${stats.ranking.toLocaleString()}` : '—'}
                    </span>
                  </div>
                  {stats.contest?.rating ? (
                    <div className="flex justify-between">
                      <span className="text-sm font-body text-text-secondary">Contest Rating</span>
                      <span className="font-heading text-gold">{Math.round(stats.contest.rating)}</span>
                    </div>
                  ) : null}
                </div>
              ) : (
                <p className="text-xs text-text-muted font-body">Could not load stats</p>
              )}
            </GlassCard>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-lg text-text-primary">Personal Information</h3>
              <button
                onClick={() => setEditMode(!editMode)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-gold transition-colors font-body"
              >
                <Edit2 size={14} /> {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Full Name" value={editMode ? editName : name}
                onChange={e => setEditName(e.target.value)} icon={<User size={16} />}
                readOnly={!editMode} />
              <Input label="Email" defaultValue={email} icon={<Mail size={16} />} readOnly />
              <Input label="College" value={editMode ? editCollege : college}
                onChange={e => setEditCollege(e.target.value)} icon={<Building2 size={16} />}
                readOnly={!editMode} />
              <Input label="Department" value={editMode ? editDept : department}
                onChange={e => setEditDept(e.target.value)} icon={<GraduationCap size={16} />}
                readOnly={!editMode} />
              <Input label="Graduation Year" value={editMode ? editYear : String(graduationYear)}
                onChange={e => setEditYear(e.target.value)} icon={<Calendar size={16} />}
                readOnly={!editMode} />
              <Input label="GitHub Username" value={editMode ? editGithub : githubUsername}
                onChange={e => setEditGithub(e.target.value)} icon={<GitFork size={16} />}
                readOnly={!editMode} placeholder="johndoe" />
            </div>
            {editMode && (
              <div className="mt-6 flex justify-end">
                <NeonButton size="sm" onClick={handleSaveProfile} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </NeonButton>
              </div>
            )}
          </GlassCard>

          {/* LeetCode Account Management */}
          <GlassCard className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-lg text-text-primary">LeetCode Account</h3>
                <p className="text-xs text-text-muted font-body mt-1">
                  {leetcodeUsername ? `Linked: @${leetcodeUsername}` : 'Not linked yet'}
                </p>
              </div>
              {leetcodeUsername ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-400" />
                  <span className="text-xs text-green-400 font-body">Verified</span>
                </div>
              ) : null}
            </div>

            {leetcodeUsername && !showLcInput && (
              <div className="flex items-center gap-4 p-4 bg-bg-elevated rounded-xl mb-4">
                {stats?.avatar && <img src={stats.avatar} alt="lc" className="w-10 h-10 rounded-full" />}
                <div className="flex-1">
                  <p className="font-heading text-text-primary">{stats?.realName || leetcodeUsername}</p>
                  <p className="text-xs text-text-muted font-body">@{leetcodeUsername}</p>
                </div>
                <a
                  href={`https://leetcode.com/${leetcodeUsername}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-text-muted hover:text-lime transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            )}

            {/* Add / Change LeetCode */}
            {showLcInput ? (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter LeetCode username"
                    value={newLcUsername}
                    onChange={e => { setNewLcUsername(e.target.value); setLcStatus('idle'); setLcMsg(''); }}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-body text-text-primary outline-none focus:border-lime/40 placeholder:text-text-muted"
                  />
                  <button
                    onClick={handleVerifyLc}
                    disabled={!newLcUsername.trim() || lcStatus === 'checking'}
                    className="px-4 py-2.5 bg-white/10 hover:bg-lime/20 border border-white/10 rounded-xl text-sm text-text-secondary hover:text-lime transition-colors font-body"
                  >
                    {lcStatus === 'checking' ? <Loader2 size={16} className="animate-spin" /> : 'Verify'}
                  </button>
                </div>
                {lcMsg && (
                  <p className={`text-xs font-body px-1 ${lcStatus === 'valid' ? 'text-green-400' : 'text-red-400'}`}>{lcMsg}</p>
                )}
                <div className="flex gap-2">
                  <button onClick={() => { setShowLcInput(false); setNewLcUsername(''); setLcStatus('idle'); }}
                    className="flex-1 py-2 text-sm text-text-muted hover:text-text-primary font-body transition-colors">
                    Cancel
                  </button>
                  <NeonButton size="sm" className="flex-1" disabled={lcStatus !== 'valid' || saving} onClick={handleSaveLc}>
                    {saving ? 'Saving…' : 'Save Account'}
                  </NeonButton>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLcInput(true)}
                className="flex items-center gap-2 text-sm text-lime hover:underline font-body"
              >
                <Plus size={14} />
                {leetcodeUsername ? 'Change LeetCode Account' : 'Link LeetCode Account'}
              </button>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
