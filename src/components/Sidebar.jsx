import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wallet,
  Users,
  Landmark,
  ChevronDown,
  ChevronUp,
  Search,
  FileSpreadsheet,
  ClipboardList,
  Receipt,
  FileText,
  BarChart3,
  ShieldCheck,
  Building2,
  Sparkles,
  BookOpen,
  Home,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const RMS_ITEMS = [
  { to: '/rms/dashboard', label: 'Dashboard', icon: LayoutDashboard, key: 'rms-dashboard' },
  { to: '/rms/loans', label: 'Loans', icon: FileSpreadsheet, key: 'rms-loans' },
  { to: '/rms/disbursement', label: 'Disbursement', icon: ClipboardList, key: 'rms-disbursement' },
  { to: '/rms/invoices', label: 'Invoices', icon: Receipt, key: 'rms-invoices' },
  { to: '/rms/bills', label: 'Bills', icon: FileText, key: 'rms-bills' },
  { to: '/rms/reports', label: 'RMS Reports', icon: BarChart3, key: 'rms-reports' },
];

const TOP_LEVEL = [
  { to: '/rms/dashboard', label: 'Dashboard', icon: Home, key: 'top-dashboard' },
  { to: '/finance', label: 'Finance', icon: Wallet, key: 'top-finance' },
  { to: '/sales-crm', label: 'Sales CRM', icon: Users, key: 'top-sales-crm' },
];

const BOTTOM_LEVEL = [
  { to: '/compliance', label: 'Compliance', icon: ShieldCheck, key: 'compliance' },
  { to: '/vendors', label: 'Vendors', icon: Building2, key: 'vendors' },
  { to: '/ai-suite', label: 'AI Suite', icon: Sparkles, key: 'ai-suite' },
  { to: '/reports', label: 'Reports', icon: BookOpen, key: 'reports' },
];

// Routes that more than one nav row points to. When the user clicks one
// of the rows sharing a route, we remember its `key` so only that exact
// row highlights, even though the URL matches both.
const DUPLICATE_ROUTE_KEYS = ['top-dashboard', 'rms-dashboard'];

function NavRow({ to, label, icon: Icon, indent, onNavigate, rowKey, activeKey, onSelect }) {
  const isDuplicateRoute = DUPLICATE_ROUTE_KEYS.includes(rowKey);

  return (
    <NavLink
      to={to}
      onClick={() => {
        if (isDuplicateRoute) onSelect(rowKey);
        onNavigate?.();
      }}
      className={({ isActive }) => {
        // For routes shared by multiple rows, only highlight the row
        // whose key matches the one that was actually clicked.
        const highlighted = isDuplicateRoute
          ? isActive && activeKey === rowKey
          : isActive;

        return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          indent ? 'pl-9' : ''
        } ${
          highlighted
            ? 'bg-sidebar-active text-white font-medium'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`;
      }}
    >
      <Icon size={16} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const [rmsOpen, setRmsOpen] = useState(true);
  // Which duplicate-route row was last clicked. Defaults to the RMS
  // child row so a hard refresh/direct link lands on the more specific one.
  const [activeDuplicateKey, setActiveDuplicateKey] = useState('rms-dashboard');

  // If the user navigates away from the shared route entirely, clear the
  // selection so neither row appears stuck highlighted when they come back
  // via some other path (e.g. browser back button, direct URL entry).
  useEffect(() => {
    if (location.pathname !== '/rms/dashboard') return;
  }, [location.pathname]);

  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-sidebar flex flex-col transform transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-white font-bold text-sm">
              F
            </div>
            <span className="text-white font-semibold text-[15px]">FinBowl</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-white/60 hover:text-white"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2 text-white/50 text-sm">
            <Search size={15} />
            <span>Search</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {TOP_LEVEL.map((item) => (
            <NavRow
              key={item.key}
              to={item.to}
              label={item.label}
              icon={item.icon}
              rowKey={item.key}
              activeKey={activeDuplicateKey}
              onSelect={setActiveDuplicateKey}
              onNavigate={onClose}
            />
          ))}

          <div>
            <button
              onClick={() => setRmsOpen((v) => !v)}
              className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                location.pathname.startsWith('/rms')
                  ? 'text-white font-medium'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-3">
                <Landmark size={16} strokeWidth={2} />
                RMS
              </span>
              {rmsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {rmsOpen && (
              <div className="mt-1 space-y-1">
                {RMS_ITEMS.map((item) => (
                  <NavRow
                    key={item.key}
                    to={item.to}
                    label={item.label}
                    icon={item.icon}
                    indent
                    rowKey={item.key}
                    activeKey={activeDuplicateKey}
                    onSelect={setActiveDuplicateKey}
                    onNavigate={onClose}
                  />
                ))}
              </div>
            )}
          </div>

          {BOTTOM_LEVEL.map((item) => (
            <NavRow
              key={item.key}
              to={item.to}
              label={item.label}
              icon={item.icon}
              rowKey={item.key}
              activeKey={activeDuplicateKey}
              onSelect={setActiveDuplicateKey}
              onNavigate={onClose}
            />
          ))}
        </nav>

        <div className="px-5 py-4 text-white/30 text-xs border-t border-white/5">
          Version 1.0
        </div>
      </aside>
    </>
  );
}