import React from 'react';
import { useApp } from '../../context/AppContext';
import { HeartPulse, ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-white select-none">
      <div className="flex justify-end pt-2">
        <span className="text-[11px] font-medium text-slate-400">v2.4.0 (Staff Build)</span>
      </div>

      <div className="flex flex-col items-center text-center my-auto">
        {/* Healthcare Care Symbol */}
        <div className="w-20 h-20 rounded-2xl bg-[#E7F5F1] border border-[#168C83]/20 flex items-center justify-center text-[#168C83] mb-6 shadow-xs">
          <HeartPulse className="w-10 h-10" />
        </div>

        <h1 className="text-2xl font-bold text-[#17324D] tracking-tight">
          CareConnect
        </h1>

        <p className="text-sm font-medium text-[#168C83] mt-1.5">
          Care That Makes a Difference
        </p>

        <p className="text-xs text-slate-500 mt-4 max-w-xs leading-relaxed">
          Authorized Workforce Application for In-Home Caregivers, Patient Attendants & Care Staff
        </p>
      </div>

      <div className="space-y-3 pb-4">
        <button
          onClick={() => navigateTo('login')}
          className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="w-full h-11 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 font-medium text-xs rounded-xl flex items-center justify-center transition-colors"
        >
          Open Anjali's Active Session (Demo)
        </button>
      </div>
    </div>
  );
};
