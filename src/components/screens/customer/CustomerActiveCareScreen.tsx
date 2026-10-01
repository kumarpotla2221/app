import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Header } from '../../common/Header';
import { CustomerBottomNav } from '../../common/CustomerBottomNav';
import { Avatar } from '../../common/Avatar';
import { 
  Activity, 
  Phone, 
  MessageSquare, 
  Clock, 
  Heart, 
  Thermometer, 
  CheckCircle2, 
  ShieldCheck, 
  FileText,
  AlertCircle
} from 'lucide-react';

export const CustomerActiveCareScreen: React.FC = () => {
  const { activeBooking, showToast, navigateTo } = useApp();

  const booking = activeBooking || {
    patientName: 'Lakshmi Devi',
    patientAge: 72,
    serviceTitle: 'Elderly Care & Senior Assistance',
    caregiverName: 'Anjali Kumar',
    caregiverRole: 'Verified Patient Care Assistant',
    caregiverPhone: '+91 98480 22341',
    locality: 'Tilak Road, Rajahmundry',
    latestVitals: {
      bp: '124 / 82 mmHg',
      pulse: 76,
      temp: 98.4,
      time: '10:15 AM Today',
    },
    liveUpdates: [
      { time: '8:03 AM', text: 'Caregiver Anjali arrived at Tilak Road and started care shift.', category: 'Arrival', isCompleted: true },
      { time: '8:42 AM', text: 'Morning personal hygiene and oral brushing completed.', category: 'Hygiene', isCompleted: true },
      { time: '9:25 AM', text: 'Served diabetic breakfast (idlis with mild sambar). Hydration given.', category: 'Meals', isCompleted: true },
      { time: '9:35 AM', text: 'Morning prescribed oral medication reminded and taken with full glass of water.', category: 'Medication', isCompleted: true },
      { time: '10:15 AM', text: 'Vital signs checked: BP 124/82 mmHg, Pulse 76 bpm (Normal range).', category: 'Vitals', isCompleted: true },
      { time: '12:30 PM', text: 'Scheduled: Lunch assistance & comfort settling.', category: 'Upcoming', isCompleted: false },
    ]
  };

  const handleCallCaregiver = () => {
    showToast(`Calling Caregiver Anjali Kumar: ${booking.caregiverPhone}`);
  };

  const handleWhatsAppCaregiver = () => {
    showToast('Opening WhatsApp with Caregiver Anjali Kumar');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        title="Live Home Care Stream"
        rightAction={
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-800">Shift Active</span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Active Caregiver on Duty Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <Avatar type="caregiver" name={booking.caregiverName} size="md" isVerified />
              <div>
                <span className="text-[10px] font-bold text-[#168C83] uppercase tracking-wider block">
                  Caregiver On-Duty
                </span>
                <h3 className="text-base font-bold text-[#17324D]">{booking.caregiverName}</h3>
                <p className="text-xs text-slate-500">{booking.caregiverRole}</p>
                <p className="text-[11px] text-slate-600 mt-1">With {booking.patientName} at {booking.locality}</p>
              </div>
            </div>

            <span className="text-xs font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              8:00 AM – 4:00 PM
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            <button
              onClick={handleCallCaregiver}
              className="h-10 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Caregiver</span>
            </button>

            <button
              onClick={handleWhatsAppCaregiver}
              className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#168C83]" />
              <span>WhatsApp Message</span>
            </button>
          </div>
        </div>

        {/* Real-time Vital Signs Stream Card */}
        {booking.latestVitals && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500" />
                <span>Today's Recorded Vitals</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {booking.latestVitals.time}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Blood Pressure</span>
                <strong className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                  {booking.latestVitals.bp}
                </strong>
                <span className="text-[10px] text-emerald-700 font-medium">Normal</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Pulse Rate</span>
                <strong className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                  {booking.latestVitals.pulse} bpm
                </strong>
                <span className="text-[10px] text-emerald-700 font-medium">Resting</span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Temperature</span>
                <strong className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                  {booking.latestVitals.temp}°F
                </strong>
                <span className="text-[10px] text-emerald-700 font-medium">Afebrile</span>
              </div>
            </div>
          </div>
        )}

        {/* Live Care Activity Timeline */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Shift Activities & Care Updates
            </h3>
            <span className="text-xs text-slate-400">Updated by Anjali</span>
          </div>

          <div className="space-y-3 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {booking.liveUpdates?.map((upd, idx) => (
              <div key={idx} className="flex items-start gap-3 relative pl-1">
                <span
                  className={`w-3 h-3 rounded-full mt-1 shrink-0 ring-4 ring-white ${
                    upd.isCompleted ? 'bg-[#168C83]' : 'bg-slate-300'
                  }`}
                />
                <div className="flex-1 min-w-0 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-0.5">
                    <span className="font-semibold text-slate-700">{upd.category}</span>
                    <span className="font-mono text-[11px]">{upd.time}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{upd.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 24/7 Clinical Support Banner */}
        <div className="p-3.5 bg-slate-100 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-[#168C83]" />
            <span>CareConnect Clinical Oversight Desk (24/7)</span>
          </div>
          <button
            onClick={() => showToast('Calling CareConnect Clinical Supervisor...')}
            className="text-xs font-bold text-[#168C83] hover:underline"
          >
            Contact
          </button>
        </div>
      </div>

      <CustomerBottomNav />
    </div>
  );
};
