import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, HelpCircle, ChevronDown, Mail, AlertCircle, Loader2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { submitLoan } from '../data/mockData';

const EMPTY_BROKER = { name: '', type: 'Direct', code: 'CON-001', commission: '0.2750' };

const initialForm = {
  customerName: '',
  email: '',
  phone: '+91 9876543210',
  loanAmount: '',
  productType: '',
  bank: '',
  stage: 'Lead',
  status: 'Active',
  priority: 'Normal',
  bankCommission: '',
  referralFee: '',
  creditExecutive: '',
  bankExecutive: '',
  notes: '',
};

function FormSection({ title, children }) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-x-8 gap-y-3 p-5">
      <h2 className="text-sm font-semibold text-ink-900">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
function Field({ label, required, children, error, hint }) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs text-ink-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
        {hint && <HelpCircle size={11} className="text-ink-300" />}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = (hasError) =>
  `w-full rounded-md border px-3 py-1.5 text-sm text-ink-900 placeholder:text-ink-300 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 ${
    hasError ? 'border-red-400' : 'border-ink-300/30'
  }`;

const selectClass = (hasError) =>
  `w-full appearance-none rounded-md border px-3 py-1.5 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 bg-white ${
    hasError ? 'border-red-400' : 'border-ink-300/30'
  }`;

const toRawNumber = (v) => v.replace(/[₹,%\s]/g, '');

const formatCurrencyOnBlur = (v) => {
  const raw = toRawNumber(v);
  if (!raw || Number.isNaN(Number(raw))) return v;
  return `₹${Number(raw).toLocaleString('en-IN')}`;
};

const formatPercentOnBlur = (v) => {
  const raw = toRawNumber(v);
  if (!raw || Number.isNaN(Number(raw))) return v;
  return `${Number(raw).toFixed(2)}%`;
};

