import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  accent?: boolean;
}

export default function GlassCard({ children, className = '', hover = false, onClick, style, accent = false }: GlassCardProps) {
  const baseClass = hover ? 'card-3d' : 'card-flat';
  const accentBorder = accent ? 'border-t-2 border-t-gold' : '';

  return (
    <motion.div
      whileHover={hover ? { y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
      onClick={onClick}
      className={`${baseClass} ${accentBorder} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
