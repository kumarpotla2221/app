import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { StatusBadge } from '../common/StatusBadge';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  HelpCircle, 
  ShieldAlert, 
  Clock, 
  MessageSquare,
  FileCheck
} from 'lucide-react';
import { TaskStatus } from '../../types';

export const TaskDetailsScreen: React.FC = () => {
  const { tasks, selectedTaskId, updateTaskStatus, goBack } = useApp();

  const task = tasks.find((t) => t.id === selectedTaskId) || tasks[2]; // Default Medication Reminder
  const [note, setNote] = useState(task.note || '');
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>(task.status);

  const handleSave = (statusToSave?: TaskStatus) => {
    const finalStatus = statusToSave || selectedStatus;
    updateTaskStatus(task.id, finalStatus, note);
    goBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Care Task Details" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Task Overview Card */}
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono font-medium text-slate-500 uppercase">
                {task.period} Care Activity
              </span>
              <h2 className="text-base font-bold text-[#17324D] mt-0.5">
                {task.title}
              </h2>
            </div>
            <StatusBadge status={task.status} />
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Scheduled: {task.scheduledTime}</span>
          </div>
        </div>

        {/* Detailed Instructions */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Care Activity Instruction
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            {task.instruction}
          </p>
        </div>

        {/* Safety Boundary for Medication or Clinical Reminders */}
        {task.category === 'medication' && (
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 space-y-2 text-xs text-amber-950">
            <div className="flex items-center gap-2 font-semibold text-amber-900">
              <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Medication Scope & Safety Standard</span>
            </div>
            <p className="leading-relaxed">
              CareConnect attendants only remind and assist patients to take their pre-sorted, physician-prescribed oral medications. Attendants never prescribe, dispense unapproved medicines, or alter prescribed dosage timings without doctor instruction.
            </p>
          </div>
        )}

        {/* Caregiver Observation Note Field */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Activity Notes / Patient Response
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Patient took morning dose with 200ml warm water without nausea..."
            rows={3}
            className="w-full p-3 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-[#168C83] text-slate-800"
          />
        </div>

        {/* Status Actions */}
        <div className="space-y-2 pt-2">
          <button
            onClick={() => handleSave('completed')}
            className="w-full h-11 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Mark as Completed</span>
          </button>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleSave('skipped')}
              className="h-10 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Skipped</span>
            </button>

            <button
              onClick={() => handleSave('not_required')}
              className="h-10 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Not Required</span>
            </button>

            <button
              onClick={() => handleSave('needs_support')}
              className="h-10 bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 text-xs font-medium rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Needs Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
