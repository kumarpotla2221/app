import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Calendar, Users, IndianRupee, ArrowRight, SlidersHorizontal } from 'lucide-react';

export const EmptyStatesScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [activeDemo, setActiveDemo] = useState<'schedule' | 'patients' | 'earnings'>('schedule');

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Empty States Previews" />

      {/* Selector */}
      <div className="bg-white px-4 py-2 border-b border-slate-200">
        <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setActiveDemo('schedule')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeDemo === 'schedule' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            No Schedule
          </button>
          <button
            onClick={() => setActiveDemo('patients')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeDemo === 'patients' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            No Patients
          </button>
          <button
            onClick={() => setActiveDemo('earnings')}
            className={`flex-1 py-1 font-medium rounded-md transition-colors ${
              activeDemo === 'earnings' ? 'bg-white text-[#17324D] shadow-xs' : 'text-slate-600'
            }`}
          >
            No Earnings
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        {activeDemo === 'schedule' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                No Assignments Today
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                You don't have any care assignments scheduled today. Update your availability to receive matching home visits.
              </p>
            </div>
            <button
              onClick={() => navigateTo('availability')}
              className="h-11 px-4 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>View Availability</span>
            </button>
          </div>
        )}

        {activeDemo === 'patients' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                No Patients
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Your assigned patients will appear here once matched by the CareConnect clinical coordination team.
              </p>
            </div>
            <button
              onClick={() => navigateTo('home')}
              className="h-11 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors"
            >
              <span>Return to Dashboard</span>
            </button>
          </div>
        )}

        {activeDemo === 'earnings' && (
          <div className="max-w-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <IndianRupee className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#17324D]">
                No Earnings Yet
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Completed assignment payments will appear here following shift supervisor approval.
              </p>
            </div>
            <button
              onClick={() => navigateTo('schedule')}
              className="h-11 px-4 bg-[#168C83] hover:bg-[#12726b] text-white text-xs font-semibold rounded-xl inline-flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>Check Scheduled Shifts</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
