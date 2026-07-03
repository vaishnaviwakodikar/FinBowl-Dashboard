export default function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-ink-300/20 rounded-xl px-5 py-4 shadow-card min-w-[140px] flex-1">
      <p className="text-xs text-ink-500 mb-2 truncate">{label}</p>
      <p className="text-xl font-semibold text-ink-900 truncate">{value}</p>
    </div>
  );
}
