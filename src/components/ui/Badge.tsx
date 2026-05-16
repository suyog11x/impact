interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'lime' | 'success' | 'warning' | 'danger';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white/5 text-text-secondary border-white/10',
    lime: 'bg-lime/10 text-lime border-lime/20',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-lg ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
