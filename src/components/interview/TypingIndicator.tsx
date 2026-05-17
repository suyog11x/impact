import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  label?: string;
}

export default function TypingIndicator({ label = 'AI is thinking' }: TypingIndicatorProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gold"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="text-xs font-body text-text-muted">{label}</span>
    </div>
  );
}
