import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function GlassCard({ children, className = '', hover = true, glow = false, onClick, style }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, borderColor: 'rgba(204, 255, 0, 0.3)' } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`glass p-6 ${glow ? 'glow-lime' : ''} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
