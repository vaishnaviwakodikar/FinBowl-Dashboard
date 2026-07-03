import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  FileUp,
  ChevronDown,
  Plus,
  Search,
  ArrowUpDown,
  Filter,
  Columns3,
  ChevronsLeft,
  ChevronsRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import TableStatePanel from '../components/TableStatePanel';
import { STATS, fetchDisbursements } from '../data/mockData';

const COLUMNS = [
  'Disbursement Date',
  'Loan ID',
  'Status',
  'Applicant Name',
  'Bank Name',
  'Sanctioned Amt',
  'Verified',
  'Referral %',
  'Credit Executive',
];

const PAGE_SIZE = 10;

export default function Disbursement() {
  const [rows, setRows] = useState([]);
  const [state, setState] = useState('loading'); // loading | ready | error | empty
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const load = () => {
    setState('loading');
    fetchDisbursements()
      .then((data) => {
        setRows(data);
        setState(data.length === 0 ? 'empty' : 'ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(load, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.toLowerCase();
    return rows.filter(
      (r) =>
        r.applicant.toLowerCase().includes(q) ||
        r.loanId.toLowerCase().includes(q) ||
        r.bank.toLowerCase().includes(q)
    );
  }, [rows, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <Breadcrumb items={[{ label: 'RMS', to: '/rms/dashboard' }, { label: 'Disbursement' }]} />

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-ink-900">Disbursement</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300/30 bg-white px-3.5 py-2 text-sm text-ink-700 hover:bg-ink-900/5">
            <Activity size={15} />
            Activity
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300/30 bg-white px-3.5 py-2 text-sm text-ink-700 hover:bg-ink-900/5">
            <FileUp size={15} />
            Import Excel
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-600">
            <Plus size={15} />
            Add Disbursement
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="bg-white border border-ink-300/20 rounded-xl shadow-card overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-ink-300/15">
          <div className="flex items-center gap-2 bg-ink-900/[0.03] rounded-lg px-3 py-2 w-full max-w-xs">
            <Search size={15} className="text-ink-500 shrink-0" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search for Disbursement"
              className="bg-transparent outline-none text-sm w-full text-ink-900 placeholder:text-ink-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300/30 px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-900/5">
              Saved View
              <ChevronDown size={14} />
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300/30 px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-900/5">
              Export All
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {state !== 'ready' ? (
          <TableStatePanel kind={state} onRetry={load} />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[1000px]">
                <thead>
                  <tr className="border-b border-ink-300/15 text-left text-ink-500">
                    <th className="w-10 py-2.5 pl-4">
                      <input type="checkbox" className="rounded border-ink-300" />
                    </th>
                    {COLUMNS.map((col) => (
                      <th key={col} className="py-2.5 px-3 font-medium whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5">
                          {col}
                          <ArrowUpDown size={11} className="text-ink-300" />
                          <Filter size={11} className="text-ink-300" />
                        </span>
                      </th>
                    ))}
                    <th className="w-10 py-2.5 pr-4">
                      <Columns3 size={14} className="text-ink-300" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td colSpan={COLUMNS.length + 2}>
                        <TableStatePanel kind="empty" />
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((row) => (
                      <tr key={row.id} className="border-b border-ink-300/10 hover:bg-ink-900/[0.02]">
                        <td className="py-3 pl-4">
                          <input type="checkbox" className="rounded border-ink-300" />
                        </td>
                        <td className="py-3 px-3 text-ink-700 whitespace-nowrap">{row.date}</td>
                        <td className="py-3 px-3">
                          <span className="text-brand-600 font-medium">{row.loanId}</span>
                        </td>
                        <td className="py-3 px-3">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="py-3 px-3 text-ink-900 font-medium whitespace-nowrap">{row.applicant}</td>
                        <td className="py-3 px-3 text-ink-700 whitespace-nowrap">{row.bank}</td>
                        <td className="py-3 px-3 text-ink-700 text-right">{row.sanctioned.toFixed(2)}</td>
                        <td className="py-3 px-3 text-ink-700 whitespace-nowrap">{row.verified}</td>
                        <td className="py-3 px-3 text-ink-700 whitespace-nowrap">{row.referral}</td>
                        <td className="py-3 px-3">
                          <span className="inline-flex items-center gap-1.5 text-ink-700 whitespace-nowrap">
                            <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 text-[10px] font-semibold flex items-center justify-center shrink-0">
                              {row.executive.charAt(0)}
                            </span>
                            {row.executive}
                          </span>
                        </td>
                        <td />
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-2 text-sm text-ink-500">
                <span>Page</span>
                <span className="rounded-md border border-ink-300/30 px-2 py-1 text-ink-900">{page}</span>
                <span>of {totalPages}</span>
                <span className="ml-3">Rows per page</span>
                <span className="inline-flex items-center gap-1 rounded-md border border-ink-300/30 px-2 py-1 text-ink-900">
                  {PAGE_SIZE}
                  <ChevronDown size={12} />
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(1)}
                  disabled={page === 1}
                  className="p-1.5 rounded-md border border-ink-300/30 text-ink-500 disabled:opacity-40 hover:bg-ink-900/5"
                >
                  <ChevronsLeft size={14} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-1.5 rounded-md border border-ink-300/30 text-ink-500 disabled:opacity-40 hover:bg-ink-900/5"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-7 h-7 rounded-md text-sm ${
                      page === i + 1 ? 'bg-brand-500 text-white' : 'text-ink-700 hover:bg-ink-900/5'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md border border-ink-300/30 text-ink-500 disabled:opacity-40 hover:bg-ink-900/5"
                >
                  <ChevronRight size={14} />
                </button>
                <button
                  onClick={() => setPage(totalPages)}
                  disabled={page === totalPages}
                  className="p-1.5 rounded-md border border-ink-300/30 text-ink-500 disabled:opacity-40 hover:bg-ink-900/5"
                >
                  <ChevronsRight size={14} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
