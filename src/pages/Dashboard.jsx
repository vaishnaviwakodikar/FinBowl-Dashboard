import { Link } from 'react-router-dom';
import { ClipboardList, FileSpreadsheet, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { STATS } from '../data/mockData';
import StatCard from '../components/StatCard';

export default function Dashboard() {
  return (
    <div>
      <Breadcrumb items={[{ label: 'RMS' }, { label: 'Dashboard' }]} />
      <h1 className="text-2xl font-semibold text-ink-900 mb-6">Welcome back</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <Link
          to="/rms/disbursement"
          className="bg-white border border-ink-300/20 rounded-xl shadow-card p-5 hover:border-brand-300 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
            <ClipboardList size={17} />
          </div>
          <p className="text-sm font-semibold text-ink-900 flex items-center gap-1">
            Disbursement
            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-sm text-ink-500 mt-1">Track and verify disbursed loan amounts.</p>
        </Link>

        <Link
          to="/rms/loans"
          className="bg-white border border-ink-300/20 rounded-xl shadow-card p-5 hover:border-brand-300 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center mb-3">
            <FileSpreadsheet size={17} />
          </div>
          <p className="text-sm font-semibold text-ink-900 flex items-center gap-1">
            Loans
            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
          <p className="text-sm text-ink-500 mt-1">Create and manage loan cases end to end.</p>
        </Link>
      </div>
    </div>
  );
}
