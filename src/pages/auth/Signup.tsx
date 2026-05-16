import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, GraduationCap, Calendar, Building2, ArrowRight } from 'lucide-react';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Signup() {
  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [college, setCollege] = useState('');
  const [department, setDepartment] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
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
          graduation_year: graduationYear
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Try to create a profile row
      try {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: fullName,
          email,
          role,
          college: role === 'student' || role === 'recruiter' ? college : null,
          department: role === 'student' ? department : null,
          graduationYear: role === 'student' ? (graduationYear ? Number(graduationYear) : null) : null,
        });
      } catch (_err) {
        // Profile insert is best-effort
      }

      // If the user's email is already confirmed (e.g. email confirm is disabled
      // in Supabase), identities will be populated — navigate directly.
      if (data.user.identities && data.user.identities.length > 0 && data.session) {
        navigate(`/${role}/dashboard`);
      } else {
        // Supabase requires email confirmation — tell the user
        setSuccessMsg('Account created! Check your email to confirm, then log in.');
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black noise-overlay flex">
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
          <p className="text-xl text-text-secondary font-body">Join the future of placement preparation. Bridge the gap between academics and industry.</p>
          <div className="mt-12 space-y-4 text-left">
            {['AI-Powered Skill Analysis', 'Personalized Learning Roadmaps', 'Placement Prediction Engine'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-text-secondary">
                <div className="w-2 h-2 bg-lime rounded-full" />
                <span className="font-body">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="glass rounded-[2.5rem] p-10">
            <h2 className="text-3xl font-heading font-bold tracking-tight text-text-primary mb-2">Create Account</h2>
            <p className="text-text-secondary font-body mb-8">Start your placement preparation journey</p>

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
              {error && <div className="text-red-500 text-sm font-body text-center">{error}</div>}
              {successMsg && <div className="text-lime text-sm font-body text-center bg-lime/10 rounded-xl px-4 py-3 border border-lime/20">{successMsg}</div>}
              <div className="grid grid-cols-2 gap-4">
                <Input label="Full Name" placeholder="John Doe" icon={<User size={16} />} value={fullName} onChange={e => setFullName(e.target.value)} required />
                <Input label="Email" type="email" placeholder="john@college.edu" icon={<Mail size={16} />} value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={password} onChange={e => setPassword(e.target.value)} required />
                <Input label="Confirm Password" type="password" placeholder="••••••••" icon={<Lock size={16} />} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
              </div>
                {role === 'student' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="College" placeholder="MIT College of Engineering" icon={<Building2 size={16} />} value={college} onChange={e => setCollege(e.target.value)} />
                      <Input label="Department" placeholder="Computer Science" icon={<GraduationCap size={16} />} value={department} onChange={e => setDepartment(e.target.value)} />
                    </div>
                    <Input label="Graduation Year" type="number" placeholder="2026" icon={<Calendar size={16} />} value={graduationYear} onChange={e => setGraduationYear(e.target.value)} />
                  </>
                )}

                {role === 'recruiter' && (
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Company" placeholder="Company Name" icon={<Building2 size={16} />} value={college} onChange={e => setCollege(e.target.value)} />
                    <Input label="Designation" placeholder="HR Manager" icon={<GraduationCap size={16} />} value={department} onChange={e => setDepartment(e.target.value)} />
                  </div>
                )}

                {role === 'admin' && (
                  <Input label="Organization" placeholder="Organization / College" icon={<Building2 size={16} />} value={college} onChange={e => setCollege(e.target.value)} />
                )}

              <NeonButton type="submit" className="w-full mt-6" disabled={loading}>
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
