import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Clock, Check, SlidersHorizontal, Info } from 'lucide-react';

export const AvailabilityScreen: React.FC = () => {
  const { availabilitySchedule, saveAvailability, isAvailable, toggleAvailability, t } = useApp();
  const [schedule, setSchedule] = useState(availabilitySchedule);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

  const toggleSlot = (day: string, slot: 'morning' | 'afternoon' | 'night') => {
    setSchedule((prev: any) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [slot]: !prev[day][slot],
      },
    }));
  };

  const handleSave = () => {
    saveAvailability(schedule);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('availability')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Master Active Status */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#17324D]">
              Accepting Care Assignments
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Turn off if on medical leave or taking a day off.
            </p>
          </div>

          <button
            onClick={toggleAvailability}
            className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${
              isAvailable ? 'bg-[#168C83]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`block w-4 h-4 bg-white rounded-full transition-transform absolute top-1 ${
                isAvailable ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>

        {/* Informational Guidance */}
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl flex items-start gap-2.5 text-xs text-teal-900">
          <Info className="w-4 h-4 text-[#168C83] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t('availabilityNotice')}
          </p>
        </div>

        {/* Weekly Slot Grid */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Weekly Recurring Time Slots
          </h3>

          <div className="space-y-3">
            {days.map((day) => {
              const daySlots = (schedule as any)[day] || { morning: false, afternoon: false, night: false };
              return (
                <div key={day} className="pt-2 border-t border-slate-100 first:border-none first:pt-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800">{day}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleSlot(day, 'morning')}
                      className={`py-1.5 px-2 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                        daySlots.morning
                          ? 'bg-[#168C83] text-white border-[#168C83]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Morning (8am-2pm)
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSlot(day, 'afternoon')}
                      className={`py-1.5 px-2 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                        daySlots.afternoon
                          ? 'bg-[#168C83] text-white border-[#168C83]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Afternoon (2pm-8pm)
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSlot(day, 'night')}
                      className={`py-1.5 px-2 text-[11px] font-medium rounded-lg border text-center transition-colors ${
                        daySlots.night
                          ? 'bg-[#168C83] text-white border-[#168C83]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Night (8pm-8am)
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 pb-6">
          <button
            onClick={handleSave}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>{t('saveAvailability')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
