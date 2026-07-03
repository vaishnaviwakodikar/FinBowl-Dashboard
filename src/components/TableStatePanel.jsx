import { Inbox, AlertTriangle, RefreshCcw } from 'lucide-react';

/**
 * Renders inline inside a table container for the loading / empty / error
 * states a real disbursement list will hit once it's wired to a live API.
 */
export default function TableStatePanel({ kind, onRetry }) {
  if (kind === 'loading') {
    return (
      <div className="py-16 flex flex-col items-center justify-center gap-3 text-ink-500">
        <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-sm">Loading disbursements…</p>
      </div>
    );
  }

  if (kind === 'error') {
    return (
      <div className="py-16 flex flex-col items-center justify-center gap-3 text-center px-4">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertTriangle size={18} />
        </div>
        <div>
          <p className="text-sm font-medium text-ink-900">Couldn't load disbursements</p>
          <p className="text-sm text-ink-500 mt-0.5">Check your connection and try again.</p>
        </div>
        <button
          onClick={onRetry}
          className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <RefreshCcw size={14} />
          Retry
        </button>
      </div>
    );
  }

  // empty
  return (
    <div className="py-16 flex flex-col items-center justify-center gap-3 text-center px-4">
      <div className="w-10 h-10 rounded-full bg-ink-300/15 flex items-center justify-center text-ink-500">
        <Inbox size={18} />
      </div>
      <div>
        <p className="text-sm font-medium text-ink-900">No disbursements yet</p>
        <p className="text-sm text-ink-500 mt-0.5">New disbursements will show up here once added.</p>
      </div>
    </div>
  );
}
