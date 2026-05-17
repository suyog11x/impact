import { motion } from 'framer-motion';

interface ScoreCardProps {
  label: string;
  score: number;
  maxScore?: number;
  color?: string;
  delay?: number;
}

export default function ScoreCard({ label, score, maxScore = 100, color = '#D4AF37', delay = 0 }: ScoreCardProps) {
  const pct = Math.min((score / maxScore) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (pct / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-flat p-5 flex flex-col items-center"
    >
      {/* Circular Progress */}
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.05)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="50" cy="50" r="40"
            stroke={color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay: delay + 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-heading text-2xl text-text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            {score}
          </motion.span>
        </div>
      </div>

      <span className="text-xs font-body text-text-secondary text-center">{label}</span>
    </motion.div>
  );
}
