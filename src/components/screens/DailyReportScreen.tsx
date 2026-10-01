import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { CheckCircle2, Clock, FileCheck2, User, AlertCircle, Send, X } from 'lucide-react';

export const DailyReportScreen: React.FC = () => {
  const { 
    currentPatient, 
    caregiver, 
    tasks, 
    vitals, 
    observations, 
    familyUpdates, 
    submitDailyReport, 
    t 
  } = useApp();

  const [notes, setNotes] = useState('Patient had a calm and restful day. Completed all scheduled morning hygiene and meals. Vital signs within doctor-approved limits.');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const pendingTasks = tasks.filter((t) => t.status !== 'completed');

  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    setIsSubmitted(true);
    submitDailyReport(notes);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('dailyCareReport')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Report Header Metadata */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono text-slate-400">SHIFT RECORD</span>
              <h2 className="text-base font-bold text-[#17324D] mt-0.5">
                {currentPatient?.name || 'Lakshmi Devi'}
              </h2>
            </div>
            <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
              Shift Day Log
            </span>
          </div>

          <div className="pt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div>
              <span className="text-slate-400">Caregiver:</span>
              <p className="font-semibold text-slate-800">{caregiver.name}</p>
            </div>
            <div>
              <span className="text-slate-400">Date:</span>
              <p className="font-semibold text-slate-800">Tuesday, Oct 1, 2026</p>
            </div>
            <div>
              <span className="text-slate-400">Scheduled:</span>
              <p className="font-semibold text-slate-800">8:00 AM – 4:00 PM (8h)</p>
            </div>
            <div>
              <span className="text-slate-400">Location:</span>
              <p className="font-semibold text-slate-800">Tilak Road, Rajahmundry</p>
            </div>
          </div>
        </div>

        {/* Completed Activities Summary */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Completed Activities ({completedTasks.length})
            </h3>
            <span className="text-xs font-bold text-emerald-700">✓ Done</span>
          </div>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {completedTasks.map((t) => (
              <li key={t.id} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="truncate">{t.title}</span>
                <span className="text-slate-400 text-[11px] ml-auto">{t.scheduledTime}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pending or Handover Activities */}
        {pendingTasks.length > 0 && (
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Pending / Afternoon Handover ({pendingTasks.length})
              </h3>
              <span className="text-xs text-amber-700 font-semibold">○ Scheduled</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {pendingTasks.slice(0, 4).map((t) => (
                <li key={t.id} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full border border-slate-400 shrink-0" />
                  <span className="truncate">{t.title}</span>
                  <span className="text-slate-400 text-[11px] ml-auto">{t.scheduledTime}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Vital Readings Summary */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Vital Readings Logged
          </h3>
          {vitals.length > 0 ? (
            <div className="p-3 bg-slate-50 rounded-lg text-xs font-mono font-medium text-slate-800 space-y-1">
              <div>BP: {vitals[0].bloodPressureSys}/{vitals[0].bloodPressureDia} mmHg · Pulse: {vitals[0].pulseBpm} bpm</div>
              <div>Temp: {vitals[0].temperatureF}°F · SpO2: {vitals[0].oxygenSaturationSpO2}%</div>
              <div className="text-[11px] font-sans text-slate-500 font-normal">Recorded by {vitals[0].recordedBy}</div>
            </div>
          ) : (
            <p className="text-xs text-slate-500">No vitals recorded for this shift yet.</p>
          )}
        </div>

        {/* Patient Condition & Observations */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Patient Condition Check
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-700">
            <div className="p-2 bg-slate-50 rounded">
              <span className="text-slate-400 block text-[10px]">General Mood:</span>
              <strong className="text-emerald-700">Good & Responsive</strong>
            </div>
            <div className="p-2 bg-slate-50 rounded">
              <span className="text-slate-400 block text-[10px]">Mobility:</span>
              <strong className="text-slate-800">Normal with Walker</strong>
            </div>
          </div>
        </div>

        {/* Caregiver Notes Text Area */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Caregiver Shift Summary & Family Handover Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] text-slate-800 leading-relaxed"
          />
        </div>

        <div className="pt-2 pb-6">
          <button
            onClick={() => setShowConfirmModal(true)}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
            <span>{t('submitReport')}</span>
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full border border-slate-200 shadow-xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-[#168C83] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17324D]">
                  {t('confirmSubmit')}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  This report will be archived into the patient's CareConnect permanent record and sent to authorized family contact Priya Kumar.
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 h-10 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Review Again
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 h-10 bg-[#168C83] hover:bg-[#12726b] text-white rounded-lg text-xs font-semibold"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
