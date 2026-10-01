import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  Clock, 
  Activity, 
  MessageSquare, 
  Headphones, 
  StopCircle, 
  CheckCircle2, 
  FileEdit,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export const ActiveShiftScreen: React.FC = () => {
  const { 
    currentPatient, 
    activeShift, 
    tasks, 
    navigateTo, 
    setSelectedTaskId,
    t 
  } = useApp();

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const nextTask = tasks.find((t) => t.status !== 'completed') || tasks[0];

  const formatElapsed = (totalSec: number) => {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handleOpenNextTask = () => {
    if (nextTask) {
      setSelectedTaskId(nextTask.id);
      navigateTo('task_details');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        showBack
        title="Active Care Shift"
        urgentNotice
        rightAction={
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              {t('careInProgress')}
            </span>
          </div>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Live Elapsed Shift Clock Card */}
        <div className="bg-[#17324D] text-white p-5 rounded-2xl shadow-sm border border-slate-700/60">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-slate-400">Patient Under In-Home Care</p>
              <h2 className="text-xl font-bold text-white mt-0.5">
                {currentPatient?.name || 'Lakshmi Devi'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Tilak Road, Rajahmundry · Elderly Care
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">Started At</span>
              <p className="text-xs font-mono font-semibold text-slate-200">
                {activeShift?.startedAt || '8:03 AM'}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-700/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Elapsed Shift Time</span>
              <div className="text-2xl font-mono font-bold text-emerald-400 mt-0.5">
                {formatElapsed(activeShift?.elapsedSeconds || 9300)}
              </div>
            </div>

            <button
              onClick={() => navigateTo('end_shift')}
              className="h-10 px-3.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <StopCircle className="w-4 h-4 text-rose-400" />
              <span>{t('endShift')}</span>
            </button>
          </div>
        </div>

        {/* Task Progress Counter */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium">Today's Assigned Activities</span>
              <p className="text-sm font-bold text-slate-800 mt-0.5">
                Completed: <span className="text-[#168C83]">{completedCount}</span> / {tasks.length}
              </p>
            </div>

            <button
              onClick={() => navigateTo('care_plan')}
              className="text-xs font-semibold text-[#168C83] hover:underline"
            >
              View Full Plan
            </button>
          </div>

          {/* Next Task Card */}
          {nextTask && (
            <div
              onClick={handleOpenNextTask}
              className="mt-3 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-[10px] font-bold text-[#168C83] uppercase tracking-wide">
                  Upcoming Next Task · {nextTask.scheduledTime}
                </span>
                <h4 className="text-xs font-bold text-slate-800 truncate mt-0.5">
                  {nextTask.title}
                </h4>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">
                  {nextTask.instruction}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          )}
        </div>

        {/* Rapid Field Operations Dock */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider px-1">
            Active Shift Actions
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigateTo('vitals')}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#168C83] flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Record Vitals</p>
                <p className="text-[11px] text-slate-500">BP, Pulse, Temp</p>
              </div>
            </button>

            <button
              onClick={() => navigateTo('condition_check')}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <FileEdit className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Add Notes</p>
                <p className="text-[11px] text-slate-500">Log observations</p>
              </div>
            </button>

            <button
              onClick={() => navigateTo('family_comm')}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Update Family</p>
                <p className="text-[11px] text-slate-500">Notify Priya</p>
              </div>
            </button>

            <button
              onClick={() => navigateTo('support')}
              className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 text-left transition-colors flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Staff Support</p>
                <p className="text-[11px] text-slate-500">24/7 Desk</p>
              </div>
            </button>
          </div>
        </div>

        {/* Emergency Escalation Button */}
        <button
          onClick={() => navigateTo('emergency')}
          className="w-full p-3.5 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#E5484D]" />
            <span className="text-xs font-bold text-rose-900">
              Emergency Escalation Protocol (Call 112)
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-rose-700" />
        </button>
      </div>
    </div>
  );
};
