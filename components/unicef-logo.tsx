export function UnicefLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-unicef-blue text-white shadow-soft">
        <svg viewBox="0 0 48 48" className="h-6 w-6" fill="none">
          <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="2.2" />
          <path d="M24 14a16 16 0 0 1 0 20" stroke="currentColor" strokeWidth="2.2" />
          <path d="M24 14a16 16 0 0 0 0 20" stroke="currentColor" strokeWidth="2.2" />
          <path d="M14 24h20" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-unicef-blue">
          UNICEF
        </div>
        {!compact ? <div className="text-sm text-unicef-ink/70">Crisis Intelligence Platform</div> : null}
      </div>
    </div>
  );
}
