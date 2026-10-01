import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { MapPin, ShieldCheck, Check, X } from 'lucide-react';

export const LocationPermissionScreen: React.FC = () => {
  const { goBack, showToast } = useApp();

  const handleAllow = () => {
    showToast('Location permission granted (While Using App)');
    goBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Header showBack title="Location Access" />

      <div className="flex-1 flex flex-col justify-between p-6">
        <div className="my-auto max-w-sm w-full mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-[#E7F5F1] text-[#168C83] mx-auto flex items-center justify-center border border-[#168C83]/20 shadow-xs">
            <MapPin className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#17324D] tracking-tight">
              Allow location access
            </h2>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              CareConnect uses your location during active assignments to help with navigation, arrival confirmation and caregiver field safety.
            </p>
          </div>

          <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200 text-left text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <ShieldCheck className="w-4 h-4 text-[#168C83]" />
              <span>Privacy & Battery Safeguard</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Location is accessed strictly during active care shift hours. We never track caregiver location off-duty.
            </p>
          </div>
        </div>

        <div className="space-y-2.5 max-w-sm w-full mx-auto pb-4">
          <button
            onClick={handleAllow}
            className="w-full h-12 bg-[#168C83] hover:bg-[#12726b] active:bg-[#0f5c56] text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Allow While Using App</span>
          </button>

          <button
            onClick={goBack}
            className="w-full h-11 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-medium text-xs rounded-xl flex items-center justify-center transition-colors"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};
