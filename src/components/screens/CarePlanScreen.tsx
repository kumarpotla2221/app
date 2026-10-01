import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronRight, 
  Activity, 
  Heart, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { CareTask, TaskStatus } from '../../types';

export const CarePlanScreen: React.FC = () => {
  const { 
    currentPatient, 
    tasks, 
    updateTaskStatus, 
    navigateTo, 
    setSelectedTaskId, 
    t 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');

  const filteredTasks = tasks.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.period === activeFilter;
  });

  const completedCount = tasks.filter((t) => t.status === 'completed').length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const handleOpenTask = (task: CareTask) => {
    setSelectedTaskId(task.id);
    navigateTo('task_details');
  };

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'skipped':
        return 'text-amber-700 bg-amber-50 border-amber-200';
      case 'not_required':
        return 'text-slate-500 bg-slate-100 border-slate-200';
      case 'needs_support':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      default:
        return 'text-slate-400 bg-white border-slate-300';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        showBack
        title={t('todaysCarePlan')}
        subtitle={`${currentPatient?.name || 'Lakshmi Devi'} · Elderly Care`}
        rightAction={
          <button
            onClick={() => navigateTo('vitals')}
            className="px-2.5 py-1 bg-teal-50 text-[#168C83] rounded-lg text-xs font-semibold flex items-center gap-1 border border-teal-200"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Vitals</span>
          </button>
        }
      />

      {/* Progress Metric Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-200">
        <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
          <span className="text-slate-600">Daily Care Progress</span>
          <span className="text-[#168C83] font-bold">
            {completedCount} of {tasks.length} tasks completed ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#168C83] transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Filter Segmented Control */}
        <div className="flex bg-slate-100 p-0.5 rounded-lg mt-3 text-xs">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeFilter === 'all' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            All ({tasks.length})
          </button>
          <button
            onClick={() => setActiveFilter('morning')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeFilter === 'morning' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            {t('morning')}
          </button>
          <button
            onClick={() => setActiveFilter('afternoon')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeFilter === 'afternoon' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            {t('afternoon')}
          </button>
          <button
            onClick={() => setActiveFilter('evening')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeFilter === 'evening' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            {t('evening')}
          </button>
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
        {filteredTasks.map((task) => {
          const isCompleted = task.status === 'completed';

          return (
            <div
              key={task.id}
              className={`bg-white p-3.5 rounded-xl border transition-colors ${
                isCompleted ? 'border-slate-200 bg-slate-50/40' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Fast status toggle button */}
                <button
                  onClick={() =>
                    updateTaskStatus(
                      task.id,
                      task.status === 'completed' ? 'pending' : 'completed'
                    )
                  }
                  className="mt-0.5 shrink-0 focus:outline-none"
                  title="Toggle completed"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 hover:text-[#168C83]" />
                  )}
                </button>

                <div
                  className="flex-1 min-w-0 cursor-pointer"
                  onClick={() => handleOpenTask(task)}
                >
                  <div className="flex items-center justify-between">
                    <h3
                      className={`text-sm font-semibold truncate ${
                        isCompleted ? 'line-through text-slate-500' : 'text-slate-800'
                      }`}
                    >
                      {task.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 shrink-0 ml-2">
                      {task.scheduledTime}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                    {task.instruction}
                  </p>

                  {task.note && (
                    <div className="mt-2 p-1.5 bg-slate-50 rounded text-[11px] text-slate-600 border border-slate-100">
                      <strong>Note:</strong> {task.note}
                    </div>
                  )}

                  {task.completedAt && (
                    <div className="mt-1 text-[11px] text-emerald-700 font-medium">
                      Completed at {task.completedAt}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleOpenTask(task)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                  aria-label="View task details"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}

        {/* Observation & Vitals Quick Cards */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => navigateTo('vitals')}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 text-left transition-colors"
          >
            <Activity className="w-4 h-4 text-[#168C83] mb-1.5" />
            <h4 className="text-xs font-semibold text-slate-800">Record Vitals</h4>
            <p className="text-[11px] text-slate-500">BP, Pulse, Temp</p>
          </button>

          <button
            onClick={() => navigateTo('condition_check')}
            className="p-3 bg-white border border-slate-200 rounded-xl hover:border-slate-300 text-left transition-colors"
          >
            <Heart className="w-4 h-4 text-[#168C83] mb-1.5" />
            <h4 className="text-xs font-semibold text-slate-800">Condition Check</h4>
            <p className="text-[11px] text-slate-500">Mobility, appetite, comfort</p>
          </button>
        </div>
      </div>
    </div>
  );
};
