import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { AlertCircle, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ReplacementRequestScreen: React.FC = () => {
  const { currentPatient, requestReplacement, goBack } = useApp();

  const [reason, setReason] = useState('Illness');
  const [date, setDate] = useState('2026-10-03');
  const [details, setDetails] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const reasons = [
    'Illness',
    'Personal Emergency',
    'Transportation Issue',
    'Patient Situation',
    'Other',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestReplacement(reason, details || 'Caregiver requested advance coverage due to unavoidable reasons.');
    setIsSubmitted(true);
    setTimeout(() => {
      goBack();
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Request Shift Replacement" />

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Notice on replacement policies */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Replacement Protocol Guidelines</span>
          </div>
          <p className="leading-relaxed">
            Please submit shift replacement requests at least 4 hours before shift start when possible so our care coordination team can allocate qualified backup staff.
          </p>
        </div>

        {/* Reason Select */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Primary Reason
          </label>
          <div className="grid grid-cols-2 gap-2">
            {reasons.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setReason(r)}
                className={`py-2 px-2.5 text-xs font-medium rounded-lg border text-left transition-colors truncate ${
                  reason === r
                    ? 'bg-[#168C83] text-white border-[#168C83]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Assignment & Date Context */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
          <div>
            <label className="block text-slate-500 mb-1">Affected Patient & Shift</label>
            <input
              type="text"
              readOnly
              value={`${currentPatient?.name || 'Lakshmi Devi'} · 8:00 AM – 4:00 PM`}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-1">Shift Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-800"
            />
          </div>
        </div>

        {/* Details Text Area */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Additional Information for Coordinator
          </label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={3}
            placeholder="Provide context to help find a substitute caregiver..."
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] text-slate-800"
          />
        </div>

        <div className="pt-2 pb-6">
          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${
              isSubmitted
                ? 'bg-emerald-600 text-white'
                : 'bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white'
            }`}
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Replacement Request Submitted</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Replacement Request</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
