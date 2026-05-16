import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export default function ProgressBar({ value, max = 100, label, showValue = true, size = 'md', color = 'bg-lime' }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' };

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-sm text-text-secondary font-body">{label}</span>}
          {showValue && <span className="text-sm font-mono text-text-primary">{value}/{max}</span>}
        </div>
      )}
      <div className={`w-full bg-white/5 rounded-full overflow-hidden ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`${heights[size]} ${color} rounded-full`}
          style={{ boxShadow: color === 'bg-lime' ? '0 0 12px rgba(204, 255, 0, 0.3)' : undefined }}
        />
      </div>
    </div>
  );
}
