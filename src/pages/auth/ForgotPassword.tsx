import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Input from '../../components/ui/Input';
import NeonButton from '../../components/ui/NeonButton';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-black noise-overlay flex items-center justify-center px-6">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute w-[400px] h-[400px] bg-lime/10 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="glass rounded-[2.5rem] p-10">
          <Link to="/login" className="inline-flex items-center gap-2 text-text-secondary hover:text-lime transition-colors font-body text-sm mb-6">
            <ArrowLeft size={16} /> Back to login
          </Link>

          <h1 className="text-3xl font-heading font-bold tracking-tight text-text-primary mb-2">Reset Password</h1>
          <p className="text-text-secondary font-body mb-8">Enter your email and we&apos;ll send you a reset link</p>

          <form className="space-y-5">
            <Input label="Email" type="email" placeholder="john@college.edu" icon={<Mail size={16} />} />
            <NeonButton type="submit" className="w-full">
              Send Reset Link <Send size={18} />
            </NeonButton>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
