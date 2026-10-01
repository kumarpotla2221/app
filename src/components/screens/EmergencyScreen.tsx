import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  AlertTriangle, 
  PhoneCall, 
  Headphones, 
  Users, 
  FileWarning, 
  MapPin, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

export const EmergencyScreen: React.FC = () => {
  const { currentPatient, navigateTo, showToast, t } = useApp();

  const handleDial112 = () => {
    showToast('Dialing Emergency Services: 112 (National Emergency Helpline)');
  };

  const handleShareLocation = () => {
    showToast('Patient emergency GPS coordinates shared with CareConnect Response Desk');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title={t('emergencyAssistance')} />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* MANDATORY LEGAL & CLINICAL SAFETY NOTICE */}
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-200 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[#E5484D] shrink-0" />
            <span>CRITICAL LIFE-SAFETY PROTOCOL</span>
          </div>
          <p className="text-xs text-rose-950 leading-relaxed font-medium">
            {t('emergencyDisclaimer')}
          </p>
        </div>

        {/* PRIMARY CALL 112 BUTTON */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-[#E5484D] flex items-center justify-center mx-auto">
            <PhoneCall className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              National Emergency Services
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ambulance · Police · Fire · Disaster Response
            </p>
          </div>

          <button
            onClick={handleDial112}
            className="w-full h-14 bg-[#E5484D] hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-base rounded-xl flex items-center justify-center gap-2 shadow-md transition-colors"
          >
            <PhoneCall className="w-5 h-5 fill-white" />
            <span>{t('callEmergency112')}</span>
          </button>
        </div>

        {/* SECONDARY URGENT ACTIONS */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-1">
            Urgent Incident Protocols
          </h3>

          {/* Contact CareConnect Support */}
          <button
            onClick={() => navigateTo('support')}
            className="w-full p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-teal-50 text-[#168C83] flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  CareConnect Clinical Support Desk
                </h4>
                <p className="text-[11px] text-slate-500">
                  Priority caregiver escalation hotline (24/7)
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Notify Family */}
          <button
            onClick={() => navigateTo('family_comm')}
            className="w-full p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Notify Authorized Family
                </h4>
                <p className="text-[11px] text-slate-500">
                  Priya Kumar (Daughter) · +91 98492 11029
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Report Incident */}
          <button
            onClick={() => navigateTo('incident_report')}
            className="w-full p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <FileWarning className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Report Clinical / Physical Incident
                </h4>
                <p className="text-[11px] text-slate-500">
                  Fall, injury, vitals abnormality, distress
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Share Location */}
          <button
            onClick={handleShareLocation}
            className="w-full p-3.5 bg-white rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-between text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">
                  Share Patient Premises Location
                </h4>
                <p className="text-[11px] text-slate-500">
                  {currentPatient?.address || 'Tilak Road, Rajahmundry'}
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
