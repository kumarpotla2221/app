import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { Check, X, Clock, MapPin, IndianRupee, ShieldCheck, AlertCircle } from 'lucide-react';

export const AssignmentRequestScreen: React.FC = () => {
  const { acceptAssignment, declineAssignment, goBack } = useApp();
  const [showDeclineReason, setShowDeclineReason] = useState(false);
  const [declineReason, setDeclineReason] = useState('Personal schedule conflict');

  const reasons = [
    'Personal schedule conflict',
    'Travel distance too far',
    'Health / personal leave',
    'Care requirements out of scope',
    'Other reason',
  ];

  const handleAccept = () => {
    acceptAssignment('asg-upcoming-03');
  };

  const handleDeclineSubmit = () => {
    declineAssignment('asg-upcoming-03', declineReason);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="New Care Assignment" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Assignment Hero Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar type="elderly_female" name="Lakshmi Devi" size="lg" />
              <div>
                <span className="text-[11px] font-mono font-semibold text-[#168C83] uppercase">
                  OFFERED TO YOU
                </span>
                <h2 className="text-lg font-bold text-[#17324D] mt-0.5">
                  Lakshmi Devi
                </h2>
                <p className="text-xs text-slate-500">
                  72 years · Elderly Care
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-medium">Est. Payout</span>
              <span className="text-base font-bold font-mono text-emerald-700">
                ₹1,800
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Oct 3 · 8:00 AM – 4:00 PM</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>Tilak Road, Rajahmundry (4.2 km)</span>
            </div>
          </div>
        </div>

        {/* Care Requirements List */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Care Requirements
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Mobility assistance (indoor walker transfers)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Meal support (diabetic breakfast and lunch)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Companionship, newspaper reading & hydration</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#168C83]" />
              <span>Medication intake reminders (prescribed oral pills)</span>
            </li>
          </ul>
        </div>

        {/* Decline Reason Drawer if opened */}
        {showDeclineReason ? (
          <div className="bg-white p-4 rounded-xl border border-rose-200 space-y-3">
            <h4 className="text-xs font-semibold text-slate-800">
              Please specify reason for declining:
            </h4>
            <div className="space-y-1.5">
              {reasons.map((r) => (
                <label key={r} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="radio"
                    name="decline"
                    checked={declineReason === r}
                    onChange={() => setDeclineReason(r)}
                    className="text-[#168C83] focus:ring-[#168C83]"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowDeclineReason(false)}
                className="flex-1 h-9 border border-slate-200 text-xs font-medium rounded-lg"
              >
                Back
              </button>
              <button
                onClick={handleDeclineSubmit}
                className="flex-1 h-9 bg-rose-800 hover:bg-rose-900 text-white text-xs font-medium rounded-lg"
              >
                Confirm Decline
              </button>
            </div>
          </div>
        ) : null}

        {/* Assignment Matching Guarantee */}
        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Assignments are matched based on your active schedule and verified elder-care training credentials. Please respond within 2 hours.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      {!showDeclineReason && (
        <div className="p-4 bg-white border-t border-slate-200 grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowDeclineReason(true)}
            className="h-12 border border-slate-300 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <X className="w-4 h-4 text-slate-500" />
            <span>Decline</span>
          </button>

          <button
            onClick={handleAccept}
            className="h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Accept Assignment</span>
          </button>
        </div>
      )}
    </div>
  );
};
