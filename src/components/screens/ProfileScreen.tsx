import React from 'react';
import { useApp } from '../../context/AppContext';
import { Header } from '../common/Header';
import { BottomNav } from '../common/BottomNav';
import { Avatar } from '../common/Avatar';
import { 
  ShieldCheck, 
  Award, 
  FileText, 
  SlidersHorizontal, 
  Building, 
  Phone, 
  Lock, 
  Bell, 
  Globe, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  UserCheck
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { caregiver, navigateTo, logoutUser, language, setLanguage, t } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC]">
      <Header
        title={t('profile')}
        rightAction={
          <button
            onClick={() => navigateTo('profile_edit')}
            className="text-xs font-semibold text-[#168C83] hover:underline"
          >
            Edit
          </button>
        }
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Caregiver Identity Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-3.5">
            <Avatar type="caregiver" name={caregiver.name} size="lg" isVerified />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-bold text-[#17324D] truncate">
                  {caregiver.name}
                </h2>
                <span className="w-2 h-2 rounded-full bg-emerald-500" title="Active on platform" />
              </div>
              <p className="text-xs font-semibold text-[#168C83] mt-0.5">
                {caregiver.role}
              </p>
              <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                <span>{caregiver.experienceYears} Years Exp</span>
                <span>·</span>
                <span>{caregiver.languages.join(' · ')}</span>
              </div>
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-[#168C83]" />
              <span>{caregiver.verificationBadge}</span>
            </div>
            <span className="font-mono text-slate-400 text-[11px]">ID: CC-AP-8821</span>
          </div>
        </div>

        {/* Section 1: Professional Credentials */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <button
            onClick={() => navigateTo('training')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Award className="w-4 h-4 text-[#168C83]" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Training & Certifications</p>
                <p className="text-[11px] text-slate-500">5 Active Certifications (CPR, Geriatric, Safety)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('documents')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-[#168C83]" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Verified Documents</p>
                <p className="text-[11px] text-slate-500">Aadhaar, Police clearance, Medical fitness</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('availability')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4 text-[#168C83]" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Weekly Availability</p>
                <p className="text-[11px] text-slate-500">Mon-Fri Morning & Afternoon</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Section 2: Account & Banking */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <button
            onClick={() => navigateTo('payment_details')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Building className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Bank & Payout Account</p>
                <p className="text-[11px] text-slate-500">SBI •••• 4829 (Verified Direct Deposit)</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('profile_edit')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Emergency Staff Contact</p>
                <p className="text-[11px] text-slate-500">Suresh Kumar (Brother) · +91 94401 55672</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Section 3: App Preferences & Settings */}
        <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <button
            onClick={() => navigateTo('notification_settings')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Notification Settings</p>
                <p className="text-[11px] text-slate-500">Shift alerts, reminder chimes, updates</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-[#168C83]" />
              <div>
                <p className="text-xs font-semibold text-slate-800">App Language</p>
                <p className="text-[11px] text-slate-500">
                  Current: {language === 'en' ? 'English' : 'తెలుగు (Telugu)'}
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#168C83]">Change</span>
          </button>

          <button
            onClick={() => navigateTo('settings')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Lock className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Privacy & Security Policies</p>
                <p className="text-[11px] text-slate-500">HIPAA/NABH aligned home health guidelines</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('support')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <HelpCircle className="w-4 h-4 text-slate-600" />
              <div>
                <p className="text-xs font-semibold text-slate-800">Help & Staff Operations</p>
                <p className="text-[11px] text-slate-500">Contact supervisor or escalation desk</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Prototype Navigation Tools */}
        <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
          <span className="text-slate-600 font-medium">Design System & States:</span>
          <div className="flex gap-2">
            <button
              onClick={() => navigateTo('design_system')}
              className="text-[#168C83] font-semibold hover:underline"
            >
              Component Kit
            </button>
            <span className="text-slate-300">·</span>
            <button
              onClick={() => navigateTo('empty_states')}
              className="text-slate-600 font-medium hover:underline"
            >
              Empty States
            </button>
          </div>
        </div>

        {/* Logout CTA */}
        <div className="pt-1 pb-4">
          <button
            onClick={logoutUser}
            className="w-full h-11 bg-white hover:bg-rose-50 active:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Staff Portal</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};
