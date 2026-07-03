import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Archive, ClipboardList, Pencil, FileText, Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import StatusBadge from '../components/StatusBadge';
import { fetchLoanDetail } from '../data/mockData';

const SECTIONS = [
  { id: 'customer', label: 'Customer Information' },
  { id: 'loan', label: 'Loan Information' },
  { id: 'broker', label: 'Broker Information' },
  { id: 'commission', label: 'Commission & Executive Details' },
  { id: 'notes', label: 'Notes / Additional Information' },
  { id: 'payments', label: 'Payment & Vouchers' },
  { id: 'documents', label: 'Documents' },
];

function Card({ title, icon: Icon, children, id, innerRef }) {
  return (
    <div id={id} ref={innerRef} className="bg-white border border-ink-300/20 rounded-xl shadow-card scroll-mt-6">
      <div className="flex items-center gap-2 px-5 py-3.5 border-b border-ink-300/15">
        {Icon && <Icon size={15} className="text-ink-500" />}
        <h3 className="text-sm font-semibold text-ink-900">{title}</h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Item({ label, value, highlight }) {
  return (
    <div className={highlight ? 'bg-emerald-50 rounded-lg px-3 py-2 -mx-3 -my-1' : ''}>
      <p className="text-xs text-ink-500 mb-1">{label}</p>
      <p className={`text-sm font-medium ${highlight ? 'text-emerald-600' : 'text-ink-900'}`}>{value}</p>
    </div>
  );
}

export default function LoanDetail() {
  const { caseId } = useParams();
  const [loan, setLoan] = useState(null);
  const [state, setState] = useState('loading');
  const [active, setActive] = useState('customer');
  const refs = useRef({});

  // FIX: caseId wasn't being passed to fetchLoanDetail, so every loan
  // showed the same mock record regardless of which one was opened.
  const load = () => {
    setState('loading');
    fetchLoanDetail(caseId)
      .then((data) => {
        setLoan(data);
        setState('ready');
      })
      .catch(() => setState('error'));
  };

  useEffect(load, [caseId]);

  useEffect(() => {
    if (state !== 'ready') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-96px 0px -60% 0px', threshold: 0.1 }
    );
    Object.values(refs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [state]);

  const scrollTo = (id) => {
    refs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const displayId = caseId || loan?.caseId;

  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-ink-500">
        <Loader2 size={22} className="animate-spin" />
        <p className="text-sm">Loading loan details…</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <AlertCircle size={22} className="text-red-500" />
        <p className="text-sm font-medium text-ink-900">Couldn't load this loan</p>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <RefreshCcw size={13} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'RMS', to: '/rms/dashboard' }, { label: 'Loan', to: '/rms/loans' }, { label: displayId }]} />

      <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-ink-900">
              {loan.customer.name} <span className="text-ink-500 font-normal">— {loan.loanInfo.type}</span>
            </h1>
            <StatusBadge status={loan.status} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300/30 bg-white px-3.5 py-2 text-sm text-ink-700 hover:bg-ink-900/5">
            <Archive size={14} />
            Archive
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-ink-300/30 bg-white px-3.5 py-2 text-sm text-ink-700 hover:bg-ink-900/5">
            <ClipboardList size={14} />
            Activity Logs
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white hover:bg-brand-600">
            <Pencil size={14} />
            Edit Loan
          </button>
        </div>
      </div>
      <p className="text-sm text-ink-500 mb-5">Loan — {displayId}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Item label="Total Sanctioned Amount" value={loan.totalSanctioned} />
        <Item label="Bank Commission %" value={loan.bankCommission} />
        <Item label="Referral Fee %" value={loan.referralFee} />
        <div className="bg-emerald-50 rounded-lg px-4 py-3">
          <p className="text-xs text-ink-500 mb-1">Net Receivable</p>
          <p className="text-sm font-semibold text-emerald-600">{loan.netReceivable}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">
        <nav className="hidden lg:block">
          <div className="sticky top-6 space-y-0.5">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  active === s.id
                    ? 'bg-brand-50 text-brand-700 font-medium'
                    : 'text-ink-500 hover:bg-ink-900/5 hover:text-ink-700'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="space-y-5 min-w-0">
          <Card id="customer" innerRef={(el) => (refs.current.customer = el)} title="Customer Information">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Item label="Customer Name" value={loan.customer.name} />
              <Item label="Email" value={loan.customer.email} />
              <Item label="Phone Number" value={loan.customer.phone} />
            </div>
          </Card>

          <Card id="loan" innerRef={(el) => (refs.current.loan = el)} title="Loan Information">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Item label="Sanctioned Amt" value={loan.loanInfo.sanctioned} />
              <Item label="Disbursed Amt" value={loan.loanInfo.disbursed} />
              <Item label="Pending Amt" value={loan.loanInfo.pending} />
              <Item label="Case ID" value={loan.loanInfo.caseId} />
              <div>
                <p className="text-xs text-ink-500 mb-1">Loan Type</p>
                <span className="inline-block bg-brand-50 text-brand-600 text-xs font-medium px-2 py-1 rounded-full">
                  {loan.loanInfo.type}
                </span>
              </div>
              <Item label="Bank" value={loan.loanInfo.bank} />
              <div>
                <p className="text-xs text-ink-500 mb-1">Status</p>
                <StatusBadge status={loan.loanInfo.status} />
              </div>
              <Item label="Disbursed Month" value={loan.loanInfo.month} />
            </div>
          </Card>

          <Card id="broker" innerRef={(el) => (refs.current.broker = el)} title="Broker Information">
            <div className="space-y-4">
              {loan.brokers.map((b, i) => (
                <div key={i} className={i > 0 ? 'pt-4 border-t border-ink-300/15' : ''}>
                  <p className="text-xs text-ink-500 mb-2">Broker {i + 1}</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Item label="Name" value={b.name} />
                    <div>
                      <p className="text-xs text-ink-500 mb-1">Broker Type</p>
                      <span className="inline-block bg-sky-50 text-sky-600 text-xs font-medium px-2 py-1 rounded-full">
                        {b.type}
                      </span>
                    </div>
                    <Item label="Broker Code" value={b.code} />
                    <Item label="Commission" value={`${b.pct} · ${b.amt}`} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card id="commission" innerRef={(el) => (refs.current.commission = el)} title="Commission & Executive Details">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Item label="Credit Executive" value={loan.commission.creditExecutive} />
              <Item label="Bank Executive" value={loan.commission.bankExecutive} />
              <Item label="Bank Commission" value={loan.commission.bankCommission} />
              <Item label="Referral Fee" value={loan.commission.referralFee} />
              <Item label="Bill Comm Amt" value={loan.commission.billCommAmt} />
              <Item label="GST Amt (18%)" value={loan.commission.gstAmt} />
              <Item label="Invoice Amt" value={loan.commission.invoiceAmt} />
              <Item label="TDS Amt" value={loan.commission.tdsAmt} />
              <Item label="Net Receivable" value={loan.commission.netReceivable} highlight />
            </div>
          </Card>

          <Card id="notes" innerRef={(el) => (refs.current.notes = el)} title="Notes / Additional Information">
            <p className="text-sm text-ink-700 leading-relaxed">{loan.notes}</p>
          </Card>

          <Card id="payments" innerRef={(el) => (refs.current.payments = el)} title="Payment & Vouchers">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Item label="Surplus / Deficit" value={loan.payments.surplus} />
              <Item label="Receipt Amount" value={loan.payments.receiptAmt} />
              <Item label="Receipt Date" value={loan.payments.receiptDate} />
              <Item label="Advance Payment" value={loan.payments.advancePayment} />
              <Item label="Payment Date" value={loan.payments.paymentDate} />
              <Item label="Credit Voucher Number" value={loan.payments.voucherNumber} />
            </div>
          </Card>

          <Card id="documents" innerRef={(el) => (refs.current.documents = el)} title="Documents">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {loan.documents.map((doc, i) => (
                <div key={i} className="flex items-center gap-2 border border-ink-300/20 rounded-lg px-3 py-2.5">
                  <div className="w-8 h-8 rounded-md bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                    <FileText size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-ink-900 truncate">{doc.name}</p>
                    <p className="text-xs text-ink-500">{doc.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}