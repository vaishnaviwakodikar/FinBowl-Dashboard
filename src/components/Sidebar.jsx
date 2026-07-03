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
  X,
} from 'lucide-react';
import { useState } from 'react';

const RMS_ITEMS = [
  { to: '/rms/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/rms/loans', label: 'Loans', icon: FileSpreadsheet },
  { to: '/rms/disbursement', label: 'Disbursement', icon: ClipboardList },
  { to: '/rms/invoices', label: 'Invoices', icon: Receipt },
  { to: '/rms/bills', label: 'Bills', icon: FileText },
  { to: '/rms/reports', label: 'RMS Reports', icon: BarChart3 },
];

const TOP_LEVEL = [
  { to: '/finance', label: 'Finance', icon: Wallet },
  { to: '/sales-crm', label: 'Sales CRM', icon: Users },
];

const BOTTOM_LEVEL = [
  { to: '/compliance', label: 'Compliance', icon: ShieldCheck },
  { to: '/vendors', label: 'Vendors', icon: Building2 },
  { to: '/ai-suite', label: 'AI Suite', icon: Sparkles },
  { to: '/reports', label: 'Reports', icon: BookOpen },
];

function NavRow({ to, label, icon: Icon, indent, onNavigate }) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
          indent ? 'pl-9' : ''
        } ${
          isActive
            ? 'bg-sidebar-active text-white font-medium'
            : 'text-white/70 hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <Icon size={16} strokeWidth={2} className="shrink-0" />
      <span className="truncate">{label}</span>
    </NavLink>
  );
}

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const [rmsOpen, setRmsOpen] = useState(true);

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
            <NavRow key={item.to} {...item} onNavigate={onClose} />
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
                  <NavRow key={item.to} {...item} indent onNavigate={onClose} />
                ))}
              </div>
            )}
          </div>

          {BOTTOM_LEVEL.map((item) => (
            <NavRow key={item.to} {...item} onNavigate={onClose} />
          ))}
        </nav>

        <div className="px-5 py-4 text-white/30 text-xs border-t border-white/5">
          Version 1.0
        </div>
      </aside>
    </>
  );
}
