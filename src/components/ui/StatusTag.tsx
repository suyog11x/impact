export default function StatusTag() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-bg-card border border-border rounded-full font-body text-xs uppercase tracking-widest text-text-secondary">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
      </span>
      SYSTEM ONLINE
    </div>
  );
}
