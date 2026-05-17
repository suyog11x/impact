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
  const base = 'inline-flex items-center justify-center font-body font-semibold transition-all duration-300 cursor-pointer touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gold text-black rounded-full hover:bg-gold-light hover:shadow-lg hover:-translate-y-1',
    secondary: 'bg-transparent text-gold border border-gold/30 rounded-full hover:bg-gold/10 hover:border-gold/60',
    ghost: 'bg-transparent text-text-secondary rounded-full hover:text-text-primary hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
