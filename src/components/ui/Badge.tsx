interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold' | 'success' | 'warning' | 'danger';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    default: 'bg-white/5 text-text-secondary border-white/10',
    gold: 'bg-gold/10 text-gold border-gold/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 text-xs font-body font-medium tracking-wide border rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
