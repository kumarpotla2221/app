import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { StatusBadge } from '../common/StatusBadge';
import { IndianRupee, ArrowUpRight, Clock, Building, ChevronRight } from 'lucide-react';
import { PaymentRecord } from '../../types';

export const EarningsScreen: React.FC = () => {
  const { payments, caregiver, navigateTo, t } = useApp();

  const handleSelectPayment = (payment: PaymentRecord) => {
    navigateTo('payment_details');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        title={t('myEarnings')}
        rightAction={
          <button
            onClick={() => navigateTo('payment_details')}
            className="text-xs font-semibold text-[#168C83] hover:underline"
          >
            Bank Details
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Earnings Metric Cards */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-2xs">
          <div>
            <span className="text-xs text-slate-500 font-medium">{t('thisMonth')} (October 2026)</span>
            <div className="text-3xl font-extrabold text-[#17324D] tracking-tight font-mono mt-1">
              ₹28,450
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/60">
              <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                {t('pending')} Payout
              </span>
              <span className="text-lg font-bold font-mono text-amber-900 mt-0.5 block">
                ₹4,200
              </span>
              <span className="text-[10px] text-amber-700 mt-0.5 block">Under daily audit</span>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200/60">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                {t('paid')} to Bank
              </span>
              <span className="text-lg font-bold font-mono text-emerald-900 mt-0.5 block">
                ₹24,250
              </span>
              <span className="text-[10px] text-emerald-700 mt-0.5 block">Disbursed to SBI</span>
            </div>
          </div>
        </div>

        {/* Bank Account Overview */}
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-800">{caregiver.bankDetails.bankName}</p>
              <p className="text-slate-500 text-[11px]">A/C ending in •••• {caregiver.bankDetails.accountEnding} · {caregiver.bankDetails.ifsc}</p>
            </div>
          </div>
          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200">
            Verified
          </span>
        </div>

        {/* Recent Payments Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              {t('recentPayments')}
            </h3>
            <span className="text-xs text-slate-400">Direct Bank Deposit</span>
          </div>

          {payments.map((p) => (
            <div
              key={p.id}
              onClick={() => handleSelectPayment(p)}
              className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-slate-800">{p.patientName}</h4>
                    <span className="text-xs text-slate-400">· {p.hours}h</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{p.serviceType}</p>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{p.date}</p>
                </div>

                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="text-sm font-bold font-mono text-slate-900">
                    ₹{p.total.toLocaleString()}
                  </span>
                  <StatusBadge status={p.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
