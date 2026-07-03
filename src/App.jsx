import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Disbursement from './pages/Disbursement';
import Loans from './pages/Loans';
import LoanForm from './pages/LoanForm';
import LoanDetail from './pages/LoanDetail';
import Placeholder from './pages/Placeholder';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/rms/disbursement" replace />} />
          <Route path="/rms/dashboard" element={<Dashboard />} />
          <Route path="/rms/disbursement" element={<Disbursement />} />
          <Route path="/rms/loans" element={<Loans />} />
          <Route path="/rms/loans/new" element={<LoanForm />} />
          <Route path="/rms/loans/:caseId" element={<LoanDetail />} />
          <Route path="/rms/invoices" element={<Placeholder title="Invoices" />} />
          <Route path="/rms/bills" element={<Placeholder title="Bills" />} />
          <Route path="/rms/reports" element={<Placeholder title="RMS Reports" />} />
          <Route path="/finance" element={<Placeholder title="Finance" />} />
          <Route path="/sales-crm" element={<Placeholder title="Sales CRM" />} />
          <Route path="/compliance" element={<Placeholder title="Compliance" />} />
          <Route path="/vendors" element={<Placeholder title="Vendors" />} />
          <Route path="/ai-suite" element={<Placeholder title="AI Suite" />} />
          <Route path="/reports" element={<Placeholder title="Reports" />} />
          <Route path="*" element={<Navigate to="/rms/disbursement" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
