import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { CustomerBottomNav } from '../../common/CustomerBottomNav';
import { StatusBadge } from '../../common/StatusBadge';
import { Clock, Calendar, ArrowRight, Download, Plus, CheckCircle2 } from 'lucide-react';
import { HireBooking } from '../../../types';

export const CustomerBookingsListScreen: React.FC = () => {
  const { hireBookings, setActiveBookingId, setCustomerTab, showToast } = useApp();

  const handleOpenBooking = (b: HireBooking) => {
    setActiveBookingId(b.id);
    setCustomerTab('active_care');
  };

  const handleDownloadInvoice = (b: HireBooking, e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`GST Tax Invoice downloaded for ${b.bookingRef} (PDF)`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        title="My Home Care Bookings"
        rightAction={
          <button
            onClick={() => setCustomerTab('hire')}
            className="text-xs font-semibold text-[#168C83] hover:underline flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Hire Care</span>
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {hireBookings.map((b) => (
          <div
            key={b.id}
            onClick={() => handleOpenBooking(b)}
            className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase">
                  REF: {b.bookingRef}
                </span>
                <h3 className="text-sm font-bold text-[#17324D] mt-0.5">
                  {b.patientName} ({b.patientAge} yrs)
                </h3>
                <p className="text-xs text-[#168C83] font-medium">{b.serviceTitle}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Caregiver: {b.caregiverName} ({b.caregiverRole})</p>
              </div>

              <StatusBadge
                status={b.status === 'active_today' ? 'in_progress' : b.status === 'confirmed' ? 'upcoming' : 'completed'}
                text={b.status === 'active_today' ? 'Care in Progress' : b.status === 'confirmed' ? 'Confirmed' : 'Completed'}
              />
            </div>

            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span>{b.startDate}</span>
                <span>·</span>
                <span className="font-mono">{b.durationDays} Days</span>
              </div>

              <span className="font-bold font-mono text-slate-900 text-sm">
                ₹{b.totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={(e) => handleDownloadInvoice(b, e)}
                className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>GST Receipt</span>
              </button>

              <span className="text-xs font-semibold text-[#168C83] flex items-center gap-0.5">
                <span>{b.status === 'active_today' ? 'Track Live Stream' : 'View Summary'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <CustomerBottomNav />
    </div>
  );
};
