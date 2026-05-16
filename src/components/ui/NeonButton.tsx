import { motion } from 'framer-motion';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function NeonButton({ children, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled }: NeonButtonProps) {
  const base = 'relative inline-flex items-center justify-center font-heading font-medium tracking-tight transition-all duration-300 cursor-pointer border disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-lime text-black border-lime hover:scale-105 glow-lime-sm',
    secondary: 'bg-transparent text-lime border border-lime/30 hover:bg-lime/10 hover:border-lime/60',
    ghost: 'bg-transparent text-text-primary border border-white/10 hover:bg-white/5 hover:border-white/20',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
