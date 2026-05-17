import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Mail, Lock, GraduationCap, Calendar, Building2,
  ArrowRight, Code, GitFork, CheckCircle2, XCircle, Loader2
} from 'lucide-react';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { validateLeetCodeUsername } from '../../hooks/useLeetCode';

type ValidationState = 'idle' | 'checking' | 'valid' | 'invalid';

export default function Signup() {
  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [githubUsername, setGithubUsername] = useState('');

  // LeetCode validation state
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [lcValidation, setLcValidation] = useState<ValidationState>('idle');
  const [lcMessage, setLcMessage] = useState('');
  const [lcAvatar, setLcAvatar] = useState<string | null>(null);
  const [lcRealName, setLcRealName] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  // ── Real-time debounced LeetCode validation ──────────────────────────────────
  useEffect(() => {
    if (!leetcodeUsername.trim()) {
      setLcValidation('idle');
      setLcMessage('');
      setLcAvatar(null);
      setLcRealName(null);
      return;
    }

    setLcValidation('checking');
    setLcMessage('');

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const result = await validateLeetCodeUsername(leetcodeUsername.trim());
      if (result.valid) {
        setLcValidation('valid');
        setLcMessage(`✓ Found: ${result.realName || result.username || leetcodeUsername}`);
        setLcAvatar(result.avatar || null);
        setLcRealName(result.realName || null);
      } else {
        setLcValidation('invalid');
        setLcMessage(result.error || 'Username not found on LeetCode');
        setLcAvatar(null);
        setLcRealName(null);
      }
    }, 600);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [leetcodeUsername]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (role === 'student' && lcValidation !== 'valid') {
      setError('Please enter a valid LeetCode username to continue');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role,
          college,
          department,
          graduation_year: graduationYear,
          leetcode_username: role === 'student' ? leetcodeUsername.trim() : null,
          github_username: githubUsername.trim() || null,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Upsert profile with leetcode_username
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: fullName,
          email,
          role,
          college: role === 'student' || role === 'recruiter' ? college : null,
          department: role === 'student' ? department : null,
          graduationYear: role === 'student' ? (graduationYear ? Number(graduationYear) : null) : null,
          leetcode_username: role === 'student' ? leetcodeUsername.trim() : null,
          github_username: githubUsername.trim() || null,
        });
      } catch (_err) {
        // Profile insert is best-effort
      }

      // Auto sign-in
      if (data.user.identities && data.user.identities.length > 0 && data.session) {
        navigate(`/${role}/dashboard`);
      } else {
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (!signInError && signInData.session) {
          navigate(`/${role}/dashboard`);
        } else {
          setSuccessMsg('Account created! You can now log in.');
          setLoading(false);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const lcBorderColor =
    lcValidation === 'valid' ? 'border-green-500/60' :
    lcValidation === 'invalid' ? 'border-red-500/60' :
    '';

  return (
    <div className="min-h-screen bg-black noise-overlay flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute w-[500px] h-[500px] bg-lime/10 rounded-full blur-[150px]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-20 h-20 bg-lime rounded-[2rem] flex items-center justify-center mx-auto mb-8">
            <span className="text-black font-heading font-bold text-3xl">S</span>
          </div>
          <h1 className="text-5xl font-heading font-bold tracking-tight text-text-primary mb-4">SkillSync AI</h1>
          <p className="text-xl text-text-secondary font-body">Join the future of placement preparation.</p>
          <div className="mt-12 space-y-4 text-left">
            {[
              'AI-Powered Skill Analysis',
              'Real LeetCode Stats & Insights',
              'Personalized Learning Roadmaps',
              'Placement Prediction Engine'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 text-text-secondary">
                <div className="w-2 h-2 bg-lime rounded-full" />
                <span className="font-body">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="glass rounded-[2.5rem] p-10">
            <h2 className="text-3xl font-heading font-bold tracking-tight text-text-primary mb-2">Create Account</h2>
            <p className="text-text-secondary font-body mb-8">Start your placement preparation journey</p>

            {/* Role Selector */}
            <div className="flex gap-2 mb-8 p-1 glass rounded-xl">
              {['student', 'recruiter', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2.5 text-sm font-body font-medium rounded-lg capitalize transition-all ${
                    role === r ? 'bg-lime text-black' : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <form className="space-y-4" onSubmit={handleSignup}>
              {error && <div className="text-red-400 text-sm font-body text-center bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">{error}</div>}
              {successMsg && <div className="text-lime text-sm font-body text-center bg-lime/10 rounded-xl px-4 py-3 border border-lime/20">{successMsg}</div>}

              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Doe" icon={<User size={16} />} value={fullName} onChange={e => setFullName(e.target.value)} required />
                <Input label="Email" type="email" placeholder="john@college.edu" icon={<Mail size={16} />} value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={password} onChange={e => setPassword(e.target.value)} required />
                <Input label="Confirm Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>

              {/* Student Fields */}
              {role === 'student' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="College" placeholder="MIT College of Engineering" icon={<Building2 size={16} />} value={college} onChange={e => setCollege(e.target.value)} />
                    <Input label="Department" placeholder="Computer Science" icon={<GraduationCap size={16} />} value={department} onChange={e => setDepartment(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Graduation Year" type="number" placeholder="2026" icon={<Calendar size={16} />} value={graduationYear} onChange={e => setGraduationYear(e.target.value)} />
                    <Input label="GitHub Username" placeholder="johndoe (optional)" icon={<GitFork size={16} />} value={githubUsername} onChange={e => setGithubUsername(e.target.value)} />
                  </div>

                  {/* LeetCode Username — Real-time validated */}
                  <div className="space-y-1">
                    <label className="text-xs font-body text-text-secondary uppercase tracking-widest">
                      LeetCode Username <span className="text-red-400">*</span>
                    </label>
                    <div className={`flex items-center gap-2 bg-white/5 border rounded-xl px-3 py-2.5 transition-colors ${lcBorderColor || 'border-white/10'}`}>
                      <Code size={16} className="text-text-muted shrink-0" />
                      <input
                        type="text"
                        placeholder="your-leetcode-username"
                        value={leetcodeUsername}
                        onChange={e => setLeetcodeUsername(e.target.value)}
                        required
                        className="flex-1 bg-transparent text-text-primary font-body text-sm outline-none placeholder:text-text-muted"
                      />
                      {lcValidation === 'checking' && <Loader2 size={16} className="animate-spin text-text-muted shrink-0" />}
                      {lcValidation === 'valid' && <CheckCircle2 size={16} className="text-green-400 shrink-0" />}
                      {lcValidation === 'invalid' && <XCircle size={16} className="text-red-400 shrink-0" />}
                    </div>

                    {/* Validation feedback */}
                    {lcMessage && (
                      <p className={`text-xs font-body px-1 ${lcValidation === 'valid' ? 'text-green-400' : 'text-red-400'}`}>
                        {lcMessage}
                      </p>
                    )}

                    {/* LeetCode Profile Preview on valid */}
                    {lcValidation === 'valid' && lcAvatar && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 mt-2 p-3 bg-green-500/10 border border-green-500/20 rounded-xl"
                      >
                        <img src={lcAvatar} alt="LC Avatar" className="w-9 h-9 rounded-full border border-green-500/40" />
                        <div>
                          <p className="text-sm font-heading text-text-primary">{lcRealName || leetcodeUsername}</p>
                          <p className="text-xs text-green-400 font-body">LeetCode account verified ✓</p>
                        </div>
                      </motion.div>
                    )}

                    {lcValidation === 'idle' && !leetcodeUsername && (
                      <p className="text-xs text-text-muted font-body px-1">
                        Required — we pull your real stats from LeetCode
                      </p>
                    )}
                  </div>
                </>
              )}

              {/* Recruiter Fields */}
              {role === 'recruiter' && (
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Company" placeholder="Company Name" icon={<Building2 size={16} />} value={college} onChange={e => setCollege(e.target.value)} />
                  <Input label="Designation" placeholder="HR Manager" icon={<GraduationCap size={16} />} value={department} onChange={e => setDepartment(e.target.value)} />
                </div>
              )}

              {/* Admin Fields */}
              {role === 'admin' && (
                <Input label="Organization" placeholder="Organization / College" icon={<Building2 size={16} />} value={college} onChange={e => setCollege(e.target.value)} />
              )}

              <NeonButton
                type="submit"
                className="w-full mt-6"
                disabled={loading || (role === 'student' && lcValidation !== 'valid')}
              >
                {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight size={18} />
              </NeonButton>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
              <div className="relative flex justify-center"><span className="px-4 bg-glass text-xs text-muted font-mono uppercase tracking-wider">or continue with</span></div>
            </div>

            <button type="button" className="w-full glass rounded-xl py-3 flex items-center justify-center gap-3 text-text-secondary hover:text-text-primary transition-colors font-body">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Continue with Google
            </button>

            <p className="mt-6 text-center text-sm font-body text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-lime hover:underline">Login</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
