import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, MapPin, ChevronRight, CalendarCheck, SlidersHorizontal } from 'lucide-react';

export const ScheduleScreen: React.FC = () => {
  const { 
    assignments, 
    navigateTo, 
    setSelectedAssignmentId, 
    setSelectedPatientId, 
    t 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');

  const handleSelectAssignment = (id: string, patientId: string) => {
    setSelectedAssignmentId(id);
    setSelectedPatientId(patientId);
    navigateTo('assignment_details');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        title={t('todaysSchedule')}
        rightAction={
          <button
            onClick={() => navigateTo('availability')}
            className="text-xs font-semibold text-[#168C83] hover:underline flex items-center gap-1"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Availability</span>
          </button>
        }
      />

      {/* Tabs: Today / Week / Month */}
      <div className="bg-white px-4 py-2 border-b border-slate-200">
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'today'
                ? 'bg-white text-[#17324D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Today (Oct 1)
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'week'
                ? 'bg-white text-[#17324D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setActiveTab('month')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'month'
                ? 'bg-white text-[#17324D] shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            October 2026
          </button>
        </div>
      </div>

      {/* Schedule Timeline List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'today' ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
              <span>2 Assignments Scheduled</span>
              <span>11 Hours Total</span>
            </div>

            {/* Item 1: 08:00 AM Lakshmi Devi */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors relative overflow-hidden">
              <div className="w-1.5 h-full bg-[#168C83] absolute left-0 top-0" />
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#168C83]">
                    08:00 AM – 04:00 PM
                  </span>
                  <h3 className="text-base font-bold text-[#17324D] mt-1">
                    Lakshmi Devi
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Elderly Care · 72 yrs
                  </p>
                </div>

                <StatusBadge status="in_progress" text="In Progress" />
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Tilak Road, Rajahmundry (4.2 km)</span>
                </div>
                <button
                  onClick={() => handleSelectAssignment('asg-today-01', 'pat-001')}
                  className="font-semibold text-[#168C83] hover:underline flex items-center gap-0.5"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Item 2: 05:30 PM Ravi Kumar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors relative overflow-hidden">
              <div className="w-1.5 h-full bg-slate-400 absolute left-0 top-0" />
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    05:30 PM – 08:30 PM
                  </span>
                  <h3 className="text-base font-bold text-[#17324D] mt-1">
                    Ravi Kumar
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    Hospital Assistance · 68 yrs
                  </p>
                </div>

                <StatusBadge status="upcoming" text="Upcoming" />
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Danavaipeta, Rajahmundry (2.1 km)</span>
                </div>
                <button
                  onClick={() => handleSelectAssignment('asg-today-02', 'pat-002')}
                  className="font-semibold text-[#168C83] hover:underline flex items-center gap-0.5"
                >
                  <span>Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Week view / future assignments */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Thursday, Oct 3
              </span>
              <div className="mt-2 flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Lakshmi Devi</h4>
                  <p className="text-xs text-slate-500">Elderly Care · 8:00 AM – 4:00 PM</p>
                  <p className="text-xs font-mono text-[#168C83] mt-1 font-semibold">Est. Earnings: ₹1,800</p>
                </div>
                <button
                  onClick={() => navigateTo('assignment_request')}
                  className="px-2.5 py-1 bg-teal-50 text-[#168C83] border border-teal-200 rounded text-xs font-semibold"
                >
                  Review Offer
                </button>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Saturday, Oct 5
              </span>
              <div className="mt-2 flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Subba Rao</h4>
                  <p className="text-xs text-slate-500">Mobility Assistance · 9:00 AM – 1:00 PM</p>
                  <p className="text-xs font-mono text-slate-600 mt-1">Confirmed Assignment</p>
                </div>
                <StatusBadge status="upcoming" text="Scheduled" />
              </div>
            </div>
          </div>
        )}

        {/* Shift replacement CTA */}
        <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-800">Cannot attend a shift?</p>
            <p className="text-[11px] text-slate-500">Request formal backup or replacement in advance.</p>
          </div>
          <button
            onClick={() => navigateTo('replacement_request')}
            className="text-xs font-semibold text-[#168C83] hover:underline"
          >
            Request
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
