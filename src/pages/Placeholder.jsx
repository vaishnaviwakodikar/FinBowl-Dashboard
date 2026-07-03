import { Construction } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

export default function Placeholder({ title }) {
  return (
    <div>
      <Breadcrumb items={[{ label: 'RMS', to: '/rms/dashboard' }, { label: title }]} />
      <h1 className="text-2xl font-semibold text-ink-900 mb-6">{title}</h1>
      <div className="bg-white border border-ink-300/20 rounded-xl shadow-card py-20 flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-10 h-10 rounded-full bg-ink-300/15 flex items-center justify-center text-ink-500">
          <Construction size={18} />
        </div>
        <div>
          <p className="text-sm font-medium text-ink-900">{title} isn't in this build yet</p>
          <p className="text-sm text-ink-500 mt-0.5">This task focused on Disbursement, Loans, and Loan Detail.</p>
        </div>
      </div>
    </div>
  );
}
