import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import NeonButton from '../components/ui/NeonButton';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black noise-overlay flex items-center justify-center px-6">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute w-[500px] h-[500px] bg-lime/10 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative text-center"
      >
        <div className="text-[12rem] font-heading font-black tracking-tight text-lime leading-none mb-4">
          404
        </div>
        <p className="text-3xl font-heading font-bold tracking-tight text-text-primary mb-4">
          Oops, Page Not Found
        </p>
        <p className="text-text-secondary font-body max-w-md mx-auto mb-10">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/">
            <NeonButton>
              <Home size={18} /> Go Home
            </NeonButton>
          </Link>
          <button onClick={() => window.history.back()}>
            <NeonButton variant="ghost">
              <ArrowLeft size={18} /> Go Back
            </NeonButton>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
