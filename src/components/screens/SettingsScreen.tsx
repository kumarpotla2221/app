import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { 
  Bell, 
  Globe, 
  ShieldCheck, 
  MapPin, 
  FileText, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { language, setLanguage, navigateTo, logoutUser } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header showBack title="Settings & Preferences" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Language Selection */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#168C83]" />
            <h3 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Application Language
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`p-3 rounded-lg border text-left text-xs font-semibold transition-colors ${
                language === 'en'
                  ? 'bg-teal-50 border-[#168C83] text-[#168C83]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              English
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">Default workforce language</span>
            </button>

            <button
              onClick={() => setLanguage('te')}
              className={`p-3 rounded-lg border text-left text-xs font-semibold transition-colors ${
                language === 'te'
                  ? 'bg-teal-50 border-[#168C83] text-[#168C83]'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              తెలుగు (Telugu)
              <span className="block text-[11px] font-normal text-slate-500 mt-0.5">ప్రాంతీయ భాష</span>
            </button>
          </div>
        </div>

        {/* Operational Preferences */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <button
            onClick={() => navigateTo('notification_settings')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Notifications</p>
                <p className="text-[11px] text-slate-500">Assignment alarms, shift reminders</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('location_permission')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Location Services</p>
                <p className="text-[11px] text-slate-500">Active during shifts for safety & geofencing</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Compliance, Terms & Legal */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Caregiver Code of Conduct</p>
                <p className="text-[11px] text-slate-500">Indian Home Care Attendant Standards</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-[#168C83]">Compliant</span>
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Terms of Workforce Service</p>
                <p className="text-[11px] text-slate-500">Staff contract & payout policies</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Patient Privacy Policy</p>
                <p className="text-[11px] text-slate-500">Data protection & confidentiality</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Logout */}
        <div className="pt-2 pb-6">
          <button
            onClick={logoutUser}
            className="w-full h-11 bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
