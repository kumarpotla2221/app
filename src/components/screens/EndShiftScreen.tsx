import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { CheckCircle2, Clock, FileCheck, ShieldCheck, Heart, Send } from 'lucide-react';

export const EndShiftScreen: React.FC = () => {
  const { 
    currentPatient, 
    activeShift, 
    tasks, 
    vitals, 
    observations, 
    familyUpdates, 
    endCareShift, 
    t 
  } = useApp();

  const [handoverNote, setHandoverNote] = useState('All morning tasks and lunch assistance finished. Patient resting safely. Handover given to daughter Priya.');
  const [isCompleted, setIsCompleted] = useState(false);

  const completedTasks = tasks.filter((t) => t.status === 'completed');

  const handleFinish = () => {
    setIsCompleted(true);
    setTimeout(() => {
      endCareShift();
    }, 1400);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Complete Shift Handover" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Patient Summary Header */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center gap-3">
            <Avatar type="elderly_female" name={currentPatient?.name || 'Lakshmi Devi'} size="md" />
            <div>
              <h2 className="text-base font-bold text-[#17324D]">
                {currentPatient?.name || 'Lakshmi Devi'}
              </h2>
              <p className="text-xs text-slate-500">Elderly Care · Tilak Road, Rajahmundry</p>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block text-[10px]">Start Time</span>
              <strong className="text-slate-800 font-mono">{activeShift?.startedAt || '8:03 AM'}</strong>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block text-[10px]">End Time</span>
              <strong className="text-slate-800 font-mono">Current</strong>
            </div>
            <div className="p-2 bg-teal-50 rounded-lg">
              <span className="text-[#168C83] block text-[10px] font-semibold">Total Duration</span>
              <strong className="text-[#168C83] font-mono">08h 00m</strong>
            </div>
          </div>
        </div>

        {/* Shift Activities Checklist Summary */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Shift Activities Recap
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">Care Activities Completed:</span>
              <strong className="text-emerald-700 font-bold">{completedTasks.length} of {tasks.length} tasks</strong>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">Vital Signs Measurements:</span>
              <strong className="text-slate-800 font-mono">{vitals.length} recorded</strong>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">Condition Checks / Notes:</span>
              <strong className="text-slate-800 font-mono">{observations.length} logged</strong>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <span className="text-slate-600">Family Updates Sent:</span>
              <strong className="text-slate-800 font-mono">{familyUpdates.length} sent</strong>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-slate-600">Incidents or Fall Reports:</span>
              <strong className="text-slate-800">None reported</strong>
            </div>
          </div>
        </div>

        {/* Family Handover Note */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Final Handover Note & Departure Acknowledgement
          </label>
          <textarea
            value={handoverNote}
            onChange={(e) => setHandoverNote(e.target.value)}
            rows={3}
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] text-slate-800 leading-relaxed"
          />
        </div>

        <div className="pt-2 pb-6">
          <button
            onClick={handleFinish}
            disabled={isCompleted}
            className={`w-full h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs ${
              isCompleted
                ? 'bg-emerald-600 text-white'
                : 'bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Shift Completed Successfully</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Complete Care Shift</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
