// Mock data + a fake async "API" layer. In production these calls would hit
// the FinBowl backend; the shape below mirrors what that response would look
// like so swapping in `fetch()` later is a drop-in change.

export const STATS = [
  { label: 'Total Disbursements', value: '8' },
  { label: 'Total Disbursed Amount', value: '₹3,62,50,000' },
  { label: 'Submitted', value: '12' },
  { label: 'Verified', value: '1' },
  { label: 'Processed', value: '5' },
  { label: 'Audited', value: '12' },
];

export const DISBURSEMENTS = [
  { id: 1, date: '30/04/2024', loanId: 'LN002-24-1001', status: 'Draft', applicant: 'Arjun Mehta', bank: 'HDFC Bank', sanctioned: 7500, verified: '₹7,00,000.00', referral: '0.1500%', executive: 'Arjun Mehta' },
  { id: 2, date: '30/09/2024', loanId: 'LN003-24-1002', status: 'Submitted', applicant: 'Mohit Agarwal', bank: 'ICICI Bank', sanctioned: 12000, verified: '--', referral: '0.2500%', executive: 'Mohit Agarwal' },
  { id: 3, date: '12/05/2027', loanId: 'LN004-24-1003', status: 'Submitted', applicant: 'Priya Singh', bank: 'Axis Bank', sanctioned: 15000, verified: '--', referral: '0.3500%', executive: 'Priya Singh' },
  { id: 4, date: '15/01/2024', loanId: 'LN005-24-1004', status: 'Submitted', applicant: 'Simran Anand', bank: 'State Bank of India', sanctioned: 22000, verified: '--', referral: '0.4500%', executive: 'Simran Anand' },
  { id: 5, date: '20/02/2024', loanId: 'LN006-24-1005', status: 'Submitted', applicant: 'Ravi Sharma', bank: 'Kotak Mahindra Bank', sanctioned: 30000, verified: '--', referral: '0.5500%', executive: 'Ravi Sharma' },
  { id: 6, date: '20/02/2024', loanId: 'LN007-24-1006', status: 'Submitted', applicant: 'Sneha Joshi', bank: 'Punjab National Bank', sanctioned: 40000, verified: '--', referral: '0.6500%', executive: 'Sneha Joshi' },
  { id: 7, date: '20/02/2024', loanId: 'LN001-24-1004', status: 'Verified', applicant: 'Vikram Desai', bank: 'Canara Bank', sanctioned: 55000, verified: '₹15,78,901.00', referral: '0.7500%', executive: 'Vikram Desai' },
  { id: 8, date: '20/02/2024', loanId: 'LN008-24-1007', status: 'Audited', applicant: 'Anjali Rao', bank: 'Bank of Baroda', sanctioned: 75000, verified: '₹16,89,012.00', referral: '0.8500%', executive: 'Anjali Rao' },
  { id: 9, date: '20/02/2024', loanId: 'LN009-24-1008', status: 'Audited', applicant: 'Karan Iyer', bank: 'Union Bank of India', sanctioned: 90000, verified: '₹17,00,123.00', referral: '0.9500%', executive: 'Karan Iyer' },
  { id: 10, date: '20/02/2024', loanId: 'LN010-24-1009', status: 'Verified', applicant: 'Neha Gupta', bank: 'IDFC FIRST Bank', sanctioned: 130000, verified: '₹18,11,234.00', referral: '1.1500%', executive: 'Neha Gupta' },
];

export const LOAN_DETAIL = {
  caseId: 'LN-2026-04892',
  customerName: 'Rahul Verma',
  loanType: 'Home Loan',
  status: 'Reconciled',
  totalSanctioned: '₹4,80,000.00',
  bankCommission: '0.75%',
  referralFee: '0.50%',
  netReceivable: '₹3,823.00',
  customer: { name: 'Rahul Verma', email: 'rahul.verma@gmail.com', phone: '+91 9876543210' },
  loanInfo: {
    sanctioned: '₹4,80,000.00',
    disbursed: '₹0.00 (awaiting approval)',
    pending: '₹4,80,000.00',
    caseId: 'LN-2026-04892',
    type: 'Home Loan',
    bank: 'HDFC Bank',
    status: 'Reconciled',
    month: 'May 2026',
  },
  brokers: [
    { name: 'Karthik Agencies', type: 'Aggregator', code: 'CON-001', pct: '0.2750%', amt: '₹1,320.00' },
    { name: 'XYZ Associates', type: 'Connector', code: 'CON-001', pct: '0.2750%', amt: '₹1,320.00' },
    { name: 'Prime Services', type: 'Sub-connector', code: 'CON-001', pct: '0.2750%', amt: '₹1,320.00' },
  ],
  commission: {
    creditExecutive: 'Amit Sharma',
    bankExecutive: 'Priya Nair',
    bankCommission: '0.7500%',
    referralFee: '0.5000%',
    billCommAmt: '₹3,600.00',
    gstAmt: '₹648.00',
    invoiceAmt: '₹4,248.00',
    tdsAmt: '₹425.00',
    netReceivable: '₹3,823.00',
  },
  notes: 'Customer applied for a home loan for property purchase in Chennai. Documents verified successfully and income proof has been submitted. Awaiting final bank approval and disbursement confirmation.',
  payments: {
    surplus: '₹5,000 (Surplus)',
    receiptAmt: '₹1.3L',
    receiptDate: '2024-04-15',
    advancePayment: '₹50,000',
    paymentDate: '2024-04-01',
    voucherNumber: 'VCH-2024-001',
  },
  documents: [
    { name: 'Invoices.pdf', size: '900 KB' },
    { name: 'Invoices.pdf', size: '900 KB' },
    { name: 'Invoices.pdf', size: '900 KB' },
    { name: 'Invoices.pdf', size: '900 KB' },
  ],
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Simulated network fetch for the disbursement table.
 * Set `simulateError` or `simulateEmpty` to exercise those states.
 */
export async function fetchDisbursements({ simulateError = false, simulateEmpty = false } = {}) {
  await delay(650);
  if (simulateError) throw new Error('Could not reach the RMS service.');
  if (simulateEmpty) return [];
  return DISBURSEMENTS;
}

export async function fetchLoanDetail() {
  await delay(500);
  return LOAN_DETAIL;
}

export async function submitLoan(payload) {
  await delay(700);
  if (!payload.customerName || !payload.loanAmount) {
    throw new Error('Customer name and loan amount are required.');
  }
  return { ...payload, caseId: `LN-2026-${Math.floor(1000 + Math.random() * 8999)}` };
}
