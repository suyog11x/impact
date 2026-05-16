export default function StatusTag() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-xs uppercase tracking-[0.15em]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-lime pulse-dot" />
      </span>
      SYSTEM ONLINE
    </div>
  );
}
