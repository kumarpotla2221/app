import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export type BadgeStatus =
  | 'verified'
  | 'pending'
  | 'submitted'
  | 'rejected'
  | 'in_progress'
  | 'completed'
  | 'upcoming'
  | 'active'
  | 'paid'
  | 'skipped'
  | 'not_required'
  | 'needs_support';

interface StatusBadgeProps {
  status: BadgeStatus;
  text?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, text, size = 'sm' }) => {
  const getBadgeConfig = () => {
    switch (status) {
      case 'verified':
      case 'completed':
      case 'paid':
        return {
          icon: CheckCircle2,
          defaultText: status === 'verified' ? 'Verified' : status === 'paid' ? 'Paid' : 'Completed',
          className: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        };
      case 'in_progress':
      case 'active':
        return {
          icon: Clock,
          defaultText: 'Active',
          className: 'bg-teal-50 text-[#168C83] border-teal-200',
        };
      case 'submitted':
      case 'upcoming':
        return {
          icon: Clock,
          defaultText: status === 'submitted' ? 'Submitted' : 'Upcoming',
          className: 'bg-sky-50 text-sky-800 border-sky-200',
        };
      case 'pending':
        return {
          icon: AlertTriangle,
          defaultText: 'Pending',
          className: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'skipped':
        return {
          icon: Clock,
          defaultText: 'Skipped',
          className: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case 'not_required':
        return {
          icon: CheckCircle2,
          defaultText: 'Not Required',
          className: 'bg-slate-100 text-slate-700 border-slate-200',
        };
      case 'needs_support':
      case 'rejected':
        return {
          icon: XCircle,
          defaultText: status === 'needs_support' ? 'Needs Support' : 'Rejected',
          className: 'bg-rose-50 text-rose-800 border-rose-200',
        };
      default:
        return {
          icon: CheckCircle2,
          defaultText: status,
          className: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded border ${config.className} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span>{text || config.defaultText}</span>
    </span>
  );
};
