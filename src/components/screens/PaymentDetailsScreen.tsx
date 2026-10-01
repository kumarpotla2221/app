import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { StatusBadge } from '../common/StatusBadge';
import { IndianRupee, Building, Clock, CheckCircle2, ShieldCheck, Download } from 'lucide-react';

export const PaymentDetailsScreen: React.FC = () => {
  const { caregiver, payments, showToast } = useApp();
  const payment = payments[0]; // Lakshmi Devi payment breakdown

  const handleDownloadSlip = () => {
    showToast('Payment payslip receipt downloaded (PDF)');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Payment Details" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Total Summary Header */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center space-y-1">
          <span className="text-xs text-slate-500 font-medium">Assignment Remuneration</span>
          <div className="text-3xl font-extrabold text-[#17324D] font-mono">
            ₹{payment.total.toLocaleString()}
          </div>
          <div className="pt-2 flex justify-center">
            <StatusBadge status={payment.status} text={payment.status === 'paid' ? 'Paid to Bank' : 'Audit Pending'} />
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Shift Earnings Breakdown
          </h3>

          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Patient Assignment:</span>
              <strong className="text-slate-800">{payment.patientName} ({payment.serviceType})</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Shift Date:</span>
              <strong className="text-slate-800">{payment.date}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Approved Hours:</span>
              <strong className="text-slate-800 font-mono">{payment.hours} Hours</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Base Caregiver Remuneration:</span>
              <strong className="text-slate-800 font-mono">₹{payment.baseEarnings.toLocaleString()}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Travel & Mobility Allowance:</span>
              <strong className="text-slate-800 font-mono">+₹{payment.additionalEarnings.toLocaleString()}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Deductions / Adjustments:</span>
              <strong className="text-slate-800 font-mono">₹{payment.adjustments}</strong>
            </div>

            <div className="flex justify-between pt-1 text-sm font-bold text-slate-900">
              <span>Total Payout:</span>
              <span className="text-emerald-700 font-mono">₹{payment.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Payout Banking Information */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Settlement Bank Account
          </h3>
          <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1 text-slate-700">
            <div className="flex justify-between font-semibold">
              <span>Bank Name:</span>
              <span>{caregiver.bankDetails.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span>Account Number:</span>
              <span className="font-mono">••••••••{caregiver.bankDetails.accountEnding}</span>
            </div>
            <div className="flex justify-between">
              <span>IFSC Code:</span>
              <span className="font-mono">{caregiver.bankDetails.ifsc}</span>
            </div>
          </div>
        </div>

        {/* Payslip Action */}
        <button
          onClick={handleDownloadSlip}
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Download Formal Payslip (PDF)</span>
        </button>
      </div>
    </div>
  );
};
