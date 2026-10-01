import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { Avatar } from '../../common/Avatar';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  FileCheck
} from 'lucide-react';

export const CustomerBookingConfirmationScreen: React.FC = () => {
  const { activeBooking, setCustomerTab, navigateTo, showToast } = useApp();

  const booking = activeBooking || {
    bookingRef: 'CC-BK-9182',
    serviceTitle: 'Elderly Care & Senior Assistance',
    caregiverName: 'Anjali Kumar',
    caregiverRole: 'Verified Patient Care Assistant',
    patientName: 'Lakshmi Devi',
    patientAge: 72,
    locality: 'Tilak Road, Rajahmundry',
    startDate: 'Tomorrow',
    durationDays: 15,
    totalAmount: 27000,
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Header title="Booking Confirmed" />

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Success Icon & Notice */}
        <div className="text-center py-2 space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#E7F5F1] text-[#168C83] mx-auto flex items-center justify-center border border-[#168C83]/20 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="text-lg font-bold text-[#17324D] tracking-tight">
            Caregiver Hired Successfully!
          </h2>
          <p className="text-xs text-slate-500">
            Booking Reference: <strong className="font-mono text-slate-800">{booking.bookingRef}</strong>
          </p>
        </div>

        {/* Assigned Caregiver Card */}
        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-3">
          <span className="text-[10px] font-bold text-[#168C83] uppercase tracking-wider block">
            Assigned Primary Caregiver
          </span>

          <div className="flex items-center gap-3">
            <Avatar type="caregiver" name={booking.caregiverName} size="md" isVerified />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-slate-900">{booking.caregiverName}</h3>
              <p className="text-xs text-[#168C83] font-medium">{booking.caregiverRole}</p>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 mt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#168C83]" />
                <span>Police Clearance & Health Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Details Breakdown */}
        <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
          <div className="flex justify-between">
            <span className="text-slate-400">Patient:</span>
            <strong className="text-slate-800">{booking.patientName} ({booking.patientAge} yrs)</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Care Service:</span>
            <strong className="text-slate-800">{booking.serviceTitle}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Address:</span>
            <strong className="text-slate-800">{booking.locality}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Duration:</span>
            <strong className="text-slate-800 font-mono">{booking.durationDays} Days</strong>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
            <span>Total Amount:</span>
            <span className="text-[#168C83] font-mono text-sm">₹{booking.totalAmount?.toLocaleString()}</span>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
          <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            What Happens Next?
          </h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
              <p className="leading-snug">Our clinical care coordinator will call you within 15 minutes to review special instructions.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
              <p className="leading-snug">Caregiver Anjali will arrive at Tilak Road on {booking.startDate} at 8:00 AM sharp.</p>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
              <p className="leading-snug">You can track live shift activities, meals, and blood pressure vitals directly on this app.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-slate-200 space-y-2">
        <button
          onClick={() => setCustomerTab('active_care')}
          className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <Activity className="w-4 h-4" />
          <span>View Live Care Log & Shift Stream</span>
        </button>

        <button
          onClick={() => setCustomerTab('explore')}
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
