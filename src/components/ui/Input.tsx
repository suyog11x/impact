interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export default function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-body text-text-secondary mb-2">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">{icon}</div>}
        <input
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary font-body placeholder:text-muted focus:outline-none focus:border-lime/50 focus:ring-1 focus:ring-lime/20 transition-all duration-200 ${icon ? 'pl-12' : ''} ${error ? 'border-red-500/50' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-400 font-body">{error}</p>}
    </div>
  );
}
