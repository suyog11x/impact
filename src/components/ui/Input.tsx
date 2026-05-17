interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-xs font-mono text-text-secondary uppercase tracking-widest mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted">{icon}</div>}
        <input
          className={`w-full bg-bg-elevated border border-border rounded-xl px-4 py-3 text-text-primary font-body placeholder:text-text-muted focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all duration-200 ${icon ? 'pl-12' : ''} ${error ? 'border-danger/50' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-danger font-body">{error}</p>}
    </div>
  );
}
