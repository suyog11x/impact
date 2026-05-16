import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Typically you'd check their role from metadata or db.
      // For now, default routing to student dashboard.
      const role = data.user.user_metadata?.role || 'student';
      navigate(`/${role}/dashboard`);
    }
  };

  return (
    <div className="min-h-screen bg-black noise-overlay flex items-center justify-center px-6">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute w-[600px] h-[600px] bg-lime/10 rounded-full blur-[150px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-lime rounded-[1.5rem] flex items-center justify-center mx-auto mb-4">
            <span className="text-black font-heading font-bold text-2xl">S</span>
          </div>
          <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary">Welcome Back</h1>
          <p className="text-text-secondary font-body mt-2">Login to your SkillSync AI dashboard</p>
        </div>

        <div className="glass rounded-[2.5rem] p-10">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && <div className="text-red-500 text-sm font-body text-center">{error}</div>}
            <Input 
              label="Email" 
              type="email" 
              placeholder="john@college.edu" 
              icon={<Mail size={16} />} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={<Lock size={16} />} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-white/5 text-lime focus:ring-lime" />
                <span className="text-sm text-text-secondary font-body">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-lime hover:underline font-body">Forgot password?</Link>
            </div>

            <NeonButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'} <ArrowRight size={18} />
            </NeonButton>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center"><span className="px-4 bg-glass text-xs text-muted font-mono uppercase tracking-wider">or</span></div>
          </div>

          <button className="w-full glass rounded-xl py-3 flex items-center justify-center gap-3 text-text-secondary hover:text-text-primary transition-colors font-body">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm font-body text-text-secondary">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-lime hover:underline">Sign up</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
