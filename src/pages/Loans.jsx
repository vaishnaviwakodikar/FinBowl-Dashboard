import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileSpreadsheet, Loader2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import StatusBadge from '../components/StatusBadge';
import { LOAN_DETAIL } from '../data/mockData';

export default function Loans() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div>
      <Breadcrumb items={[{ label: 'RMS', to: '/rms/dashboard' }, { label: 'Loans' }]} />

      <div className="flex items-center justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-ink-900">Loans</h1>
        <Link
          to="/rms/loans/new"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-600"
        >
          <Plus size={15} />
          Add Loan
        </Link>
      </div>

      <div className="bg-white border border-ink-300/20 rounded-xl shadow-card overflow-hidden">
        {loading ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3 text-ink-500">
            <Loader2 size={20} className="animate-spin" />
            <p className="text-sm">Loading loans…</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
              <thead>
                <tr className="border-b border-ink-300/15 text-left text-ink-500">
                  <th className="py-2.5 px-4 font-medium">Case ID</th>
                  <th className="py-2.5 px-4 font-medium">Customer</th>
                  <th className="py-2.5 px-4 font-medium">Loan Type</th>
                  <th className="py-2.5 px-4 font-medium">Bank</th>
                  <th className="py-2.5 px-4 font-medium">Sanctioned</th>
                  <th className="py-2.5 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-ink-900/[0.02]">
                  <td className="py-3 px-4">
                    <Link to={`/rms/loans/${LOAN_DETAIL.caseId}`} className="text-brand-600 font-medium">
                      {LOAN_DETAIL.caseId}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-ink-900 font-medium">{LOAN_DETAIL.customerName}</td>
                  <td className="py-3 px-4 text-ink-700">{LOAN_DETAIL.loanType}</td>
                  <td className="py-3 px-4 text-ink-700">{LOAN_DETAIL.loanInfo.bank}</td>
                  <td className="py-3 px-4 text-ink-700">{LOAN_DETAIL.totalSanctioned}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={LOAN_DETAIL.status} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-ink-500">
        <FileSpreadsheet size={14} />
        Loans are created from the Add Loan form and tracked through disbursement here.
      </div>
    </div>
  );
}
