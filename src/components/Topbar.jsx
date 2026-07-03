import { Menu, Bell, Building2, ChevronDown } from 'lucide-react';

export default function Topbar({ onMenuClick, groups = ['Gracia Advisory Group', 'ABC Advisory Group'] }) {
  return (
    <header className="h-16 shrink-0 bg-white border-b border-ink-300/20 flex items-center justify-between px-4 lg:px-6 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-ink-700 hover:text-ink-900 shrink-0"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {groups.map((g) => (
            <button
              key={g}
              className="hidden sm:flex items-center gap-2 rounded-lg border border-ink-300/30 px-3 py-1.5 text-sm text-ink-700 hover:bg-ink-900/5 shrink-0"
            >
              <Building2 size={14} className="text-ink-500" />
              <span className="whitespace-nowrap">{g}</span>
              <ChevronDown size={14} className="text-ink-500" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button className="relative text-ink-700 hover:text-ink-900" aria-label="Notifications">
          <Bell size={19} />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] leading-none rounded-full w-4 h-4 flex items-center justify-center font-medium">
            2
          </span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white text-xs font-semibold">
          VP
        </div>
      </div>
    </header>
  );
}