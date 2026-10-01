import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { Avatar } from '../common/Avatar';
import { Clock, MapPin, Bell, ArrowRight, Navigation } from 'lucide-react';

export const ShiftReminderScreen: React.FC = () => {
  const { currentPatient, navigateTo } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Header showBack title="Shift Reminder" />

      <div className="flex-1 flex flex-col justify-between p-6">
        <div className="my-auto max-w-sm w-full mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center border border-amber-200 shadow-xs">
            <Bell className="w-7 h-7" />
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-[#17324D] tracking-tight">
              Your shift starts soon
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Please begin traveling to reach patient home on time.
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center gap-3">
              <Avatar type="elderly_female" name={currentPatient?.name || 'Lakshmi Devi'} size="md" />
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {currentPatient?.name || 'Lakshmi Devi'}
                </h3>
                <p className="text-xs text-slate-500">Elderly Care · 72 years</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Start Time: <strong className="text-slate-800">8:00 AM Today</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Location: <strong className="text-slate-800">Tilak Road, Rajahmundry (4.2 km)</strong></span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2.5 max-w-sm w-full mx-auto pb-4">
          <button
            onClick={() => navigateTo('assignment_details')}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <span>View Assignment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('navigation')}
            className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Navigation className="w-4 h-4 text-[#168C83]" />
            <span>Open GPS Navigation</span>
          </button>
        </div>
      </div>
    </div>
  );
};
