import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items }) {
  return (
    <div className="flex items-center gap-1.5 text-sm text-ink-500 mb-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={13} className="text-ink-300" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-brand-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className={i === items.length - 1 ? 'text-brand-600 font-medium' : ''}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}