export default function LoanForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [brokers, setBrokers] = useState([EMPTY_BROKER]);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState('idle'); // idle | saving | error

  const isDirty = useMemo(
    () => Object.entries(form).some(([k, v]) => v !== initialForm[k]),
    [form]
  );

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const withFormat = (key, formatter) => ({
    value: form[key],
    onChange: set(key),
    onFocus: () => setForm((f) => ({ ...f, [key]: toRawNumber(f[key]) })),
    onBlur: () => setForm((f) => ({ ...f, [key]: formatter(f[key]) })),
  });

  const validate = () => {
    const next = {};
    if (!form.customerName.trim()) next.customerName = 'Customer name is required.';
    if (!form.loanAmount.trim()) next.loanAmount = 'Loan amount is required.';
    else if (Number.isNaN(Number(toRawNumber(form.loanAmount))))
      next.loanAmount = 'Enter a valid amount.';
    if (!form.productType) next.productType = 'Select a product type.';
    if (!form.bank.trim()) next.bank = 'Bank is required.';
    if (!form.bankCommission.trim()) next.bankCommission = 'Bank commission is required.';
    if (!form.referralFee.trim()) next.referralFee = 'Referral fee is required.';
    if (!form.creditExecutive.trim()) next.creditExecutive = 'Credit executive is required.';
    if (!form.bankExecutive.trim()) next.bankExecutive = 'Bank executive name is required.';
    if (!form.notes.trim()) next.notes = 'Add a note describing this loan.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitState('saving');
    try {
      const result = await submitLoan({ ...form, brokers });
      navigate(`/rms/loans/${result.caseId}`);
    } catch {
      setSubmitState('error');
    }
  };

  const addBroker = () => setBrokers((b) => [...b, EMPTY_BROKER]);

  return (
    <div>
      <div className="-mx-4 -mt-6 lg:-mx-8 lg:-mt-8 px-4 pt-6 lg:px-8 lg:pt-8 pb-5 bg-brand-50/60 mb-6">
        <Breadcrumb
          items={[
            { label: 'RMS', to: '/rms/dashboard' },
            { label: 'Loan', to: '/rms/loans' },
            { label: 'Add New Loan' },
          ]}
        />

        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold text-ink-900">Loans</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => (isDirty ? setForm(initialForm) : navigate('/rms/loans'))}
              className="rounded-lg border border-ink-300/30 bg-white px-4 py-2 text-sm text-ink-700 hover:bg-ink-900/5"
            >
              {isDirty ? 'Cancel' : 'Save as Draft'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitState === 'saving'}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
            >
              {submitState === 'saving' && <Loader2 size={14} className="animate-spin" />}
              Add Loan
            </button>
          </div>
        </div>
      </div>

      {submitState === 'error' && (
        <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          <AlertCircle size={16} />
          Something went wrong saving this loan. Please check the highlighted fields and try again.
        </div>
      )}

      <div className="bg-white border border-ink-300/20 rounded-xl shadow-card divide-y divide-ink-300/15">
        {/* Customer Information */}
        <FormSection title="Customer Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Customer Name" required error={errors.customerName}>
              <input
                value={form.customerName}
                onChange={set('customerName')}
                placeholder="Enter Customer name"
                className={inputClass(errors.customerName)}
              />
            </Field>
            <Field label="Email">
              <div className="relative">
                <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
                <input
                  value={form.email}
                  onChange={set('email')}
                  placeholder="billing@untitledui.com"
                  className={`${inputClass(false)} pl-8`}
                />
              </div>
            </Field>
            <Field label="Phone Number">
              <input value={form.phone} onChange={set('phone')} className={inputClass(false)} />
            </Field>
          </div>
        </FormSection>

        {/* Loan Details */}
        <FormSection title="Loan Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Loan Amount" required error={errors.loanAmount}>
              <input
                {...withFormat('loanAmount', formatCurrencyOnBlur)}
                placeholder="480000"
                inputMode="numeric"
                className={inputClass(errors.loanAmount)}
              />
            </Field>
            <Field label="Product Type" required error={errors.productType} hint>
              <div className="relative">
                <select
                  value={form.productType}
                  onChange={set('productType')}
                  className={selectClass(errors.productType)}
                >
                  <option value="" disabled>
                    Home Loan
                  </option>
                  <option>Home Loan</option>
                  <option>Personal Loan</option>
                  <option>Business Loan</option>
                  <option>Loan Against Property</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
              </div>
            </Field>
            <Field label="Bank" required error={errors.bank}>
              <input value={form.bank} onChange={set('bank')} className={inputClass(errors.bank)} />
            </Field>
            <Field label="Stage" required>
              <div className="relative">
                <select value={form.stage} onChange={set('stage')} className={selectClass(false)}>
                  <option>Lead</option>
                  <option>Documentation</option>
                  <option>Bank Review</option>
                  <option>Sanctioned</option>
                  <option>Disbursed</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
              </div>
            </Field>
            <Field label="Status" required>
              <div className="relative">
                <select value={form.status} onChange={set('status')} className={selectClass(false)}>
                  <option>Active</option>
                  <option>On Hold</option>
                  <option>Closed</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
              </div>
            </Field>
            <Field label="Priority">
              <div className="relative">
                <select value={form.priority} onChange={set('priority')} className={selectClass(false)}>
                  <option>Normal</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
                <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
              </div>
            </Field>
          </div>
        </FormSection>

        {/* Commission & Executive Details */}
        <FormSection title="Commission & Executive Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
            <Field label="Bank Commission %" required error={errors.bankCommission}>
              <input
                {...withFormat('bankCommission', formatPercentOnBlur)}
                placeholder="0.5500"
                className={inputClass(errors.bankCommission)}
              />
            </Field>
            <Field label="Referral Fee" required error={errors.referralFee}>
              <input
                {...withFormat('referralFee', formatPercentOnBlur)}
                placeholder="0.5500"
                className={inputClass(errors.referralFee)}
              />
            </Field>
            <Field label="Credit Executive Details" required error={errors.creditExecutive}>
              <input
                value={form.creditExecutive}
                onChange={set('creditExecutive')}
                placeholder="Amit Sharma"
                className={inputClass(errors.creditExecutive)}
              />
            </Field>
            <Field label="Bank Executive Name" required error={errors.bankExecutive}>
              <input
                value={form.bankExecutive}
                onChange={set('bankExecutive')}
                placeholder="Amit Sharma"
                className={inputClass(errors.bankExecutive)}
              />
            </Field>
          </div>
        </FormSection>

        {/* Broker Information */}
        <FormSection title="Broker Information">
          <div className="space-y-2.5">
            {brokers.map((b, i) => (
              <div key={i} className="bg-ink-900/[0.025] rounded-lg p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
                <Field label="Broker Name" required>
                  <input placeholder="Enter Broker Name" className={inputClass(false)} defaultValue={b.name} />
                </Field>
                <Field label="Broker Type" required>
                  <div className="relative">
                    <select defaultValue={b.type} className={selectClass(false)}>
                      <option>Direct</option>
                      <option>Aggregator</option>
                      <option>Connector</option>
                      <option>Sub-connector</option>
                    </select>
                    <ChevronDown size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-500 pointer-events-none" />
                  </div>
                </Field>
                <Field label="Broker Code" required>
                  <input placeholder="CON-001" className={inputClass(false)} defaultValue={b.code} />
                </Field>
                <Field label="Commission %" required>
                  <input placeholder="0.2750" className={inputClass(false)} defaultValue={b.commission} />
                </Field>
              </div>
            ))}
            <button
              onClick={addBroker}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
            >
              <Plus size={15} />
              Add another
            </button>
          </div>
        </FormSection>

        {/* Additional Information */}
        <FormSection title="Additional Information">
          <Field label="Notes" required error={errors.notes} hint>
            <textarea
              value={form.notes}
              onChange={set('notes')}
              rows={4}
              placeholder="Add any additional notes or comments"
              className={`${inputClass(errors.notes)} resize-none`}
            />
          </Field>
        </FormSection>
      </div>
    </div>
  );
}