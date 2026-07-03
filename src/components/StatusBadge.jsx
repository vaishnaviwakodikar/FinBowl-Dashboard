const STYLES = {
  Draft: 'bg-ink-300/15 text-ink-500',
  Submitted: 'bg-emerald-50 text-emerald-600',
  Verified: 'bg-sky-50 text-sky-600',
  Audited: 'bg-amber-50 text-amber-600',
  Processed: 'bg-brand-50 text-brand-600',
  Active: 'bg-emerald-50 text-emerald-600',
  Reconciled: 'bg-sky-50 text-sky-600',
};

export default function StatusBadge({ status }) {
  const style = STYLES[status] || 'bg-ink-300/15 text-ink-500';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${style}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
